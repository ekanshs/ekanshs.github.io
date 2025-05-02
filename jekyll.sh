#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if we're in a Jekyll project
is_jekyll_project() {
    [ -f "_config.yml" ] && [ -d "_layouts" ]
}

# Function to install dependencies
install_deps() {
    echo -e "${YELLOW}Installing dependencies...${NC}"
    if ! command_exists "bundle"; then
        echo -e "${RED}Error: Bundler is not installed. Please install Ruby and Bundler first.${NC}"
        exit 1
    fi
    bundle install
}

# Function to build the site
build_site() {
    echo -e "${YELLOW}Building Jekyll site...${NC}"
    if ! is_jekyll_project; then
        echo -e "${RED}Error: Not a Jekyll project. Please run this script from the root of your Jekyll project.${NC}"
        exit 1
    fi
    bundle exec jekyll build
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Site built successfully!${NC}"
    else
        echo -e "${RED}Error building site.${NC}"
        exit 1
    fi
}

# Function to serve the site locally
serve_site() {
    echo -e "${YELLOW}Starting Jekyll server...${NC}"
    if ! is_jekyll_project; then
        echo -e "${RED}Error: Not a Jekyll project. Please run this script from the root of your Jekyll project.${NC}"
        exit 1
    fi
    bundle exec jekyll serve --livereload
}

# Function to clean build artifacts
clean_site() {
    echo -e "${YELLOW}Cleaning build artifacts...${NC}"
    rm -rf _site
    rm -rf .jekyll-cache
    echo -e "${GREEN}Build artifacts cleaned!${NC}"
}

# Function to deploy the site (placeholder - customize this for your deployment method)
deploy_site() {
    echo -e "${YELLOW}Deploying site...${NC}"
    # Add your deployment commands here
    # For example, if using GitHub Pages:
    # git push origin gh-pages
    echo -e "${YELLOW}Please customize the deploy_site function in the script for your deployment method.${NC}"
}

# Show help message
show_help() {
    echo -e "${YELLOW}Jekyll Site Manager${NC}"
    echo "Usage: ./jekyll.sh [command]"
    echo ""
    echo "Commands:"
    echo "  install    - Install dependencies"
    echo "  build      - Build the site"
    echo "  serve      - Serve the site locally"
    echo "  clean      - Clean build artifacts"
    echo "  deploy     - Deploy the site"
    echo "  help       - Show this help message"
}

# Main script logic
case "$1" in
    install)
        install_deps
        ;;
    build)
        build_site
        ;;
    serve)
        serve_site
        ;;
    clean)
        clean_site
        ;;
    deploy)
        deploy_site
        ;;
    help|*)
        show_help
        ;;
esac 