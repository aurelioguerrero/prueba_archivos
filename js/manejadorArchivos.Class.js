// JavaScript Document
function manejadorArchivos()
{
	this.exito = true;
	this.mensajeError = '';
	this.rutaDestino = '';
	this.rutaOrigen = '';
	this.rutaArchivoFinal = '';
	this.nombreArchivo = '';
	this.rutaRaiz = null;
	this.archivo = null;
	this.directorioFinal = null;
	this.directorioRoot = null;	
	this.guardarArchivo = guardarArchivo;
	
	function archivoGuardado(entry)
	{
		alert('Archivo guardado');
		this.rutaArchivoFinal = entry.fullPath;
	}
	
	function obtenerNuevoDir(directoryEntry)
	{
		alert('Obtener Directorio');
		try
		{		
			this.directorioFinal = directoryEntry;
			this.archivo.moveTo(this.directorioFinal, this.nombreArchivo+'.jpg', archivoGuardado, errorArchivo);
		}
		catch(err)
		{
			this.mensajeError = "Error obtener el directorio: "+err;
			this.exito = false;
			return false;
		}
	}
	
	function obtenerArchivo(fileEntry)
	{
		alert('ObtenerArchivo');
		try
		{
			this.archivo = fileEntry;
			this.directorioRoot.root.getDirectory(this.rutaDestino,{create: true, exclusive: false}, obtenerNuevoDir, errorArchivo);
		}
		catch(err)
		{
			this.mensajeError = "Error al obtener el archivo: "+err;
			this.exito = false;
			return false;
		}
	}
	
	function intentarGuardado(fileSystem)
	{
		alert('Intentar Guardado');
		try
		{
			this.directorioRoot = fileSystem;		
			this.rutaRaiz = directorioRoot.root.fullPath;	
			this.directorioRoot.root.getFile(this.rutaOrigen.substring(this.rutaRaiz.length+1), {create: false, exclusive: false}, obtenerArchivo, errorArchivo);		
		}
		catch(err)
		{
			this.mensajeError = "Error al obtener el directorio raiz: "+err;
			this.exito = false;
			return false;
		}	
	}
	
	function guardarArchivo(nombre,rutaOrg,rutaDest)
	{
		alert('Gurardar Archivo');
		try
		{
			this.nombreArchivo = nombre;
			this.rutaOrigen = rutaOrg;
			this.rutaDestino = rutaDest;
			
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, intentarGuardado, errorArchivo);
		}
		catch(err)
		{
			this.mensajeError = "Error al iniciar guardado: "+err;
			this.exito = false;
			return false;
		}	
	}
}