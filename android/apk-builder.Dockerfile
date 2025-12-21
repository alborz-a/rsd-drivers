FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    wget \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set up environment variables
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV ANDROID_HOME=/opt/android-sdk
ENV PATH=${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools

# Download and install Android Command Line Tools
WORKDIR /opt/android-sdk
RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O cmdline-tools.zip \
    && unzip -q cmdline-tools.zip \
    && mkdir -p cmdline-tools/latest \
    && mv cmdline-tools/bin cmdline-tools/latest/ \
    && mv cmdline-tools/lib cmdline-tools/latest/ \
    && mv cmdline-tools/NOTICE.txt cmdline-tools/latest/ \
    && mv cmdline-tools/source.properties cmdline-tools/latest/ \
    && rm cmdline-tools.zip

# Accept licenses and install SDK components
RUN yes | sdkmanager --licenses \
    && sdkmanager "platform-tools" \
    "platforms;android-35" \
    "build-tools;35.0.0" \
    "ndk;27.1.12297006"

WORKDIR /app
