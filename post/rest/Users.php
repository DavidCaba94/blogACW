<?php
require 'Database.php';
class Users
{
    function __construct()
    {
    }
    public static function getAll($email,$pass)
    {
        //$consulta = "SELECT id_customer, firstname, lastname, email, passwd FROM psac_customer WHERE email = '$email' AND passwd = '$pass'";
        $consulta = "SELECT id_customer, firstname, lastname, email, passwd FROM psac_customer WHERE email = '$email'";
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

    public static function insert(
        $username,
		    $password,
        $name,
    		$surname,
    		$email,
        $foto,
        $conectado,
        $referido,
        $premium
    )
    {
        $comando = "INSERT INTO user ( " .
            "username," .
      			"password," .
      			"name," .
      			"surname," .
            "email," .
            "foto," .
            "conectado," .
            "referido," .
            " premium)" .
            " VALUES( ?,?,?,?,?,?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(
            array(
              $username,
              $password,
              $name,
              $surname,
              $email,
              $foto,
              $conectado,
              $referido,
              $premium
            )
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
