# ADD247 Faculty Feedback Form

A modern, responsive Google Apps Script web application for collecting faculty feedback from students using an intuitive emoji-based rating system.

## 📋 Features

- **Dynamic Data Loading**: Branch, course, batch, and faculty information loaded from Google Sheets
- **Emoji-Based Ratings**: 5-point rating scale with emoji feedback (😡 to 😍)
- **Dark/Light Theme Toggle**: Glassmorphic UI with theme switching
- **Multi-Faculty Support**: Rate multiple faculty members per batch in a single submission
- **Structured Data Storage**: All feedback automatically saved to a centralized response sheet
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **XSS Protection**: HTML escaping for user-provided data
- **Real-time Form Validation**: Ensures all required fields are completed

## 🎯 Project Structure

```
ADD247-Faculty-Feedback-Form/
├── src/
│   ├── Code.gs              # Server-side Apps Script (backend logic)
│   └── index.html           # Client-side UI (frontend)
├── appsscript.json          # Apps Script project configuration
├── README.md                # Project documentation (this file)
├── DEPLOYMENT.md            # Detailed deployment instructions
└── .gitignore              # Git ignore rules for Apps Script projects
```

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **Google Account** with access to Google Sheets and Google Apps Script
4. **Git** (for version control)

### 1. Install clasp

```bash
npm install -g @google/clasp
```

### 2. Authenticate with Google

```bash
clasp login
```

This opens your browser to authorize clasp to access your Google account. You'll see a confirmation when successful.

### 3. Clone This Project (Optional - if already on GitHub)

```bash
git clone https://github.com/YOUR_USERNAME/ADD247-Faculty-Feedback-Form.git
cd ADD247-Faculty-Feedback-Form
```

Or create a new local project:

```bash
mkdir ADD247-Faculty-Feedback-Form
cd ADD247-Faculty-Feedback-Form
```

### 4. Create/Link Google Apps Script Project

**Option A: Create a new project**

```bash
clasp create --title "ADD247 Faculty Feedback Form" --type standalone
```

This generates a `.clasp.json` file with your script ID.

**Option B: Link to existing project**

If you already have a Google Apps Script project:

```bash
clasp clone <SCRIPT_ID>
```

Get the script ID from the Apps Script editor URL: `script.google.com/macros/d/<SCRIPT_ID>/edit`

### 5. Deploy the Script

```bash
clasp push
```

This uploads your files to Google Apps Script. You should see:
```
Pushed 2 files.
```

### 6. Create a Web App Deployment

```bash
clasp deploy
```

This creates a deployment and shows you the web app URL. Copy this URL to access the form.

### 7. Allow Access

When you first visit the web app URL, you may need to authorize the script:
- Click "Review Permissions"
- Select your Google Account
- Click "Allow" to grant access

## 📖 Detailed Usage

### Updating Configuration

Before deploying, update `src/Code.gs` with your actual Google Sheet IDs:

```javascript
const MASTER_SHEET_ID = "YOUR_SHEET_ID_HERE";  // Replace with your sheet ID
const BATCH_DETAILS_SHEET = "Batch_Details";    // Sheet name in your spreadsheet
const RESPONSE_SHEET = "Response";              // Where feedback will be stored
const FINALSCHEDULE_SHEET_NAME = "FinalSchedule"; // Schedule sheet name
```

