var arrayPosts = [];
var pagina = 1;
var nPostPorPag = 5;

$(document).ready(function(){

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'blog/json/posts.json', true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let posts = JSON.parse(this.responseText);

            for(let item of posts) {
                arrayPosts.push(item);
            }
        }
    }

    console.log(arrayPosts);

    $("#anterior").on("click", function() {
        pagina--;
        paginarPosts();
    });

    $("#siguiente").on("click", function() {
        pagina++;
        paginarPosts();
    });

    setTimeout(function() {
        arrayPosts = arrayPosts.reverse();
		paginarPosts();
        addNumerosPag();
	}, 1000);
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

function addNumerosPag() {
    $("#numerosPag").html('');
    for(var i = 0; i < arrayPosts.length/nPostPorPag; i++) {
        if(i == pagina-1) {
            $("#numerosPag").append(
                '<div class="numPag-seleccionado" onclick="cambiarPagina('+(i+1)+')">'+ (i+1) +'</div>'
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
