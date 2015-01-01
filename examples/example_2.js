function suma(a, b) {
	return a + b;
}

test("suma correcta", function(){
    var resultado = suma(3, 4);
    equal(resultado, 7, "El resultado no es el esperado");
});
