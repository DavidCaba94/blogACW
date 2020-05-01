var arrayPosts = [];
var arrayPostsBuscados = [];
var pagina = 1;
var nPostPorPag = 5;
var resultadosEncontrados = 0;

$(document).ready(function(){

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
