# Baut dist/normfenster.html: eine einzelne Datei mit eingebettetem CSS, JS und Gesetzesdaten (läuft offline per Doppelklick).
# Start:  powershell -ExecutionPolicy Bypass -File build.ps1
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$enc = New-Object System.Text.UTF8Encoding($false)
$html = [IO.File]::ReadAllText("$root\index.html", $enc)

# Stylesheets in Originalreihenfolge (Tokens → Komponenten → App)
$styles = @('tokens.css', 'components.css', 'styles.css')
$inline = ''
foreach ($s in $styles) {
  $tag = '  <link rel="stylesheet" href="' + $s + '">'
  if (-not $html.Contains($tag)) { throw "Stylesheet-Tag nicht gefunden: $s" }
  $css = [IO.File]::ReadAllText("$root\$s", $enc)
  $html = $html.Replace($tag + "`r`n", '').Replace($tag + "`n", '')
  $inline += "/* ===== $s ===== */`n$css`n"
}
$html = $html.Replace('</head>', "  <style>`n$inline</style>`n</head>")

# Skripte in Originalreihenfolge
$scripts = @('data/stgb-text.js', 'data/stgb-meta.js', 'data/stgb-defs.js', 'data/stgb-lit.js', 'data/stgb-faelle.js', 'app.js')
foreach ($s in $scripts) {
  $tag = '<script src="' + $s + '"></script>'
  if (-not $html.Contains($tag)) { throw "Script-Tag nicht gefunden: $s" }
  $js = [IO.File]::ReadAllText("$root\$s", $enc)
  $html = $html.Replace($tag, "<script>`n$js`n</script>")
}
if ($html -match 'src="(data/|app\.js)' -or $html -match 'href="(tokens|components|styles)\.css"') { throw 'Es sind noch externe Verweise übrig' }

New-Item -ItemType Directory -Force "$root\dist" | Out-Null
[IO.File]::WriteAllText("$root\dist\normfenster.html", $html, $enc)
$f = Get-Item "$root\dist\normfenster.html"
"{0} ({1:N0} KB)" -f $f.Name, ($f.Length / 1KB)
