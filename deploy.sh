#!/bin/bash

# Deployment Script for Golang Backend and Next.js Frontend

# Exit on any error
set -e

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print status messages
print_status() {
    echo -e "${GREEN}[DEPLOY]${NC} $1"
}

# Function to print error messages
print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to print warning messages
print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if Docker is installed
command -v docker >/dev/null 2>&1 || {
    print_error "Docker is not installed. Please install Docker first."
    exit 1
}

# Check if Docker Compose is installed
command -v docker-compose >/dev/null 2>&1 || {
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
}

# Parse command-line arguments
BUILD_FLAG=false
PUSH_FLAG=false
DEPLOY_FLAG=false

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -b|--build) BUILD_FLAG=true ;;
        -p|--push) PUSH_FLAG=true ;;
        -d|--deploy) DEPLOY_FLAG=true ;;
        *) print_error "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

# Paths to backend and frontend directories
BACKEND_DIR="./server"
FRONTEND_DIR="./web"

# Docker image names (customize these)
BACKEND_IMAGE="full-docker/backend"
FRONTEND_IMAGE="full-docker/frontend"

# Backend build and deployment
backend_build() {
    print_status "Building Golang Backend..."
    cd "$BACKEND_DIR"

    # Build Docker image for backend
    docker build -t "$BACKEND_IMAGE:latest" .

    print_status "Golang Backend image built successfully"
    cd ..
}

# Frontend build and deployment
frontend_build() {
    print_status "Building Next.js Frontend..."
    cd "$FRONTEND_DIR"

    # Build Docker image for frontend
    docker build -t "$FRONTEND_IMAGE:latest" .

    print_status "Next.js Frontend image built successfully"
    cd ..
}

# Push images to registry
push_images() {
    print_status "Pushing Docker images to registry..."

    docker push "$BACKEND_IMAGE:latest"
    docker push "$FRONTEND_IMAGE:latest"

    print_status "Images pushed successfully"
}

# Deploy using Docker Compose
deploy() {
    print_status "Deploying services with Docker Compose..."

    # Use docker-compose to start services
    docker-compose up -d

    print_status "Deployment completed successfully"

    # Show running containers
    docker-compose ps
}

# Main deployment workflow
main() {
    # Build images if specified
    if [ "$BUILD_FLAG" = true ]; then
        backend_build
        frontend_build
    fi

    # Push images if specified
    if [ "$PUSH_FLAG" = true ]; then
        push_images
    fi

    # Deploy if specified
    if [ "$DEPLOY_FLAG" = true ]; then
        deploy
    fi

    # If no flags provided, show usage
    if [ "$BUILD_FLAG" = false ] && [ "$PUSH_FLAG" = false ] && [ "$DEPLOY_FLAG" = false ]; then
        print_warning "No action specified. Use flags:"
        print_warning "-b/--build  : Build Docker images"
        print_warning "-p/--push   : Push images to registry"
        print_warning "-d/--deploy : Deploy using Docker Compose"
        exit 1
    fi
}

# Run the main function
main