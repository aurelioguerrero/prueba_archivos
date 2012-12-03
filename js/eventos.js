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
			var manejador = new manejadorArchivos();
			manejador.guardarArchivo(document.getElementById('nombrearchivo').value,document.getElementById('imagen').src,'Album Fotos');
			if(manejador.exito)
			{
				alert('Se guardó el archivo en la ruta: '+manejador.rutaArchivoFinal);
			}
			else
			{
				alert('Se presentó el siguiente error: '+manejador.mensajeError);
			}
			//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, intentarGuardado, errorArchivo);
		}
	}catch(err)
	{
		alert('Error al obtener el directorio raiz: '+err);
	}
}