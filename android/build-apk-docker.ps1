$ErrorActionPreference = "Stop"

# Get the absolute path of the current 'android' directory
$AndroidDir = Get-Location
# Get the project root (one level up)
$ProjectRoot = Split-Path -Parent $AndroidDir

Write-Host "Android Dir: $AndroidDir"
Write-Host "Project Root: $ProjectRoot"

# Build the Docker image
Write-Host "Building Docker image..."
# We run build from within android dir, using Dockerfile in current dir
docker build -t navigator-apk-builder -f apk-builder.Dockerfile .

# Create cache directory in the project root if it doesn't exist
$CacheDir = Join-Path $ProjectRoot ".gradle_cache"
if (-not (Test-Path $CacheDir)) {
    New-Item -ItemType Directory -Force -Path $CacheDir | Out-Null
}

# Run the build container
Write-Host "Starting build inside container..."

# We mount the entire project root to /app
# We set working directory to /app/android so gradlew is found
# We mount the cache
docker run --rm `
    -v "${ProjectRoot}:/app" `
    -v "${CacheDir}:/root/.gradle" `
    -w /app/android `
    navigator-apk-builder `
    bash -c "chmod +x gradlew && ./gradlew assembleDebug -Psdk.dir=/opt/android-sdk"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful! APK should be in android/app/build/outputs/apk/debug/" -ForegroundColor Green
} else {
    Write-Host "Build failed." -ForegroundColor Red
}
