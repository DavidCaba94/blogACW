var usuario = "null";
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

    usuario = localStorage.getItem('userObject');
    if(JSON.parse(usuario) != null) {
        usuario = JSON.parse(usuario);
        $(".text-sesion").text(usuario.nombre);
        $(".info-error").text("Sesión iniciada");
        $(".info-error").css("color", "#00e05f");
    }

    obtenerComentarios();

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
        localStorage.setItem('userObject', null);
        usuario = "null";
        $("#email").val("");
        $("#password").val("");
        $(".text-sesion").text("Iniciar sesión");
        $(".info-error").text("Entra o regístrate");
        $(".info-error").css("color", "#a0a0a0");
        $(".aviso-logout").fadeIn();
        $(".box-info-comentarios").css("display", "block");
        $(".box-form-comentarios").css("display", "none");
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

    $("#boton-comentar").on("click", function() {
        if(usuario != "null") {
            $(".box-info-comentarios").css("display", "none");
            $(".box-form-comentarios").css("display", "block");
        } else if(usuario == "null") {
            $(".txt-info-comentarios").text("Debes iniciar sesión para poder comentar");
            $(".txt-info-comentarios").css("color", "#e26060");
        }
    });

    $("#boton-enviar").on("click", function() {
        var comment = $("#comentario").val();
        if(comment.length > 0){
            enviarComentario(comment);
        } else {
            $("#comentario").css("border", "1px solid #e26060")
        }
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
          localStorage.setItem('userObject', JSON.stringify(data.users[0]));
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
          usuario = localStorage.getItem('userObject');
          usuario = JSON.parse(usuario);
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

function enviarComentario(comment) {
    $(".box-form-comentarios").css("display","none");
    $(".box-cargando").css("display","block");
    $.ajax({
          type: 'POST',
          url: '/post/rest/insertar_comentario.php',
          dataType: 'json',
          data: ({id_post: parseInt($("#id_post").val(), 10), id_usuario: parseInt(usuario.id, 10), comentario: comment}),
          success: function(data) {
              $(".box-cargando").css("display","none");
              $(".txt-info-comentarios").text("Comentario enviado correctamente");
              $(".txt-info-comentarios").css("color", "#00e05f");
              $(".box-info-comentarios").css("display","block");
              $("#comentario").val("");
              obtenerComentarios();
          },
          error: function(error) {
              $(".txt-info-comentarios").text("Error al enviar el comentario");
              $(".txt-info-comentarios").css("color", "#e26060");
              $(".box-info-comentarios").css("display","block");
              $("#comentario").val("");
          }
    });
}

function obtenerComentarios() {
    $.ajax({
      url: '/post/rest/obtener_comentarios.php',
      dataType: 'json',
      data: ({id_post: parseInt($("#id_post").val(), 10)}),
      success: function(data) {
          $(".lista-comentarios").html('');
          if(data.mensaje != "KO"){
              var comentarios = [];
              comentarios = data.comments;
              for(var i=0; i<comentarios.length; i++) {
                  $(".lista-comentarios").append(
                      '<div class="box-comentario">'+
                          '<p class="nombre-comentario">'+ comentarios[i].id_usuario +'</p>'+
                          '<p class="texto-comentario">'+ comentarios[i].comentario +'</p>'+
                      '</div>'
                  );
              }
          } else {
              $(".lista-comentarios").append(
                  '<div class="sin-comentarios">'+
                      '<p class="txt-sin-comentarios">Todavía no hay comentarios, puedes ser el primero en comentar</p>'+
                  '</div>'
              );
          }
      },
      error: function(error) {
          console.log(error);
      }
    });
}
