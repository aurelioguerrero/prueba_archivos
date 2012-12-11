// JavaScript Document
var nombreCarpeta = 'Album Fotos';
var nombreArchivo;
var rutaRaiz;
var archivoEntry;
var directorioArchivos;
var directorioRoot;
var lectorArchivos;
var listaArchivos;
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

function getListaArchivos(lista)
{
	try
	{
		var tabla = document.getElementById('tablalista');
		for(var i = 0; i<lista.length; i++)
		{		
			var fila = document.createElement('tr');
			var columnaImagen = document.createElement('td');
			var columnaNombre = document.createElement('td');
			var columnaEliminar = document.createElement('td');
			var imagen = document.createElement('img');
			var vinculoImagen = document.createElement('a');
			var nombre = document.createTextNode(lista[i].name);
			var eliminar = document.createElement('a');
			var textoEliminar = document.createTextNode('Eliminar');
			
			fila.id = lista[i].name;
			vinculoImagen.href = lista[i].fullPath;
			imagen.src = lista[i].fullPath;
			imagen.width = 80;
			imagen.height = 80;
			imagen.alt = 'foto';
			vinculoImagen.appendChild(imagen);
			eliminar.href = '#';
			eliminar.onclick = function()
								{
									try
									{
										nombreArchivo = this.parentNode.parentNode.id;
										if(confirm('Seguro desea eliminar el archivo '+nombreArchivo+'?'))
										{
											directorioArchivos.getFile(nombreArchivo,{create: false, exclusive: false},getArchivoEliminar,errorArchivo);
										}
									}
									catch(err)
									{
										alert(err);
									}
								}
			eliminar.appendChild(textoEliminar);
			
			columnaImagen.appendChild(vinculoImagen);
			columnaNombre.appendChild(nombre);
			columnaEliminar.appendChild(eliminar);
			fila.appendChild(columnaImagen);
			fila.appendChild(columnaNombre);
			fila.appendChild(columnaEliminar);
			tabla.appendChild(fila);
		}
	}
	catch(err){
		alert(err);
	}
}

function getDirArchivos(directoryEntry)
{
	try
	{		
		directorioArchivos = directoryEntry;
		alert(directorioArchivos.toURL());
		lectorArchivos = directorioArchivos.createReader();
		lectorArchivos.readEntries(getListaArchivos,errorArchivo);
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

function exitoEliminar()
{
	try
	{
		
		alert('Se eliminó exitosamente el archivo '+nombreArchivo);
		var tabla = document.getElementById('tablalista');
		var fila = document.getElementById(nombreArchivo);
		
		tabla.removeChild(fila);
	}
	catch(err)
	{
		alert('Error al intentar eliminar el archivo de la lista: '+err);
	}
	
}

function getArchivoEliminar(fileEntry)
{
	try
	{
		fileEntry.remove(exitoEliminar,errorArchivo);
	}
	catch(err)
	{
		alert('Error al intentar eliminar el archivo: '+err);
	}
}