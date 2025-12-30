const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Paths
const BG_IMAGE_PATH = path.resolve(__dirname, '../assets/motor_peak_logo_box_splash.png');
const LOGO_PATH = path.resolve(__dirname, '../assets/MainLogo-Drivers-Yellow.svg');
const OUTPUT_PATH = path.resolve(__dirname, '../assets/splash-screen.png');

// Dimensions
const CANVAS_WIDTH = 2351;
const CANVAS_HEIGHT = 500;

async function main() {
    console.log('Starting splash screen composition...');

    if (!fs.existsSync(BG_IMAGE_PATH)) {
        console.error(`Background image not found: ${BG_IMAGE_PATH}`);
        console.error('Please generate or place the background image first.');
        process.exit(1);
    }

    if (!fs.existsSync(LOGO_PATH)) {
        console.error(`Logo not found: ${LOGO_PATH}`);
        process.exit(1);
    }

    try {
        console.log('Loading background...');
        // Resize background to fit EXACTLY the canvas text
        const backgroundBuffer = await sharp(BG_IMAGE_PATH)
            .resize(CANVAS_WIDTH, CANVAS_HEIGHT, {
                fit: 'cover',
                position: 'center'
            })
            .toBuffer();

        console.log('Loading logo...');
        // Load logo
        // We want the logo to be prominent. Let's say 40% of height?
        const LOGO_HEIGHT = Math.floor(CANVAS_HEIGHT * 0.6);

        const logoBuffer = await sharp(LOGO_PATH)
            .resize({ height: LOGO_HEIGHT })
            .toBuffer();

        console.log('Compositing...');

        // Composite
        await sharp({
            create: {
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        })
            .composite([
                { input: backgroundBuffer, top: 0, left: 0 },
                { input: logoBuffer, gravity: 'center' } // Center the logo on the background
            ])
            .png()
            .toFile(OUTPUT_PATH);

        console.log(`Successfully created ${OUTPUT_PATH}`);

    } catch (error) {
        console.error('Error creating splash screen:', error);
        process.exit(1);
    }
}

main();
