$(document).ready(function(){

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'blog/json/posts.json', true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let posts = JSON.parse(this.responseText);

            for(let item of posts) {
                console.log(item.id);
                console.log(item.titulo);
                console.log(item.descripcion);
                console.log(item.imagen);
                console.log(item.url);
            }
        }
    }
});
