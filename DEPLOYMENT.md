# Deployment Guide - ADD247 Faculty Feedback Form

This guide provides step-by-step instructions for deploying the Google Apps Script project to production using both manual methods and the clasp CLI tool.

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Method 1: Using clasp (Recommended)](#method-1-using-clasp-recommended)
3. [Method 2: Manual Deployment via Web UI](#method-2-manual-deployment-via-web-ui)
4. [Method 3: GitHub + clasp Workflow](#method-3-github--clasp-workflow)
5. [Maintenance & Updates](#maintenance--updates)
6. [Rollback Procedures](#rollback-procedures)

---

## Initial Setup

### Step 1: Prepare Your Google Sheet

1. Create a new Google Sheet at [sheets.google.com](https://sheets.google.com)
2. Create the following sheets:
   - `Batch_Details`: Contains branch, batch, and schedule sheet information
   - `FinalSchedule`: Contains faculty and subject assignments (in linked spreadsheets)
   - `Response`: Will be auto-created for storing feedback

**Batch_Details Structure:**

| Column A | Column B | ... | Column H | Column I |
|----------|----------|-----|----------|----------|
| Branch | BatchCode | ... | Branch | ScheduleSheetID |
| Delhi | BR001 | ... | Delhi | <schedule-sheet-id> |
| Mumbai | SR001 | ... | Mumbai | <schedule-sheet-id> |

**FinalSchedule Structure (in linked spreadsheet):**

| Col A | Col B | Col C | Col D | Col E | Col F |
|-------|-------|-------|-------|-------|-------|
| ... | BatchCode | ... | ... | FacultyName | Subject |
| ... | BR001 | ... | ... | Dr. Smith | Banking |

3. Get your Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

### Step 2: Update Configuration

Edit `src/Code.gs` and update these lines with your values:

```javascript
const MASTER_SHEET_ID = "YOUR_SHEET_ID_HERE";
const BATCH_DETAILS_SHEET = "Batch_Details";
const RESPONSE_SHEET = "Response";
const FINALSCHEDULE_SHEET_NAME = "FinalSchedule";
```

---

## Method 1: Using clasp (Recommended)

This method uses Google's official command-line tool for the best development experience.

### Step 1: Install clasp

```powershell
# Install globally
npm install -g @google/clasp

# Verify installation
clasp --version
```

### Step 2: Authenticate

```powershell
clasp login
```

A browser window will open. Sign in with your Google Account and grant permissions.

### Step 3: Create or Link Project

#### Option A: Create New Project

```powershell
cd ADD247-Faculty-Feedback-Form
clasp create --title "ADD247 Faculty Feedback Form" --type standalone
```

This creates `.clasp.json` with your script ID.

#### Option B: Link Existing Project

If you already have a Google Apps Script:

```powershell
clasp clone <SCRIPT_ID>
```

### Step 4: Push Code to Google Apps Script

```powershell
clasp push
```

Expected output:
```
? Overwrite project files on Google Drive? (y/n) y
Pushed 2 files.
```

### Step 5: Create Web App Deployment

```powershell
clasp deploy
```

This creates a new deployment. You'll see output like:

```
Created version 1.
? Description: Initial deployment
- ADD247 Faculty Feedback Form @1 (deployment ID: xxxxxxxxxxxxx)
```

Copy the deployment URL shown in the output.

### Step 6: Access the Web App

1. Copy the URL from the deployment output
2. Open it in your browser
3. Grant permissions when prompted
4. The form is now live!

### Step 7: Update Deployment After Changes

After making code changes:

```powershell
# Push changes
clasp push

# Create new deployment
clasp deploy
```

Or update existing deployment:

```powershell
clasp deploy --deploymentId <previous-deployment-id>
```

---

## Method 2: Manual Deployment via Web UI

If you prefer not to use clasp, you can deploy manually through Google Apps Script editor.

### Step 1: Create Project in Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Name it: "ADD247 Faculty Feedback Form"
4. Copy the script ID from the URL

### Step 2: Add Files Manually

1. **Code.gs**: 
   - In editor, rename "Code.gs" (if exists)
   - Create a new file: File → New → Script
   - Name it "Code.gs"
   - Copy content from `src/Code.gs` into the editor
   - Save (Ctrl+S)

2. **index.html**:
   - File → New → HTML file
   - Name it "index"
   - Copy content from `src/index.html` into the editor
   - Save (Ctrl+S)

### Step 3: Update Configuration

In the Apps Script editor, update `Code.gs` with your sheet ID:

```javascript
const MASTER_SHEET_ID = "YOUR_SHEET_ID_HERE";
```

### Step 4: Deploy

1. Click the **"Deploy"** button (top right)
2. Select "New deployment"
3. Choose type: **"Web app"**
4. Configure:
   - Execute as: **Your email address**
   - Who has access: 
     - **"Anyone"** (if you want public link)
     - **"Me"** (if you want only yourself)
5. Click **"Deploy"**
6. Copy the deployment URL
7. Click **"Done"**

### Step 5: Access the Web App

Visit the deployment URL. Grant permissions if prompted.

### Step 6: Update After Changes

Whenever you update the code:

1. Make changes in the Apps Script editor
2. Save (Ctrl+S)
3. Click "Deploy" → "New deployment"
4. Repeat steps 3-5

---

## Method 3: GitHub + clasp Workflow

This method combines GitHub for version control with clasp for deployment.

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Fill in:
   - Repository name: `ADD247-Faculty-Feedback-Form`
   - Description: "Google Apps Script for faculty feedback collection"
   - Visibility: Public or Private
3. Click "Create repository"

### Step 2: Initialize Local Git

```powershell
cd ADD247-Faculty-Feedback-Form

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: ADD247 Faculty Feedback Form"

# Rename branch to main (GitHub standard)
git branch -M main

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/ADD247-Faculty-Feedback-Form.git

# Push to GitHub
git push -u origin main
```

### Step 3: Protect `.clasp.json`

Never commit `.clasp.json` as it contains credentials:

```powershell
# Ensure it's in .gitignore
echo ".clasp.json" >> .gitignore

# Remove from git tracking if already added
git rm --cached .clasp.json

# Commit the change
git commit -m "Add .clasp.json to gitignore"

# Push
git push
```

### Step 4: Deploy Initial Version

```powershell
clasp login
clasp create --title "ADD247 Faculty Feedback Form" --type standalone
clasp push
clasp deploy
```

### Step 5: Ongoing Workflow

For each update:

```powershell
# Make code changes
# Test locally by viewing the web app

# Push to Google Apps Script
clasp push

# Create new deployment (OR update existing)
clasp deploy

# Commit to GitHub
git add .
git commit -m "Update: Feature description"
git push
```

### Example: Add a Feature

```powershell
# 1. Edit your code
# 2. Push to Apps Script
clasp push

# 3. Test the web app

# 4. Create deployment
clasp deploy

# 5. Update GitHub
git add -A
git commit -m "Add: Email notification on feedback submission"
git push
```

---

## Maintenance & Updates

### Viewing Logs

```powershell
clasp logs
```

Shows server-side errors and console output.

### Checking Deployment Status

```powershell
clasp deployments
```

Lists all active deployments.

### Watch Mode (Auto-push on Save)

```powershell
clasp push --watch
```

Automatically pushes changes when files are saved locally.

### Pull Changes from Online Editor

If you edited code in the Google Apps Script web editor:

```powershell
clasp pull
```

This downloads the online changes to your local files.

### List All Files

```powershell
clasp list
```

---

## Rollback Procedures

### Rollback to Previous Version

If something goes wrong after deployment:

#### Option 1: Revert in Apps Script Editor

1. Go to script.google.com
2. Click the version number (top right)
3. Select a previous version
4. Click "View source"
5. Copy the code
6. Go back to current version
7. Paste the code
8. Save and redeploy

#### Option 2: Rollback with clasp

```powershell
# View versions
clasp list

# See deployments
clasp deployments

# Deploy previous version by ID
clasp deploy --versionNumber <previous-version>
```

#### Option 3: Revert from Git

If using GitHub:

```powershell
# View commit history
git log --oneline

# Revert to previous commit
git revert HEAD~1

# Push changes
git push

# Redeploy
clasp push
clasp deploy
```

---

## Troubleshooting

### "Script not found" Error

```powershell
# Check if .clasp.json exists
dir

# If missing, clone your project
clasp clone <SCRIPT_ID>
```

### "Permission denied" Error

```powershell
# Re-authenticate
clasp logout
clasp login
```

### "Quota exceeded" Error

- Google Apps Script has rate limits
- Wait a few minutes before pushing again
- Batch multiple files in one push operation

### Web App Shows "404 Not Found"

- Verify the deployment URL is correct
- Check that "Execute as" is set to your Google account
- Ensure "Who has access" includes you

### Feedback Not Saving

1. Check the master sheet ID is correct
2. Verify you have edit permission on the sheet
3. Check Google Apps Script logs: `clasp logs`
4. Check browser console for errors (F12)

### Theme Not Working

- Hard refresh browser: **Ctrl+Shift+R** (Windows)
- Clear browser cache
- Try a different browser

---

## Best Practices

1. **Always test before deploying** - Verify form functionality in web app
2. **Keep backups** - Use GitHub for version control
3. **Document changes** - Write clear commit messages
4. **Monitor logs** - Regularly check `clasp logs` for errors
5. **Gradual rollout** - Test with small user group first
6. **Security** - Never commit `.clasp.json` or credentials
7. **Regular updates** - Keep clasp and dependencies updated

```powershell
npm update -g @google/clasp
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Login | `clasp login` |
| Create project | `clasp create --type standalone` |
| Push code | `clasp push` |
| Deploy | `clasp deploy` |
| View logs | `clasp logs` |
| Watch mode | `clasp push --watch` |
| List files | `clasp list` |
| Pull from web | `clasp pull` |
| List deployments | `clasp deployments` |
| Logout | `clasp logout` |

---

**For additional help, visit:**
- [clasp GitHub](https://github.com/google/clasp)
- [Google Apps Script Docs](https://developers.google.com/apps-script)
