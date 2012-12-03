// JavaScript Document
var nombreCarpeta = 'Album Fotos';
var nombreArchivo = null;
var rutaRaiz = null;
var archivoEntry = null;
var directorioArchivos = null;
var directorioRoot = null;
var exito = true;

function errorArchivo(error)
{
	alert('Error al guardar archivo: '+error.code);
	exito = false;
}

function archivoGuardado(entry)
{
	alert("Se ha guardado el archivo en la ruta: "+entry.fullPath);
	exito = true;
}

/*function obtenerNuevoDir(directoryEntry)
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
		directorioRoot.root.getDirectory(nombreCarpeta,{create: true, exclusive: false}, obtenerNuevoDir, errorArchivo);
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
}*/

function getDirArchivos(directoryEntry)
{
	try
	{		
		directorioArchivos = directoryEntry;
		exito = true;
	}
	catch(err)
	{
		alert("error al obtener el directorio de Archivos: "+err);
		exito = false;
	}
}

function getDirRaiz(fileSystem)
{
	try
	{
		directorioRoot = fileSystem;		
		rutaRaiz = directorioRoot.root.fullPath;
		directorioRoot.root.getDirectory(nombreCarpeta,{create: true, exclusive: false}, getDirArchivos, errorArchivo);
	}
	catch(err)
	{
		alert("Error al obtener el directorio raiz: "+err);
		exito = false;
	}	
}

function iniciarDirectorios()
{
	try
	{		
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getDirRaiz, errorArchivo);		
	}catch(err)
	{
		alert('Error al iniciar directorios: '+err);
		exito = false;
	}
}

function getArchivoGuardar(fileEntry)
{	
	try
	{
		archivoEntry = fileEntry;
		archivoEntry.moveTo(directorioArchivos, nombreArchivo+'.jpg', archivoGuardado, errorArchivo);
	}
	catch(err)
	{
		alert("error al obtener el nuevo archivo: "+err);
		exito = false;
	}
}

function guardarArchivo(rutaArchivo, nombre)
{
	try
	{
		nombreArchivo = nombre;	
		directorioRoot.root.getFile(rutaArchivo.substring(rutaRaiz.length+1), {create: false, exclusive: false}, getArchivoGuardar, errorArchivo);	
	}catch(err)
	{
		alert('Error al obtener el directorio raiz: '+err);
		exito = false;
	}
}