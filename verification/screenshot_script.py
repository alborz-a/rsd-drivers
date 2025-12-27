from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console logs
        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"Page Error: {exc}"))

        try:
            print("Navigating to http://localhost:8080")
            page.goto("http://localhost:8080", timeout=60000)

            # Wait a bit for JS to execute
            page.wait_for_timeout(5000)

            # Take a screenshot regardless of state
            screenshot_path = "/home/jules/verification/app_screenshot.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
