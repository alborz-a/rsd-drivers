const sharp = require('sharp');
const fs = require('fs');

const SPLASH_SVG = 'assets/splash-screen.svg';
const LOGO_SVG = 'assets/icon-yellow.svg';

async function generate() {
    console.log('Preparing PNG assets from SVGs...');

    // 1. Update Splash PNG (input for generate:launch-screen)
    if (fs.existsSync(SPLASH_SVG)) {
        // Note: background color matches --background=#111827 in package.json
        await sharp(SPLASH_SVG, { density: 300 })
            // Resize to a reasonable base size for bootsplash generation
            .resize(1024, 1024, { fit: 'contain', background: { r: 17, g: 24, b: 39, alpha: 1 } })
            .png()
            .toFile('assets/splash-screen.png');
        console.log('✓ Updated assets/splash-screen.png');
    } else {
        console.error('! assets/splash-screen.svg not found');
    }

    // 2. Update Internal Logo (used in LoginScreen)
    if (fs.existsSync(LOGO_SVG)) {
        await sharp(LOGO_SVG, { density: 300 })
            .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .png()
            .toFile('assets/navigator-icon-transparent.png');
        console.log('✓ Updated assets/navigator-icon-transparent.png');
    } else {
        console.error('! assets/icon-yellow.svg not found');
    }
}

generate();
