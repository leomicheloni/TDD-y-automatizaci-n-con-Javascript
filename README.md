TDD y automatización con Javascript
===================================

#Introducción:

 En procesos ágiles de desarrollo iterativos y de ciclos cortos es muy valioso el feedback de los usuarios. Para esto necesitamos poder poner a disposición de los mismos versiones de la aplicación lo más rápido posible.
 Las pruebas unitarias (unit testing) nos permiten desarrollar piezas del sistema sin necesitar otras dependecias y además asegurar la calidad del código a medida que el sistema crece.
 Automatizar la ejecución de las pruebas unitarias nos permite detectar problemas de integración, por otro lado la automatización del proceso de despliegue nos ahorra el tiempo de hacerlo nosotros y evita errores humanos.
 Con estas herramientas podemos asegurar que el cliente tendrá una versión del producto rápidamente disponible y con un nivel de prueba.
 En este artículo vamos a hacer una introducción a conceptos de unit testing, integración continua, despligue automatizado y entrega continua.
 Para ello utilizaremos Nodejs, gruntjs, Qunit, Phantomjs y Karma.
 La idea es una introducción general a los conceptos y herramientas sin profundizar en particular.

#Pruebas unitarias
 
 Las pruebas unitarias nos permitirán probar piezas de nuestro código de manera aislada, por ejemplo:
 
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
<li><a href="http://qunitjs.com/">QUnit</a></li>
<li><a href="http://jasmine.github.io">Jasmine</a></li>
<li><a href="http://junit.org/">JUnit</a></li>
</ul>

