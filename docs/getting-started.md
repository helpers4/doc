---
sidebar_position: 2
---

# Getting Started

Get up and running with Helpers4 in just a few minutes. This guide will walk you through installation, basic usage, and best practices.

## Installation

Helpers4 is available as individual packages or as a complete bundle. Choose the approach that best fits your needs.

### Individual Packages (Recommended)

Install only the helpers you need for optimal bundle size:

```bash
# Using bun (recommended)
bun add @helpers4/array @helpers4/function @helpers4/object

# Using npm
npm install @helpers4/array @helpers4/function @helpers4/object

# Using yarn
yarn add @helpers4/array @helpers4/function @helpers4/object
```

### Complete Bundle

For convenience, you can install all helpers at once:

```bash
# Using bun
bun add @helpers4/all

# Using npm
npm install @helpers4/all

# Using yarn
yarn add @helpers4/all
```

## Basic Usage

### Individual Package Imports

```typescript
// Import specific functions from individual packages
import { chunk, unique, arrayEquals } from '@helpers4/array';
import { debounce, throttle, memoize } from '@helpers4/function';
import { deepClone, deepMerge, get, set } from '@helpers4/object';

// Use the functions
const numbers = [1, 2, 3, 4, 5, 6];
const chunked = chunk(numbers, 2); // [[1, 2], [3, 4], [5, 6]]

const uniqueItems = unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]

const debouncedFn = debounce(() => console.log('Debounced!'), 1000);
```

### Bundle Import

```typescript
// Import from the complete bundle
import { 
  chunk, 
  unique, 
  debounce, 
  throttle, 
  deepClone 
} from '@helpers4/all';

// Same usage as individual imports
const result = chunk([1, 2, 3, 4, 5], 2);
```

## TypeScript Configuration

Helpers4 works out of the box with TypeScript. Make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true
  }
}
```

## Tree Shaking

Helpers4 is optimized for tree shaking. When using a modern bundler (Webpack, Rollup, Vite, etc.), only the functions you import will be included in your final bundle.

### Webpack Configuration

Most modern Webpack configurations support tree shaking by default. Ensure your `package.json` has:

```json
{
  "sideEffects": false
}
```

### Vite Configuration

Vite supports tree shaking out of the box. No additional configuration needed.

### Rollup Configuration

Rollup naturally supports tree shaking for ES modules. Make sure you're importing from the ES module versions.

## Common Patterns

### Array Processing

```typescript
import { chunk, unique, sort, difference } from '@helpers4/array';

// Process large datasets in chunks
const largeArray = Array.from({ length: 10000 }, (_, i) => i);
const chunks = chunk(largeArray, 1000);

// Remove duplicates and sort
const data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
const processed = sort(unique(data)); // [1, 2, 3, 4, 5, 6, 9]

// Find differences between arrays
const oldItems = [1, 2, 3, 4];
const newItems = [3, 4, 5, 6];
const removed = difference(oldItems, newItems); // [1, 2]
const added = difference(newItems, oldItems);   // [5, 6]
```

### Function Utilities

```typescript
import { debounce, throttle, memoize } from '@helpers4/function';

// Debounce search input
const handleSearch = debounce((query: string) => {
  // API call
  fetchSearchResults(query);
}, 300);

// Throttle scroll events
const handleScroll = throttle(() => {
  // Update UI based on scroll position
  updateScrollIndicator();
}, 100);

// Memoize expensive calculations
const expensiveCalculation = memoize((n: number) => {
  // Some expensive operation
  return fibonacci(n);
});
```

### Object Manipulation

```typescript
import { deepClone, deepMerge, get, set } from '@helpers4/object';

// Deep clone objects
const original = { a: 1, b: { c: 2, d: [3, 4] } };
const cloned = deepClone(original);

// Merge configurations
const defaultConfig = { timeout: 5000, retry: 3 };
const userConfig = { timeout: 10000 };
const finalConfig = deepMerge(defaultConfig, userConfig);

// Safe property access
const user = { profile: { name: 'John', age: 30 } };
const name = get(user, 'profile.name', 'Unknown'); // 'John'
const email = get(user, 'profile.email', 'No email'); // 'No email'

// Set nested properties
const settings = {};
set(settings, 'ui.theme.dark', true);
// settings is now { ui: { theme: { dark: true } } }
```

## Best Practices

### 1. Import Only What You Need

```typescript
// ✅ Good - only imports what you use
import { chunk } from '@helpers4/array';

// ❌ Avoid - imports entire package
import * as arrayHelpers from '@helpers4/array';
```

### 2. Use TypeScript for Better DX

```typescript
// TypeScript provides excellent autocomplete and type checking
import { debounce } from '@helpers4/function';

// Function signature is fully typed
const debouncedFn = debounce<[string, number]>((text, delay) => {
  console.log(text, delay);
}, 1000);
```

### 3. Combine Helpers for Complex Operations

```typescript
import { chunk, unique } from '@helpers4/array';
import { memoize } from '@helpers4/function';

// Combine multiple helpers
const processData = memoize((data: number[]) => {
  return chunk(unique(data.sort()), 10);
});
```

## Performance Considerations

- **Tree Shaking**: Always import individual functions to minimize bundle size
- **Memoization**: Use `memoize` for expensive pure functions
- **Debouncing/Throttling**: Apply to high-frequency events like scroll, resize, or input
- **Deep Operations**: Be aware that `deepClone` and `deepMerge` can be expensive for large objects

## Next Steps

- Explore the [API Reference](./api/array/array-equals.md) for detailed function documentation
- Try the [Interactive Playground](/playground) to experiment with helpers
- Check out [Examples](./examples/basic-usage.md) for common use cases
- Read the [Migration Guide](./examples/migration.md) if coming from other libraries

## Need Help?

- 📖 Browse the complete [API documentation](./api/array/array-equals.md)
- 🎮 Experiment in the [Playground](/playground)
- 🐛 Report issues on [GitHub](https://github.com/helpers4/helpers4/issues)
- 💬 Join discussions on [GitHub Discussions](https://github.com/helpers4/helpers4/discussions)
