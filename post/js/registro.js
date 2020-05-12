$(document).ready(function(){

    $("#boton-registro").on("click", function() {
        if(todoRelleno()){
            if(passIguales()) {
                registrarUsuario();
            } else {
                $(".pass-diferentes").css("color", "#ff0000");
            }
        } else {
            $(".campos-obligatorios").css("color", "#ff0000");
        }
    });

});

function todoRelleno() {
    var relleno = false;

    var nombre = $("#nombre").val();
    var apellidos = $("#apellidos").val();
    var email = $("#email").val();
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();

    if(nombre.length > 0 && apellidos.length > 0 && email.length > 0 && password1.length > 0 && password2.length > 0) {
        relleno = true;
    }

    return relleno;
}

function passIguales() {
    var iguales = false;

    var password1 = $("#password1").val();
    var password2 = $("#password2").val();

    if(password1 == password2) {
        iguales = true;
    }

    return iguales;
}

function registrarUsuario() {
    var nombre = $("#nombre").val();
    var apellidos = $("#apellidos").val();
    var email = $("#email").val();
    var password1 = $("#password1").val();

    $(".formulario").css("display","none");
    $(".box-cargando").css("display","block");

    $.ajax({
          type: 'POST',
          url: '/post/rest/insertar_usuario.php',
          dataType: 'json',
          data: ({email: email, nombre: nombre, apellidos: apellidos, password: password1}),
          success: function(data) {
              $(".box-cargando").css("display","none");
              $(".usuario-registrado").css("display","block");
          },
          error: function(error) {
              $(".box-cargando").css("display","none");
              (".registro-fallido").css("display","block");
          }
    });
}
