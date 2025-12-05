# Project Structure & Organization Guide

## 📁 Complete Folder Layout

```
ADD247-Faculty-Feedback-Form/
│
├── src/                          # Source code directory
│   ├── Code.gs                   # ⭐ Server-side Apps Script (backend)
│   └── index.html                # ⭐ Client-side UI (frontend)
│
├── docs/                         # Documentation (reserved for future)
│
├── appsscript.json              # Google Apps Script configuration
├── .gitignore                   # Git ignore rules
├── package.json                 # npm configuration & scripts
│
├── README.md                    # 📖 Main documentation & overview
├── QUICKSTART.md                # ⚡ 5-minute setup guide
├── DEPLOYMENT.md                # 🚀 Detailed deployment instructions
├── CONTRIBUTING.md              # 👥 Contribution guidelines
└── CHANGELOG.md                 # 📝 Version history & roadmap
```

## 📄 File Descriptions

### Source Code

#### `src/Code.gs` (450+ lines)
- **Purpose**: Server-side Google Apps Script
- **Language**: JavaScript (Google Apps Script)
- **Key Functions**:
  - `doGet()` - Entry point for web app
  - `getBranchList()` - Fetch branches from sheet
  - `getBatchCodes()` - Filter batches by course
  - `getFacultyListForBatch()` - Get faculty-subject pairs
  - `saveFeedback()` - Store feedback in sheet
- **Features**:
  - Complete inline documentation
  - Error handling for missing sheets
  - Proper data validation
  - SQL injection prevention (Apps Script uses Sheets API)

#### `src/index.html` (700+ lines)
- **Purpose**: Client-side HTML/CSS/JavaScript UI
- **Language**: HTML + CSS + JavaScript
- **Key Sections**:
  - **CSS**: Glassmorphic dark/light theme
  - **HTML**: Form structure with dropdowns, emoji ratings, textarea
  - **JavaScript**: Event handlers, validation, form submission
- **Features**:
  - Responsive design (mobile/tablet/desktop)
  - Dark/Light theme toggle
  - Emoji-based rating system
  - XSS protection via HTML escaping
  - Google Apps Script RPC integration
  - Smooth animations and transitions

### Configuration

#### `appsscript.json`
- Apps Script project configuration
- Specifies timezone, runtime version, dependencies
- Defines web app access settings

#### `package.json`
- npm scripts for easy command execution
- Dev dependencies (clasp)
- Project metadata (name, version, author)
- **Available Commands**:
  ```bash
  npm run login       # clasp login
  npm run create      # Create new project
  npm run push        # Push code to Apps Script
  npm run deploy      # Deploy as web app
  npm run logs        # View server logs
  npm run pull        # Pull from online editor
  npm run watch       # Auto-push on file changes
  npm run list        # List files
  npm run deployments # Show all deployments
  ```

#### `.gitignore`
- Excludes sensitive files from Git
- Prevents `.clasp.json` from being committed
- Ignores `node_modules/`, logs, OS files

### Documentation

#### `README.md` (500+ lines)
- Complete project overview
- Feature list and benefits
- Installation and setup steps
- Usage instructions
- Configuration guide
- Sheet structure requirements
- Troubleshooting guide
- Links to resources
- **Read this first!**

#### `QUICKSTART.md` (150+ lines)
- 5-step quick start guide
- Minimal prerequisites
- Common issues and fixes
- Command cheat sheet
- **For developers in a hurry**

#### `DEPLOYMENT.md` (400+ lines)
- Three deployment methods (clasp, manual, GitHub)
- Step-by-step instructions
- Maintenance procedures
- Rollback instructions
- Troubleshooting
- Best practices
- Quick reference table
- **Comprehensive deployment guide**

#### `CONTRIBUTING.md`
- Development setup
- Code style guidelines
- Issue reporting procedure
- Pull request process
- Ideas for future enhancements

