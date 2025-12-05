# GitHub Publishing Guide

Complete instructions for publishing your ADD247 Faculty Feedback Form to GitHub.

## Step 1: Create a GitHub Repository

### Via Web Browser (Recommended)

1. Go to [github.com/new](https://github.com/new)
2. Fill in the form:
   - **Repository name**: `ADD247-Faculty-Feedback-Form`
   - **Description**: "A Google Apps Script web app for collecting faculty feedback from students using emoji-based ratings"
   - **Visibility**: Choose "Public" (for sharing) or "Private" (for personal use)
   - ☑️ Do NOT initialize with README, .gitignore, or license (we have them)
3. Click "Create repository"
4. You'll see a confirmation page with setup instructions

## Step 2: Initialize Git Locally

Open PowerShell in the project folder:

```powershell
cd C:\Users\Viainfo\ADD247-Faculty-Feedback-Form

# Initialize git
git init

# Check git status
git status
```

You should see all files as "untracked".

## Step 3: Configure Git User (First Time Only)

```powershell
git config user.name "Your Name"
git config user.email "your.email@gmail.com"
```

**Or globally** (all projects):

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@gmail.com"
```

## Step 4: Add All Files to Git

```powershell
# Add all files
git add .

# Verify what's being added
git status
```

Expected output shows all files as "Changes to be committed"

## Step 5: Create Initial Commit

```powershell
git commit -m "Initial commit: ADD247 Faculty Feedback Form

- Complete Google Apps Script project with web UI
- Emoji-based faculty feedback collection
- Dark/Light theme support
- Integration with Google Sheets
- Ready for deployment via clasp"
```

## Step 6: Connect Remote Repository

From the GitHub repository page you created, copy the HTTPS URL (looks like):
```
https://github.com/YOUR_USERNAME/ADD247-Faculty-Feedback-Form.git
```

Then run:

```powershell
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/ADD247-Faculty-Feedback-Form.git

# Rename branch to main (GitHub standard)
git branch -M main

# Verify setup
git remote -v
```

## Step 7: Push to GitHub

```powershell
# Push for the first time
git push -u origin main
```

You may need to authenticate:
- **Method 1**: Enter GitHub username and personal access token
- **Method 2**: Browser will open for authentication
- **Method 3**: Use Git Credential Manager

**To create a Personal Access Token:**
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click "Generate new token"
3. Name: "Git CLI"
4. Scopes: Check `repo` (full control of private repositories)
5. Click "Generate"
6. Copy the token and paste when prompted

## Step 8: Verify Upload

1. Go to your GitHub repository URL
2. You should see all your files
3. Check that `.clasp.json` is NOT visible (protected by .gitignore)
4. README.md should display on the main page

---

## 🚀 Ongoing GitHub Workflow

### After Making Changes

```powershell
# 1. Update code locally
#    (Edit Code.gs, index.html, or other files)

# 2. Test the changes
npm run push
# (Test the web app)

# 3. Commit to git
git add .
git commit -m "Add: Clear description of what changed"

# 4. Push to GitHub
git push
```

### Example: Adding a Feature

```powershell
# Create feature branch (optional but recommended)
git checkout -b feature/email-notifications

# Edit the code
# Test locally: npm run push, npm run deploy

# Commit
git add .
git commit -m "Add: Email notifications on feedback submission"

# Push to GitHub
git push -u origin feature/email-notifications

# (Optional) Create Pull Request on GitHub
```

### Check Commit History

```powershell
# View recent commits
git log --oneline -10

# View full details
git log --oneline --graph --all
```

---

## 📝 Writing Good Commit Messages

### Good Commit Message
```
Add: Implement email notification feature

- Sends email to faculty on feedback receipt
- Uses Gmail API for sending
- Tested with sample data
- Performance impact: minimal
```

### Bad Commit Message
```
update
```

### Format Guidelines

Start with a verb:
- `Add:` - New feature
- `Fix:` - Bug fix
- `Update:` - Modification
- `Refactor:` - Code improvement
- `Docs:` - Documentation
- `Remove:` - Delete feature

---

## 🔐 Protect `.clasp.json`

Your `.clasp.json` contains your Google Apps Script ID (not sensitive, but good practice to protect it anyway).

**Verify it's ignored:**

```powershell
git check-ignore .clasp.json
```

If it returns nothing, you're good! If it shows the path, it's already ignored.

---

## 📋 GitHub Repository Checklist

After pushing, verify on GitHub:

- [ ] All source files present in `src/` folder
- [ ] README.md displays correctly
- [ ] `.clasp.json` is NOT visible
- [ ] `node_modules/` is NOT visible
- [ ] All documentation files present
- [ ] `.gitignore` is in place

---

## 🎯 Adding to Your GitHub Profile

### In GitHub README (optional)

Add this to your main GitHub profile README:

```markdown
## 📚 Featured Projects

### [ADD247 Faculty Feedback Form](https://github.com/YOUR_USERNAME/ADD247-Faculty-Feedback-Form)
A modern Google Apps Script web application for collecting faculty feedback using emoji-based ratings. Features dark/light themes, responsive design, and Google Sheets integration.

**Tech Stack**: Google Apps Script, HTML5, CSS3, JavaScript
**Links**: [Repository](https://github.com/YOUR_USERNAME/ADD247-Faculty-Feedback-Form) | [Deployment Guide](./DEPLOYMENT.md)
```

---

## 🔄 Syncing Between Machines

### On a New Computer

```powershell
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ADD247-Faculty-Feedback-Form.git
cd ADD247-Faculty-Feedback-Form

# Install dependencies
npm install

# Authenticate with Google
npm run login

# Link to your Apps Script project
clasp clone <SCRIPT_ID>
```

---

## 🆘 Troubleshooting

### "fatal: remote already exists"

```powershell
# Remove the remote
git remote remove origin

# Add it again with correct URL
git remote add origin https://github.com/YOUR_USERNAME/ADD247-Faculty-Feedback-Form.git
```

### "Everything up-to-date" but changes not showing

```powershell
# Force push (use with caution!)
git push -f origin main
```

### "Authentication failed"

```powershell
# Re-enter credentials
git config --unset credential.helper
git push
# Enter username and token when prompted
```

### "Permission denied (publickey)"

```powershell
# You're probably using SSH instead of HTTPS
# Check remote URL
git remote -v

# Change to HTTPS
git remote set-url origin https://github.com/YOUR_USERNAME/ADD247-Faculty-Feedback-Form.git
```

### ".gitignore not working"

```powershell
# Remove cached file
git rm --cached .clasp.json

# Commit the change
git commit -m "Remove .clasp.json from tracking"

# Push
git push
```

---

## 📊 Repository Stats

The GitHub repository will show:
- **Commits**: Each time you push
- **Contributors**: People who've made changes
- **Languages**: JavaScript, HTML, CSS
- **Lines of code**: ~1200+
- **License**: MIT

---

## 🎉 You're Done!

Your project is now on GitHub! 

### Share Your Repository

- **Link**: `https://github.com/YOUR_USERNAME/ADD247-Faculty-Feedback-Form`
- **Share via**: Email, social media, portfolio
- **Badge**: Add to your bio or portfolio

### What's Next?

1. Monitor GitHub notifications for issues
2. Continue pushing updates regularly
3. Consider adding a license (MIT recommended)
4. Ask for feedback from other developers
5. Document any issues users report

---

## 📚 GitHub Resources

- [GitHub Docs](https://docs.github.com/)
- [Git Basics](https://git-scm.com/doc)
- [GitHub Workflows](https://docs.github.com/en/actions)
- [SSH Setup Guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

---

**Your project is now live on GitHub! Start collaborating and sharing!** 🚀
