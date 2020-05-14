<?php
require 'Users.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_post = $_POST['id_post'];
    $id_usuario = $_POST['id_usuario'];
    $comentario = $_POST['comentario'];
    $body = json_decode(file_get_contents("php://input"), true);
    $retorno = Users::insertComment($id_post, $id_usuario, $comentario);
    if ($retorno) {
        $json_string = json_encode(array("estado" => 1,"mensaje" => "Creacion correcta"));
		echo $json_string;
    } else {
        $json_string = json_encode(array("estado" => 2,"mensaje" => "No se creo el registro"));
		echo $json_string;
    }
}
?>
