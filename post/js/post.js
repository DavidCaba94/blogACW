
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

    // Cerrar dropdown login si pincho fuera
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn') && !event.target.matches('.img-login') && !event.target.matches('.text-sesion')
          && !event.target.matches('.form-control') && !event.target.matches('.boton-login') && !event.target.matches('.boton-registro')
          && !event.target.matches('.dropdown-content')) {
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
