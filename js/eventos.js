// JavaScript Document
var rutaRaiz;
var archivoEntry;
var directorioEntry;

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
	alert('Error al guardar archivo: '+error.code);
}

function guardarFoto()
{
	alert('Función guardarFoto');
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, intentarGuardado, errorArchivo);
}

function intentarGuardado(fileSystem)
{
	var rutaArchivo = document.getElementById('imagen').src;
	var nombre = document.getElementById('nombrearchivo').value;	
	alert('Ruta temporal: '+rutaArchivo);
	alert('Nombre Archivo: '+nombre);
	
	rutaRaiz = fileSystem.root.fullPath;
	alert('Ruta root: '+rutaRaiz);
	alert('Ruta archivo: '+rutaArchivo.substring(rutaRaiz.length+1));
	
	fileSystem.root.getFile(rutaArchivo.substring(rutaRaiz.length+1), {create: false, exclusive: false}, obtenerArchivo, errorArchivo);
	fileSystem.root.getDirectory('Album Fotos',{create: true, exclusive: false}, obtenerNuevoDir, errorArchivo);	
}

function obtenerArchivo(fileEntry)
{	
	archivoEntry = fileEntry;
	alert('Se obtiene el archivo!'+archivoEntry.name);
}

function obtenerNuevoDir(directoryEntry)
{
	directorioEntry = directoryEntry;
	alert('Se crea el directorio!'+directorioEntry.name);
	alert('archivo antes de mover: '+archivoEntry.name);
	alert('va hacia: '+directorioEntry.name);
	archivoEntry.moveTo(directorioEntry, nombre+'.jpg', archivoGuardado, errorArchivo);
}

function archivoGuardado(entry)
{
	alert("Se ha guardado el archivo en la ruta: "+entry.name);
}