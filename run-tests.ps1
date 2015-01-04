$m = Get-Module -List pswatch 
if(!$m) {
    Write-Host "Uh-Oh you don't have the pswatch cmdlet installed. Let me handle that for you."
    iex ((new-object net.webclient).DownloadString("http://bit.ly/Install-PsWatch"))
} 

Import-Module pswatch

watch | %{
    write-host "Change in $_.Path"
    .\phantomjs.exe run-qunit.js .\examples\exampleloader.html
}