// JavaScript Document
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
	
	var nombre = document.getElementById('divnombre');
	nombre.className = 'visible';
	
	var boton = document.getElementById('btnguardar');
	boton.className = 'Visible';
}

function errorFoto(error)
{
	alert('Error al generar foto: '+error);	
}

function errorArchivo(error)
{
	alert('Error al guardar archivo: '+error);
}

function guardarFoto()
{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, intentarGuardado, errorArchivo);
}

function intentarGuardado(fileSystem)
{
	var nombre = document.getElementById('nombrearchivo').value;
	fileSystem.root.getFile("album de prueba/"+nombre+'.jpg', {create: true, exclusive: false}, guardarFotoExito, errorArchivo);
}

function guardarFotoExito(fileEntry)
{
	alert('Se guardo con éxito en la ruta: '+fileEntry.fullPath);
}