Y tantos más, en este caso vamos a utilizar QUnit.

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
    equal(resultado, 7, "El resultado no es el esperado"); //verificamos el resultado esperado
});
```
de este modo verificamos que el resultado sea 7, sino el test fallará. Por supuesto existen más [aserciones](http://api.qunitjs.com/category/assert/).

[Ejemplo 2](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/examples/example_2.js)

##TDD, desarrollo orientado por pruebas

El desarrollo orientado por pruebas (TDD) es comenzar nuestro código a partir de la prueba que verifica el comportamiento que vamos a implementar luego, por ejemplo:

```javascript
test("resta correcta", function(){
	var resultado = resta(8,5);
	equal(resultado, 3, "La resta es incorrecta");
});
```

En este caso escribimos y corremos el test para verificar la resta pero aún no hemos escrito nada de código, ni siquiera el método, el siguiete paso sería:

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

![unit result](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/screenshots/qunit.png)

[Ejemplo 3](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/examples/example_3.js)

Y listo. De este modo vamos avanzando sobre pasos seguros y el finalizar tenemos el código listo y probado.
En común escribir varias pruebas antes de comenzar a codificar lo que queremos probar y tener la mayor parte del comportamiento esperado definido a partir de las pruebas.

###Ventajas de TDD
Algunas ventajas de TDD son:
 - Nos permite pensar el código a partir del uso.
 - Al terminar tenemos un conjunto de test para probar nuestro código y podemos correrlos durante todo el proceso de desarrollo.
 - Nos permite ir "descubriendo" nuestro sistema, es decir, a medida que pensamos las pruebas vamos descubriendo nuevos casos y repensando definiciones.

###Cómo automatizar QUnit?
Una de las dificultades para automatizar las pruebas hechas con QUnit es el hecho de que necesitamos un navegador web, pero esto no es necesariamente un problema ya que podemos utilizar [PhantomJs](http://phantomjs.org/) que es un navegador sin interfaz, y podemos invocarlos por línea de comandos.

##PhantomJs
Es lo que se conoce como "headless browser": un navegador sin interfaz gráfica, [tiene muchas utilidades](![unit result](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/screenshots/qunit.png)
), en nuestro caso vamos a correr las pruebas de QUnit y ver el resultado por consola.

Para utilizar PhantomJs tenemos que interactuar con su API, entonces si queremos correr los test de QUnit tenemos que escribir un script (se conocen como runners) para decirle que lo carge nuestra página de prueba y luego nos muestre el resultado, por suerte entre los ejemplos que se incluyen en la descarga de PhantomJs [existe uno](https://github.com/ariya/phantomjs/blob/master/examples/run-qunit.js)

Con un sencillo comando le decimos a PhantomJs que cargue el runner y le pasamos el nombre de nuestra página de pruebas como parámetro:

```bat
phantomjs.exe run-qunit.js examples\exampleloader.html
```

y vemos el resultado en la consola, genial

![phantom result](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/screenshots/phatomresult.png)


##Automatizar las pruebas, testing continuo
En este caso con un lindo script hecho con PowerShell logramos que las pruebas de QUnit se ejecuten sobre PhantomJs cada vez que guardamos un archivo.

#Automatizar QUnit y Phantom con Grunt
Grunt es un Task Runner hecho sobre NodeJs, básicamente contamos con infinidad de plugins para hacer tareas, entonces a través de un archivo gruntfile.js le decimos a grunt qué hacer.

Para hacerlo podemos escribir un script que mire los cambios y ejecute el mismo comando de PhantomJs, en este caso voy a utilizar un script que hizo [mi buen amigo José](http://joseoncode.com/2011/08/08/javascript-continuous-testing-with-qunit-phantomjs-and-powershell/).

![phantom result](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/screenshots/powershell.png)

Como vemos con cada cambio en algún archivo dentro de nuestro código se ejecuta el comando que hace que PhantomJs corra los test de QUnit, por lo tanto estamos haciendo testing continuo.

**La combinación de TDD y testing continuo es muy interesante, ya que definimos los casos de prueba y a medida que desarrollamos el código vamos viendo como se van superando las pruebas**

#Grunt
[Grunt es un task runner](http://gruntjs.com/) desarrollado sobre NodeJs, básicamente tenemos una infinidad de [plugins](http://gruntjs.com/plugins) que podemos utilizar para hacer cosas como:
<ul>
	<li>Copiar</li>
	<li>Minificar</li>
	<li>Comprimir con GZip</li>
	<li>Correr Hints</li>
</ul>

Y mucho más, una de las tareas más populares es [Watch](https://www.npmjs.com/package/grunt-contrib-watch), que permite correr otra tarea cuando se detecta algún cambio en un archivo, vamos a ver cómo quedaría la configuración de grunt para hacer lo mismo que acabamos de hacer con PowerShell.


Utilizamos la tarea [Shell](https://www.npmjs.com/package/grunt-shell) para ejecutar el comando de Phantom.

Nuestro archivo de configuratión de grunt
```javascript
module.exports = function (grunt) {
	grunt.initConfig({
		watch : {
			scripts : {
				files : ['examples/*.js'],
				tasks : ['shell'],
			}
		},
		shell : {
			target : {
				command : 'phantomjs.exe run-qunit.js examples/exampleloader.html'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	grunt.registerTask('default', ['watch']);
};
```


[Gruntfile.js] (https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/gruntfile.js)

y lo invocamos con el siguiente comando

```javascript
grunt
```

Una vez hecho vemos que funciona perfectamente

![grunt result](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/screenshots/grunt.png)

#Karma

[Karma](http://karma-runner.github.io/0.12/index.html) es un test runner pero con una diferencia interesante: corre los tests directo desde el javascript, sin necesidad de un html y además sobre un navegador real, es decir, puedo decirle a Karma que corra mis test cada vez sobre Internet Explorer y Chrome sin mucho más que una configuración.

Una vez que descargamos Karma es mejor instalar [Karma-cli](https://www.npmjs.com/package/karma-cli) y de este modo podemos invocar Karma desde la línea de comandos y entre otras cosas configurarlo utilizando el siguiente comando:

```javascript
karma init
```

A partir de eso veremos que Karma nos hace preguntas sobre la configuración
<ul>
	<li>Framwork de testing (QUnit, Jassminet, Mocha, etc)</li>
	<li>Si utilizamos RequireJs</li>
	<li>Navegador sobre el que queremos correr los test (puede ser más de uno)</li>
	<li>Paths donde reside nuestro código fuente y tests</li>
	<li>Y si queremos que Karma corre de manera automática cuando algún archivo cambie (testing continuo)</li>
</ul>

![karma config](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/screenshots/karmaconfig.png)

Con esto hecho no tenemos más que iniciar Karma para que comienze el testing continuo

```javascript
karma start
```

![karma config](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/screenshots/karmaconfig.png)

Muy bien, sencillo y poderoso, no nos queda más que elegir el enfoque que más nos gusta y comenzar con el testing continuo.
