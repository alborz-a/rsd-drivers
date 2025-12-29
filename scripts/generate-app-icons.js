const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Use the new logo for app icons (NOT splash screen)
const LOGO_SVG_PATH = 'assets/Logo-Drivers.svg';
const ANDROID_RES_PATH = 'android/app/src/main/res';
const ANDROID_DEBUG_RES_PATH = 'android/app/src/debug/res';

// Android standard mipmap icon sizes
const DENSITIES = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192,
    'mipmap-ldpi': 36,
};

// Additional assets at specific sizes
const ASSET_SIZES = {
    'assets/app-icon.png': 512,
    'assets/icon.png': 512,
    'assets/play-store-app-icon.png': 512,
    'assets/navigator-icon-transparent.png': 512,
};

async function generateAppIcons() {
    if (!fs.existsSync(LOGO_SVG_PATH)) {
        console.error('Logo SVG file not found:', LOGO_SVG_PATH);
        process.exit(1);
    }

    console.log(`Generating app icons from ${LOGO_SVG_PATH}...`);
    console.log('NOTE: This is for app icons only, NOT splash screen');

    // Generate icons for both main and debug
    const resPaths = [ANDROID_RES_PATH, ANDROID_DEBUG_RES_PATH];

    for (const resPath of resPaths) {
        console.log(`\nGenerating icons for: ${resPath}`);

        // Generate Android mipmap icons
        for (const [dir, size] of Object.entries(DENSITIES)) {
            const outDir = path.join(resPath, dir);
            if (!fs.existsSync(outDir)) {
                console.log(`Creating directory: ${outDir}`);
                fs.mkdirSync(outDir, { recursive: true });
            }

            const iconPath = path.join(outDir, 'ic_launcher.png');
            const roundIconPath = path.join(outDir, 'ic_launcher_round.png');

            try {
                // Generate ic_launcher.png with high density rendering
                await sharp(LOGO_SVG_PATH, { density: 300 })
                    .resize(size, size, { fit: 'contain', background: { r: 255, g: 204, b: 0, alpha: 1 } })
                    .png({ quality: 100, compressionLevel: 9 })
                    .toFile(iconPath);
                console.log(`Generated ${iconPath} (${size}x${size})`);

                // Generate ic_launcher_round.png 
                await sharp(LOGO_SVG_PATH, { density: 300 })
                    .resize(size, size, { fit: 'contain', background: { r: 255, g: 204, b: 0, alpha: 1 } })
                    .png({ quality: 100, compressionLevel: 9 })
                    .toFile(roundIconPath);
                console.log(`Generated ${roundIconPath} (${size}x${size})`);

            } catch (err) {
                console.error(`Error generating for ${dir}:`, err);
            }
        }
    }

    // Generate asset icons
    for (const [assetPath, size] of Object.entries(ASSET_SIZES)) {
        try {
            await sharp(LOGO_SVG_PATH, { density: 300 })
                .resize(size, size, { fit: 'contain', background: { r: 255, g: 204, b: 0, alpha: 1 } })
                .png({ quality: 100, compressionLevel: 9 })
                .toFile(assetPath);
            console.log(`Generated ${assetPath} (${size}x${size})`);
        } catch (err) {
            console.error(`Error generating ${assetPath}:`, err);
        }
    }

    console.log('Done! All app icons generated from new logo.');
}

generateAppIcons();
