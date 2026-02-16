<?php
/**
 * NURSEDEMIC - Contact Form Handler
 * Processes contact form submissions
 */

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Get and sanitize input
    $name = sanitizeInput($_POST['name'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $phone = sanitizeInput($_POST['phone'] ?? '');
    $subject = sanitizeInput($_POST['subject'] ?? '');
    $message = sanitizeInput($_POST['message'] ?? '');
    
    // Validation
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        apiResponse(false, 'All required fields must be filled');
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        apiResponse(false, 'Invalid email format');
    }
    
    // Validate message length
    if (strlen($message) < 10) {
        apiResponse(false, 'Message must be at least 10 characters long');
    }
    
    // Insert contact message into database
    $query = "INSERT INTO contact_messages (name, email, phone, subject, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($query);
    
    if (!$stmt) {
        apiResponse(false, 'Database error: ' . $conn->error);
    }
    
    $stmt->bind_param("sssss", $name, $email, $phone, $subject, $message);
    
    if ($stmt->execute()) {
        
        // Send email notification to admin
        $adminEmail = 'info@nursedemic.com';
        $emailSubject = 'New Contact Form Submission - ' . $subject;
        $emailBody = "
            <html>
            <body>
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Phone:</strong> $phone</p>
                <p><strong>Subject:</strong> $subject</p>
                <p><strong>Message:</strong></p>
                <p>" . nl2br($message) . "</p>
                <p><strong>Date:</strong> " . date('Y-m-d H:i:s') . "</p>
            </body>
            </html>
        ";
        
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8\r\n";
        $headers .= "From: noreply@nursedemic.com\r\n";
        
        // Send email
        @mail($adminEmail, $emailSubject, $emailBody, $headers);
        
        // Send confirmation email to user
        $userEmailSubject = "We received your message - Nursedemic";
        $userEmailBody = "
            <html>
            <body>
                <h2>Thank you for contacting us!</h2>
                <p>Dear $name,</p>
                <p>We have received your message and will respond within 24 hours.</p>
                <p><strong>Your Message Details:</strong></p>
                <p><strong>Subject:</strong> $subject</p>
                <p><strong>Received at:</strong> " . date('Y-m-d H:i:s') . "</p>
                <p>Best regards,<br>Nursedemic Team</p>
            </body>
            </html>
        ";
        
        @mail($email, $userEmailSubject, $userEmailBody, $headers);
        
        apiResponse(true, 'Thank you for your message! We will respond within 24 hours.');
    } else {
        apiResponse(false, 'Error submitting form: ' . $stmt->error);
    }
    
    $stmt->close();
    
} else {
    apiResponse(false, 'Invalid request method');
}

$conn->close();
?>
