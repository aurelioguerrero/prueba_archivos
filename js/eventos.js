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

function guardarFoto()
{
	var nombre = document.getElementById('nombrearchivo').value;
	if(!nombre)
	{
		alert('Por favor ingrese el nombre del archivo');
	}
	else
	{
		var rutaRaiz = document.getElementById('imagen').src;	
		if(!rutaRaiz)
		{
			alert('Por favor tome una foto');
		}
		else
		{
			guardarArchivo(rutaRaiz,nombre);
			if(exito)
			{
				var imagen = document.getElementById('imagen');
				imagen.className = 'oculto';
				
				var nombre = document.getElementById('divnombre');
				nombre.className = 'oculto';
				
				var boton = document.getElementById('btnguardar');
				boton.className = 'oculto';
				
			}
		}
	}
}