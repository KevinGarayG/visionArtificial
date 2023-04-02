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
	} else
	{
		console.log("No existe la funcion getUserMedia...");
	}
}

/*obtiene una imagen de la cámara y la procesa para identificar los píxeles que se acercan más al color a comparar, 
  los cuales serán marcados con un círculo azul en la imagen resultante. Además, se calcula la posición promedio de
  los píxeles encontrados y se dibuja otro círculo azul en dicha posición. La función se llama de manera recursiva
  con un retraso de 20ms para actualizar continuamente la imagen*/
function procesarCamara()
{
	var ctx = canvas.getContext("2d");

	ctx.drawImage(video, 0, 0, anchoCamara, altoCamara, 0, 0, canvas.width, canvas.height);

	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var pixeles = imageData.data;
	//console.log(pixeles);

	//var pixelMasAmarillo = null;
	//var menorDistacia = null;

	var sumX = 0;
	var sumY = 0;
	var cont = 0;

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
		//si el pixel es suficientemente cercano a nuestro color lo pintamos de rojo
		if (distancia < distanciaAceptableColor) 
		{
			pixeles[i] = 0;
			pixeles[i+1] = 255;	
			pixeles[i+2] = 0; 

			var y = Math.floor(i / 4 / canvas.width);
			var x = (i / 4) % canvas.width;

			sumX += x;
			sumY += y;
			cont++;
		}else{

		}
		/*if(menorDistacia == null || distancia < menorDistacia)
		{
			menorDistacia = distancia;
			var y = Math.floor(i / 4 / canvas.width);
			var x = (i / 4) % canvas.width;
			pixelMasAmarillo ={x: x, y: x};
		}*/

	}
	ctx.putImageData(imageData,0, 0);

	//si existe un pixel de nuestro color, entonces proediamos el lugar en donde se encentran todos lo pixeles de nuestro color
	if(cont > 0)
	{
		ctx.fillStyle = "#f00";
		ctx.beginPath();
		ctx.arc(sumX/cont, sumY/cont, 10, 0, 2*Math.PI);
		ctx.fill();

	}

	setTimeout(procesarCamara, 0);
}