# visionArtificial
Este código es una aplicación web que utiliza la cámara del dispositivo para procesar los píxeles de la imagen y detectar aquellos que tienen un color específico.

La página HTML tiene un elemento de video oculto y un canvas. Al cargar la página, la función mostrarCamara() se encarga de solicitar acceso a la cámara del dispositivo y mostrar el feed de video en el elemento de video HTML. La función procesarCamara() se encarga de obtener una imagen de la cámara y procesarla para identificar los píxeles que se acercan más al color a comparar, los cuales serán marcados con un círculo azul en la imagen resultante. Además, se calcula la posición promedio de los píxeles encontrados y se dibuja otro círculo azul en dicha posición. La función se llama de manera recursiva con un retraso de 20ms para actualizar continuamente la imagen.

La clase Objeto se encarga de agrupar los píxeles cercanos para formar objetos. Cada objeto es una colección de píxeles que están cerca unos de otros y se pueden unir. La distancia se calcula en base a un umbral de distancia aceptable para el color que se está buscando. Si el pixel está lo suficientemente cerca de un objeto, se une a este objeto; de lo contrario, se crea un nuevo objeto. Cada objeto tiene una posición central y una lista de píxeles que lo componen.

En el archivo CSS se define la transformación de la imagen del canvas para reflejarla horizontalmente.

En resumen, el código muestra un feed de video de la cámara y detecta píxeles con un color específico para crear objetos.
