#!/usr/bin/env pwsh

Write-Host "🔍 Android Environment Check" -ForegroundColor Cyan
Write-Host ""

# Java
Write-Host "☕ Java:" -ForegroundColor Yellow
Write-Host "  JAVA_HOME: $env:JAVA_HOME"
if (Test-Path "$env:JAVA_HOME\bin\java.exe") {
    & "$env:JAVA_HOME\bin\java.exe" -version 2>&1 | Select-Object -First 1
} else {
    Write-Host "  ❌ Java not found!" -ForegroundColor Red
}
Write-Host ""

# Android SDK
Write-Host "📱 Android SDK:" -ForegroundColor Yellow
Write-Host "  ANDROID_HOME: $env:ANDROID_HOME"
Write-Host "  Exists: $(Test-Path $env:ANDROID_HOME)"
Write-Host "  platform-tools: $(Test-Path "$env:ANDROID_HOME\platform-tools")"
Write-Host "  build-tools: $(Test-Path "$env:ANDROID_HOME\build-tools")"
Write-Host "  cmdline-tools: $(Test-Path "$env:ANDROID_HOME\cmdline-tools")"
Write-Host ""

# Find sdkmanager
Write-Host "🔧 Finding sdkmanager..." -ForegroundColor Yellow
$sdkmanager = Get-ChildItem "$env:ANDROID_HOME" -Recurse -Filter "sdkmanager.bat" -ErrorAction SilentlyContinue | Select-Object -First 1
if ($sdkmanager) {
    Write-Host "  ✅ Found: $($sdkmanager.FullName)" -ForegroundColor Green
} else {
    Write-Host "  ❌ Not found!" -ForegroundColor Red
}
Write-Host ""

# NDK
Write-Host "🛠️ NDK:" -ForegroundColor Yellow
if (Test-Path "$env:ANDROID_HOME\ndk") {
    Get-ChildItem "$env:ANDROID_HOME\ndk" | ForEach-Object {
        Write-Host "  ✅ $($_.Name)" -ForegroundColor Green
    }
} else {
    Write-Host "  ❌ No NDK found!" -ForegroundColor Red
}
Write-Host ""

# CMake
Write-Host "⚙️ CMake:" -ForegroundColor Yellow
if (Test-Path "$env:ANDROID_HOME\cmake") {
    Get-ChildItem "$env:ANDROID_HOME\cmake" | ForEach-Object {
        Write-Host "  ✅ $($_.Name)" -ForegroundColor Green
    }
} else {
    Write-Host "  ❌ No CMake found!" -ForegroundColor Red
}
Write-Host ""

# Gradle
Write-Host "🐘 Gradle:" -ForegroundColor Yellow
if (Test-Path "android\gradlew.bat") {
    Write-Host "  ✅ gradlew.bat exists" -ForegroundColor Green
} else {
    Write-Host "  ❌ gradlew.bat not found!" -ForegroundColor Red
}
Write-Host ""

# Running Java processes
Write-Host "🔴 Running Java processes:" -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*java*"} | Format-Table ProcessName, Id, CPU, WorkingSet -AutoSize