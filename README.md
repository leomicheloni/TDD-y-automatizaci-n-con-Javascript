TDD y automatización con Javascript
===================================

 Los procesos de desarrollo iterativos de ciclos cortos requieren formas de asegurar la calidad durante todo el proceso y gran capacidad para soportar los ajustes y cambios en los requerimientos.
La pruebas unitarias nos permiten desarrollar nuestro sistema pieza por pieza sin depender de agentes externos, dentro de las mismas podemos adoptar un enfoque de "prueba después" o "TDD (desarrollo guiado por prueba)".
Utilizando esta técnica iremos descubriendo la arquitectura y contaremos con un conjunto de pruebas que podremos repetir cada vez que sea necesario para asegurar que nuestros cambios son seguros.
Automatizar el proceso es un paso necesario para quitar la carga de hacerlo cada vez a mano y nos permitirá detectar tempranamente problemas de integración.
Mediante la automatización podemos hacer que las pruebas se ejecuten al subir el código a nuestro repositorio o hacer despliegues automáticos diarios.
Un paso superior es el que se conoce como "entrega continua (continuos delivery)" que genera una nueva versión cada vez que hacemos un push en nuestro repositorio.
En este artículo haremos una introducción a estos conceptos y veremos algunos ejemplos con
Javascript, Nodejs y git.

