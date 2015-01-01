TDD y automatización con Javascript
===================================

#Introducción:

 En procesos ágiles de desarrollo, iterativos y de ciclos cortos es muy valiso el feedback de los usuarios. Para esto necesitamos poder poner a disposición de los mismos versiones de la aplicación lo más rápido posible.
 Las pruebas unitarias (unit testing) nos permiten desarrollar piezas del sistema sin necesitar otras dependecias y además asegurar la calidad del código a medida que el sistema crece.
 Automatizar la ejecución de las pruebas unitarias nos permite detectar problemas de integración, por otro lado la automatización del proceso de despliegue nos ahorra el tiempo de hacerlo nosotros y evita errores humanos.
 En este artículo vamos a hacer una introducción a conceptos de unit testing, integración continua, despligue automatizado y entrega continua.
 Para ello utilizaremos Nodejs, gruntjs, Qunit, Phantomjs y Karma.
 La idea es una introcción general a los conceptos y herramienteas sin profundizar en particular.

#Pruebas unitarias
 
 Las pruebas unitarias son bien conocidas y nos permitirán probar piezas de nuestro código de manera aislada, por ejemplo:
 
```javascript
function suma(a, b) {
	return a + b;
}

function test() {
	var valorEsperado = 7;
	if (suma(3, 4) != valorEsperado)
		throw new Error();
}

test();
```

[Ejemplo 1](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/examples/example_1.js)

Por supuesto que esto es un ejemplo, pero la idea básica es tener una porción de código que prueba nuestro código, como imaginarán para esto exiten muchos frameworks:

<ul>
<li>QUnit</li>
<li>Jasmine</li>
<li>JUnit</li>
</ul>

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

[Ejemplo 2](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/examples/example_2.js)

##TDD, desarrollo orientado por pruebas

El desarrollo orientado por pruebas (TDD) es comenzar nuestro código a partir de la prueba que verifica el comportamiento que vamos a implementar luego, por ejemplo:

```javascript
test("resta correcta", function(){
	var resultado = resta(8,5);
	equal(resultado, 3, "La resta es incorrecta");
});
```

En este caso escribimos el test para verificar la resta pero aún no hemos escrito nada de código, ni siquiera el método, el siguiete paso sería:

```javascript
function resta(a, b){

}
```

Y corremos el test una vez más, por supuesto fallará, la idea es ir avanzando de a poco o "baby steps", en este caso el siguiente paso podría ser:

```javascript
function resta(a, b){
	return a-b;
}
```

[Ejemplo 3](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/examples/example_3.js)

Y listo. De este modo vamos avanzando sobre pasos seguros y el finalizar tenemos el código listo y probado.

