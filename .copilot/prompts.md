# GitHub Copilot Prompts - Helpers4 Documentation

This file contains specialized prompts for GitHub Copilot to help with specific development tasks in the Helpers4 documentation project.

## Project Context Prompts

### Understanding the Documentation Architecture
```
I'm working on the Helpers4 documentation website built with Docusaurus 3. This is a React-based documentation site that showcases a TypeScript utility library. The main components include:

- Interactive playground with Monaco Editor for testing code
- Versioned API documentation
- Dark/light theme toggle
- GitHub Pages deployment automation
- Integration with the main Helpers4 library repository

Help me understand and work with this specific Docusaurus configuration and React component structure.
```

### Working with the Build System
```
This project uses Bun as the package manager and build tool instead of npm/yarn. The build system includes:
- Docusaurus 3.5.2 for static site generation
- TypeScript for type safety
- React 18 for interactive components
- Monaco Editor for the code playground
- Custom scripts for deployment and version management

Help me work with this Bun-based build system and optimize the development workflow.
```

## Component Development Prompts

### Interactive Playground Enhancement
```
I'm working on the interactive playground component in src/pages/playground.tsx. This component uses Monaco Editor to provide a TypeScript code editor where users can test Helpers4 functions. Current features include:

- Monaco Editor with TypeScript support
- Simulated console output
- Pre-built examples
- Dark/light theme integration
- Responsive design

Help me enhance this playground to actually execute TypeScript code safely, add more interactive features, and improve the user experience. Consider security, performance, and mobile compatibility.
```

### Theme System Development
```
I'm working on the custom theme system that includes dark/light mode toggle functionality. The system uses:

- Docusaurus theme configuration
- Custom CSS variables for theming
- localStorage for theme persistence
- Client-side JavaScript for theme switching
- Static theme toggle script in static/js/theme-toggle.js

Help me enhance the theme system with better animations, more theme options, and improved accessibility features.
```

### Homepage Features Component
```
I'm working on the HomepageFeatures component in src/components/HomepageFeatures/. This component showcases the main benefits of the Helpers4 library:

- Tree-shaking optimization
- TypeScript-first development
- Comprehensive testing

Help me create more engaging feature presentations with animations, better visual design, and interactive elements to better showcase the library's capabilities.
```

## API Documentation Prompts

### Automated Documentation Generation
```
I need to create an automated system to generate API documentation from the main Helpers4 library source code located at ../helpers4/. The system should:

- Parse TypeScript files and extract function signatures
- Convert JSDoc comments to Markdown
- Generate individual pages for each helper function
- Update navigation sidebars automatically
- Extract examples from test files
- Cross-reference related functions

Help me build this automation using Node.js/Bun scripts that can be integrated into the build process.
```

### Version Management System
```
I'm working on the version management system in scripts/version.ts. This script should:

- Sync with the main library version releases
- Create versioned documentation snapshots
- Generate migration guides between versions
- Manage documentation for multiple library versions
- Coordinate with GitHub releases

Help me enhance this version management to be more automated and user-friendly, including better migration documentation and version comparison tools.
```

## Deployment and Infrastructure Prompts

### GitHub Actions Workflow Enhancement
```
I'm working on GitHub Actions workflows in .github/workflows/. Current workflows include:

- deploy.yml: Builds and deploys to GitHub Pages
- update-versions.yml: Triggered by main library releases

Help me enhance these workflows with:
- Better error handling and reporting
- Performance optimizations
- Security improvements
- Multi-environment deployment support
- Automated testing integration
```

### Performance Optimization
```
I'm working on optimizing the documentation website performance. Current considerations include:

- Bundle size optimization
- Image optimization and lazy loading
- Code splitting for better loading
- Third-party script optimization
- Core Web Vitals improvements

Help me identify and implement performance improvements while maintaining functionality and user experience.
```

## Content Development Prompts

### Educational Content Creation
```
I'm creating educational content for the Helpers4 documentation. This includes:

- Step-by-step tutorials
- Real-world examples and use cases
- Best practices guides
- Migration guides from other libraries
- Performance optimization tips

Help me create comprehensive, beginner-friendly content that helps developers understand and effectively use the Helpers4 library.
```

### SEO and Discoverability
```
I'm working on improving SEO and content discoverability for the documentation website. Current setup includes:

- Meta tags and Open Graph configuration
- Structured data markup
- Sitemap generation
- Social media integration

Help me enhance SEO with better content optimization, search functionality, and improved metadata management.
```

## Development Workflow Prompts

### DevContainer Setup Enhancement
```
I'm working on the DevContainer configuration in .devcontainer/. Current setup includes:

- Bun installation and configuration
- VS Code extensions for TypeScript/React development
- Development environment automation

Help me enhance the DevContainer with additional development tools, better debugging support, and improved developer experience.
```

