<?php
require 'Database.php';
class Users
{
    function __construct()
    {
    }
    public static function getAll($email,$pass)
    {
        $consulta = "SELECT id, email, nombre, apellidos, password FROM blog_usuarios WHERE email = '$email' AND password = '$pass'";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getComments($id_post)
    {
        $consulta = "SELECT u.nombre, u.apellidos, c.comentario
                    FROM blog_comentarios c
                    INNER JOIN blog_usuarios u
                    ON u.id = c.id_usuario
                    WHERE c.id_post = '$id_post'
                    ORDER BY c.id ASC";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getEmail($email)
    {
        $consulta = "SELECT email FROM blog_usuarios WHERE email = '$email'";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getAllSolicitudes()
    {
        $consulta = "SELECT * FROM solicitudes_premium";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getUserLogin($email,$pass)
    {
        $consulta = "SELECT id_customer, firstname, lastname, email, passwd FROM psac_customer";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($username));
            $row = $comando->fetch(PDO::FETCH_ASSOC);
            return $row;
        } catch (PDOException $e) {
            return -1;
        }
    }

    public static function update(
        $username,
        $password,
        $name,
        $surname,
		    $email,
        $foto
    )
    {
        $consulta = "UPDATE user" .
            " SET password=?, name=?, surname=?, email=?, foto=? " .
            "WHERE username=?";
        $cmd = Database::getInstance()->getDb()->prepare($consulta);
        $cmd->execute(array($password, $name, $surname, $email, $foto, $username));
        return $cmd;
    }

    public static function insert($email, $nombre, $apellidos, $password) {
        $comando = "INSERT INTO blog_usuarios ( " .
            "email," .
      			"nombre," .
      			"apellidos," .
      			"password)" .
            " VALUES( ?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(
            array($email, $nombre, $apellidos, $password)
        );
    }

    public static function insertComment($id_post, $id_usuario, $comentario) {
        $comando = "INSERT INTO blog_comentarios ( " .
      			"id_post," .
      			"id_usuario," .
      			"comentario)" .
            " VALUES( ?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(
            array($id_post, $id_usuario, $comentario)
        );
    }

    public static function insertSolicitudPremium(
        $username,
    		$email
    )
    {
        $comando = "INSERT INTO solicitudes_premium ( " .
            "username," .
            "email)" .
            " VALUES( ?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(
            array(
              $username,
              $email,
            )
        );
    }

    public static function delete($id)
    {
        $comando = "DELETE FROM user WHERE id=?";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(array($id));
    }
}
?>
