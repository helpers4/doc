#!/bin/bash

# Setup script for Helpers4 Documentation development container

set -e

echo "🚀 Setting up Helpers4 Documentation development environment..."

# Update package lists
echo "📦 Updating package lists..."
sudo apt-get update -qq

# Install additional tools
echo "🔧 Installing additional development tools..."
sudo apt-get install -y -qq \
    curl \
    wget \
    unzip \
    tree \
    jq

# Configure git (if not already configured)
if [ -z "$(git config --global user.name)" ]; then
    echo "⚙️  Please configure git:"
    echo "git config --global user.name 'Your Name'"
    echo "git config --global user.email 'your.email@example.com'"
fi

# Setup helpful aliases
echo "🔗 Setting up helpful aliases..."
cat >> ~/.zshrc << 'EOF'

# Helpers4 Documentation aliases
alias docs-start="bun run start"
alias docs-build="bun run build"
alias docs-deploy="bun run deploy"
alias docs-clear="bun run clear"
alias docs-serve="bun run serve"
alias docs-version="bun scripts/version.ts"

# Common shortcuts
alias ll="ls -la"
alias la="ls -A"
alias l="ls -CF"
alias ..="cd .."
alias ...="cd ../.."

# Git shortcuts
alias gs="git status"
alias ga="git add"
alias gc="git commit"
alias gp="git push"
alias gl="git log --oneline"
alias gd="git diff"

EOF

# Create useful scripts directory
mkdir -p ~/.local/bin

# Add local bin to PATH if not already there
if ! echo $PATH | grep -q "$HOME/.local/bin"; then
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
fi

# Setup project-specific configuration
echo "📝 Setting up project configuration..."

# Create .vscode directory if it doesn't exist
mkdir -p .vscode

# Create settings.json for VS Code
cat > .vscode/settings.json << 'EOF'
{
  "typescript.preferences.useAliasesForRenames": false,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.workingDirectories": ["."],
  "files.exclude": {
    "**/node_modules": true,
    "**/.docusaurus": true,
    "**/build": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/.docusaurus": true,
    "**/build": true,
    "**/bun.lockb": true
  },
  "markdown.extension.toc.levels": "2..6",
  "markdown.extension.preview.autoShowPreviewToSide": true,
  "[markdown]": {
    "editor.wordWrap": "on",
    "editor.rulers": [80],
    "editor.quickSuggestions": {
      "comments": "off",
      "strings": "off", 
      "other": "off"
    }
  },
  "bun.runtime": "bun",
  "npm.packageManager": "bun"
}
EOF

# Create launch.json for debugging
cat > .vscode/launch.json << 'EOF'
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Docusaurus",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/@docusaurus/core/bin/docusaurus.js",
      "args": ["start"],
      "console": "integratedTerminal",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
EOF

# Make scripts executable
chmod +x scripts/*.ts 2>/dev/null || true

echo "✅ Development environment setup complete!"
echo ""
echo "🎉 You're all set! Here are some useful commands:"
echo "  • bun run start        - Start development server"
echo "  • bun run build        - Build for production"
echo "  • bun run deploy       - Deploy to GitHub Pages"
echo "  • bun scripts/version.ts create - Create new documentation version"
echo ""
echo "📚 Happy documenting!"
