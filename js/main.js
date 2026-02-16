/**
 * NURSEDEMIC - Main JavaScript File
 * Handles dynamic functionality for all pages
 */

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Display an alert message to the user
 */
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.insertBefore(alertDiv, document.body.firstChild);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => alertDiv.remove(), 5000);
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 */
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================

/**
 * Search materials across all sections
 */
function searchMaterials() {
    const searchQuery = document.getElementById('searchInput')?.value.toLowerCase();
    
    if (!searchQuery) {
        showAlert('Please enter a search term', 'warning');
        return;
    }
    
    // Simulate search - In production, this would call a backend API
    console.log('Searching for:', searchQuery);
    showAlert(`Searching for: "${searchQuery}"`, 'info');
    
    // Filter material cards if on study material page
    const cards = document.querySelectorAll('.material-card');
    cards.forEach(card => {
        const title = card.querySelector('.card-title')?.textContent.toLowerCase();
        if (title && title.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Search library resources
 */
function searchLibrary() {
    const searchQuery = document.getElementById('librarySearch')?.value.toLowerCase();
    const items = document.querySelectorAll('.library-item');
    
    items.forEach(item => {
        const title = item.querySelector('.card-title')?.textContent.toLowerCase();
        const author = item.querySelector('.card-text')?.textContent.toLowerCase();
        
        if ((title && title.includes(searchQuery)) || (author && author.includes(searchQuery))) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// ==========================================
// FILTER FUNCTIONALITY
// ==========================================

/**
 * Filter study materials by type and subject
 */
function filterResources() {
    const resourceFilter = document.getElementById('resourceFilter')?.value || '';
    const subjectFilter = document.getElementById('subjectFilter')?.value || '';
    const searchTerm = document.getElementById('searchMaterial')?.value.toLowerCase() || '';
    
    const cards = document.querySelectorAll('.material-card');
    
    cards.forEach(card => {
        const cardType = card.dataset.type;
        const cardSubject = card.dataset.subject;
        const cardTitle = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
        
        let show = true;
        
        if (resourceFilter && cardType !== resourceFilter) show = false;
        if (subjectFilter && cardSubject !== subjectFilter) show = false;
        if (searchTerm && !cardTitle.includes(searchTerm)) show = false;
        
        card.style.display = show ? 'block' : 'none';
    });
}

/**
 * Filter library resources
 */
function filterLibrary() {
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const resourceFilter = document.getElementById('resourceFilter')?.value || '';
    
    const items = document.querySelectorAll('.library-item');
    
    items.forEach(item => {
        const itemCategory = item.dataset.category;
        const itemType = item.dataset.type;
        
        let show = true;
        
        if (categoryFilter && itemCategory !== categoryFilter) show = false;
        if (resourceFilter && itemType !== resourceFilter) show = false;
        
        item.style.display = show ? 'block' : 'none';
    });
}

// ==========================================
// MATERIAL PREVIEW & DOWNLOAD
// ==========================================

/**
 * Preview material content
 */
function previewMaterial() {
    showAlert('Preview feature - Material will open in a new window', 'info');
    // In production, this would open a PDF viewer or media player
}

/**
 * Preview library resource
 */
function previewResource() {
    showAlert('Preview feature - Resource will open in a new window', 'info');
}

/**
 * Play video
 */
function playVideo(videoId) {
    showAlert(`Playing video: ${videoId}`, 'info');
    // In production, this would open a video player modal
}

// ==========================================
// AI CHATBOT FUNCTIONALITY
// ==========================================

/**
 * Open chatbot interface
 */
function openChatbot() {
    const chatModal = new bootstrap.Modal(document.getElementById('chatbotModal') || createChatbotModal());
    chatModal.show();
}

/**
 * Create chatbot modal if it doesn't exist
 */
function createChatbotModal() {
    const modal = document.createElement('div');
    modal.id = 'chatbotModal';
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-robot"></i> Nursedemic AI Assistant
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" style="height: 400px; overflow-y: auto;">
                    <div id="chatModalContent"></div>
                </div>
                <div class="modal-footer">
                    <input type="text" class="form-control me-2" id="chatModalInput" placeholder="Ask a question...">
                    <button class="btn btn-primary" onclick="sendChatMessage()">Send</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

/**
 * Send message to chatbot
 */
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input?.value.trim();
    
    if (!message) {
        showAlert('Please enter a message', 'warning');
        return;
    }
    
    // Add user message to chat
    addChatMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        addChatMessage(response, 'bot');
    }, 500);
}

/**
 * Handle Enter key in chat input
 */
function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

/**
 * Add message to chat container
 */
function addChatMessage(text, sender) {
    const container = document.getElementById('chatContainer');
    if (!container) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender === 'bot' ? 'bot-message' : 'user-message'}`;
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    if (sender === 'bot') {
        content.innerHTML = `<strong>AI Assistant:</strong> ${text}`;
        content.classList.add('bg-light');
    } else {
        content.textContent = text;
        content.classList.add('bg-primary', 'text-white');
    }
    
    messageDiv.appendChild(content);
    container.appendChild(messageDiv);
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

/**
 * Ask predefined question
 */
function askQuestion(question) {
    const input = document.getElementById('chatInput');
    if (input) {
        input.value = question;
        sendMessage();
    }
}

/**
 * Generate AI response (simulated)
 */
function generateAIResponse(question) {
    const responses = {
        'study': 'Here are my top study tips:\n1. Create a study schedule\n2. Use active recall\n3. Take short breaks\n4. Review regularly\n5. Join study groups',
        'nclex': 'To prepare for NCLEX:\n- Take practice exams\n- Focus on weak areas\n- Review pharmacology\n- Study nursing process\n- Get at least 6-8 hours sleep',
        'job': 'Current opportunities:\n- Staff Nurse (ICU): $55-70K\n- Pediatric Nurse: $48-65K\n- Community Health: $45-60K\nCheck our Career Guidance page for more!',
        'cardiovascular': 'The cardiovascular system includes:\n- Heart: pumps blood\n- Arteries: carry blood away\n- Veins: return blood to heart\n- Capillaries: exchange nutrients\nWould you like more specific information?',
        'default': 'Great question! I\'d be happy to help. Could you provide more details? You can also:\n- Browse Study Materials\n- Check Career Guidance\n- Visit e-Library\n- Explore specific topics'
    };
    
    const lowerQuestion = question.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
        if (lowerQuestion.includes(key)) {
            return response;
        }
    }
    
    return responses.default;
}

/**
 * Send chat message from modal
 */
function sendChatMessage() {
    const input = document.getElementById('chatModalInput');
    if (input) {
        const message = input.value.trim();
        if (message) {
            input.value = '';
            showAlert('Message sent: ' + message, 'success');
        }
    }
}

// ==========================================
// JOB & CAREER FUNCTIONS
// ==========================================

/**
 * Apply for a job
 */
function applyJob() {
    showAlert('Thank you for your interest! You will be redirected to the application form.', 'success');
    // In production, redirect to job application form
}

/**
 * View job details
 */
function viewJobDetails() {
    showAlert('Loading job details...', 'info');
    // In production, open job details modal
}

// ==========================================
// FORM HANDLING
// ==========================================

/**
 * Handle contact form submission
 */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName')?.value;
            const email = document.getElementById('contactEmail')?.value;
            const message = document.getElementById('contactMessage')?.value;
            
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address', 'danger');
                return;
            }
            
            if (message.length < 10) {
                showAlert('Message must be at least 10 characters long', 'danger');
                return;
            }
            
            // Simulate form submission
            showAlert('Thank you for your message! We will respond within 24 hours.', 'success');
            contactForm.reset();
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                showAlert('Successfully subscribed to our newsletter!', 'success');
                newsletterForm.reset();
            } else {
                showAlert('Please enter a valid email address', 'danger');
            }
        });
    }
    
    // Career Newsletter Form
    const careerNewsletterForm = document.getElementById('careerNewsletterForm');
    if (careerNewsletterForm) {
        careerNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                showAlert('Successfully subscribed to career updates!', 'success');
                careerNewsletterForm.reset();
            } else {
                showAlert('Please enter a valid email address', 'danger');
            }
        });
    }
    
    // Login Form
    const loginForm = document.getElementById('loginFormElement');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail')?.value;
            const password = document.getElementById('loginPassword')?.value;
            
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address', 'danger');
                return;
            }
            
            if (!password || password.length < 6) {
                showAlert('Password must be at least 6 characters', 'danger');
                return;
            }
            
            showAlert('Login successful! Redirecting...', 'success');
            // In production, submit to backend
        });
    }
    
    // Signup Form
    const signupForm = document.getElementById('signupFormElement');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName')?.value;
            const email = document.getElementById('signupEmail')?.value;
            const role = document.getElementById('signupRole')?.value;
            const password = document.getElementById('signupPassword')?.value;
            const confirmPassword = document.getElementById('signupConfirmPassword')?.value;
            
            if (!name || name.length < 3) {
                showAlert('Please enter a valid name', 'danger');
                return;
            }
            
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address', 'danger');
                return;
            }
            
            if (!validatePassword(password)) {
                showAlert('Password must be at least 8 characters with uppercase, lowercase, and numbers', 'danger');
                return;
            }
            
            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'danger');
                return;
            }
            
            if (!role) {
                showAlert('Please select your role', 'danger');
                return;
            }
            
            showAlert('Account created successfully! You can now login.', 'success');
            signupForm.reset();
            
            // Switch to login tab
            document.getElementById('login-tab').click();
        });
    }
});

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
// LOCAL STORAGE FUNCTIONS
// ==========================================

/**
 * Save bookmark
 */
function saveBookmark(materialId) {
    let bookmarks = JSON.parse(localStorage.getItem('nursedemic_bookmarks')) || [];
    
    if (!bookmarks.includes(materialId)) {
        bookmarks.push(materialId);
        localStorage.setItem('nursedemic_bookmarks', JSON.stringify(bookmarks));
        showAlert('Added to bookmarks!', 'success');
    } else {
        showAlert('Already in bookmarks', 'info');
    }
}

/**
 * Get bookmarks
 */
function getBookmarks() {
    return JSON.parse(localStorage.getItem('nursedemic_bookmarks')) || [];
}

/**
 * Remove bookmark
 */
function removeBookmark(materialId) {
    let bookmarks = JSON.parse(localStorage.getItem('nursedemic_bookmarks')) || [];
    bookmarks = bookmarks.filter(id => id !== materialId);
    localStorage.setItem('nursedemic_bookmarks', JSON.stringify(bookmarks));
    showAlert('Removed from bookmarks', 'success');
}

// ==========================================
// DARK MODE TOGGLE (Optional Feature)
// ==========================================

/**
 * Toggle dark mode
 */
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
window.addEventListener('load', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// ==========================================
// RESPONSIVE MENU
// ==========================================

/**
 * Toggle mobile menu
 */
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarToggle.classList.contains('collapsed') === false) {
                navbarToggle.click();
            }
        });
    });
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

/**
 * Lazy load images
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==========================================
// ANALYTICS (Optional)
// ==========================================

/**
 * Track page views
 */
function trackPageView(pageName) {
    console.log('Page view tracked:', pageName);
    // In production, send to analytics service
}

// Track page view on load
window.addEventListener('load', function() {
    trackPageView(document.title);
});

console.log('Nursedemic JavaScript loaded successfully!');
