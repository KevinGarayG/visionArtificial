class Objeto
{
	pixeles = [];

	//posicion
	xMinima = 0;
	xMaxima = 0;
	yMinima = 0;
	yMaxima = 0;
	grados = 0;

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

		var centroX = x + (width/2);
		var centroY = y + (height/2);

		ctx.beginPath();
		ctx.fillStyle = "#00f";
		ctx.arc(centroX, centroY, 5, 0, 2*Math.PI);
		ctx.fill();

		var sumaYIzq = 0;
		var cuentaYIzq = 0;
		var sumaYDer = 0;
		var cuentaYDer = 0;


		for (var i = 0; i < this.pixeles.length; i++) 
		{
			if (this.pixeles[i].x <= (x +(width*.1)))
			{
				sumaYIzq += this.pixeles[i].y;
				cuentaYIzq++;
			} 
			else if(this.pixeles[i].x >= (x +(width*.9)))
			{
				sumaYDer += this.pixeles[i].y;
				cuentaYDer++;
			}
		}
		ctx.beginPath();
		ctx.fillStyle = "#00f";
		ctx.arc(this.xMinima, (sumaYIzq/cuentaYIzq), 5, 0, 2*Math.PI);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = "#00f";
		ctx.arc(this.xMaxima, (sumaYDer/cuentaYDer), 5, 0, 2*Math.PI);
		ctx.fill();

		ctx.beginPath();
		ctx.strokeStyle = "#f00";
		ctx.moveTo(this.xMinima, (sumaYIzq/cuentaYIzq));
		ctx.lineTo(this.xMaxima, (sumaYDer/cuentaYDer));
		ctx.stroke();

		var difY = (sumaYDer/cuentaYDer) - (sumaYIzq/cuentaYIzq);
		var difX = this.xMaxima - this.xMinima;
		var angleRadians = Math.atan2(difY, difX);
        var angleDegrees = angleRadians * 180 / Math.PI;

        this.grados = (angleDegrees.toFixed(0)) * -1;
	}

}