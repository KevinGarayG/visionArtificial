var video;
var canvas;

var altoCamara = 720;
var anchoCamara = 720;

var color = {r: 255, g: 0, b:0};
var distanciaAceptableColor = 130;

// se encarga de obtener acceso a la cámara del usuario y mostrar el feed de video en un elemento de video HTML
function mostrarCamara()
{
	video = document.getElementById("video");
	canvas = document.getElementById("canvas");

	// ajustamos la imagen de la camara
	var opciones = 
	{
		audio: false,
		video: 
		{
			width: anchoCamara, height: altoCamara
		}
	};

	//creamos un canvas para poder manejar los pixeles posteriormene
	if (navigator.mediaDevices.getUserMedia)
	{
		navigator.mediaDevices.getUserMedia(opciones)
		.then(function(stream)
		{
			video.srcObject = stream;
			procesarCamara();
		})
		.catch(function(err)
		{
			console.log("no se pudo...", err);
		})
	} 
	else
	{
		console.log("No existe la funcion getUserMedia...");
	}
}

/* se llama cada vez que se actualiza la imagen de la cámara en el canvas. Se obtiene la 
   información de los píxeles de la imagen y se recorre cada uno de ellos para medir la distancia
   entre el color del pixel y el color a comparar. Si la distancia es menor a la distancia aceptable,
   se pinta el pixel de verde y se agrupa con otros píxeles cercanos en un objeto.*/
function procesarCamara()
{
	var ctx = canvas.getContext("2d");

	ctx.drawImage(video, 0, 0, anchoCamara, altoCamara, 0, 0, canvas.width, canvas.height);

	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var pixeles = imageData.data;


	var elementos = [];

	//recorremos cada pixel y medimos la distancia entre el color de ese pixel y el color a comparar
	for (var i = 0; i < pixeles.length; i+=4) {
		var rojo = pixeles[i];
		var verde = pixeles[i +1];
		var azul = pixeles[i+2];
		var alpha = pixeles[i+3];

		var distancia = Math.sqrt(
			Math.pow(color.r-rojo, 2) +
			Math.pow(color.g- verde, 2) + 
			Math.pow(color.b- azul, 2)
		);
		//si el pixel es suficientemente cercano a nuestro color lo pintamos pixeles
		if (distancia < distanciaAceptableColor) 
		{//pintamos pixeles
			pixeles[i] = 0;//r
			pixeles[i+1] = 255;	//g
			pixeles[i+2] = 0; //b

			var y = Math.floor(i / 4 / canvas.width);
			var x = (i / 4) % canvas.width;

			//Agrupacion
			if(elementos.length == 0)
			{// mi primer objeto
				var objeto = new Objeto(x, y);
				elementos.push(objeto);
			} 
			else
			{
				//si el pixel esta cerca se une al objeto, si no, se crea un objeto nuevo
				var encontrado = false;
				for (var j = 0; j < elementos.length; j++)
				 {
					if (elementos[j].estaCerca(x, y)) 
					{
						elementos[j].agregarPixel(x, y);
						encontrado = true;
						break;
					}
				}
				if (!encontrado) 
				{
					var objeto = new Objeto(x, y);
					elementos.push(objeto);
				}
			}
		}
	}
	ctx.putImageData(imageData,0, 0);

	 elementos = unirRectIntesect(elementos);

	 //variables para dibujar el objeto de mayor tamaño
	 var objMasGrande = null;
	 var masGrande = -1;

	for(var k = 0; k < elementos.length; k++)
	{	//si el area de un objeto es muy pequeño no lo consideramos

		var width = elementos[k].xMaxima - elementos[k].xMinima;
		var height = elementos[k].yMaxima - elementos[k].yMinima;
		var area = width * height;
		if (area > 800) 
		{
			if(objMasGrande == null || area > masGrande)
			{//buscamos el objeto de mayor tamaño
				objMasGrande = elementos[k];
				masGrande = area
			}
		}
	}
	// dibujamos objeto de mayor tamaño
	if (objMasGrande != null)
	 {
	 	objMasGrande.dibujar(ctx)
	 	document.getElementById("grados").innerHTML = (objMasGrande.grados);
	 }
	setTimeout(procesarCamara, 0);
}

/**
 * Esta funcion tiene como objetivo recibir un arreglo de objetos "Objeto" que pueden tener
 * intersecciones entre ellos (rectangulos dentro de otros rectangulos, o con cualquier interseccion)
 *
 * Regresa un arreglo en donde, si encontro intersecciones, une esos objetos.
 *
 * Es decir puede regresar el mismo arreglo, o uno con menos objetos (pero mas grandes)
 */
function unirRectIntesect(elementos)
{
	var salir = false;

	for (var i = 0; i < elementos.length; i++)
	{
		for (var j = 0; j < elementos.length; j++) 
		{
	       if (i == j) continue;//si es el mismo rectangulo no lo consideres

	       var objeto1 = elementos[i];
	       var objeto2 = elementos[j];

	       var intersectan = objeto1.xMinima < objeto2.xMaxima &&
	       	   objeto1.xMaxima > objeto2.xMinima &&
	       	   objeto1.yMinima < objeto2.yMaxima &&
	       	   objeto1.yMaxima > objeto2.yMinima;

	       if (intersectan) 
	       {//pasar por los pixeles del j al i
	       	 for (var k = 0; k < objeto2.pixeles.length; k++) 
	       	 {
	       		objeto1.agregarPixel(
	       			objeto2.pixeles[k].x,
	       			objeto2.pixeles[k].y
	       		);
	       	 }
	       	 // borrar el i
	       	 elementos.splice(j, 1);
	       	 salir = true;
	       	 break;
	       }
		}

		if (salir) break;
	}
	/*si encontramos una interseccion , reporcesamos todo nuevamente con
	  el arreglo modificado */
	if (salir) 
	{
		return unirRectIntesect(elementos);
	}
	else // no hay mas intersecciones
	{
		return elementos;
	}
}