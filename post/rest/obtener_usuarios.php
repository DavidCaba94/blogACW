<?php
require 'Users.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    //$cookie = 'kLHoHW9QVKgTYX7IJsaa67pcx80IjDzRwBGQu3V6Eb0A2j79FZzNEgnw';
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
            "mensaje" => "Ha ocurrido un error"
        ));
    }
}
