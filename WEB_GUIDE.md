# Web Setup Guide

This guide explains how to run the React Native application in a web browser using `yarn web`.

## Prerequisites

- Node.js (version 18 or higher)
- Yarn

## Configuration

The web configuration is handled primarily by `webpack.config.js` and `babel.config.js`.

### webpack.config.js

The `webpack.config.js` file has been updated to support React Native Web features:

1.  **Entry Point**: Configured to use `./index.web.tsx`.
2.  **Aliases**: `react-native` is aliased to `react-native-web`.
3.  **Transpilation**: `babel-loader` is configured to transpile:
    - The source code (`src/`, `App.tsx`, `index.web.tsx`).
    - Necessary `node_modules` that publish ES6/JSX code (e.g., `react-native-reanimated`, `react-native-gesture-handler`, `@react-navigation`, `tamagui`, etc.).
    - It uses the project's `babel.config.js` and ensures `react-native-web` plugin is active.
4.  **Assets**: Loaders for images (`.png`, `.jpg`, `.svg`) and fonts (`.ttf`) are configured using `asset/resource` to bundle them correctly.
5.  **HtmlWebpackPlugin**: Injects the bundled script into `index.html`.
6.  **Dev Server**: Configured with `historyApiFallback: true` to support client-side routing.
7.  **Mocks**: Several native-only libraries have been mocked or aliased to support web execution where web implementations were missing.

### Mocks for Native Modules

To enable the app to run in the browser without crashing on native dependencies, several mocks were created in the `mocks/` directory:

-   `react-native-linear-gradient`: Mocked as a simple `View`.
-   `react-native-maps`: Mocked `MapView` and sub-components as `View` and `Text`.
-   `react-native-maps-directions`: Mocked as an empty component.
-   `@invertase/react-native-apple-authentication`: Mocked to render a simple "Sign in with Apple (Mock)" button.
-   `@react-native-community/blur`: Mocked `BlurView` and `VibrancyView` as `View`.

These mocks are aliased in `webpack.config.js`.

### Babel Configuration

The setup leverages the existing `babel.config.js`, which includes presets and plugins for React Native, Reanimated, and Tamagui.

## How to Run

1.  **Install Dependencies**: Ensure all packages are installed.
    ```bash
    yarn install
    ```

2.  **Start the Web Server**:
    ```bash
    yarn web
    ```
    This runs `webpack serve`. The server usually starts at `http://localhost:8080`.

3.  **Access the App**: Open your browser and navigate to `http://localhost:8080`.

## Troubleshooting

-   **Process is not defined**: A `DefinePlugin` entry for `process: { env: {} }` is included in webpack config to polyfill `process.env` which is often accessed by libraries.
-   **Missing Modules**: If a library causes a syntax error (unexpected token), add it to the `compileNodeModules` array in `webpack.config.js` to ensure it gets transpiled.
-   **Module Not Found**: If a native module is missing, consider adding a mock in `mocks/` and aliasing it in `webpack.config.js`.
