<?php
require 'Users.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $email = $_GET['email'];
    $pass = $_GET['password'];
    $users = Users::getAll($email,md5($pass));
    if ($users) {
        $datos["estado"] = "1";
        $datos["users"] = $users;
        print json_encode($datos);
    } else {
        print json_encode(array(
            "estado" => 2,
            "mensaje" => "KO"
        ));
    }
}
