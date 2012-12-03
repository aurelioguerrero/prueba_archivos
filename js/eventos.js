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
	alert('Función guardarFoto');
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, intentarGuardado, errorArchivo);
}

function intentarGuardado(fileSystem)
{
	var nombre = document.getElementById('imagen').src;
	alert('Ruta temporal '+nombre);
	fileSystem.root.getFile(nombre, {create: true, exclusive: false}, obtenerArchivo, errorArchivo);
}

function obtnerArchivo(fileEntry)
{
	var nombre = document.getElementById('nombrearchivo').value;
	alert('nombre archivo'+nombre);
	parentEntry = new DirectoryEntry('Album Fotos/fotos/', 'fotos/');
    fileEntry.moveTo(parentEntry, nombre+'.jpg', archivoGuardado, errorArchivo);
}

function archivoGuardado(entry)
{
	alert("Se ha guardado el archivo en la ruta: "+entry.fullPath);
}