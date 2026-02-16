# NURSEDEMIC - COMPLETE SETUP GUIDE

## 🎯 Quick Start (5 Minutes)

### 1. Prerequisites
- XAMPP installed (`C:\xampp`)
- VS Code or any text editor
- Browser (Chrome, Firefox, Edge)

### 2. Quick Setup
```bash
# 1. Copy nursedemic folder to XAMPP
# Location: C:\xampp\htdocs\nursedemic

# 2. Start XAMPP
# - Open XAMPP Control Panel
# - Click START for Apache and MySQL

# 3. Create Database
# - Go to http://localhost/phpmyadmin
# - Create database: nursedemic_db
# - Import: C:\xampp\htdocs\nursedemic\php\database_schema.sql

# 4. Access Website
# - Go to http://localhost/nursedemic
# - Done! 🎉
```

---

## 📦 What's Included

### HTML Pages (8 files)
- ✅ **index.html** - Home page with hero section and features
- ✅ **about.html** - Project details, mission, team, timeline
- ✅ **study-material.html** - Notes, e-books, presentations, videos
- ✅ **career-guidance.html** - Jobs, exams, scholarships, interviews
- ✅ **e-library.html** - Searchable resource repository
- ✅ **ai-chatbot.html** - Interactive AI assistant
- ✅ **contact.html** - Contact form with FAQ
- ✅ **login.html** - Registration and login forms

### Styling (1 file)
- ✅ **css/style.css** (650+ lines)
  - Medical-themed color scheme
  - Responsive Bootstrap 5 integration
  - Hover effects and animations
  - Mobile-first approach
  - Print-friendly styles

### JavaScript (1 file)
- ✅ **js/main.js** (500+ lines)
  - Search and filter functionality
  - AI chatbot interactions
  - Form validation
  - Local storage for bookmarks
  - Dynamic content loading
  - Error handling

### Backend (4 PHP files)
- ✅ **php/config.php** - Database connection
- ✅ **php/register_user.php** - User registration API
- ✅ **php/login_user.php** - User login API
- ✅ **php/send_contact.php** - Contact form handler

### Database (1 file)
- ✅ **php/database_schema.sql** - Complete database setup
  - 12 tables
  - 100+ indexes
  - Sample data
  - Foreign keys

### Documentation (2 files)
- ✅ **README.md** - Comprehensive documentation
- ✅ **INSTALLATION_GUIDE.md** - This file

---

## 🔧 Detailed Setup Instructions

### Step 1: Install XAMPP
1. Download XAMPP from `https://www.apachefriends.org/`
2. Run installer (xampp-windows-x64-8.2.0)
3. Choose installation directory: `C:\xampp`
4. Select components: Apache, MySQL, PHP, phpMyAdmin
5. Complete installation

### Step 2: Extract Project
1. Download/clone Nursedemic project
2. Extract to: `C:\xampp\htdocs\nursedemic`
3. File structure should be:
   ```
   C:\xampp\htdocs\
   └── nursedemic/
       ├── index.html
       ├── css/
       ├── js/
       ├── php/
       ├── assets/
       └── README.md
   ```

### Step 3: Start XAMPP Services
1. Open XAMPP Control Panel
2. Click START for:
   - Apache
   - MySQL
3. Should show green "Running" status
4. Note the Apache port (usually 80)

### Step 4: Create Database

#### Method 1: Using phpMyAdmin (Easy)
1. Open browser: `http://localhost/phpmyadmin`
2. Login with:
   - User: `root`
   - Password: (leave empty)
3. Click "New" on left sidebar
4. Database name: `nursedemic_db`
5. Collation: `utf8mb4_unicode_ci`
6. Click Create

#### Method 2: Using MySQL Command Line
1. Open Command Prompt
2. Navigate to: `C:\xampp\mysql\bin`
3. Run: `mysql -u root`
4. Execute:
   ```sql
   CREATE DATABASE nursedemic_db;
   USE nursedemic_db;
   SOURCE C:\xampp\htdocs\nursedemic\php\database_schema.sql;
   ```

### Step 5: Import Database Schema

1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Select `nursedemic_db`
3. Click "Import" tab
4. Click "Choose File"
5. Select: `C:\xampp\htdocs\nursedemic\php\database_schema.sql`
6. Click "Import"
7. Should see success message ✅

