$(document).ready(function(){
	$('.hamburger-menu').on('click', function() {
	    $('.bar').toggleClass('animate');
	});

	$('#btn-menu').on('click', function() {
	    $('#menu-movil-desplegable').slideToggle();
	});

});

/*ANIMACIÓN FLECHA SLIDE*/
document.addEventListener('DOMContentLoaded', function() {
	setTimeout(function() {
		$('#titulo').addClass('slideDown');
	}, 1000);
	setTimeout(function() {
		$('#subtitulo').addClass('slideDown');
	}, 1500);
	setTimeout(function() {
		$('#boton-cabecera').addClass('slideDown');
	}, 2000);
	setTimeout(function() {
		document.getElementById('flecha-slide').className = 'slideDown';
	}, 3000);
}, false);
/*FIN ANIMACIÓN FLECHA SLIDE*/
