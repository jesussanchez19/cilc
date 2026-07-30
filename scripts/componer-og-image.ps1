# Compone public/og-image.jpg, la imagen que se ve al compartir el sitio en
# WhatsApp, Facebook o LinkedIn: foto de fondo + degradado oscuro a la izquierda
# + logo real + titular.
#
#   powershell -File scripts/componer-og-image.ps1
#
# Se genera aqui y se guarda como archivo estatico en vez de dibujarla en
# tiempo de ejecucion con ImageResponse de Next: asi no depende de cargar
# tipografias ni de que el bundle de la funcion incluya la foto, dos cosas que
# fallan en silencio en produccion.
#
# La foto de partida es public/images/og-source.jpg. Para cambiar el titular,
# edita las cadenas de mas abajo y vuelve a ejecutarlo.

Add-Type -AssemblyName System.Drawing

$raiz    = Split-Path -Parent $PSScriptRoot
$fuente  = Join-Path $raiz 'public\images\og-source.jpg'
$logoRut = Join-Path $raiz 'public\logo.png'
$salida  = Join-Path $raiz 'public\og-image.jpg'

$W = 1200
$H = 630

$foto = [System.Drawing.Image]::FromFile($fuente)
$logo = [System.Drawing.Image]::FromFile($logoRut)

$lienzo = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($lienzo)
$g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint  = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# --- Foto de fondo, escalada para CUBRIR y recortada.
# Se recorta mas por abajo que por arriba para no cortarle la cara al sujeto.
$escala = [Math]::Max($W / $foto.Width, $H / $foto.Height)
$anchoEsc = $foto.Width  * $escala
$altoEsc  = $foto.Height * $escala
$offsetY  = -12
$offsetX  = ($W - $anchoEsc) / 2
$g.DrawImage($foto, $offsetX, $offsetY, $anchoEsc, $altoEsc)

# --- Degradado oscuro desde la izquierda, para que el texto se lea.
$oscuro = [System.Drawing.Color]::FromArgb(15, 23, 42)
$rect = New-Object System.Drawing.Rectangle(0, 0, 800, $H)
$brocha = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  $rect,
  [System.Drawing.Color]::FromArgb(250, $oscuro),
  [System.Drawing.Color]::FromArgb(0, $oscuro),
  [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal)
$mezcla = New-Object System.Drawing.Drawing2D.ColorBlend(4)
$mezcla.Colors    = @(
  [System.Drawing.Color]::FromArgb(250, $oscuro),
  [System.Drawing.Color]::FromArgb(238, $oscuro),
  [System.Drawing.Color]::FromArgb(170, $oscuro),
  [System.Drawing.Color]::FromArgb(0,   $oscuro))
$mezcla.Positions = @(0.0, 0.42, 0.72, 1.0)
$brocha.InterpolationColors = $mezcla
$g.FillRectangle($brocha, $rect)

# --- Logo arriba a la izquierda.
$logoAncho = 196
$logoAlto  = [int]($logo.Height * ($logoAncho / $logo.Width))
$g.DrawImage($logo, 62, 44, $logoAncho, $logoAlto)

# --- Titular.
$blanco = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$claro  = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(203, 213, 225))
$azul   = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(96, 165, 250))

function Fuente([single]$tam, [System.Drawing.FontStyle]$estilo) {
  foreach ($n in 'Segoe UI', 'Arial', 'Tahoma') {
    $f = New-Object System.Drawing.Font($n, $tam, $estilo, [System.Drawing.GraphicsUnit]::Pixel)
    if ($f.Name -eq $n) { return $f }
  }
  return New-Object System.Drawing.Font('Arial', $tam, $estilo, [System.Drawing.GraphicsUnit]::Pixel)
}

$fTitulo = Fuente 52 ([System.Drawing.FontStyle]::Bold)
$fSub    = Fuente 25 ([System.Drawing.FontStyle]::Regular)

$x = 62
$y = 262
$g.DrawString('Estudios en el Extranjero', $fTitulo, $blanco, $x, $y)
$g.DrawString('que Transforman tu Futuro', $fTitulo, $azul,   $x, $y + 62)

# Barra de acento con los dos colores del logo.
$rojo = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(227, 30, 36))
$azulFuerte = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(27, 103, 232))
$g.FillRectangle($azulFuerte, $x, $y + 148, 46, 5)
$g.FillRectangle($rojo,       $x + 50, $y + 148, 26, 5)

# Los caracteres acentuados se construyen por codigo en lugar de escribirlos
# literalmente: PowerShell 5.1 lee los .ps1 sin BOM como ANSI y los destrozaba,
# asi que el banner salia con "anos" y "Asesoria".
$enye = [char]0xF1   # n con tilde
$iAcc = [char]0xED   # i con acento

$linea1 = "+23 a${enye}os acompa${enye}ando a estudiantes mexicanos"
$linea2 = "16 destinos  |  Asesor${iAcc}a personalizada sin costo"

$g.DrawString($linea1, $fSub, $claro, $x, $y + 176)
$g.DrawString($linea2, $fSub, $claro, $x, $y + 210)

# --- Guardar como JPEG con calidad ajustada.
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, 86)

if (Test-Path $salida) { Remove-Item $salida -Force }
$lienzo.Save($salida, $codec, $params)

$g.Dispose(); $lienzo.Dispose(); $foto.Dispose(); $logo.Dispose()

$info = Get-Item $salida
"Generado: {0}  ({1:N0} KB)" -f $info.Name, ($info.Length / 1KB)
"Tipografia titulo: $($fTitulo.Name)"
