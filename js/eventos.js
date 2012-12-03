// JavaScript Document
var rutaRaiz = null;
var archivoEntry = null;
var directorioEntry = null;
var directorioRoot = null;

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

function archivoGuardado(entry)
{
	alert("Se ha guardado el archivo en la ruta: "+entry.name);
}

function obtenerNuevoDir(directoryEntry)
{
	try
	{		
		directorioEntry = directoryEntry;
		alert('Se crea el directorio!'+directorioEntry.name);
		var nombre = document.getElementById('nombrearchivo').value;
		alert('Nombre Archivo: '+nombre);
		archivoEntry.moveTo(directorioEntry, nombre+'.jpg', archivoGuardado, errorArchivo);
	}
	catch(err)
	{
		alert("error: "+err);
	}
}

function obtenerArchivo(fileEntry)
{	
	try
	{
		archivoEntry = fileEntry;
		alert('Se obtiene el archivo!'+archivoEntry.name);
		directorioRoot.root.getDirectory('Album Fotos',{create: true, exclusive: false}, obtenerNuevoDir, errorArchivo);
	}
	catch(err)
	{
		alert("error: "+err);
	}
}

function intentarGuardado(fileSystem)
{
	try
	{
		directorioRoot = fileSystem;
		var rutaArchivo = document.getElementById('imagen').src;			
		alert('Ruta temporal: '+rutaArchivo);		
		
		rutaRaiz = directorioRoot.root.fullPath;
		alert('Ruta root: '+rutaRaiz);
		alert('Ruta archivo: '+rutaArchivo.substring(rutaRaiz.length+1));
		
		directorioRoot.root.getFile(rutaArchivo.substring(rutaRaiz.length+1), {create: false, exclusive: false}, obtenerArchivo, errorArchivo);		
	}
	catch(err)
	{
		alert("error: "+err);
	}	
}

function guardarFoto()
{
	alert('Función guardarFoto');
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, intentarGuardado, errorArchivo);
}