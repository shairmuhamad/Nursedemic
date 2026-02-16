# Nursedemic - Digital Nursing Education Platform

## 📋 Project Overview

Nursedemic is a comprehensive web-based platform designed for nursing students and professionals. It provides study materials, career guidance, AI-powered chatbot assistance, and an extensive e-library - all in one integrated ecosystem.

### Key Features:
- 📚 **Study Materials**: Notes, e-books, presentations, and videos
- 🎓 **Career Guidance**: Job opportunities, interview tips, and professional development
- 🤖 **AI Chatbot**: 24/7 personalized learning assistance
- 📖 **e-Library**: Searchable repository of academic resources
- 👥 **User Accounts**: Registration, login, and personalized profiles
- 💼 **Job Board**: Career opportunities and internships
- 📧 **Newsletter**: Stay updated with latest content and opportunities

---

## 🛠️ Technology Stack

### Frontend:
- **HTML5**: Semantic markup and structure
- **CSS3**: Responsive design and animations
- **JavaScript**: Dynamic functionality and interactivity
- **Bootstrap 5**: Responsive grid system and components
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Poppins and Roboto typography

### Backend:
- **PHP 7.4+**: Server-side logic
- **MySQL**: Relational database
- **Session Management**: User authentication
- **Email Services**: Contact form and notifications

### Development Tools:
- **VS Code**: Code editor
- **Git/GitHub**: Version control
- **XAMPP**: Local development server
- **PhpMyAdmin**: Database management

---

## 📁 Project Structure

```
nursedemic/
├── index.html                 # Home page
├── about.html                 # About page
├── study-material.html        # Study materials page
├── career-guidance.html       # Career guidance page
├── e-library.html             # e-Library page
├── ai-chatbot.html            # AI Chatbot page
├── contact.html               # Contact form page
├── login.html                 # Login/Signup page
│
├── css/
│   └── style.css              # Main stylesheet
│
├── js/
│   └── main.js                # JavaScript functionality
│
├── php/
│   ├── config.php             # Database configuration
│   ├── register_user.php      # User registration
│   ├── login_user.php         # User login
│   ├── send_contact.php       # Contact form handler
│   └── database_schema.sql    # Database setup script
│
├── assets/
│   ├── images/                # Image directory
│   └── documents/             # PDFs and documents
│
└── README.md                  # This file
```

---

## ⚙️ Installation & Setup

### Step 1: Prerequisites
- Install **XAMPP** (Apache, PHP, MySQL)
- Install **VS Code** or any code editor
- Install **Git** (optional, for version control)

### Step 2: Clone/Download Project
```bash
# Using Git
git clone https://github.com/yourusername/nursedemic.git

# Or download as ZIP and extract
```

### Step 3: Place Project in XAMPP
```
Move nursedemic folder to: C:\xampp\htdocs\
```

### Step 4: Start XAMPP Services
- Open XAMPP Control Panel
- Start **Apache** and **MySQL** services
- Click **Admin** button for MySQL (PhpMyAdmin)

### Step 5: Create Database
1. Open PhpMyAdmin: `http://localhost/phpmyadmin`
2. Create new database: `nursedemic_db`
3. Import database schema:
   - Go to Import tab
   - Select `php/database_schema.sql`
   - Click Import

