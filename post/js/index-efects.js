var arrayPosts = [];
var arrayPostsBuscados = [];
var pagina = 1;
var nPostPorPag = 5;
var resultadosEncontrados = 0;

$(document).ready(function(){

    var usuario = localStorage.getItem('userObject');
    if(JSON.parse(usuario) != null) {
        usuario = JSON.parse(usuario);
        $(".text-sesion").text(usuario.nombre);
        $(".info-error").text("Sesión iniciada");
        $(".info-error").css("color", "#00e05f");
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'post/json/posts.json', true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let posts = JSON.parse(this.responseText);

            for(let item of posts) {
                arrayPosts.push(item);
            }
        }
    }

    $("#anterior").on("click", function() {
        var texto = $("#txt-buscar").val();
        if(texto == "") {
            if(pagina > 1) {
                pagina--;
                paginarPosts();
            }
        } else {
            if(pagina > 1) {
                pagina--;
                paginarPostsBuscados();
            }
        }
    });

    $("#siguiente").on("click", function() {
        var texto = $("#txt-buscar").val();
        if(texto == "") {
            if(pagina < arrayPosts.length/nPostPorPag) {
                pagina++;
                paginarPosts();
            }
        } else {
            if(pagina < arrayPostsBuscados.length/nPostPorPag) {
                pagina++;
                paginarPostsBuscados();
            }
        }

    });

    $("#btn-buscar").on("click", function() {
        var texto = $("#txt-buscar").val();
        if(texto == "") {
            paginarPosts();
        } else {
            buscarPost(texto);
        }
    });

    $("#num-posts").change(function(){
        var texto = $("#txt-buscar").val();
        var numSelected = $(this).children("option:selected").val();
        if(texto == "") {
            cambiarPostsPag(numSelected);
        } else {
            cambiarPostsBuscadosPag(numSelected);
        }
    });

    setTimeout(function() {
        arrayPosts = arrayPosts.reverse();
        $("#loading").css("display", "none");
		paginarPosts();
	}, 1500);

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
        $("#email").val("");
        $("#password").val("");
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

function paginarPosts() {
    $("#contenedor-posts").html('');
    for(var i = (pagina-1)*nPostPorPag; i < pagina*nPostPorPag; i++){
        if(arrayPosts[i] != undefined){
            $("#contenedor-posts").append(
                '<div class="box-post">'+
                    '<img class="img-post" src="'+ arrayPosts[i].imagen +'" />'+
                    '<p class="titulo-post">'+ arrayPosts[i].titulo +'</p>'+
                    '<p class="descripcion-post">'+ arrayPosts[i].descripcion +'</p>'+
                    '<a href="'+ arrayPosts[i].url +'"><div class="boton-post">Ir al post</div></a>'+
                '</div>'
            );
        }
    }
    addNumerosPag();
}

function paginarPostsBuscados() {
    $("#contenedor-posts").html('');
    for(var i = (pagina-1)*nPostPorPag; i < pagina*nPostPorPag; i++){
        if(arrayPostsBuscados[i] != undefined){
            $("#contenedor-posts").append(
                '<div class="box-post">'+
                    '<img class="img-post" src="'+ arrayPostsBuscados[i].imagen +'" />'+
                    '<p class="titulo-post">'+ arrayPostsBuscados[i].titulo +'</p>'+
                    '<p class="descripcion-post">'+ arrayPostsBuscados[i].descripcion +'</p>'+
                    '<a href="'+ arrayPostsBuscados[i].url +'"><div class="boton-post">Ir al post</div></a>'+
                '</div>'
            );
        }
    }
    addNumerosPagBusqueda(resultadosEncontrados);
}

function addNumerosPag() {
    $("#numerosPag").html('');
    for(var i = 0; i < arrayPosts.length/nPostPorPag; i++) {
        if(i == pagina-1) {
            $("#numerosPag").append(
                '<div class="numPag-seleccionado">'+ (i+1) +'</div>'
            );
        } else {
            $("#numerosPag").append(
                '<div class="numPag" onclick="cambiarPagina('+(i+1)+')">'+ (i+1) +'</div>'
            );
        }
    }
}

function addNumerosPagBusqueda(encontrados) {
    $("#numerosPag").html('');
    for(var i = 0; i < encontrados/nPostPorPag; i++) {
        if(i == pagina-1) {
            $("#numerosPag").append(
                '<div class="numPag-seleccionado">'+ (i+1) +'</div>'
            );
        } else {
            $("#numerosPag").append(
                '<div class="numPag" onclick="cambiarPagina('+(i+1)+')">'+ (i+1) +'</div>'
            );
        }
    }
}

function cambiarPagina(num) {
    pagina = num;
    paginarPosts();
}

function cambiarPostsPag(num) {
    pagina = 1;
    nPostPorPag = num;
    paginarPosts();
}

function cambiarPostsBuscadosPag(num) {
    pagina = 1;
    nPostPorPag = num;
    paginarPostsBuscados();
}

function buscarPost(texto) {
    resultadosEncontrados = 0;
    pagina = 1;
    arrayPostsBuscados = [];
    for(var i = 0; i < arrayPosts.length; i++){
        if(arrayPosts[i] != undefined && arrayPosts[i].titulo.toLowerCase().includes(texto.toLowerCase())){
            arrayPostsBuscados.push(arrayPosts[i]);
            resultadosEncontrados++;
        }
    }

    if(resultadosEncontrados == 0) {
        $("#contenedor-posts").html('');
        $("#contenedor-posts").append(
            '<div class="box-sin-resultados">'+
                '<p class="sin-resultados">No se han encontrado resultados para <strong>'+ texto +'</strong></p>'+
            '</div>'
        );
    } else {
        paginarPostsBuscados();
    }
}

function obtenerUsuario() {
    $.ajax({
      url: 'post/rest/obtener_usuarios.php',
      dataType: 'json',
      data: ({email: $("#email").val(), password: $("#password").val()}),
      success: function(data) {
          if(data.mensaje != "KO"){
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
              setTimeout(function() {
                  $(".aviso-login").fadeOut();
          	  }, 5000);
          } else {
              $(".info-error").text("Email o contraseña incorrectos");
              $(".info-error").css("color", "#ff0000");
          }
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
