// JavaScript Document
var rutaRaiz = null;
var archivoEntry = null;
var directorioEntry = null;
var directorioRoot = null;

function errorArchivo(error)
{
	alert('Error al guardar archivo: '+error.code);
}

function archivoGuardado(entry)
{
	alert("Se ha guardado el archivo en la ruta: "+entry.fullPath);
}

function obtenerNuevoDir(directoryEntry)
{
	try
	{		
		directorioEntry = directoryEntry;
		var nombre = document.getElementById('nombrearchivo').value;
		archivoEntry.moveTo(directorioEntry, nombre+'.jpg', archivoGuardado, errorArchivo);
	}
	catch(err)
	{
		alert("error al obtener el nuevo directorio: "+err);
	}
}

function obtenerArchivo(fileEntry)
{	
	try
	{
		archivoEntry = fileEntry;
		directorioRoot.root.getDirectory('Album Fotos',{create: true, exclusive: false}, obtenerNuevoDir, errorArchivo);
	}
	catch(err)
	{
		alert("error al obtener el nuevo archivo: "+err);
	}
}

function intentarGuardado(fileSystem)
{
	try
	{
		directorioRoot = fileSystem;		
		rutaRaiz = directorioRoot.root.fullPath;
				
		var rutaArchivo = document.getElementById('imagen').src;		
		directorioRoot.root.getFile(rutaArchivo.substring(rutaRaiz.length+1), {create: false, exclusive: false}, obtenerArchivo, errorArchivo);		
	}
	catch(err)
	{
		alert("Error al recibir el directorio raiz: "+err);
	}	
}

function guardarFoto()
{
	try
	{	
		var nombre = document.getElementById('nombrearchivo').value;
		if(!nombre)
		{
			alert('Por favor ingrese el nombre del archvio');
		}
		else
		{
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, intentarGuardado, errorArchivo);
		}
	}catch(err)
	{
		alert('Error al obtener el directorio raiz: '+err);
	}
}