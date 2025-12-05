/**
 * ADD247 Faculty Feedback Form - Server-Side Script
 * 
 * This Google Apps Script handles server-side operations for the Faculty Feedback Web App.
 * It manages data retrieval from Google Sheets and processes user feedback submissions.
 * 
 * Key Features:
 * - Retrieves branch, course, and batch information from master sheet
 * - Fetches faculty and subject details from linked schedule sheets
 * - Stores user feedback in a centralized response sheet
 * - Provides data via RPC calls to the client-side HTML UI
 * 
 * @author ADD247 Development Team
 * @version 1.0.0
 */

// ============================================================================
// CONFIGURATION - Update these constants with your Google Sheets IDs
// ============================================================================

/** Master spreadsheet containing batch details and configuration */
const MASTER_SHEET_ID = "1EN176K0P9yqofcHmGXv7-Ih8Q2zFkyZpdoY8wVPex2k";

/** Sheet name containing batch and branch information */
const BATCH_DETAILS_SHEET = "Batch_Details";

/** Sheet name where feedback responses will be stored */
const RESPONSE_SHEET = "Response";

/** Sheet name in linked schedule sheets containing faculty assignments */
const FINALSCHEDULE_SHEET_NAME = "FinalSchedule";

// ============================================================================
// ENTRY POINT - Handles web app deployment
// ============================================================================

/**
 * Entry point for the web app. Called automatically when user accesses the web app URL.
 * Serves the HTML UI with cross-frame options enabled for broader compatibility.
 * 
 * @returns {HtmlOutput} The rendered index.html file
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ============================================================================
// DATA RETRIEVAL FUNCTIONS - Called from client-side via google.script.run
// ============================================================================

/**
 * Retrieves the list of unique branches from the Batch_Details sheet.
 * Used to populate the Branch dropdown in the feedback form.
 * 
 * @returns {Array<string>} Sorted array of unique branch names
 */
function getBranchList() {
  const ss = SpreadsheetApp.openById(MASTER_SHEET_ID);
  const sh = ss.getSheetByName(BATCH_DETAILS_SHEET);
  
  if (!sh) return [];
  
  const last = sh.getLastRow();
  if (last < 2) return [];
  
  // Extract branch names from column 1 (A), rows 2 onwards (skip header)
  const values = sh.getRange(2, 1, last - 1, 1).getValues().flat();
  
  // Return unique, non-empty values
  return [...new Set(values.filter(String))];
}

/**
 * Retrieves the list of available courses.
 * Currently returns a static list, can be modified to fetch from sheet if needed.
 * 
 * @param {string} branch - Branch name (optional parameter for future expansion)
 * @returns {Array<string>} Array of course names
 */
function getCourseList(branch) {
  return ["Bank", "Bank Foundation", "SSC", "SSC Foundation"];
}

/**
 * Retrieves batch codes for a specific branch and course combination.
 * Uses course-specific prefixes to filter batch codes from the sheet.
 * 
 * Batch Code Prefixes:
 * - SSC: "SR"
 * - SSC Foundation: "SF"
 * - Bank: "BR"
 * - Bank Foundation: "BF"
 * 
 * @param {string} branch - Selected branch name
 * @param {string} course - Selected course name
 * @returns {Array<string>} Array of matching batch codes
 */
function getBatchCodes(branch, course) {
  const ss = SpreadsheetApp.openById(MASTER_SHEET_ID);
  const sh = ss.getSheetByName(BATCH_DETAILS_SHEET);
  
  if (!sh) return [];

  const last = sh.getLastRow();
  if (last < 2) return [];

  // Fetch columns A (branch) and B (batch code), starting from row 2
  const data = sh.getRange(2, 1, last - 1, 2).getValues();

  // Map courses to their batch code prefixes
  const prefixMap = {
    "SSC": "SR",
    "SSC Foundation": "SF",
    "Bank": "BR",
    "Bank Foundation": "BF"
  };
  const prefix = prefixMap[course] || "";

  // Filter: matching branch AND batch code starts with course prefix
  const filtered =
    data
      .filter(r => r[0] == branch && r[1] && r[1].toString().startsWith(prefix))
      .map(r => r[1].toString());

  // Return unique batch codes
  return [...new Set(filtered)];
}

