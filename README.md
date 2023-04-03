# VisionArtificial
Este proyecto de visión artificial utiliza la cámara del usuario para identificar objetos cercanos a un determinado color rojo y pintar sus píxeles de verde. También agrupa los píxeles cercanos y dibuja un rectángulo alrededor del objeto más grande.

## Cómo usarlo
Para usar la aplicación, simplemente abra el archivo index.html en un navegador web. Asegúrese de permitir el acceso a la cámara web cuando se le solicite. La aplicación mostrará la imagen de la cámara en un canvas y comenzará a buscar objetos cercanos al color rojo.

## Cómo funciona
El proyecto consta de tres archivos: index.html, webcam.js y objeto.js. El archivo index.html es la página web principal, mientras que webcam.js y objeto.js contienen la lógica de la aplicación.

## index.html
En este archivo se importan los archivos webcam.js y objeto.js. Se establece el tamaño del canvas y se llama a la función mostrarCamara() cuando la página ha terminado de cargar.

## webcam.js
Este archivo define las variables video y canvas que se utilizan para mostrar la imagen de la cámara en el canvas. También se define el tamaño de la imagen de la cámara y el color rojo que se utilizará para identificar los objetos cercanos.

1. La función mostrarCamara() se encarga de obtener acceso a la cámara del usuario y mostrar el feed de video en el elemento de video HTML. También crea un canvas para poder manipular los píxeles posteriormente.

1. La función procesarCamara() se llama cada vez que se actualiza la imagen de la cámara en el canvas. Se obtiene la información de los píxeles de la imagen y se recorre cada uno de ellos para medir la distancia entre el color del pixel y el color a comparar. Si la distancia es menor a la distancia aceptable, se pinta el pixel de verde y se agrupa con otros píxeles cercanos en un objeto.

1. La función unirRectIntesect() se encarga de unir objetos que se solapan. Finalmente, se busca el objeto más grande y se dibuja un rectángulo alrededor de él.

## objeto.js
Este archivo define la clase Objeto, que representa un objeto detectado en la imagen procesada por el programa. La clase tiene propiedades para almacenar la posición del objeto y sus píxeles. También tiene métodos para agregar un nuevo píxel al objeto y verificar si un píxel está cerca del objeto.

El método dibujar(ctx) se encarga de dibujar un objeto en un canvas utilizando un contexto 2D. La función dibuja un rectángulo en el contexto y luego dibuja un punto en el centro del rectángulo. Luego, realiza algunos cálculos y dibuja dos puntos adicionales en los bordes izquierdo y derecho del rectángulo, conectando los tres puntos con una línea. Finalmente, calcula el ángulo entre los dos puntos adicionales y lo almacena en la variable de la clase "grados".

## Limitaciones
Esta aplicación tiene algunas limitaciones. Por ejemplo, solo puede detectar objetos cercanos al color rojo y no funciona bien en ambientes con iluminación deficiente. Además, puede ser lenta en dispositivos con recursos limitados.
