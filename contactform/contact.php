<?php
 
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

 
// create email headers
@mail($email, $subject, $message, $subject);  
?>