const { chromium } = require('playwright');
const path = require('path');

(async () => {
    let browser;
    try {
        browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // Capture console messages
        const consoleMessages = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleMessages.push(msg.text());
                console.error(`PAGE ERROR: ${msg.text()}`);
            } else {
                console.log(`PAGE LOG: ${msg.text()}`);
            }
        });

        page.on('pageerror', exception => {
            console.error(`PAGE EXCEPTION: ${exception.stack || exception}`);
        });

        console.log('Navigating to http://localhost:8080');
        await page.goto('http://localhost:8080', { timeout: 30000 });

        console.log('Waiting for #bootsplash to be removed or hidden...');
        try {
            await page.waitForSelector('#bootsplash', { state: 'hidden', timeout: 5000 });
        } catch (e) {
            console.log('Bootsplash might still be present, checking opacity or display...');
        }

        console.log('Waiting for Login Screen elements...');
        // Try waiting for ANY text content that indicates app loaded.
        try {
            // Wait for something that isn't the splash screen
            await page.waitForFunction(() => {
                const splash = document.getElementById('bootsplash');
                return !splash || splash.style.display === 'none';
            }, { timeout: 10000 });
            console.log('Bootsplash is confirmed hidden via waitForFunction.');
        } catch(e) {
             console.log('Bootsplash might still be visible.');
        }

        // Try to find the version text which comes from DeviceInfo mock "1.0.0"
        try {
            await page.waitForSelector('text=v1.0.0', { timeout: 5000 });
            console.log('Found version text v1.0.0');
        } catch (e) {
             console.log('Could not find version text.');
        }

        try {
            await page.waitForSelector('text=Continue with Phone', { timeout: 2000 });
            console.log('Found "Continue with Phone" text');
        } catch (e) {}

        // Wait a bit
        await page.waitForTimeout(2000);

        console.log('Taking screenshot...');
        await page.screenshot({ path: 'login_page.png' });
        console.log('Screenshot saved to login_page.png');

        // Check for collected console errors
        const benignErrors = [
             // Add known benign errors here if any
             'Warning: ' // React warnings
        ];

        const realErrors = consoleMessages.filter(msg => !benignErrors.some(be => msg.includes(be)));

        if (realErrors.length > 0) {
            console.error('Found console errors:', realErrors);
            // We verify visually mostly, but errors are bad.
        }

    } catch (error) {
        console.error('Verification script failed:', error);
        if (browser) {
             try {
                const pages = await browser.contexts()[0].pages();
                if (pages.length > 0) {
                    await pages[0].screenshot({ path: 'error_screenshot.png' });
                    console.log('Saved error_screenshot.png');
                }
             } catch(e) { console.log('Could not save error screenshot'); }
        }
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
})();
