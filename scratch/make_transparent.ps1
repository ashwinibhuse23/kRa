$csharp = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class ImageProcessor {
    public static void Process(string srcPath, string darkOutPath, string lightOutPath) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int w = src.Width;
            int h = src.Height;
            
            using (Bitmap darkBmp = new Bitmap(w, h, PixelFormat.Format32bppArgb))
            using (Bitmap lightBmp = new Bitmap(w, h, PixelFormat.Format32bppArgb)) {
                
                BitmapData srcData = src.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                BitmapData darkData = darkBmp.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
                BitmapData lightData = lightBmp.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);

                int bytes = Math.Abs(srcData.Stride) * h;
                byte[] rgbValues = new byte[bytes];
                byte[] darkValues = new byte[bytes];
                byte[] lightValues = new byte[bytes];

                Marshal.Copy(srcData.Scan0, rgbValues, 0, bytes);

                for (int i = 0; i < bytes; i += 4) {
                    byte b = rgbValues[i];
                    byte g = rgbValues[i + 1];
                    byte r = rgbValues[i + 2];
                    byte a = rgbValues[i + 3];

                    // Check if pixel is white or near-white background
                    if (r > 215 && g > 215 && b > 215) {
                        darkValues[i] = 0;
                        darkValues[i + 1] = 0;
                        darkValues[i + 2] = 0;
                        darkValues[i + 3] = 0;

                        lightValues[i] = 0;
                        lightValues[i + 1] = 0;
                        lightValues[i + 2] = 0;
                        lightValues[i + 3] = 0;
                    } else {
                        // Light mode: keep original color
                        lightValues[i] = b;
                        lightValues[i + 1] = g;
                        lightValues[i + 2] = r;
                        lightValues[i + 3] = a;

                        // Dark mode: if pixel is dark text (e.g. Life Sciences / tagline), make it white
                        if (r < 110 && g < 110 && b < 110) {
                            darkValues[i] = 255;
                            darkValues[i + 1] = 255;
                            darkValues[i + 2] = 255;
                            darkValues[i + 3] = a;
                        } else {
                            // Preserve red and blue emblem
                            darkValues[i] = b;
                            darkValues[i + 1] = g;
                            darkValues[i + 2] = r;
                            darkValues[i + 3] = a;
                        }
                    }
                }

                Marshal.Copy(darkValues, 0, darkData.Scan0, bytes);
                Marshal.Copy(lightValues, 0, lightData.Scan0, bytes);

                src.UnlockBits(srcData);
                darkBmp.UnlockBits(darkData);
                lightBmp.UnlockBits(lightData);

                darkBmp.Save(darkOutPath, ImageFormat.Png);
                lightBmp.Save(lightOutPath, ImageFormat.Png);
            }
        }
    }
}
"@

Add-Type -TypeDefinition $csharp -ReferencedAssemblies "System.Drawing.dll"

$src = Join-Path (Get-Location) "public\logo.png"
if (-not (Test-Path $src)) {
    $src = Join-Path (Get-Location) "public\KRALogo.jpg"
}

$darkOut = Join-Path (Get-Location) "public\logo-transparent-dark.png"
$lightOut = Join-Path (Get-Location) "public\logo-transparent-light.png"

Write-Host "Processing $src..."
[ImageProcessor]::Process($src, $darkOut, $lightOut)
Write-Host "Done! Saved $darkOut and $lightOut"
