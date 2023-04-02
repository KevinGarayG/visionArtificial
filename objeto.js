class Objeto
{
	pixeles = [];

	//posicion
	xMinima = 0;
	xMaxima = 0;
	yMinima = 0;
	yMaxima = 0;

	constructor(x, y)
	{
		this.pixeles.push( {x: x, y: y} );
		this.xMinima = x;
		this.xMaxima = x;
		this.yMinima = y;
		this.yMaxima = y;
	}

	//añadimos pixel a nuestro objeto
	agregarPixel(x, y)
	{
		this.pixeles.push( {x: x, y: y} );

		//buscamos las "x" & "y" maximas & minimas
		if (x < this.xMinima) 
		{
			this.xMinima = x;
		}
		if (x > this.xMaxima) 
		{
			this.xMaxima = x;
		}


		this.yMinima = y < this.yMinima ? y : this.yMinima;
		this.yMaxima = y > this.yMaxima ? y : this.yMaxima;
	}

	/*revisamos si el la distancia del pixel nuevo, esta sufcientemente
	  cerca a el pixel mas cercano al nuevo pixel */
	estaCerca(x, y)
	{
		var menorDistacia = -1;

		for (var i = 0; i < this.pixeles.length; i++)
		{
			var distancia = Math.sqrt( //medir distancia
			Math.pow(this.pixeles[i].x - x, 2) +
			Math.pow(this.pixeles[i].y - y, 2)
			);

			if (menorDistacia == -1 || distancia < menorDistacia) 
			{
				menorDistacia = distancia;
			}
		}

		if (menorDistacia <= 50) 
		{
			return true;
		}

		return false;
	}

	//dibujamos un rectangulo que abarque nuestro objeto
	dibujar(ctx)
	{
		ctx.strokeStyle = "#f00";
		ctx.lineWidth = 4;
		ctx.beginPath();
		var x = this.xMinima;
		var y = this.yMinima;
		var width = this.xMaxima - this.xMinima;
		var height = this.yMaxima - this.yMinima;

		ctx.rect(x, y, width, height);
		ctx.stroke();	
	}

}