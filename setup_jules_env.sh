#!/bin/bash
set -e

echo "🚀 Starting Jules Environment Initialization..."

# 1. Setup Environment Variables
# Using a directory in the user's home to avoid repo pollution, or use a specific path.
# Assuming this script is run by the user 'jules' (or equivalent) in the repo root.

export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"

echo "📂 Setting Android SDK Root to: $ANDROID_HOME"

# 2. Install Android SDK Command Line Tools
if [ ! -d "$ANDROID_HOME/cmdline-tools/latest" ]; then
    echo "⬇️  Downloading Android Command Line Tools..."
    mkdir -p "$ANDROID_HOME"

    # Download cmdline-tools
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O cmdline-tools.zip

    # Extract
    unzip -q cmdline-tools.zip
    mkdir -p "$ANDROID_HOME/cmdline-tools/latest"
    mv cmdline-tools/* "$ANDROID_HOME/cmdline-tools/latest/"
    rm -f cmdline-tools.zip
    rm -rf cmdline-tools # Cleanup empty dir if any

    echo "✅ Android Command Line Tools installed."
else
    echo "✅ Android Command Line Tools already present."
fi

# Add to PATH temporarily for this script
export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools"

# 3. Accept Licenses and Install SDK Packages
echo "📦 Installing Android SDK Packages..."
yes | sdkmanager --licenses > /dev/null 2>&1
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

echo "✅ SDK Packages installed."

# 4. Configure android/local.properties
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
echo "📄 Created android/local.properties"

# 5. Create .env file
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cat > .env <<EOF
APP_NAME=EtemadLife
APP_IDENTIFIER=delivery.etemadlife.platform.drivers
APP_LINK_PREFIX=royalstars-el
FLEETBASE_HOST=https://api.platform.etemadlife.delivery
FLEETBASE_KEY=flb_live_PcN1McEg2CoosoEipiMW
GOOGLE_MAPS_API_KEY=YOUR_REAL_KEY_HERE
DEFAULT_COORDINATES=36.5399,52.6783
FACEBOOK_APP_ID=YOUR_REAL_APP_ID
FACEBOOK_CLIENT_TOKEN=YOUR_REAL_TOKEN
GOOGLE_CLIENT_ID=YOUR_REAL_CLIENT_ID
GOOGLE_IOS_CLIENT_ID=YOUR_REAL_IOS_CLIENT_ID
TRANSISTORSOFT_LICENSE_KEY=dummy
STOREFRONT_KEY=dummy
ANDROID_VERSION_NAME=1.0.0-local
EOF
    echo "✅ .env created."
else
    echo "ℹ️  .env already exists, skipping."
fi

# 6. Create android/app/google-services.json
mkdir -p android/app
if [ ! -f "android/app/google-services.json" ]; then
    echo "📝 Creating android/app/google-services.json..."
    cat > android/app/google-services.json <<EOF
{
  "project_info": {
    "project_number": "953384484556",
    "project_id": "device-streaming-223e4633",
    "storage_bucket": "device-streaming-223e4633.firebasestorage.app"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:953384484556:android:89d76f400677416f4a8c69",
        "android_client_info": {
          "package_name": "delivery.etemadlife.platform.drivers"
        }
      },
      "oauth_client": [],
      "api_key": [
        {
          "current_key": "AIzaSyDRIKN7iALTxGEz7QVD8bGRUfaC9Tt1My0"
        }
      ],
      "services": {
        "appinvite_service": {
          "other_platform_oauth_client": []
        }
      }
    }
  ],
  "configuration_version": "1"
}
EOF
    echo "✅ google-services.json created."
else
    echo "ℹ️  google-services.json already exists, skipping."
fi

# 7. Configure Gradle Memory Settings (Fix OOM)
GRADLE_PROP="android/gradle.properties"
if grep -q "org.gradle.jvmargs=-Xmx2048m" "$GRADLE_PROP"; then
    echo "ℹ️  Gradle memory settings already configured."
else
    echo "🔧 Updating gradle.properties to increase memory..."
    # Ensure newline before appending
    echo "" >> "$GRADLE_PROP"
    echo "org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m" >> "$GRADLE_PROP"
    echo "✅ gradle.properties updated."
fi

# 8. Install Node Dependencies
echo "📦 Installing Node dependencies..."
corepack enable
corepack prepare yarn@3.6.4 --activate
yarn install --immutable
echo "✅ Node dependencies installed."

echo "🎉 Environment initialization complete! You can now run the build."
echo "👉 To build: cd android && ./gradlew assembleDebug"
