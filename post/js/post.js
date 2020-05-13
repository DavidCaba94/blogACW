
$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    $("#desplegable-login").on("click", function() {
        $("#myDropdown").addClass("show");
    });

    $("#boton-login").on("click", function() {
        if(camposRellenos()) {
            obtenerUsuario();
        } else {
            $(".info-error").text("Todos los campos son obligatorios");
            $(".info-error").css("color", "#ff0000");
        }
    });

    $("#boton-cerrar").on("click", function() {
        localStorage.setItem("Usuario", null);
        $("#email").text("");
        $("#password").text("");
        $(".text-sesion").text("Iniciar sesión");
        $(".info-error").text("Entra o regístrate");
        $(".info-error").css("color", "#a0a0a0");
        $(".aviso-logout").fadeIn();
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
        setTimeout(function() {
            $(".aviso-logout").fadeOut();
        }, 5000);
    });

    // Cerrar dropdown login si pincho fuera
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn') && !event.target.matches('.img-login') && !event.target.matches('.text-sesion')
          && !event.target.matches('.form-control') && !event.target.matches('.boton-login') && !event.target.matches('.boton-registro')
          && !event.target.matches('.dropdown-content') && !event.target.matches('.boton-cerrar')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
});

function obtenerUsuario() {
    $.ajax({
      url: '/post/rest/obtener_usuarios.php',
      dataType: 'json',
      data: ({email: $("#email").val(), password: $("#password").val()}),
      success: function(data) {
          $(".text-sesion").text(data.users[0].nombre);
          $(".info-error").text("Sesión iniciada");
          $(".info-error").css("color", "#00e05f");
          $(".aviso-login").fadeIn();
          localStorage.setItem("Usuario", data.users[0]);
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
          setTimeout(function() {
              $(".aviso-login").fadeOut();
          }, 5000);
      },
      error: function(error) {
          console.log(error);
      }
    });
}

function camposRellenos() {
    var email = $("#email").val();
    var pass = $("#password").val();

    var relleno = false;

    if(email.length > 0 && pass.length > 0) {
        relleno = true;
    }

    return relleno;
}