### Step 6: Configure Database
Edit `php/config.php` with your database credentials:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'nursedemic_db');
```

### Step 7: Access the Website
Open your browser and navigate to:
```
http://localhost/nursedemic/
```

---

## 🚀 Usage

### For Students:
1. **Sign Up**: Create account as "Nursing Student"
2. **Access Materials**: Browse study notes, e-books, videos
3. **Use AI Chatbot**: Ask questions about studies or careers
4. **Search e-Library**: Find research papers and journals
5. **Bookmark Resources**: Save materials for later

### For Professionals:
1. **Career Guidance**: Explore job opportunities
2. **Networking**: Join discussions and forums
3. **Share Knowledge**: Contribute study materials
4. **Track Progress**: Monitor learning statistics

### For Educators:
1. **Upload Materials**: Share your resources
2. **Manage Content**: Edit and organize materials
3. **Monitor Usage**: View statistics and engagement
4. **Support Students**: Provide guidance through chatbot

---

## 📚 Database Tables

### Core Tables:
- **users**: User accounts and profiles
- **study_materials**: Course materials and resources
- **elibrary_resources**: Books, journals, PDFs
- **job_opportunities**: Career opportunities and internships
- **job_applications**: User job applications

### Engagement Tables:
- **bookmarks**: Saved materials
- **ratings_reviews**: User ratings and feedback
- **discussions**: Q&A forum posts
- **chat_history**: AI chatbot conversations

### Administrative Tables:
- **contact_messages**: Contact form submissions
- **newsletter_subscriptions**: Newsletter subscribers
- **admin_logs**: System activity logs

---

## 🔐 Security Features

- ✅ Password hashing with bcrypt
- ✅ Input sanitization and validation
- ✅ SQL injection prevention (prepared statements)
- ✅ Session-based authentication
- ✅ Email verification (optional)
- ✅ HTTPS ready (SSL support)
- ✅ CSRF protection (add tokens if deploying)

---

## 📧 Email Configuration

To enable email functionality (contact form, notifications):

1. **Using XAMPP (Development)**:
   - Configure `php.ini` for SMTP
   - Set SMTP server and port
   - Or use Mailhog for testing

2. **Using Gmail (Production)**:
   ```php
   // Configure in config.php or separate email config
   define('SMTP_HOST', 'smtp.gmail.com');
   define('SMTP_PORT', 587);
   define('SMTP_USER', 'your-email@gmail.com');
   define('SMTP_PASS', 'your-app-password');
   ```

3. **Using SendGrid/Mailgun**:
   - Use their PHP SDKs
   - Requires API key configuration

---

## 🎨 Customization

### Change Colors:
Edit `css/style.css` root variables:
```css
:root {
    --primary-color: #0066cc;      /* Blue */
    --secondary-color: #28a745;    /* Green */
    --danger-color: #dc3545;       /* Red */
}
```

### Modify Content:
Edit HTML files directly:
- Update navigation links
- Add/remove sections
- Customize text and images

### Add New Pages:
1. Create new `.html` file
2. Copy navbar and footer from existing page
3. Link in navigation menu
4. Create corresponding CSS styles

---

## 📱 Responsive Design

The website is fully responsive for:
- 📱 Mobile (320px - 576px)
- 📱 Tablet (576px - 768px)
- 💻 Desktop (768px - 1200px)
- 🖥️ Large screens (1200px+)

---

## 🚀 Deployment

### Deploy to GitHub Pages:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/nursedemic.git
git push -u origin main
```

### Deploy to Web Server:
1. Upload files via FTP
2. Set database connection
3. Configure email settings
4. Set up SSL certificate
5. Enable HTTPS redirect

### Deploy using Heroku/Netlify:
- Create account on platform
- Connect GitHub repository
- Set environment variables
- Deploy and monitor

---

## 🧪 Testing

### Manual Testing:
- ✅ Test all navigation links
- ✅ Test search and filter functionality
- ✅ Test form submissions
- ✅ Test responsive design on different devices
- ✅ Test login/signup process
- ✅ Test file downloads

### Automated Testing (Optional):
```bash
# Install testing framework
npm install --save-dev jest

# Run tests
npm test
```

---

## 🐛 Troubleshooting

### Issue: Database Connection Error
**Solution**: 
- Check MySQL is running
- Verify credentials in config.php
- Check database exists

### Issue: Forms not submitting
**Solution**:
- Check PHP error logs
- Verify action path in form
- Check POST method

### Issue: Images not displaying
**Solution**:
- Verify image paths
- Check file permissions
- Use relative paths

### Issue: Styling not applying
**Solution**:
- Clear browser cache
- Check CSS file path
- Verify Bootstrap CDN is loaded

---

## 📈 Future Enhancements

- [ ] Mobile application (React Native)
- [ ] Interactive quizzes and practice tests
- [ ] Discussion forum with real-time chat
- [ ] Advanced AI chatbot (GPT-4 integration)
- [ ] Video streaming optimization
- [ ] Payment gateway for premium content
- [ ] Multilingual support
- [ ] Advanced analytics dashboard
- [ ] Social media integration
- [ ] Notification system

---

## 👥 Team Roles

- **Project Lead**: Overall management and coordination
- **Frontend Developer**: UI/UX implementation
- **Backend Developer**: Server-side logic and database
- **AI Developer**: Chatbot integration and ML features
- **QA Engineer**: Testing and bug fixes
- **DevOps**: Deployment and infrastructure

---

## 📝 License

This project is licensed under the MIT License. See LICENSE file for details.

---

## 📞 Support & Contact

For support and inquiries:
- **Email**: info@nursedemic.com
- **Phone**: +1 (800) 123-4567
- **Website**: www.nursedemic.com
- **GitHub Issues**: Report bugs and feature requests

---

## 🙏 Acknowledgments

- Bootstrap 5 for responsive design
- Font Awesome for icons
- Google Fonts for typography
- Open-source community

---

## 📋 Checklist for Deployment

- [ ] Database configured and populated
- [ ] Email service configured
- [ ] SSL certificate installed
- [ ] All links tested
- [ ] Images optimized
- [ ] Responsive design verified
- [ ] Security measures in place
- [ ] Backup system configured
- [ ] Monitoring tools set up
- [ ] Documentation complete

---

**Version**: 1.0.0  
**Last Updated**: January 22, 2026  
**Status**: Production Ready ✅

---

For detailed documentation on specific features, see individual section guides in the repository.
