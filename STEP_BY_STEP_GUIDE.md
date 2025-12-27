# How to Run the App in Browser (yarn web)

This guide details how we enabled running the React Native app in a web browser using `webpack` and `react-native-web`.

## Overview

The project already had `react-native-web` and `webpack` dependencies, but the configuration was incomplete and incompatible with the current dependencies (like `react-native-reanimated`, `tamagui`, and native modules).

We performed the following steps to make it work:

1.  **Created Mock Files**: Many React Native libraries (e.g., `react-native-maps`, `react-native-background-geolocation`, `react-native-vision-camera`) rely on native modules that do not exist in a browser environment. We created mock implementations in `webpack/mocks/` to shim these libraries.
2.  **Configured Webpack**: We updated `webpack.config.js` to:
    -   Use `HtmlWebpackPlugin` to serve `index.html`.
    -   Alias incompatible native libraries to our mocks.
    -   Configure `babel-loader` to compile necessary `node_modules` (including `react-native` packages).
    -   Handle assets like images and fonts.

## Steps to Run

1.  **Install Dependencies**: Ensure all dependencies are installed.
    ```bash
    yarn install
    ```

2.  **Run the Web Server**:
    ```bash
    yarn web
    ```
    This command runs `webpack serve`.

3.  **Open in Browser**:
    The server typically starts at `http://localhost:8080`.

## Configuration Details

### Webpack Config (`webpack.config.js`)

We heavily modified `webpack.config.js`. Key changes include:
-   **Aliases**: Mapping `react-native` to `react-native-web` and native libraries to `webpack/mocks/*`.
-   **Loaders**: Using `babel-loader` with specific presets for React Native, and `url-loader` for assets.
-   **Plugins**: `HtmlWebpackPlugin` injects the bundle into `index.html`. `DefinePlugin` sets `__DEV__` and `process.env`.

### Mocks (`webpack/mocks/`)

We created mocks for:
-   `react-native-background-geolocation`
-   `react-native-vision-camera`
-   `react-native-permissions`
-   `react-native-keychain`
-   `react-native-fs`
-   `react-native-device-info`
-   `react-native-config`
-   `react-native-maps`
-   `react-native-fast-image`
-   `react-native-linear-gradient`

These mocks export empty objects, no-op functions, or simple React components (`View`, `Image`) to prevent runtime crashes when the app tries to import or render them.

## Troubleshooting

-   **"Module not found"**: If you add a new native library, you may need to add a mock for it in `webpack.config.js` aliases.
-   **Styling issues**: `react-native-web` approximates native styling but isn't 100% identical. Some Tamagui or specialized styles might look different.
