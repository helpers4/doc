# Helpers4 Documentation

This repository contains the documentation website for the Helpers4 TypeScript utility library, built with [Docusaurus](https://docusaurus.io/).

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/helpers4/doc.git
   cd doc
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start development server**
   ```bash
   bun start
   ```

   This will start the development server at `http://localhost:3000`. The site will automatically reload when you make changes.

### Using Dev Container

If you prefer using VS Code with Dev Containers:

1. Open the project in VS Code
2. When prompted, click "Reopen in Container" or use Command Palette: `Dev Containers: Reopen in Container`
3. The container will automatically set up the environment and install dependencies
4. Run `bun start` to start the development server

## 📁 Project Structure

```
├── docs/                          # Documentation content
│   ├── intro.md                   # Introduction page
│   ├── getting-started.md         # Getting started guide
│   ├── api/                       # API reference documentation
│   │   ├── array/                 # Array helpers documentation
│   │   ├── function/              # Function helpers documentation
│   │   └── ...                    # Other categories
│   └── examples/                  # Usage examples
├── src/                           # React components and pages
│   ├── components/                # Reusable React components
│   ├── css/                       # Global styles
│   └── pages/                     # Custom pages (playground, comparison)
├── static/                        # Static assets (images, files)
├── scripts/                       # Build and deployment scripts
│   ├── deploy.ts                  # GitHub Pages deployment script
│   └── version.ts                 # Version management script
├── docusaurus.config.ts           # Docusaurus configuration
├── sidebars.ts                    # Sidebar configuration
└── package.json                   # Dependencies and scripts
```

## 🛠️ Available Scripts

### Development
- `bun start` - Start development server with hot reload
- `bun build` - Build the website for production
- `bun serve` - Serve the production build locally
- `bun clear` - Clear Docusaurus cache

### Documentation Management
- `bun scripts/version.ts create [version]` - Create a new documentation version
- `bun scripts/version.ts list` - List all available versions

### Deployment
- `bun deploy` - Build and deploy to GitHub Pages

### Code Quality
- `bun lint` - Run ESLint
- `bun lint:fix` - Fix ESLint issues automatically
- `bun typecheck` - Run TypeScript type checking

## 📚 Content Management

### Adding New Documentation

1. **API Documentation**: Add new `.md` files in `docs/api/[category]/`
2. **Guides and Examples**: Add files in `docs/examples/`
3. **Update Sidebar**: Modify `sidebars.ts` to include new pages

### Creating New Versions

When a new version of Helpers4 is released:

```bash
# Create documentation for version 2.1.0
bun scripts/version.ts create 2.1.0

# Or auto-detect version from the main library
bun scripts/version.ts create
```

This will:
- Create a snapshot of current documentation
- Update the version selector
- Preserve older versions for reference

### Writing Documentation

Follow these guidelines:

- **Use clear headings**: Structure content with H1, H2, H3 headings
- **Include examples**: Provide practical code examples for each function
- **Add type signatures**: Show TypeScript function signatures
- **Explain use cases**: Describe when and why to use each helper
- **Link related functions**: Cross-reference related helpers

## 🎨 Customization

### Theme and Styling

- **Colors**: Modify CSS variables in `src/css/custom.css`
- **Components**: Customize React components in `src/components/`
- **Layout**: Modify layout in `docusaurus.config.ts`

### Interactive Features

- **Playground**: Interactive code editor in `src/pages/playground.tsx`
- **Dark/Light mode**: Toggle implementation in custom CSS
- **Search**: Configured with Algolia DocSearch

## 🚢 Deployment

### Automatic Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

```bash
# Build and deploy to GitHub Pages
bun deploy
```

This script will:
1. Build the documentation
2. Push to the `gh-pages` branch
3. Update the live site at `https://helpers4.github.io/doc/`

### Custom Domain Setup

To use a custom domain:

1. Add your domain to the `CNAME` file in the `static/` directory
2. Configure DNS to point to `helpers4.github.io`
3. Update the `url` in `docusaurus.config.ts`

## 🔧 Configuration

### Docusaurus Configuration

Key configuration options in `docusaurus.config.ts`:

- **Site metadata**: Title, description, favicon
- **Theme configuration**: Colors, navbar, footer
- **Plugin settings**: Search, analytics, versioning
- **Deployment settings**: GitHub Pages configuration

### Environment Variables

- `GOOGLE_ANALYTICS_ID` - Google Analytics tracking ID (optional)
- `ALGOLIA_APP_ID` - Algolia search app ID (optional)
- `ALGOLIA_API_KEY` - Algolia search API key (optional)

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-docs`
3. **Make your changes**: Add or update documentation
4. **Test locally**: Run `bun start` to preview changes
5. **Commit your changes**: `git commit -m 'Add amazing documentation'`
6. **Push to the branch**: `git push origin feature/amazing-docs`
7. **Open a Pull Request**

### Contribution Guidelines

- **Follow the style guide**: Use consistent formatting and tone
- **Test your changes**: Ensure the site builds without errors
- **Update navigation**: Add new pages to the sidebar configuration
- **Include examples**: Provide practical code examples
- **Check links**: Ensure all internal and external links work

## 📖 Documentation Standards

### Writing Style

- **Clear and concise**: Use simple, direct language
- **Consistent terminology**: Use the same terms throughout
- **Active voice**: Prefer active voice over passive voice
- **Code examples**: Include working code examples
- **Error handling**: Show how to handle common errors

### Markdown Guidelines

- **Frontmatter**: Include title and sidebar_position
- **Code blocks**: Use appropriate language tags
- **Links**: Use descriptive link text
- **Images**: Optimize images and include alt text
- **Tables**: Use tables for structured data

## 🐛 Troubleshooting

### Common Issues

**Build fails with TypeScript errors**
```bash
# Clear cache and reinstall dependencies
bun clear
rm -rf node_modules bun.lockb
bun install
```

**Development server won't start**
```bash
# Check if port 3000 is available
lsof -ti:3000
# Kill process if needed
kill -9 $(lsof -ti:3000)
bun start
```

**Deploy script fails**
```bash
# Ensure git is configured
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check SSH key setup
ssh -T git@github.com
```

### Getting Help

- 📖 [Docusaurus Documentation](https://docusaurus.io/)
- 🐛 [Report Issues](https://github.com/helpers4/doc/issues)
- 💬 [GitHub Discussions](https://github.com/helpers4/doc/discussions)
- 📧 [Contact the Team](mailto:team@helpers4.dev)

## 📄 License

This documentation is licensed under the [AGPL-3.0 License](LICENSE.md).

## 🙏 Acknowledgments

- Built with [Docusaurus](https://docusaurus.io/)
- Deployed on [GitHub Pages](https://pages.github.com/)
- Search powered by [Algolia DocSearch](https://docsearch.algolia.com/)
- Icons from [Heroicons](https://heroicons.com/)

---

**Happy documenting!** 📚✨