/**
 * Retrieves faculty and subject pairs for a specific branch and batch.
 * This function finds the linked schedule sheet ID from Batch_Details and
 * queries the FinalSchedule sheet to get faculty-subject assignments.
 * 
 * @param {string} branch - Selected branch name
 * @param {string} batch - Selected batch code
 * @returns {Array<{faculty: string, subject: string}>} Array of faculty-subject objects
 */
function getFacultyListForBatch(branch, batch) {
  const master = SpreadsheetApp.openById(MASTER_SHEET_ID);
  const bd = master.getSheetByName(BATCH_DETAILS_SHEET);
  
  if (!bd) return [];

  const last = bd.getLastRow();
  if (last < 2) return [];

  // Fetch columns A-I from Batch_Details
  // Column A: Branch, Column H: Branch (alternate), Column I: Linked Sheet ID
  const rows = bd.getRange(2, 1, last - 1, 9).getValues();

  // Find the schedule sheet ID for the given branch
  let sheetId = "";
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    // Check both column A and H for branch match
    if ((r[0] && r[0].toString() == branch) || (r[7] && r[7].toString() == branch)) {
      // Extract sheet ID from column I
      if (r[8]) {
        sheetId = r[8].toString();
        break;
      }
    }
  }

  if (!sheetId) return [];

  // Attempt to open the linked schedule spreadsheet
  let scheduleSS;
  try {
    scheduleSS = SpreadsheetApp.openById(sheetId);
  } catch (e) {
    // Handle case where sheet ID is invalid or inaccessible
    return [];
  }

  // Get the FinalSchedule sheet from the linked spreadsheet
  const fs = scheduleSS.getSheetByName(FINALSCHEDULE_SHEET_NAME);
  if (!fs) return [];

  const fsLast = fs.getLastRow();
  if (fsLast < 2) return [];

  // Fetch columns A-F from FinalSchedule
  // Column B: Batch Code, Column E: Faculty Name, Column F: Subject Name
  const data = fs.getRange(2, 1, fsLast - 1, 6).getValues();

  // Extract faculty-subject pairs for matching batch code
  const pairs =
    data
      .filter(r => r[1] && r[1].toString() == batch)
      .map(r => {
        return {
          faculty: r[4] ? r[4].toString() : "",
          subject: r[5] ? r[5].toString() : ""
        };
      })
      // Filter out empty pairs
      .filter(p => p.faculty || p.subject);

  // Remove duplicate faculty-subject pairs
  const seen = new Set();
  const unique = [];
  pairs.forEach(p => {
    const key = (p.faculty || "") + "|" + (p.subject || "");
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(p);
    }
  });

  return unique;
}

// ============================================================================
// DATA SUBMISSION FUNCTIONS - Processes feedback from users
// ============================================================================

/**
 * Saves user feedback entries to the Response sheet.
 * Automatically creates the Response sheet if it doesn't exist.
 * Adds header row on first submission.
 * Each faculty gets a separate feedback row with all user-provided data.
 * 
 * @param {Array<Object>} rows - Array of feedback objects with structure:
 *   {branch, student, regno, course, batch, faculty, subject, sk, ld, se, complaint}
 * @returns {boolean} True if save was successful
 */
function saveFeedback(rows) {
  const master = SpreadsheetApp.openById(MASTER_SHEET_ID);
  
  // Get or create the Response sheet
  let sh = master.getSheetByName(RESPONSE_SHEET);
  if (!sh) {
    sh = master.insertSheet(RESPONSE_SHEET);
  }

  // Add header row if sheet is empty
  if (sh.getLastRow() === 0) {
    sh.appendRow([
      "Timestamp",
      "Branch",
      "Student",
      "RegNo",
      "Course",
      "Batch",
      "Faculty",
      "Subject",
      "SubjectKnowledge",      // Rating: 1-5 based on emoji selection
      "LectureDelivery",        // Rating: 1-5 based on emoji selection
      "StudentEngagement",      // Rating: 1-5 based on emoji selection
      "ComplaintSuggestion"
    ]);
  }

  // Append each feedback entry as a new row
  rows.forEach(r => {
    sh.appendRow([
      new Date(),                          // Automatic timestamp
      r.branch || "",
      r.student || "",
      r.regno || "",
      r.course || "",
      r.batch || "",
      r.faculty || "",
      r.subject || "",
      Number(r.sk || 0),                   // Subject Knowledge rating
      Number(r.ld || 0),                   // Lecture Delivery rating
      Number(r.se || 0),                   // Student Engagement rating
      r.complaint || ""
    ]);
  });

  return true;
}
