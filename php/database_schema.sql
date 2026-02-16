-- =============================================
-- NURSEDEMIC DATABASE SCHEMA
-- MySQL Database Setup for Nursedemic Platform
-- =============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS nursedemic_db;
USE nursedemic_db;

-- =============================================
-- USERS TABLE
-- =============================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'professional', 'educator', 'admin', 'contributor') DEFAULT 'student',
    profile_picture VARCHAR(255),
    bio TEXT,
    institution VARCHAR(150),
    specialization VARCHAR(100),
    phone VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login DATETIME,
    INDEX (email),
    INDEX (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- STUDY MATERIALS TABLE
-- =============================================
CREATE TABLE study_materials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_type ENUM('notes', 'ebook', 'video', 'presentation', 'article') NOT NULL,
    subject VARCHAR(100),
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'intermediate',
    file_path VARCHAR(255),
    file_size INT,
    video_url VARCHAR(255),
    author_id INT,
    views INT DEFAULT 0,
    downloads INT DEFAULT 0,
    likes INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX (subject),
    INDEX (content_type),
    INDEX (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- E-LIBRARY TABLE
-- =============================================
CREATE TABLE elibrary_resources (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150),
    publisher VARCHAR(150),
    category VARCHAR(100),
    resource_type ENUM('book', 'journal', 'pdf', 'article', 'research_paper') NOT NULL,
    description TEXT,
    file_path VARCHAR(255),
    file_size INT,
    isbn VARCHAR(50),
    publication_year YEAR,
    pages INT,
    views INT DEFAULT 0,
    downloads INT DEFAULT 0,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (category),
    INDEX (resource_type),
    INDEX (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- JOB OPPORTUNITIES TABLE
-- =============================================
CREATE TABLE job_opportunities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(150),
    description TEXT,
    location VARCHAR(100),
    job_type ENUM('full-time', 'part-time', 'contract', 'internship') DEFAULT 'full-time',
    salary_range VARCHAR(100),
    requirements TEXT,
    benefits TEXT,
    posted_by INT,
    is_active BOOLEAN DEFAULT TRUE,
    views INT DEFAULT 0,
    applications INT DEFAULT 0,
    posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline DATE,
    INDEX (job_type),
    INDEX (posted_date),
    FOREIGN KEY (posted_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- JOB APPLICATIONS TABLE
-- =============================================
CREATE TABLE job_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT NOT NULL,
    user_id INT NOT NULL,
    resume_path VARCHAR(255),
    cover_letter TEXT,
    status ENUM('pending', 'reviewed', 'shortlisted', 'rejected', 'accepted') DEFAULT 'pending',
    applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_date DATETIME,
    reviewed_by INT,
    FOREIGN KEY (job_id) REFERENCES job_opportunities(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX (job_id),
    INDEX (user_id),
    INDEX (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- BOOKMARKS TABLE
-- =============================================
CREATE TABLE bookmarks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    material_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES study_materials(id) ON DELETE CASCADE,
    UNIQUE KEY unique_bookmark (user_id, material_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- RATINGS & REVIEWS TABLE
-- =============================================
CREATE TABLE ratings_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    material_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES study_materials(id) ON DELETE CASCADE,
    UNIQUE KEY unique_review (user_id, material_id),
    INDEX (material_id),
    INDEX (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- CHAT HISTORY TABLE
-- =============================================
CREATE TABLE chat_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    user_message TEXT,
    ai_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX (user_id),
    INDEX (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- CONTACT MESSAGES TABLE
-- =============================================
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_replied BOOLEAN DEFAULT FALSE,
    reply_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (email),
    INDEX (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- DISCUSSIONS TABLE
-- =============================================
CREATE TABLE discussions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    is_pinned BOOLEAN DEFAULT FALSE,
    is_closed BOOLEAN DEFAULT FALSE,
    views INT DEFAULT 0,
    replies INT DEFAULT 0,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX (category),
    INDEX (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- DISCUSSION REPLIES TABLE
-- =============================================
CREATE TABLE discussion_replies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    discussion_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    is_helpful BOOLEAN DEFAULT FALSE,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (discussion_id) REFERENCES discussions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX (discussion_id),
    INDEX (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- SCHOLARSHIPS TABLE
-- =============================================
CREATE TABLE scholarships (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(150),
    description TEXT,
    amount VARCHAR(100),
    eligibility_criteria TEXT,
    deadline DATE,
    application_link VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (deadline)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- NEWSLETTER SUBSCRIPTIONS TABLE
-- =============================================
CREATE TABLE newsletter_subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    subscription_type ENUM('general', 'career', 'study') DEFAULT 'general',
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- ADMIN LOGS TABLE
-- =============================================
CREATE TABLE admin_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    admin_id INT,
    action VARCHAR(255),
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX (admin_id),
    INDEX (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- INSERT SAMPLE DATA
-- =============================================

-- Insert sample admin user
INSERT INTO users (name, email, password, role, is_verified, created_at) VALUES 
('Admin', 'admin@nursedemic.com', '$2y$10$YourHashedPasswordHere', 'admin', TRUE, NOW());

-- Insert sample job opportunities
INSERT INTO job_opportunities (title, organization, description, location, job_type, salary_range, posted_by) VALUES
('Staff Nurse - ICU', 'City General Hospital', 'Experienced nurse needed for ICU department', 'New York, NY', 'full-time', '$55,000 - $70,000', 1),
('Pediatric Nurse', 'St. Mary Children Hospital', 'Compassionate nurse for pediatric ward', 'Los Angeles, CA', 'full-time', '$48,000 - $65,000', 1),
('Community Health Nurse', 'Public Health Department', 'Community nurse for public health initiatives', 'Chicago, IL', 'full-time', '$45,000 - $60,000', 1);

-- Insert sample scholarships
INSERT INTO scholarships (title, organization, description, amount, deadline) VALUES
('Nursing Excellence Scholarship', 'National Nursing Association', 'Full scholarship for nursing students', '$50,000 - $100,000', '2026-03-31'),
('International Fellowship Program', 'Global Health Foundation', 'Fellowship for higher studies abroad', 'Partial to full sponsorship', '2026-04-15');

-- =============================================
-- CREATE INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_materials_subject ON study_materials(subject);
CREATE INDEX idx_materials_type ON study_materials(content_type);
CREATE INDEX idx_elibrary_category ON elibrary_resources(category);
CREATE INDEX idx_jobs_type ON job_opportunities(job_type);
CREATE INDEX idx_jobs_date ON job_opportunities(posted_date);

-- Database setup complete!
