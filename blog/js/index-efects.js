var arrayPosts = [];
var pagina = 1;

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
		paginarPosts();
        addNumerosPag();
	}, 1000);
});

function paginarPosts() {
    for(var i = (pagina-1)*5; i < pagina*5; i++){
        if(arrayPosts[i] != undefined){
            console.log(arrayPosts[i]);
        }
    }
    addNumerosPag();
}

function addNumerosPag() {
    $("#numerosPag").html('');
    for(var i = 0; i < arrayPosts.length/5; i++) {
        if(i == pagina-1) {
            $("#numerosPag").append(
                '<div class="numPag-seleccionado">'+ (i+1) +'</div>'
            );
        } else {
            $("#numerosPag").append(
                '<div class="numPag">'+ (i+1) +'</div>'
            );
        }
    }
}
