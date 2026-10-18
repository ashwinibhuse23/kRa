$csharp = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class ImageCropper {
    public static void CropLabImage(string srcPath, string outPath) {
        using (Bitmap src = new Bitmap(srcPath)) {
            // Start at 48% width to completely avoid any left text
            // Crop height to 72% to completely avoid the bottom timeline
            int startX = (int)(src.Width * 0.48);
            int cropWidth = src.Width - startX;
            int cropHeight = (int)(src.Height * 0.72);

            Rectangle cropRect = new Rectangle(startX, 0, cropWidth, cropHeight);
            using (Bitmap cropped = src.Clone(cropRect, PixelFormat.Format32bppArgb)) {
                cropped.Save(outPath, ImageFormat.Png);
            }
        }
    }
}
"@

Add-Type -TypeDefinition $csharp -ReferencedAssemblies "System.Drawing.dll"

$src = Join-Path (Get-Location) "public\operational-excellence-ref.png"
$out = Join-Path (Get-Location) "public\lab-pipette-clean.png"

Write-Host "Cropping clean lab visual from $src..."
[ImageCropper]::CropLabImage($src, $out)
Write-Host "SUCCESS: Saved clean lab image to $out"
