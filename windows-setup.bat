@echo off

rem Check if Docker is installed
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Docker is not installed. Please install Docker before running this script.
    exit /b 1
)

rem Check if yarn is installed
where yarn >nul 2>nul
if %errorlevel% neq 0 (
    echo Yarn is not installed. Installing Yarn using npm...
    npm install -g yarn

    rem Check if yarn installation was successful
    if %errorlevel% neq 0 (
        echo Error: Yarn installation failed. Please check the installation and try again.
        exit /b 1
    )

    echo Yarn installed successfully.
)

rem Run Docker Compose
echo Running Docker Compose...
docker-compose down
docker-compose up -d

rem Check if Docker Compose execution was successful
if %errorlevel% neq 0 (
    echo Error: Docker Compose execution failed. Please check the configuration and try again.
    exit /b 1
)

rem Install packages using yarn
echo Installing project dependencies using yarn...
yarn install

rem Check if yarn install was successful
if %errorlevel% neq 0 (
    echo Error: Yarn install failed. Please check the installation and try again.
    exit /b 1
)

echo Migrating Database...
rmdir /s /q .\src\migrations
yarn run migration:generate .\src\migrations\initialMigration
yarn run migration:run

exit /b 0
