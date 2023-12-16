#!/bin/bash

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker before running this script."
    exit 1
fi

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "Yarn is not installed. Installing Yarn using npm..."
    npm install -g yarn

    # Check if yarn installation was successful
    if [ $? -ne 0 ]; then
        echo "Error: Yarn installation failed. Please check the installation and try again."
        exit 1
    fi

    echo "Yarn installed successfully."
fi

# Run Docker Compose
echo "Running Docker Compose..."
sudo docker-compose down
sudo docker-compose up -d

# Check if Docker Compose execution was successful
if [ $? -ne 0 ]; then
    echo "Error: Docker Compose execution failed. Please check the configuration and try again."
    exit 1
fi

# Install packages using yarn
echo "Installing project dependencies using yarn..."
yarn install

# Check if yarn install was successful
if [ $? -ne 0 ]; then
    echo "Error: Yarn install failed. Please check the installation and try again."
    exit 1
fi
 
echo "Migrating Database..."
rm -rfv ./src/migrations
yarn run migration:generate ./src/migrations/initialMigration
yarn run migration:run
