// JavaScript Document
/*var pictureSource; 
var destinationType; 
   
document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() 
{
	pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
	alert('Dispositivo listo');
}
*/
function capturarFoto() 
{
	navigator.camera.getPicture(mostrarFoto, errorFoto, { quality: 50,
    													  destinationType: navigator.camera.DestinationType.FILE_URI,
														  sourceType: navigator.camera.DestinationType.CAMERA });
}

function mostrarFoto(ubicacion)
{
	var imagen = document.getElementById('imagen');
	imagen.className = 'visible';
	imagen.src = ubicacion;
}

function errorFoto(error)
{
	alert('Error al generar foto: '+error);	
}