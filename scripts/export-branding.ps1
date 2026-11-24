# Deterministic Android/store exports from the approved source artwork.
# Creative masters are preserved; this script only fits, resizes and encodes assets.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$res = Join-Path $root 'android/app/src/main/res'
$out = Join-Path $root 'branding/exports'
New-Item -ItemType Directory -Force $out, (Join-Path $root 'content/branding') | Out-Null
$original = [Drawing.Image]::FromFile((Join-Path $root 'Devil Domain_Origional_Logo.png'))
$emblem = [Drawing.Image]::FromFile((Join-Path $root 'branding/masters/launcher-emblem.png'))
$feature = [Drawing.Image]::FromFile((Join-Path $root 'branding/masters/feature-art.png'))
$dark = [Drawing.ColorTranslator]::FromHtml('#160C24')
$iconBackdrop = [Drawing.ColorTranslator]::FromHtml('#805AA6')
function Export-Image($Source, [string]$Path, [int]$Width, [int]$Height, [double]$Fit = 1, $Background = [Drawing.Color]::Transparent, [bool]$Rgb = $false, [bool]$Round = $false) {
    $format = if ($Rgb) { [Drawing.Imaging.PixelFormat]::Format24bppRgb } else { [Drawing.Imaging.PixelFormat]::Format32bppArgb }
    $bitmap = [Drawing.Bitmap]::new($Width, $Height, $format)
    $graphics = [Drawing.Graphics]::FromImage($bitmap)
    try {
        $graphics.Clear([Drawing.Color]::Transparent)
        $graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::AntiAlias
        $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        if ($Round) {
            $mask = [Drawing.Drawing2D.GraphicsPath]::new()
            $mask.AddEllipse(0, 0, $Width, $Height)
            $graphics.SetClip($mask)
            $mask.Dispose()
            $brush = [Drawing.SolidBrush]::new($Background)
            $graphics.FillEllipse($brush, 0, 0, $Width, $Height)
            $brush.Dispose()
        } else { $graphics.Clear($Background) }
        $scale = [Math]::Min($Width * $Fit / $Source.Width, $Height * $Fit / $Source.Height)
        $w = [int][Math]::Round($Source.Width * $scale)
        $h = [int][Math]::Round($Source.Height * $scale)
        $graphics.DrawImage($Source, [int](($Width-$w)/2), [int](($Height-$h)/2), $w, $h)
        [IO.Directory]::CreateDirectory((Split-Path $Path -Parent)) | Out-Null
        $encoding = if ([IO.Path]::GetExtension($Path) -eq '.jpg') { [Drawing.Imaging.ImageFormat]::Jpeg } else { [Drawing.Imaging.ImageFormat]::Png }
        $bitmap.Save($Path, $encoding)
    } finally { $graphics.Dispose(); $bitmap.Dispose() }
}
try {
    Copy-Item -LiteralPath (Join-Path $root 'Devil Domain_Origional_Logo.png') -Destination (Join-Path $out 'logo-original-transparent.png')
    Export-Image $original (Join-Path $out 'logo-transparent-1024.png') 1024 768
    Export-Image $original (Join-Path $out 'logo-transparent-512.png') 512 384
    Export-Image $original (Join-Path $out 'logo-on-dark-1024.png') 1024 768 0.9 $dark
    Export-Image $original (Join-Path $out 'logo-on-light-1024.png') 1024 768 0.9 ([Drawing.ColorTranslator]::FromHtml('#FFF4E8'))
    Export-Image $original (Join-Path $root 'content/branding/logo.png') 640 480
    Export-Image $original (Join-Path $out 'play-store-icon-512.png') 512 512 0.88 $iconBackdrop
    Export-Image $feature (Join-Path $root 'content/branding/menu-art.jpg') 1200 600 1 $dark $true
    Export-Image $feature (Join-Path $out 'play-store-feature-1024x500.png') 1024 500 1 $dark $true
    Export-Image $original (Join-Path $out 'launcher-square-1024.png') 1024 1024 0.88 $iconBackdrop
    Export-Image $original (Join-Path $out 'launcher-round-512.png') 512 512 0.83 $iconBackdrop $false $true
    # Fit the complete original artwork inside the adaptive circular safe zone.
    Export-Image $original (Join-Path $out 'adaptive-foreground-432.png') 432 432 (60.0/108)
    Export-Image $emblem (Join-Path $res 'drawable-nodpi/launch_emblem.png') 432 432 (64.0/108)
    Export-Image $emblem (Join-Path $root 'content/branding/icon.png') 64 64 0.86 $dark
    $densities = @(@('mdpi',48,108),@('hdpi',72,162),@('xhdpi',96,216),@('xxhdpi',144,324),@('xxxhdpi',192,432))
    foreach ($d in $densities) {
        $folder = Join-Path $res ('mipmap-'+$d[0])
        Export-Image $original (Join-Path $folder 'ic_launcher.png') $d[1] $d[1] 0.88 $iconBackdrop
        Export-Image $original (Join-Path $folder 'ic_launcher_round.png') $d[1] $d[1] 0.83 $iconBackdrop $false $true
        Export-Image $original (Join-Path $folder 'ic_launcher_foreground.png') $d[2] $d[2] (60.0/108)
    }
    foreach ($file in Get-ChildItem $res -Recurse -Filter splash.png) {
        $old = [Drawing.Image]::FromFile($file.FullName)
        $w = $old.Width; $h = $old.Height; $old.Dispose()
        Export-Image $original $file.FullName $w $h 0.65 $dark $true
    }
    Export-Image $original (Join-Path $out 'splash-landscape-1920x1080.png') 1920 1080 0.65 $dark $true
    Export-Image $original (Join-Path $out 'splash-portrait-1080x1920.png') 1080 1920 0.65 $dark $true
} finally { $original.Dispose(); $emblem.Dispose(); $feature.Dispose() }
Write-Output 'Exported original-logo, store, launcher, adaptive and splash assets.'
