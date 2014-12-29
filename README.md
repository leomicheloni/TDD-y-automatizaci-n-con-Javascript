TDD y automatización con Javascript
===================================

#Introducción:

 Los procesos de desarrollo iterativos de ciclos cortos requieren formas de asegurar la calidad durante todo el proceso y gran capacidad para soportar los ajustes y cambios en los requerimientos.
La pruebas unitarias nos permiten desarrollar nuestro sistema pieza por pieza sin depender de agentes externos, dentro de las mismas podemos adoptar un enfoque de "prueba después" o "TDD (desarrollo guiado por prueba)".
Utilizando esta técnica iremos descubriendo la arquitectura y contaremos con un conjunto de pruebas que podremos repetir cada vez que sea necesario para asegurar que nuestros cambios son seguros.
Automatizar el proceso es un paso necesario para quitar la carga de hacerlo cada vez a mano y nos permitirá detectar tempranamente problemas de integración.
Mediante la automatización podemos hacer que las pruebas se ejecuten al subir el código a nuestro repositorio o hacer despliegues automáticos diarios.
Un paso superior es el que se conoce como "entrega continua (continuos delivery)" que genera una nueva versión cada vez que hacemos un push en nuestro repositorio.
En este artículo haremos una introducción a estos conceptos y veremos algunos ejemplos con
Javascript, Nodejs y git.

La idea es una introcción general a los conceptos y herramienteas sin profundizar en particular.

#Pruebas unitarias
 
 Las pruebas unitarias son bien conocidas y nos permitirán probar piezas de nuestro código de manera aislada, por ejemplo:
 
```javascript
function suma(a, b){
    return a + b;
}

function test(){
   var valorEsperado = 7;
   if(suma(3, 4) <> valorEsperado) throw new Error();
}
```

Por supuesto que esto es un ejemplo, pero la idea básica es tener una porción de código que prueba nuestro código, como imaginarán para esto exiten muchos frameworks:

1 - QUnit
2 - Jasmine
3 - JUnit

Y tantos más, en este caso vamos a utilizar un poco de QUnit.

##Introducción a QUnit
Básicamente tenemos una función con la cual declaramos un test

```javascript
test("suma correcta", function(){
.... //codigo del test
});
```
con esto declaramos el test, el otro paso es verificar que el resultado es el esperado, para ello hay varias "aserciones"

```javascript
test("suma correcta", function(){
    var resultado = suma(3, 4);
    equal(resultado, 7, "El resultado no es el esperado");
});
```
de este modo verificamos que el resultado sea 7, sino el test fallará.

##TDD, desarrollo orientado por pruebas

