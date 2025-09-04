---
sidebar_position: 1
---

# Introduction

Welcome to **Helpers4**, a comprehensive TypeScript utility library designed for modern web development. Helpers4 provides a collection of well-tested, tree-shakable helper functions that enhance your development experience while keeping your bundle size minimal.

## What is Helpers4?

Helpers4 is a modular utility library that offers:

- 🎯 **TypeScript-first** development with excellent type safety
- 📦 **Tree-shaking optimized** for minimal bundle impact
- 🧪 **Thoroughly tested** functions for production reliability
- 🚀 **Modern JavaScript** standards and best practices
- 📚 **Comprehensive documentation** with interactive examples

## Philosophy

Our design philosophy centers around three core principles:

### 1. Developer Experience First
Every helper function is designed with developer productivity in mind, offering intuitive APIs and excellent TypeScript support with comprehensive IntelliSense.

### 2. Performance Matters
All helpers are optimized for performance while maintaining readability. We benchmark against other popular libraries to ensure competitive performance.

### 3. Bundle Size Awareness
Each helper is independently importable and optimized for tree-shaking, ensuring your production bundle only includes what you actually use.

## Package Structure

Helpers4 is organized into focused packages:

- **@helpers4/array** - Array manipulation utilities
- **@helpers4/function** - Function utilities (debounce, throttle, memoize)
- **@helpers4/object** - Object manipulation helpers
- **@helpers4/promise** - Promise and async utilities
- **@helpers4/string** - String processing functions
- **@helpers4/url** - URL manipulation helpers
- **@helpers4/observable** - Observable utilities
- **@helpers4/all** - All helpers in a single package

## Quick Example

```typescript
// Tree-shakable imports
import { chunk, unique } from '@helpers4/array';
import { debounce } from '@helpers4/function';
import { deepMerge } from '@helpers4/object';

// Array helpers
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const chunked = chunk(data, 3); // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
const uniqueValues = unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]

// Function helpers
const debouncedSearch = debounce((query: string) => {
  console.log('Searching for:', query);
}, 300);

// Object helpers
const merged = deepMerge(
  { a: 1, b: { c: 2 } },
  { b: { d: 3 }, e: 4 }
); // { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

## Community and Support

- 📖 [Documentation](https://helpers4.github.io/doc/)
- 🐛 [Issue Tracker](https://github.com/helpers4/helpers4/issues)
- 💬 [Discussions](https://github.com/helpers4/helpers4/discussions)
- 📦 [NPM Packages](https://www.npmjs.com/org/helpers4)

## License

Helpers4 is open source software licensed under the [AGPL-3.0 License](https://github.com/helpers4/helpers4/blob/main/LICENSE.md).

---

Ready to get started? Head over to the [Getting Started](./getting-started.md) guide to begin using Helpers4 in your project!
