Import-Module pswatch

watch | %{
    .\phantomjs.exe run-qunit.js .\examples\exampleloader.html
}