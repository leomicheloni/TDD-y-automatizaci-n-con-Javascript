TDD y automatización con Javascript
===================================

#Introducción:

 En procesos ágiles de desarrollo iterativos y de ciclos cortos es muy valioso el feedback de los usuarios. Para esto necesitamos poder poner a disposición de los mismos versiones de la aplicación lo más rápido posible.
 Las pruebas unitarias (unit testing) nos permiten desarrollar piezas del sistema sin necesitar otras dependecias y además asegurar la calidad del código a medida que el sistema crece.
 Automatizar la ejecución de las pruebas unitarias nos permite detectar problemas de integración, por otro lado la automatización del proceso de despliegue nos ahorra el tiempo de hacerlo nosotros y evita errores humanos.
 Con estas herramientas podemos asegurar que el cliente tendrá una versión del producto rápidamente disponible y con cierto nivel de prueba.
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

Por supuesto que esto es un ejemplo, pero la idea básica es tener una porción de código que prueba nuestro código, como imaginarán para esto existen muchos frameworks, entre ellos:

<ul>
<li><a href="http://qunitjs.com/">QUnit</a></li>
<li><a href="http://jasmine.github.io">Jasmine</a></li>
<li><a href="http://junit.org/">JUnit</a></li>
<li>Y otros</li>
</ul>

En este caso vamos a utilizar QUnit.

##Introducción a QUnit
Básicamente tenemos una función con la cual declaramos un test

```javascript
test("suma correcta", function(){
.... //codigo del test
});
```
el otro paso es verificar que el resultado es el esperado, para ello hay varias "aserciones"

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

 De este modo vamos avanzando sobre pasos seguros y el finalizar tenemos el código listo y probado.
Es común escribir varias pruebas antes de comenzar a codificar lo que queremos probar y tener la mayor parte del comportamiento esperado definido a partir de las pruebas.

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
	<li>Y muchas más</li>
</ul>

Una de las tareas más populares es [Watch](https://www.npmjs.com/package/grunt-contrib-watch), que permite correr otra tarea cuando se detecta algún cambio en un archivo; vamos a ver cómo quedaría la configuración de grunt para hacer lo mismo que acabamos de hacer con PowerShell.


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

![karma config](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/screenshots/karmastart.png)

Muy bien, sencillo y poderoso, no nos queda más que elegir el enfoque que más nos gusta y comenzar con el testing continuo.

#Integración continua
Si queremos ir un paso más allá en la automatización y el aseguramiento de la calidad, la integración continua es un paso lógico.
La idea es que, cada vez que subimos cambios a nuestro control de código se ejecuten las pruebas automatizadas y nos avise de alguna manera en caso de error.

##Travis
[Es un servicio de integración continua](https://travis-ci.org/) que funciona muy bien con Github, simplemente indicamos qué proyecto queremos que mire (es decir, que esté atento a algún push) y después que comando ejecutar.

Travis soporta varias plataformas para correr scripts de build:

<ul>
	<li>Nodejs</li>
	<li>Ruby</li>
	<li>PHP</li>
	<li>y otros</li>
</ul>

Básicamete tenemos que crear un [archivo de configuración](http://docs.travis-ci.com/user/languages/javascript-with-nodejs/) y decirle a travis qué plataforma corremos, qué comando, qué branch entre otras cosas. En este caso el archivo de configuración es simple y está configurado para correr la siguiente tarea que no hace mucho pero sirve de ejemplo:
```javascript
	grunt.registerTask('test', function(){
		console.log('ok');
	});
```

La configuración de Travis sería la siguiente:

```yaml
language: node_js
node_js:
- '0.11'
before_script:
- npm install -g grunt-cli
script:
- grunt test #indicamos que llame a la tarea 'test' de grunt
after_success:
#
env:
#
branches:
  only:
  - master
```

Esta configuración indica a Travis que use Nodejs versión 0.11 y que instale grunt-cli antes de correr el comando sobre el branch master.
Un vez finalizado el proceso Travis nos da el resultado de varias maneras, una que es interesante es la generación de una pequeña imagen que indica el resultado del build como se muestra a continuación:

![travis status](https://api.travis-ci.org/leomicheloni/TDD-y-automatizaci-n-con-Javascript.svg)

La cual estará en verde o rojo dependiendo del resultado. Es común ver está imagen (o de servicios similares) en los proyectos de Github para saber el estado del último build.

Si quisiéramos ver en detalle los pasos del proceso podemos acceder a una suerte de consola en el sitio de Travis:

![travis result](https://github.com/leomicheloni/TDD-y-automatizaci-n-con-Javascript/blob/master/screenshots/travisresult.png)

También podemos hacer click sobre ciertos elementos para ver el detalle de los comandos. Por otro lado Travis nos envía un mail a la dirección que tenemos registrada en Github con el detalle del proceso.

#Continuos delivery
Para finalizar vamos a cerrar todo el proceso dejando la última versión funcional de nuestro proyecto disponible para usar. Esto se conoce como "entrega continua" o "continuos delivery"; por medio de este mecanismo cada vez que actualicemos el código en Github ocurrirán muchas cosas de manera automática (dependiendo de qué hayamos configurado) y al finalizar se deplegará el código, un escenario posible sería:
<ul>
	<li>Correr jslint</li>
	<li>Correr test unitarios</li>
	<li>Minificar el código</li>
	<li>Generar el paquete</li>
	<li>Desplegar sobre un ambiente de prueba (o de integración continua mejor dicho)</li>
</ul>

Travis tiene soporte para hacer [deploy sobre varias plataformas](http://docs.travis-ci.com/user/deployment/) a través de diferentes providers (incluso podemos hacerlo de manera personalizada utilizando [comandos de Linux](http://docs.travis-ci.com/user/deployment/custom/) y utilizar FTP por ejemplo). No tenemos más que leer la documentación y agregar la sección deploy a nuestro .travis.yml tal como se [explica acá](http://docs.travis-ci.com/user/deployment/codedeploy/).

En caso de utilizar claves de acceso a algún servicio externo (como en este caso Amazon S3) las mismas pueden incluirse en la configuración pública encriptadas y configurar Travis para que sepa desencriptarlas.

El archivo completo con la sección de deploy sería algo así:
 
 
```yaml
language: node_js
node_js:
- '0.11'
before_script:
- npm install -g grunt-cli
script:
- grunt test
after_success:
#
env:
#
branches:
  only:
  - master
deploy:
  provider: codedeploy
  access_key_id: "YOUR AWS ACCESS KEY"
  secret_access_key: "YOUR AWS SECRET KEY"
  bucket: "mibucket_en_s3"
  key: "deploy/mipaquete.js"
  application: MyApp
```

Y listo, ahora tenemos **continuos delivery** funcionado de punta a punta.

#Conclusión
Los proceso de automatización puden ser trabajosos de configurar pero nos dan un gran valor al poder ejecutar tareas importantes y repetitivas, además nos dan la poderosa herramienta de poner a disposición la última versión de nuestra aplicación sin esfuerzo. Y tal vez más importante, saber rápidamente si tenemos problemas de integración o si "rompimos" algún test existente.
Entonces siempre que tengamos dudas si automatizar o no repitamos las siguientes tres palabra: automatizar, automatizar y automatizar.
Hasta la próxima.