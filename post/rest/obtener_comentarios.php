<?php
require 'Users.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $id_post = $_GET['id_post'];
    $comments = Users::getComments($id_post);
    if ($comments) {
        $datos["estado"] = "1";
        $datos["comments"] = $comments;
        print json_encode($datos);
    } else {
        print json_encode(array(
            "estado" => 2,
            "mensaje" => "KO"
        ));
    }
}
