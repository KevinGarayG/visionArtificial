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
		this.xMinima = x < this.xMinima ? x : this.xMinima;
		this.xMaxima = x > this.xMaxima ? x : this.xMaxima;

		this.yMinima = y < this.yMinima ? y : this.yMinima;
		this.yMaxima = y > this.yMaxima ? y : this.yMaxima;
	}

	/*revisamos si el la distancia del pixel nuevo, esta sufcientemente
	  cerca a el pixel mas cercano al nuevo pixel */
	estaCerca(x, y)
	{
		// revisamos si el pixel esta dentro del rectnagulo
		if (x >= this.xMinima && x <= this.xMaxima &&
			y >= this.yMinima && y <= this.yMaxima) 
		{
			return true;
		}

		var distX = 0;
		var distY = 0;

		if ( x < this.xMinima) 
		{
			distX = this.xMinima - x;
		}
		if ( x > this.xMaxima) 
		{
			distX = x - this.xMaxima;
		}
		if ( y < this.yMinima) 
		{
			distY = this.yMinima - y;
		}
		if ( y > this.yMaxima) 
		{
			distY = y - this.yMaxima;
		}

		var distancia = distX + distY;

		if (distancia < 50) 
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