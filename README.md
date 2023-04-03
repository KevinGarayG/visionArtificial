# visionArtificial
La página web que utiliza la cámara del usuario para identificar y pintar de verde los pixeles que estén cerca de un color rojo determinado. También agrupa los píxeles que están cerca y dibuja un rectángulo alrededor del objeto más grande. A continuación se detallan las funciones del código:

##En el archivo index.html:

Se importan los archivos webcam.js y objeto.js.
Se establece un tamaño para el canvas en el que se dibujará la imagen de la cámara y se esconde el elemento de video que se utiliza para capturar la imagen de la cámara.
Se llama a la función mostrarCamara() cuando la página ha terminado de cargar.

##En el archivo webcam.js:

Se definen las variables video y canvas, que se utilizan para mostrar la imagen de la cámara en el canvas.
Se define el tamaño de la imagen de la cámara en altoCamara y anchoCamara.
Se define el color rojo que se utilizará para identificar los píxeles cercanos y la distancia aceptable entre los colores para considerar que un pixel está cercano.
La función mostrarCamara() se encarga de obtener acceso a la cámara del usuario y mostrar el feed de video en el elemento de video HTML. También crea un canvas para poder manipular los píxeles posteriormente.
La función procesarCamara() se llama cada vez que se actualiza la imagen de la cámara en el canvas. Se obtiene la información de los píxeles de la imagen y se recorre cada uno de ellos para medir la distancia entre el color del pixel y el color a comparar. Si la distancia es menor a la distancia aceptable, se pinta el pixel de verde y se agrupa con otros píxeles cercanos en un objeto.
La función unirRectIntesect() se encarga de unir objetos que se solapan.
Finalmente, se busca el objeto más grande y se dibuja un rectángulo alrededor de él.


##En el archivo objeto.js:

El archivo objeto.js contiene la definición de la clase Objeto, que representa un objeto detectado en la imagen procesada por el programa.

La clase Objeto tiene las siguientes propiedades:

xMinima: la posición x del píxel más a la izquierda del objeto.
xMaxima: la posición x del píxel más a la derecha del objeto.
yMinima: la posición y del píxel más arriba del objeto.
yMaxima: la posición y del píxel más abajo del objeto.
pixeles: una lista de pares (x, y) que representan los píxeles del objeto.

La clase tiene también 3 métodos:

agregarPixel(x, y): agrega un nuevo píxel a la lista de píxeles del objeto y ajusta las propiedades xMinima, xMaxima, yMinima e yMaxima si es necesario.

estaCerca(x, y): devuelve True si el píxel (x, y) está dentro de una distancia aceptable de algún píxel del objeto, False en caso contrario. La distancia aceptable está determinada por la variable "distanciaAceptableColor" del archivo webcam.js.

dibujar(ctx): Este es un método dentro de una clase que se encarga de dibujar un objeto en un canvas utilizando un contexto 2D (ctx). La función dibuja un rectángulo en el contexto y luego dibuja un punto en el centro del rectángulo. Luego, realiza algunos cálculos y dibuja dos puntos adicionales en los bordes izquierdo y derecho del rectángulo, conectando los tres puntos con una línea. Finalmente, calcula el ángulo entre los dos puntos adicionales y lo almacena en la variable de la clase "grados".
