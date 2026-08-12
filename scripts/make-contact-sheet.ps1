Add-Type -AssemblyName System.Drawing
$files = Get-ChildItem -LiteralPath "public\media\higgsfield" -Filter "*-hero-v1.png" | Sort-Object Name
$thumbW = 414
$thumbH = 310
$labelH = 42
$cols = 4
$rows = [Math]::Ceiling($files.Count / $cols)
$canvas = New-Object System.Drawing.Bitmap ($thumbW * $cols), (($thumbH + $labelH) * $rows)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.Clear([System.Drawing.Color]::FromArgb(244, 238, 224))
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$font = New-Object System.Drawing.Font("Arial", 15, [System.Drawing.FontStyle]::Bold)
$brush = [System.Drawing.Brushes]::Black
for ($i = 0; $i -lt $files.Count; $i++) {
  $x = ($i % $cols) * $thumbW
  $y = [Math]::Floor($i / $cols) * ($thumbH + $labelH)
  $image = [System.Drawing.Image]::FromFile($files[$i].FullName)
  $graphics.DrawImage($image, $x, $y, $thumbW, $thumbH)
  $graphics.DrawString($files[$i].BaseName.Replace("-hero-v1", ""), $font, $brush, $x + 10, $y + $thumbH + 8)
  $image.Dispose()
}
$canvas.Save((Join-Path (Resolve-Path "public\media\higgsfield") "catalog-contact-sheet.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$graphics.Dispose()
$canvas.Dispose()
$font.Dispose()