### Testing Strategy Implementation
```
I need to implement comprehensive testing for the documentation project. This should include:

- Component testing for React components
- Integration testing for the playground
- Visual regression testing
- Performance testing
- Accessibility testing
- Link validation and content accuracy

Help me set up a robust testing strategy using modern testing tools that work well with Docusaurus and React.
```

## Integration Prompts

### Main Library Synchronization
```
I'm working on maintaining synchronization between this documentation project and the main Helpers4 library at ../helpers4/. This includes:

- Monitoring changes in the main repository
- Updating API documentation automatically
- Syncing examples and use cases
- Coordinating release schedules
- Maintaining version compatibility

Help me create automated systems to keep the documentation in sync with the library development.
```

### Community Contribution Setup
```
I want to set up systems for community contributions to the documentation. This includes:

- Contribution guidelines and workflows
- Content review processes
- Community example submissions
- Documentation feedback systems
- Translation coordination

Help me create welcoming and efficient systems for community involvement in documentation improvement.
```

## Troubleshooting Prompts

### Build and Deployment Issues
```
I'm encountering issues with the Docusaurus build or deployment process. Common issues might include:

- TypeScript compilation errors
- CSS/styling conflicts
- Monaco Editor integration problems
- GitHub Pages deployment failures
- Performance and bundle size issues

Help me diagnose and fix build/deployment issues while maintaining all functionality.
```

### Cross-Browser Compatibility
```
I'm working on ensuring cross-browser compatibility for the documentation website. Areas of focus include:

- Interactive playground functionality
- Theme switching behavior
- Mobile responsiveness
- Performance across different browsers
- Accessibility features

Help me identify and fix compatibility issues while maintaining modern web standards.
```

## Specific File Context Prompts

### When working on docusaurus.config.ts:
```
I'm working on the main Docusaurus configuration file. This file controls:
- Site metadata and SEO settings
- Theme configuration and customization
- Plugin configuration including custom theme toggle
- Navigation and sidebar setup
- Internationalization settings
- Build and deployment configuration

Help me enhance this configuration for better performance, SEO, and user experience.
```

### When working on package.json:
```
I'm working on the package.json for the documentation project. This includes:
- Docusaurus and React dependencies
- Monaco Editor integration
- Build and deployment scripts
- Development tools and linting
- Bun-specific configurations

Help me optimize dependencies, scripts, and configuration for better development workflow.
```

### When working on src/css/custom.css:
```
I'm working on the custom CSS for the documentation theme. This includes:
- CSS variables for theming
- Component-specific styling
- Responsive design rules
- Dark/light mode support
- Custom animations and transitions

Help me create better visual design while maintaining accessibility and performance.
```

## Advanced Feature Prompts

### Real-Time Collaboration Features
```
I want to add real-time collaboration features to the documentation, such as:
- Shared playground sessions
- Real-time commenting on documentation
- Community-driven content updates
- Live help and support integration

Help me design and implement collaborative features that enhance the documentation experience.
```

### Analytics and User Insights
```
I want to implement comprehensive analytics to understand how users interact with the documentation:
- Page view tracking and user journeys
- Playground usage patterns
- Search behavior and content gaps
- Performance metrics and user experience
- Conversion tracking for library adoption

Help me set up analytics that provide actionable insights for documentation improvement.
```

### Advanced Search Implementation
```
I want to implement advanced search functionality including:
- Full-text search across all documentation
- Code example search and filtering
- AI-powered search suggestions
- Search result ranking and optimization
- Search analytics and improvement

Help me create a comprehensive search experience that helps users quickly find relevant information.
```

## Code Quality and Maintenance Prompts

### Code Quality Improvement
```
I'm working on improving code quality across the documentation project:
- TypeScript strict mode compliance
- ESLint and Prettier configuration
- Component architecture improvements
- Performance optimization
- Security best practices

Help me establish and maintain high code quality standards while keeping the codebase maintainable.
```

### Documentation Quality Assurance
```
I want to implement quality assurance for the documentation content:
- Automated content validation
- Link checking and maintenance
- Code example testing
- Translation quality management
- Accessibility compliance checking

Help me create systems that ensure the documentation remains accurate, helpful, and accessible.
```

## Remember When Using These Prompts:

1. **Always specify the file context** when working on specific files
2. **Include relevant technical constraints** like using Bun instead of npm
3. **Mention integration requirements** with the main Helpers4 library
4. **Consider user experience** in all enhancement suggestions
5. **Keep performance in mind** for all improvements
6. **Ensure accessibility compliance** in all UI changes
7. **Maintain consistency** with existing code patterns and architecture

These prompts are designed to give GitHub Copilot the specific context needed to provide relevant and helpful assistance for the Helpers4 documentation project.