Get your sheet ID from the URL:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```

### Sheet Structure Requirements

Your Google Sheet should have the following structure:

#### Batch_Details Sheet
| Column | Description | Example |
|--------|-------------|---------|
| A | Branch Name | "Delhi", "Mumbai" |
| B | Batch Code | "BR001", "SR001" |
| H | Branch Name (alternate) | "Delhi", "Mumbai" |
| I | Linked Schedule Sheet ID | Schedule sheet ID for that branch |

#### FinalSchedule Sheet (in linked spreadsheet)
| Column | Description | Example |
|--------|-------------|---------|
| B | Batch Code | "BR001" |
| E | Faculty Name | "Dr. John Smith" |
| F | Subject Name | "Banking Concepts" |

### Workflow

1. **Student Access**: Student opens the web app URL
2. **Form Filling**: 
   - Select Branch → Course options appear
   - Select Course → Batch codes appear
   - Select Batch → Faculty list appears with rating sections
3. **Rating**: Click emojis to rate each faculty (1-5 scale)
4. **Submit**: Fill complaint/suggestion and click Submit
5. **Storage**: Feedback is automatically saved to the Response sheet

## 🛠️ Development Workflow

### Pushing Changes

After editing your code locally:

```bash
clasp push
```

### Pulling Changes

If you edited code in Google Apps Script editor online:

```bash
clasp pull
```

### Watch Mode (Auto-push on save)

```bash
clasp push --watch
```

### View Logs

```bash
clasp logs
```

## 📱 Theme Features

- **Dark Mode**: Default theme with purple-blue gradient (good for evening use)
- **Light Mode**: Toggle via 🌙 button for daytime use
- **Glassmorphic Design**: Beautiful frosted glass effect on cards
- **Smooth Transitions**: All UI elements have smooth CSS transitions

## 🔒 Security

- **XSS Protection**: All user input is HTML-escaped before storage
- **Server-side Validation**: Google Sheets permissions control data access
- **No External APIs**: All data stays within Google ecosystem
- **No Authentication Required**: Available to anyone with the link (can be restricted via Google)

## 📊 Response Data

Feedback is stored in the Response sheet with the following columns:

| Column | Content |
|--------|---------|
| Timestamp | When feedback was submitted |
| Branch | Selected branch |
| Student | Student name |
| RegNo | Registration number |
| Course | Selected course |
| Batch | Selected batch code |
| Faculty | Faculty name being rated |
| Subject | Subject taught |
| SubjectKnowledge | Rating 1-5 |
| LectureDelivery | Rating 1-5 |
| StudentEngagement | Rating 1-5 |
| ComplaintSuggestion | Text feedback |

## 🚢 Publishing on GitHub

### Initial Setup

1. **Create a GitHub Repository**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `ADD247-Faculty-Feedback-Form`
   - Description: "A Google Apps Script web app for faculty feedback collection"
   - Make it Public or Private as needed
   - Click "Create repository"

2. **Initialize Git Locally**

```bash
git init
git add .
git commit -m "Initial commit: ADD247 Faculty Feedback Form"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ADD247-Faculty-Feedback-Form.git
git push -u origin main
```

3. **Keep `.clasp.json` Private**

If `.clasp.json` contains sensitive credentials, use `.gitignore`:

```bash
echo ".clasp.json" >> .gitignore
git add .gitignore
git commit -m "Add .clasp.json to gitignore"
git push
```

### Regular Updates

```bash
# Make changes locally
clasp push                    # Push to Google Apps Script
git add .
git commit -m "Description of changes"
git push                      # Push to GitHub
```

## ❓ Troubleshooting

### "Permission denied" when clasp push

**Solution**: Ensure you've logged in:
```bash
clasp login
```

### "Script not found" error

**Solution**: Make sure `.clasp.json` exists and contains a valid script ID:
```bash
cat .clasp.json
```

### Changes not appearing in web app

**Solution**: After pushing with `clasp push`, redeploy:
```bash
clasp deploy
```

### Dropdowns not populating

**Solution**: Verify that:
1. Your master sheet ID is correct
2. Sheet names match exactly (case-sensitive)
3. Your Google Account has read access to the sheet
4. The linked schedule sheet IDs are accessible

### Feedback not saving

**Solution**: 
1. Check that the Response sheet exists or can be created (permissions issue)
2. Verify all required columns are present
3. Check browser console for JavaScript errors (F12)

## 📚 Additional Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [clasp GitHub Repository](https://github.com/google/clasp)
- [Google Sheets API Reference](https://developers.google.com/sheets/api)
- [HtmlService Documentation](https://developers.google.com/apps-script/guides/html)

## 📝 License

This project is open source and available under the MIT License.

## 👥 Support

For issues, questions, or suggestions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
3. Check the inline code comments in `src/Code.gs` and `src/index.html`
4. Open an issue on GitHub

## 🎓 For Developers

### Code Structure

- **Code.gs**: Contains all server-side logic
  - `doGet()`: Entry point for web app
  - `getBranchList()`: Retrieves branches
  - `getBatchCodes()`: Filters batch codes by course
  - `getFacultyListForBatch()`: Gets faculty-subject pairs
  - `saveFeedback()`: Stores responses

- **index.html**: Complete client-side UI
  - CSS: Glassmorphic dark/light theme
  - HTML: Form structure with emoji ratings
  - JavaScript: RPC calls to Apps Script, form handling, DOM manipulation

### Extending the Project

1. **Add More Rating Criteria**: Add new emoji rows in `buildFacultyUI()`
2. **Customize Colors**: Modify CSS variables in `:root`
3. **Add Data Analytics**: Use Google Sheets' built-in charts
4. **Send Notifications**: Add email alerts on feedback submission
5. **Require Authentication**: Implement Google Sign-In via `ScriptApp.getIdentityToken()`

---

**Made with ❤️ by ADD247 Development Team**