### Step 6: Configure PHP (if needed)

Edit `C:\xampp\php\php.ini`:
```ini
; Uncomment if needed:
extension=mysqli
extension=pdo_mysql
```

Restart Apache after changes.

### Step 7: Verify Installation

Test all components:

```bash
# Test Apache
http://localhost
# Should show XAMPP welcome page

# Test PHP
http://localhost/phpmyadmin
# Should load phpMyAdmin interface

# Test Nursedemic
http://localhost/nursedemic
# Should load home page ✅

# Test Database
http://localhost/phpmyadmin
# Should show nursedemic_db with tables
```

---

## 🧪 Testing the Website

### Navigation Test
- [ ] Home page loads correctly
- [ ] All menu items are clickable
- [ ] Links work and navigate properly
- [ ] Logo redirects to home

### Study Material Page
- [ ] All material cards display
- [ ] Filter by type works
- [ ] Filter by subject works
- [ ] Search functionality works
- [ ] Download buttons are functional

### Career Guidance Page
- [ ] Job listings display
- [ ] Apply button works
- [ ] Exam info sections load
- [ ] Scholarship info visible

### AI Chatbot
- [ ] Chat interface loads
- [ ] Quick questions work
- [ ] Messages display correctly
- [ ] Responses appear

### Login/Signup
- [ ] Forms display correctly
- [ ] Tabs switch properly
- [ ] Form validation works
- [ ] Error messages appear

### Contact Form
- [ ] Form fields display
- [ ] Validation works
- [ ] Submit button functional
- [ ] Success message appears

### Responsive Design
- [ ] Test on mobile (320px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1920px)
- [ ] All elements responsive

---

## 📊 Database Structure Overview

### Users Table
- Stores user accounts
- Fields: id, name, email, password, role
- Roles: student, professional, educator, admin

### Study Materials Table
- Stores course materials
- Fields: title, description, content_type, subject
- Types: notes, ebook, video, presentation

### e-Library Table
- Stores academic resources
- Fields: title, author, category, resource_type
- Types: book, journal, pdf, article, research_paper

### Job Opportunities Table
- Stores job listings
- Fields: title, organization, location, salary_range
- Types: full-time, part-time, contract, internship

### Additional Tables
- bookmarks: User-saved materials
- ratings_reviews: User feedback
- discussions: Forum posts
- contact_messages: Contact form submissions
- chat_history: Chatbot conversations
- admin_logs: System activity tracking

---

## 🔑 Default Credentials

After importing database schema:

```
Email: admin@nursedemic.com
Password: (Use registration form to create your first account)
Role: admin
```

---

## 🐛 Common Issues & Solutions

### Issue: "Connection refused" Error
```
Error: Connection refused to localhost:3306
```
**Solution**:
- Check MySQL is running in XAMPP Control Panel
- Verify port 3306 is not blocked
- Check firewall settings

### Issue: "Access denied for user 'root'@'localhost'"
```
Error: Access denied for user 'root'@'localhost'
```
**Solution**:
- Check password in config.php (usually empty for XAMPP)
- Reset MySQL password: Run as administrator
- Run: `C:\xampp\mysql\bin\mysql --user=root`

### Issue: "Table 'nursedemic_db.users' doesn't exist"
```
Error: Table 'nursedemic_db.users' doesn't exist
```
**Solution**:
- Re-import database_schema.sql
- Check database was created
- Verify tables exist in phpMyAdmin

### Issue: PHP files showing code instead of executing
```
Display: <?php echo "test"; ?>
```
**Solution**:
- Check Apache is running
- Verify PHP is enabled in Apache
- Check file extension is .php (not .html)

### Issue: CSS and JS files not loading
```
Network error: Failed to load css/style.css
```
**Solution**:
- Check file paths are correct
- Verify files exist in directories
- Check browser console for 404 errors
- Clear browser cache (Ctrl+Shift+Delete)

