# GitHub Copilot Context - Helpers4 Documentation

This directory contains context information and prompts to help GitHub Copilot understand the Helpers4 documentation project and assist with development tasks.

## Project Overview

This is the documentation website for the Helpers4 TypeScript utility library, built with Docusaurus 3. It provides comprehensive documentation, interactive examples, and developer resources.

## Architecture

### Technology Stack
- **Framework**: Docusaurus 3.x (React-based static site generator)
- **Language**: TypeScript for components and scripts
- **Styling**: CSS modules with custom CSS variables
- **Package Manager**: Bun
- **Deployment**: GitHub Pages with automated CI/CD
- **Version Management**: Docusaurus versioning system

### Project Structure
```
src/
├── components/          # Reusable React components
│   └── HomepageFeatures/ # Homepage feature showcase
├── css/                # Global styles and theme customization
├── pages/              # Custom pages (playground, comparison)
│   ├── index.tsx       # Homepage
│   ├── playground.tsx  # Interactive code playground
│   └── comparison.tsx  # Library comparison page
└── theme/              # Docusaurus theme customizations

docs/                   # Documentation content (Markdown)
├── intro.md           # Introduction page
├── getting-started.md # Getting started guide
├── api/               # API reference documentation
│   ├── array/         # Array helpers documentation
│   ├── function/      # Function helpers documentation
│   ├── object/        # Object helpers documentation
│   └── ...            # Other categories
└── examples/          # Usage examples and guides

static/                # Static assets
├── img/               # Images, logos, icons
└── js/                # Client-side JavaScript

scripts/               # Build and deployment automation
├── deploy.ts          # GitHub Pages deployment script
└── version.ts         # Documentation version management

.github/workflows/     # GitHub Actions
├── deploy.yml         # Automated deployment
└── update-versions.yml # Version management automation

blog/                  # Blog posts and announcements
```

### Key Features

#### 1. Interactive Playground
- **Location**: `src/pages/playground.tsx`
- **Technology**: Monaco Editor (VS Code editor in browser)
- **Features**: 
  - TypeScript syntax highlighting
  - Code execution simulation
  - Console output display
  - Helpers4 import suggestions
- **Purpose**: Allow users to test Helpers4 functions interactively

#### 2. Version Management
- **System**: Docusaurus versioning with custom automation
- **Script**: `scripts/version.ts`
- **Integration**: Automated via GitHub Actions from main library releases
- **Storage**: `versioned_docs/` and `versions.json`

#### 3. Dark/Light Theme Toggle
- **Implementation**: Custom theme toggle with localStorage persistence
- **Files**: `static/js/theme-toggle.js`, CSS in `src/css/custom.css`
- **Features**: Respects system preferences, smooth transitions

#### 4. API Reference
- **Generation**: Manual creation with potential for automation
- **Structure**: Category-based organization matching library structure
- **Content**: Function signatures, examples, use cases, related functions

## Integration with Main Library

### Helpers4 Main Repository
- **Repository**: https://github.com/helpers4/helpers4
- **Relationship**: This documentation site documents the main library
- **Sync Mechanism**: GitHub Actions webhook triggers documentation updates

### Package Structure Context
The main library is organized into these packages (relevant for documentation structure):

```
@helpers4/array      - Array manipulation utilities
@helpers4/function   - Function utilities (debounce, throttle, memoize)
@helpers4/object     - Object manipulation helpers
@helpers4/promise    - Promise and async utilities
@helpers4/string     - String processing functions
@helpers4/url        - URL manipulation helpers
@helpers4/observable - Observable utilities
@helpers4/date       - Date manipulation utilities
@helpers4/number     - Number utilities
@helpers4/all        - Complete bundle with all helpers
```

### Content Source
- **Function Documentation**: Generated from TSDoc comments in main repository
- **Examples**: Based on test files and usage patterns from main library
- **Package Information**: Extracted from `config.json` files in each category
- **Version Information**: Synchronized with main library releases

### Automation Workflow
1. **Main Library Release**: Version published to NPM
2. **Webhook Trigger**: GitHub Actions dispatch to documentation repository
3. **Version Creation**: `scripts/version.ts` creates new documentation version
4. **Content Update**: API reference and examples updated automatically
5. **Deployment**: Updated site deployed to GitHub Pages

## Development Workflow

### Local Development
```bash
bun start           # Start development server
bun build          # Build for production
bun serve          # Serve production build locally
bun clear          # Clear Docusaurus cache
```

### Content Management
- **Add Documentation**: Create `.md` files in `docs/` with proper frontmatter
- **Update Navigation**: Modify `sidebars.ts` to include new pages
- **Add Examples**: Include practical code examples in documentation
- **Update API Reference**: Sync with main library changes

