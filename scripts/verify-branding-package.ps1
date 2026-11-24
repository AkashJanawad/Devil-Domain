param([switch]$ApkOnly,[string]$ReportPath='test-results/branding-package-verification.json')
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.Drawing
$root=Split-Path $PSScriptRoot -Parent
function Hash-Bytes([byte[]]$Bytes) {
    $sha=[Security.Cryptography.SHA256]::Create()
    try { return [BitConverter]::ToString($sha.ComputeHash($Bytes)).Replace('-','').ToLowerInvariant() } finally { $sha.Dispose() }
}
function Read-Entry($Zip,[string]$Name) {
    $entry=$Zip.GetEntry($Name);if (!$entry) { throw "Missing archive entry: $Name" }
    $stream=$entry.Open();$memory=[IO.MemoryStream]::new()
    try {$stream.CopyTo($memory);return ,$memory.ToArray()} finally {$stream.Dispose();$memory.Dispose()}
}
$report=@()
$packages=@(@('android/app/build/outputs/apk/playtest/app-playtest.apk','assets/public/'),@('android/app/build/outputs/bundle/release/app-release.aab','base/assets/public/'))
if($ApkOnly){$packages=$packages[0..0]}
foreach($package in $packages) {
    $zip=[IO.Compression.ZipFile]::OpenRead((Join-Path $root $package[0]))
    try {
        $count=0
        foreach($file in Get-ChildItem (Join-Path $root 'android/app/build/generated/releaseWeb/assets/public') -File -Recurse) {
            $base=Join-Path $root 'android/app/build/generated/releaseWeb/assets/public'
            $name=$file.FullName.Substring($base.Length+1).Replace('\','/')
            $bytes=Read-Entry $zip ($package[1]+$name)
            if((Hash-Bytes $bytes) -ne (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()) {throw "Bundled asset differs: $name"}
            $count++
        }
        $config=[Text.Encoding]::UTF8.GetString((Read-Entry $zip ($package[1]+'game-config.js')))
        if($config -notmatch 'DEVELOPER_UNLOCK_ALL_LEVELS: false') {throw 'Developer unlock leaked'}
        if(@($zip.Entries | Where-Object FullName -match '\.(jks|keystore)$|release\.properties|/forge/|/tests/').Count) {throw 'Private/developer content in archive'}
        $report+=@{package=$package[0];matchedWebAssets=$count;releaseProgressionLocked=$true;privateFilesAbsent=$true}
    } finally { $zip.Dispose() }
}
$icon=[Drawing.Bitmap]::new((Join-Path $root 'branding/exports/play-store-icon-512.png'))
$feature=[Drawing.Bitmap]::new((Join-Path $root 'branding/exports/play-store-feature-1024x500.png'))
try {
    if($icon.Width -ne 512 -or $icon.Height -ne 512 -or $icon.PixelFormat -ne [Drawing.Imaging.PixelFormat]::Format32bppArgb) {throw 'Invalid store icon format'}
    if((Get-Item (Join-Path $root 'branding/exports/play-store-icon-512.png')).Length -gt 1048576) {throw 'Store icon too large'}
    if($feature.Width -ne 1024 -or $feature.Height -ne 500 -or $feature.PixelFormat -ne [Drawing.Imaging.PixelFormat]::Format24bppRgb) {throw 'Invalid feature graphic format'}
} finally {$icon.Dispose();$feature.Dispose()}
$foreground=[Drawing.Bitmap]::new((Join-Path $root 'branding/exports/adaptive-foreground-432.png'))
try {
    $maxRadius=0
    for($y=0;$y -lt 432;$y++){for($x=0;$x -lt 432;$x++){if($foreground.GetPixel($x,$y).A -gt 0){$radius=[Math]::Sqrt([Math]::Pow($x-215.5,2)+[Math]::Pow($y-215.5,2));$maxRadius=[Math]::Max($maxRadius,$radius)}}}
    if($maxRadius -gt 132) {throw "Adaptive artwork exceeds central 66dp circle: $maxRadius"}
    $report+=@{storeFormatsValid=$true;adaptiveMaxRadiusPixels=$maxRadius;adaptiveAllowedRadiusPixels=132}
} finally {$foreground.Dispose()}
$report | ConvertTo-Json -Depth 4 | Set-Content -Encoding utf8 (Join-Path $root $ReportPath)
$report | ConvertTo-Json -Depth 4
