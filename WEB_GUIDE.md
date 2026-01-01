# Web Development Setup Guide

This guide explains how to run the React Native application in a web browser using Webpack and React Native Web. This allows for faster UI development without the need for Android or iOS emulators.

## Prerequisites

- Node.js (>= 18)
- Yarn
- Dependencies installed (`yarn install`)

## Steps to Enable Web Build

The project has been configured to support `react-native-web` through a custom Webpack configuration.

### 1. Webpack Configuration (`webpack.config.js`)

The `webpack.config.js` file handles the bundling of the application for the web. Key configurations include:

-   **Entry Point**: `index.web.tsx` which initializes the React Native app for the DOM.
-   **HtmlWebpackPlugin**: Injects the bundled script into `index.html`.
-   **Babel Loader**: Transpiles JavaScript and TypeScript files. Crucially, it includes specific `node_modules` that are published as untranspiled ES6/JSX (e.g., `react-native-reanimated`, `react-native-gesture-handler`, `tamagui`).
-   **Aliases**: Maps `react-native` imports to `react-native-web`.
-   **Mocks**: Native modules that are incompatible with web (e.g., `react-native-maps`, `react-native-camera-roll`) are mocked or replaced with web-compatible versions (`react-native-web-maps`, `react-native-web-linear-gradient`) or empty modules.
-   **Asset Loaders**: Handles images, fonts (`.ttf`), and SVGs (`@svgr/webpack`).

### 2. Run the Web Server

To start the development server:

```bash
yarn web
```

This command runs `webpack serve`, which starts a local development server at `http://localhost:8080`.

### 3. Open in Browser

Once the server is running, open your web browser and navigate to:

```
http://localhost:8080
```

You should see the application's main screen (e.g., the Boot screen or Login screen).

## Troubleshooting

-   **Missing Modules**: If you encounter errors about missing modules during the build, ensure they are added to the `compileNodeModules` array in `webpack.config.js` to be transpiled.
-   **Vector Icons**: If icons are missing, ensure the font files are correctly loaded. The current config handles `.ttf` files, but you may need to inject the font styles into the document head if `react-native-vector-icons` does not do it automatically for web.
-   **Tamagui**: Tamagui should work out of the box with the provided configuration. If issues arise, check the `tamagui-loader` setup (currently relying on babel plugin).
-   **Native Modules**: If a new native module causes build errors, add a mock for it in `webpack.config.js` under `resolve.alias`.

## Build for Production

To build the web application for production (output to `dist/`):

```bash
webpack --mode production
```