### Version Management
```bash
bun scripts/version.ts create 2.1.0  # Create specific version
bun scripts/version.ts create        # Auto-detect from main library
bun scripts/version.ts list          # List all versions
```

### Deployment
- **Automatic**: Push to main branch triggers deployment
- **Manual**: `bun deploy` runs deployment script
- **Target**: GitHub Pages at https://helpers4.github.io/doc/

## Configuration Files

### Docusaurus Configuration (`docusaurus.config.ts`)
```typescript
// Key configuration areas:
- Site metadata (title, description, URL)
- Theme configuration (navbar, footer, colors)
- Plugin settings (search, analytics, versioning)
- Build settings (bundling, optimization)
- Deployment configuration (GitHub Pages)
```

### Sidebar Configuration (`sidebars.ts`)
```typescript
// Defines documentation structure:
- Tutorial sidebar with categorized content
- API reference organization
- Examples and guides structure
- Cross-references between sections
```

### Package Configuration (`package.json`)
```json
// Key scripts and dependencies:
- Docusaurus core and preset-classic
- Monaco Editor for playground
- Custom build and deployment scripts
- TypeScript and linting tools
```

## Content Guidelines

### Documentation Standards
- **Structure**: Use consistent heading hierarchy (H1 > H2 > H3)
- **Examples**: Include practical, working code examples
- **Types**: Show TypeScript function signatures
- **Cross-references**: Link to related functions and concepts
- **Performance**: Include performance considerations where relevant

### API Documentation Template
```markdown
---
sidebar_position: N
---

# FunctionName

Brief description of what the function does.

## Signature
\`\`\`typescript
function functionName<T>(param: T): ReturnType
\`\`\`

## Parameters
## Returns
## Description
## Examples
## Use Cases
## Performance Considerations
## Related Functions
```

### Code Examples
- **Working Examples**: All code examples should be functional
- **Type Safety**: Include TypeScript types in examples
- **Error Handling**: Show proper error handling patterns
- **Real-world Usage**: Demonstrate practical applications

## Styling and Theming

### CSS Architecture
- **Global Styles**: `src/css/custom.css` for site-wide customizations
- **Component Styles**: CSS modules for component-specific styling
- **Theme Variables**: CSS custom properties for consistent theming
- **Responsive Design**: Mobile-first approach with breakpoints

### Design System
- **Colors**: Consistent color palette with dark/light mode support
- **Typography**: Readable font hierarchy with proper contrast
- **Spacing**: Consistent spacing system using CSS variables
- **Components**: Reusable component library for documentation

## Performance and SEO

### Optimization Features
- **Bundle Splitting**: Automatic code splitting by Docusaurus
- **Image Optimization**: Optimized images and proper sizing
- **Caching**: Browser caching and CDN optimization
- **Tree Shaking**: Unused code elimination

### SEO Configuration
- **Meta Tags**: Comprehensive meta tag configuration
- **Open Graph**: Social media preview optimization
- **Structured Data**: Schema markup for search engines
- **Sitemap**: Automatic sitemap generation

## External Integrations

### Search (Optional)
- **Algolia DocSearch**: Can be integrated for advanced search
- **Configuration**: Requires Algolia account and API keys
- **Implementation**: Plugin configuration in `docusaurus.config.ts`

### Analytics (Optional)
- **Google Analytics**: Integration ready in configuration
- **Custom Events**: Track user interactions and engagement
- **Performance Monitoring**: Monitor site performance metrics

### GitHub Integration
- **Pages**: Deployed to GitHub Pages
- **Actions**: Automated workflows for deployment and updates
- **Webhooks**: Integration with main library for automatic updates

## Security Considerations

### Content Security
- **Sanitization**: All user content properly sanitized
- **External Links**: Safe external link handling
- **Script Loading**: Secure script loading practices

### Deployment Security
- **GitHub Actions**: Secure token handling
- **Environment Variables**: Proper secret management
- **Dependencies**: Regular security updates

## Best Practices

### Development
- **TypeScript**: Use strict TypeScript for all components
- **React**: Follow React best practices and hooks patterns
- **Accessibility**: Ensure WCAG compliance
- **Performance**: Optimize for fast loading and smooth interactions

### Content Management
- **Version Control**: Track all content changes in git
- **Review Process**: Review documentation changes before deployment
- **Testing**: Test all examples and links before publishing
- **Consistency**: Maintain consistent style and terminology

### Maintenance
- **Regular Updates**: Keep dependencies and content current
- **Link Checking**: Validate internal and external links
- **Performance Monitoring**: Monitor site performance and user experience
- **Feedback Integration**: Incorporate user feedback and suggestions

This context helps GitHub Copilot understand the documentation project structure and provide relevant assistance for development and content management tasks.
