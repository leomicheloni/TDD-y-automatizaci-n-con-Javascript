function suma(a, b) {
	return a + b;
}

function resta(a, b) {
	return a - b;
}

test("suma correcta", function () {
	var resultado = suma(3, 4);
	equal(resultado, 7, "El resultado no es el esperado");
});

test("resta correcta", function () {
	var resultado = resta(8, 5);
	equal(resultado, 3, "La resta es incorrecta");
});