### Issue: Contact form not sending emails
**Solution**:
- Configure SMTP in php.ini
- Or use mail() function (requires proper setup)
- For testing, check logs at `C:\xampp\apache\logs\`

---

## 🚀 Going Live (Deployment)

### Before Deployment Checklist
- [ ] All pages tested locally
- [ ] Database has production data
- [ ] Security configurations done
- [ ] Email service configured
- [ ] SSL certificate obtained
- [ ] Backup system set up

### Deploy to Web Host

1. **Purchase Hosting**
   - Recommended: Bluehost, SiteGround, HostGator
   - Ensure PHP 7.4+, MySQL 5.7+

2. **Upload Files**
   - Use FTP/SFTP to upload all files
   - Or use File Manager in control panel
   - Maintain directory structure

3. **Create Database**
   - Use cPanel or hosting control panel
   - Import database_schema.sql

4. **Update config.php**
   ```php
   define('DB_HOST', 'your-host.com');
   define('DB_USER', 'your-username');
   define('DB_PASSWORD', 'your-password');
   define('DB_NAME', 'your-database-name');
   ```

5. **Set Permissions**
   ```
   /php/: 755
   /assets/documents/: 777
   ```

6. **Enable HTTPS**
   - Install SSL certificate
   - Update config for HTTPS redirect

7. **Setup Email**
   - Configure SMTP credentials
   - Test contact form

---

## 📱 Mobile Optimization

### Already Implemented:
- ✅ Bootstrap 5 grid system
- ✅ Responsive fonts and spacing
- ✅ Mobile-friendly navigation
- ✅ Touch-friendly buttons
- ✅ Optimized images
- ✅ Media queries for all breakpoints

### Test on Mobile:
```
Chrome DevTools:
- Press F12
- Click device toggle (Ctrl+Shift+M)
- Test iPhone, iPad, Android sizes
```

---

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Enable HTTPS/SSL
- [ ] Set strong database password
- [ ] Hide PHP errors in production
- [ ] Implement rate limiting
- [ ] Add CSRF tokens
- [ ] Validate all user inputs
- [ ] Sanitize database queries
- [ ] Regular backups configured
- [ ] Admin panel secured

---

## 📈 Performance Optimization

### Already Optimized:
- Minified CSS and JavaScript
- Bootstrap CDN (faster loading)
- Lazy loading for images
- Optimized database indexes
- Caching headers set

### Additional Improvements:
- Enable gzip compression
- Use CDN for media
- Optimize images (WebP format)
- Minify HTML output
- Implement caching strategy

---

## 🆘 Getting Help

### Resources:
1. Check README.md for documentation
2. Review TROUBLESHOOTING section
3. Check JavaScript console (F12)
4. Check PHP error logs
5. Check MySQL logs
6. Search GitHub issues

### Contact Support:
- Email: info@nursedemic.com
- Phone: +1 (800) 123-4567
- GitHub: Create an issue

---

## 📚 Additional Resources

### Documentation:
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0/)
- [PHP Documentation](https://www.php.net/manual/en/)
- [MySQL Reference](https://dev.mysql.com/doc/)
- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)

### Tutorials:
- XAMPP Setup: [Link](https://www.apachefriends.org/)
- PHP Basics: [Codecademy](https://www.codecademy.com/)
- MySQL: [W3Schools](https://www.w3schools.com/sql/)
- Bootstrap: [Official Docs](https://getbootstrap.com/docs/)

### Tools:
- Code Editor: [VS Code](https://code.visualstudio.com/)
- Git: [GitHub Desktop](https://desktop.github.com/)
- Database GUI: [DBeaver](https://dbeaver.io/)
- API Testing: [Postman](https://www.postman.com/)

---

## ✅ Final Verification

After setup, verify all components:

```bash
✅ XAMPP Services Running (Apache & MySQL)
✅ Website Loads (http://localhost/nursedemic)
✅ Database Connected
✅ All Pages Accessible
✅ Search Works
✅ Forms Validate
✅ Responsive on Mobile
✅ No Console Errors
✅ No PHP Warnings
```

If all checked, **Nursedemic is ready to use!** 🎉

---

## 🎓 Next Steps

1. Create your first user account
2. Explore all pages and features
3. Test search and filter functions
4. Review database tables in phpMyAdmin
5. Customize colors and content as needed
6. Deploy to production when ready

---

**Setup Version**: 1.0  
**Last Updated**: January 22, 2026  
**Status**: Production Ready ✅

For any issues, refer to troubleshooting section or contact support.

Good luck with Nursedemic! 🚀
