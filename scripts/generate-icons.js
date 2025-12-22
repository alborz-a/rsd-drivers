const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG_PATH = 'assets/splash-screen.svg';
const ANDROID_RES_PATH = 'android/app/src/main/res';

// Android standard mipmap icon sizes
const DENSITIES = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192,
    'mipmap-ldpi': 36,
};

async function generate() {
    if (!fs.existsSync(SVG_PATH)) {
        console.error('SVG file not found:', SVG_PATH);
        process.exit(1);
    }

    console.log(`Generating high-quality icons from ${SVG_PATH}...`);

    for (const [dir, size] of Object.entries(DENSITIES)) {
        const outDir = path.join(ANDROID_RES_PATH, dir);
        if (!fs.existsSync(outDir)) {
            console.log(`Creating directory: ${outDir}`);
            fs.mkdirSync(outDir, { recursive: true });
        }

        const iconPath = path.join(outDir, 'ic_launcher.png');
        const roundIconPath = path.join(outDir, 'ic_launcher_round.png');

        try {
            // Generate ic_launcher.png with high density rendering
            await sharp(SVG_PATH, { density: 300 })
                .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                .png({ quality: 100, compressionLevel: 9 })
                .toFile(iconPath);
            console.log(`Generated ${iconPath} (${size}x${size})`);

            // Generate ic_launcher_round.png (same as square for now - proper circular mask requires adaptive icons)
            await sharp(SVG_PATH, { density: 300 })
                .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                .png({ quality: 100, compressionLevel: 9 })
                .toFile(roundIconPath);
            console.log(`Generated ${roundIconPath} (${size}x${size})`);

        } catch (err) {
            console.error(`Error generating for ${dir}:`, err);
        }
    }

    console.log('Done! All icons generated.');
}

generate();

