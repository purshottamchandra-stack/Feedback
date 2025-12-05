# Changelog

All notable changes to the ADD247 Faculty Feedback Form project are documented in this file.

## [1.0.0] - 2025-12-05

### Initial Release

#### Added
- Core feedback form with branch, course, batch, and faculty selection
- Emoji-based 5-point rating system (Subject Knowledge, Lecture Delivery, Student Engagement)
- Dark/Light theme toggle with glassmorphic UI design
- Complaint/Suggestion text field
- Automatic feedback storage to Google Sheets
- Dynamic data loading from Google Sheets master sheet
- Multi-faculty batch support (rate multiple faculty in one submission)
- Form validation and XSS protection
- Responsive design for mobile, tablet, and desktop
- Google Apps Script server with HtmlService web app deployment
- `.clasp.json` configuration for easy deployment
- Comprehensive README and deployment documentation

#### Features
- **Branch Selection**: Dynamically populated from Batch_Details sheet
- **Course Selection**: Fixed list with dynamic batch codes based on course prefix
- **Batch Selection**: Filtered by course code prefix (BR, BF, SR, SF)
- **Faculty List**: Retrieved from linked schedule spreadsheets
- **Rating System**: Emoji-based (😡 😕 😐 🙂 😍) for intuitive feedback
- **Theme Toggle**: Dark mode (default) and light mode
- **Data Persistence**: All feedback saved to Response sheet with timestamp
- **Security**: HTML escaping for user input, server-side validation

#### Project Files
- `src/Code.gs` - Server-side Apps Script with detailed comments
- `src/index.html` - Client-side HTML/CSS/JavaScript with documentation
- `appsscript.json` - Google Apps Script configuration
- `README.md` - Comprehensive project documentation
- `DEPLOYMENT.md` - Detailed deployment instructions
- `CONTRIBUTING.md` - Guidelines for contributors
- `.gitignore` - Git ignore rules for Apps Script
- `package.json` - npm scripts and dependencies

---

## Future Roadmap

### v1.1.0 (Planned)
- [ ] Analytics dashboard
- [ ] CSV export functionality
- [ ] Email notifications on feedback submission
- [ ] Admin panel for viewing statistics
- [ ] Multi-language support

### v1.2.0 (Planned)
- [ ] Advanced filtering and search
- [ ] Comparison reports (faculty performance trends)
- [ ] Custom rating criteria
- [ ] Attachment support

### v2.0.0 (Future)
- [ ] Mobile native app
- [ ] Offline mode
- [ ] Real-time collaboration
- [ ] Integration with other education platforms

---

## Version History Details

### [1.0.0] - Release Details

**Date**: December 5, 2025

**What's New**:
1. Complete web app for faculty feedback collection
2. Integration with Google Sheets for data management
3. Modern UI with dark/light theme support
4. Simple deployment via clasp CLI
5. Full documentation and deployment guides

**System Requirements**:
- Node.js 14+
- Google Account
- Git (for version control)

**Known Limitations**:
- Single submission per user per session (no session tracking)
- File attachments not supported
- Export limited to Google Sheets native export

**Notes**:
- Initial release focused on core functionality
- Tested in Chrome, Firefox, Safari, Edge
- Responsive design works on mobile (iOS 13+, Android 8+)
- Performance optimized for up to 1000 students

---

For more details, see the [README.md](./README.md) and [DEPLOYMENT.md](./DEPLOYMENT.md).