#### `CHANGELOG.md`
- Version history
- Release notes
- Known limitations
- Future roadmap
- System requirements

---

## 🚀 Quick Navigation

### I want to...

**Deploy the app**
→ Read [QUICKSTART.md](./QUICKSTART.md) (5 min)

**Understand the project**
→ Read [README.md](./README.md) (15 min)

**Deploy manually or update**
→ Read [DEPLOYMENT.md](./DEPLOYMENT.md) (20 min)

**Modify the code**
→ Check comments in `src/Code.gs` and `src/index.html`

**Contribute to project**
→ Read [CONTRIBUTING.md](./CONTRIBUTING.md)

**See version history**
→ Read [CHANGELOG.md](./CHANGELOG.md)

---

## 🔧 Technology Stack

| Layer | Technology | Files |
|-------|-----------|-------|
| **Backend** | Google Apps Script (JavaScript) | `src/Code.gs` |
| **Frontend** | HTML + CSS + JavaScript | `src/index.html` |
| **Database** | Google Sheets | Connected via Sheet ID |
| **Deployment** | Google Apps Script | `appsscript.json` |
| **CLI** | clasp (Google's CLI) | Used via npm scripts |
| **Version Control** | Git + GitHub | `.gitignore` |

---

## 📋 Setup Checklist

- [ ] Install Node.js and npm
- [ ] Clone or download this project
- [ ] Run `npm install` (installs clasp)
- [ ] Run `npm run login` (authenticate)
- [ ] Create Google Sheet with Batch_Details
- [ ] Update Sheet ID in `src/Code.gs`
- [ ] Run `npm run push` (upload code)
- [ ] Run `npm run deploy` (create web app)
- [ ] Copy URL and test the form
- [ ] Push to GitHub (optional)

---

## 📊 Data Flow

```
User fills form (index.html)
    ↓
JavaScript collects data (index.html)
    ↓
google.script.run calls backend functions (Code.gs)
    ↓
Server processes and saves to sheet (Code.gs)
    ↓
Data stored in Response sheet (Google Sheets)
    ↓
User sees success message (index.html)
```

---

## 🔐 Security Architecture

```
Frontend (Client-side)
├── HTML Escaping (XSS Prevention)
├── Form Validation
└── Client-side error handling
    ↓
Backend (Server-side)
├── Apps Script Permission Model
├── Sheet Access Control
├── Data Type Conversion
└── Error handling
    ↓
Storage (Google Sheets)
├── OAuth Authentication
├── User-level access control
└── Data encryption at rest
```

---

## 📱 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended |
| Firefox | ✅ Full | Excellent support |
| Safari | ✅ Full | iOS 13+, macOS 10.14+ |
| Edge | ✅ Full | Chromium-based |
| IE 11 | ❌ No | Not supported |

---

## 💾 File Sizes

| File | Size | Purpose |
|------|------|---------|
| Code.gs | ~12 KB | Server logic |
| index.html | ~35 KB | UI + JS + CSS |
| appsscript.json | ~0.5 KB | Config |
| package.json | ~1 KB | npm config |
| README.md | ~20 KB | Documentation |
| **Total** | **~69 KB** | Complete project |

---

## 🎯 Next Steps

1. **First Time?**
   - Start with [QUICKSTART.md](./QUICKSTART.md)
   - Takes only 5 minutes

2. **Need Details?**
   - Read [README.md](./README.md)
   - Check [DEPLOYMENT.md](./DEPLOYMENT.md)

3. **Want to Modify?**
   - Review comments in source files
   - Check `src/Code.gs` and `src/index.html`

4. **Ready to Deploy?**
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Use npm scripts: `npm run push && npm run deploy`

5. **Publishing to GitHub?**
   - See Method 3 in [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Follow the GitHub + clasp workflow

---

**For additional support:**
- See inline code comments
- Check DEPLOYMENT.md troubleshooting section
- Review README.md FAQs
