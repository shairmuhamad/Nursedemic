<?php
/**
 * NURSEDEMIC - User Registration
 * Handles new user account creation
 */

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Get and sanitize input
    $name = sanitizeInput($_POST['name'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $role = sanitizeInput($_POST['role'] ?? '');
    $password = sanitizeInput($_POST['password'] ?? '');
    $confirm_password = sanitizeInput($_POST['confirm_password'] ?? '');
    
    // Validation
    if (empty($name) || empty($email) || empty($password) || empty($role)) {
        apiResponse(false, 'All fields are required');
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        apiResponse(false, 'Invalid email format');
    }
    
    // Check password strength
    if (strlen($password) < 8) {
        apiResponse(false, 'Password must be at least 8 characters');
    }
    
    if ($password !== $confirm_password) {
        apiResponse(false, 'Passwords do not match');
    }
    
    // Check if email already exists
    $checkQuery = "SELECT id FROM users WHERE email = ?";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows > 0) {
        apiResponse(false, 'Email already registered');
    }
    $checkStmt->close();
    
    // Hash password
    $hashedPassword = hashPassword($password);
    
    // Insert new user
    $insertQuery = "INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())";
    $insertStmt = $conn->prepare($insertQuery);
    
    if (!$insertStmt) {
        apiResponse(false, 'Database error: ' . $conn->error);
    }
    
    $insertStmt->bind_param("ssss", $name, $email, $hashedPassword, $role);
    
    if ($insertStmt->execute()) {
        $user_id = $insertStmt->insert_id;
        apiResponse(true, 'Account created successfully', array('user_id' => $user_id, 'email' => $email));
    } else {
        apiResponse(false, 'Error creating account: ' . $insertStmt->error);
    }
    
    $insertStmt->close();
    
} else {
    apiResponse(false, 'Invalid request method');
}

$conn->close();
?>
