<?php
/**
 * NURSEDEMIC - User Login
 * Handles user authentication
 */

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Get and sanitize input
    $email = sanitizeInput($_POST['email'] ?? '');
    $password = sanitizeInput($_POST['password'] ?? '');
    
    // Validation
    if (empty($email) || empty($password)) {
        apiResponse(false, 'Email and password are required');
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        apiResponse(false, 'Invalid email format');
    }
    
    // Query user
    $query = "SELECT id, name, email, password, role FROM users WHERE email = ?";
    $stmt = $conn->prepare($query);
    
    if (!$stmt) {
        apiResponse(false, 'Database error: ' . $conn->error);
    }
    
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        apiResponse(false, 'Invalid email or password');
    }
    
    $user = $result->fetch_assoc();
    
    // Verify password
    if (!verifyPassword($password, $user['password'])) {
        apiResponse(false, 'Invalid email or password');
    }
    
    // Set session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['name'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_role'] = $user['role'];
    $_SESSION['logged_in'] = true;
    
    // Update last login
    $updateQuery = "UPDATE users SET last_login = NOW() WHERE id = ?";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->bind_param("i", $user['id']);
    $updateStmt->execute();
    $updateStmt->close();
    
    apiResponse(true, 'Login successful', array(
        'user_id' => $user['id'],
        'name' => $user['name'],
        'role' => $user['role']
    ));
    
    $stmt->close();
    
} else {
    apiResponse(false, 'Invalid request method');
}

$conn->close();
?>
