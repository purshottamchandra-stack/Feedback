# Quick Start Guide

Get your ADD247 Faculty Feedback Form running in 5 minutes!

## Prerequisites

- ✅ Node.js installed ([download](https://nodejs.org/))
- ✅ Google Account
- ✅ Internet connection

## Steps

### 1️⃣ Install clasp (1 minute)

```powershell
npm install -g @google/clasp
```

### 2️⃣ Login to Google (30 seconds)

```powershell
clasp login
```

Browser window opens → Sign in → Authorize → Done!

### 3️⃣ Create Google Apps Script Project (30 seconds)

```powershell
clasp create --title "ADD247 Faculty Feedback Form" --type standalone
```

A `.clasp.json` file is created automatically.

### 4️⃣ Update Configuration (2 minutes)

Edit `src/Code.gs`:

Find this line:
```javascript
const MASTER_SHEET_ID = "1EN176K0P9yqofcHmGXv7-Ih8Q2zFkyZpdoY8wVPex2k";
```

Replace with your Google Sheet ID:
```javascript
const MASTER_SHEET_ID = "YOUR_SHEET_ID_HERE";
```

**How to get your Sheet ID:**
1. Open your Google Sheet
2. Copy from URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

### 5️⃣ Deploy! (1 minute)

```powershell
clasp push
clasp deploy
```

Copy the URL from the output → Open in browser → 🎉 Done!

---

## What's Next?

### Grant Permissions

When you first open the app:
- Click "Review Permissions"
- Select your Google Account
- Click "Allow"

### Test the Form

- Select Branch → See course options
- Select Course → See batch codes
- Select Batch → See faculty list
- Rate faculty with emojis 😍
- Fill complaint field
- Click Submit

Your feedback appears in the `Response` sheet! ✅

---

## Common Issues

### ❌ "clasp command not found"
```powershell
npm install -g @google/clasp
```

### ❌ "Permission denied"
```powershell
clasp logout
clasp login
```

### ❌ "Dropdowns empty"
- Verify sheet ID is correct
- Check sheet names match (case-sensitive)
- Ensure you have read permission

### ❌ "Script not found"
```powershell
clasp clone <SCRIPT_ID>
```

---

## Detailed Guides

- **Full Setup**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Development**: See [README.md](./README.md)
- **Code Details**: See comments in `src/Code.gs` and `src/index.html`

---

## Commands Cheat Sheet

```powershell
clasp login              # Authenticate
clasp create --type standalone  # Create project
clasp push              # Upload code
clasp deploy            # Deploy web app
clasp logs              # View errors
clasp pull              # Download changes
npm run watch           # Auto-push on save
```

---

**That's it! Your Faculty Feedback Form is live.** 🚀

For help: See DEPLOYMENT.md or README.md
