---
sidebar_position: 2
---

# Migration Guide

This guide helps you migrate to Helpers4 from other utility libraries or upgrade from older versions.

## Migrating from Lodash

Helpers4 provides modern TypeScript alternatives to many Lodash functions with better tree-shaking and type safety.

### Array Functions

#### Lodash → Helpers4 Equivalents

```typescript
// Lodash
import _ from 'lodash';

_.chunk([1, 2, 3, 4, 5], 2);           // [[1, 2], [3, 4], [5]]
_.uniq([1, 2, 1, 3, 2]);               // [1, 2, 3]
_.difference([1, 2, 3], [2, 3, 4]);    // [1]
_.intersection([1, 2], [2, 3]);        // [2]
_.isEqual([1, 2], [1, 2]);             // true

// Helpers4
import { chunk, unique, difference, intersection, arrayEquals } from '@helpers4/array';

chunk([1, 2, 3, 4, 5], 2);             // [[1, 2], [3, 4], [5]]
unique([1, 2, 1, 3, 2]);               // [1, 2, 3]
difference([1, 2, 3], [2, 3, 4]);      // [1]
intersection([1, 2], [2, 3]);          // [2]
arrayEquals([1, 2], [1, 2]);           // true
```

#### Key Differences

1. **Better TypeScript Support**: Helpers4 functions are built with TypeScript first
2. **Tree Shaking**: Import only what you need
3. **Modern Syntax**: Uses modern JavaScript features
4. **Smaller Bundle**: Significantly smaller footprint

### Function Utilities

```typescript
// Lodash
import _ from 'lodash';

const debouncedFn = _.debounce(fn, 300);
const throttledFn = _.throttle(fn, 1000);
const memoizedFn = _.memoize(fn);

// Helpers4
import { debounce, throttle, memoize } from '@helpers4/function';

const debouncedFn = debounce(fn, 300);
const throttledFn = throttle(fn, 1000);
const memoizedFn = memoize(fn);
```

### Object Utilities

```typescript
// Lodash
import _ from 'lodash';

_.omit(obj, ['key1', 'key2']);
_.pick(obj, ['key1', 'key2']);
_.merge(obj1, obj2);

// Helpers4
import { omit, pick, merge } from '@helpers4/object';

omit(obj, ['key1', 'key2']);
pick(obj, ['key1', 'key2']);
merge(obj1, obj2);
```

## Migrating from Ramda

Ramda users will find Helpers4 functions more imperative but equally powerful.

### Function Composition

```typescript
// Ramda (functional style)
import * as R from 'ramda';

const processData = R.pipe(
  R.filter(R.propGt('age', 18)),
  R.sortBy(R.prop('name')),
  R.take(10)
);

// Helpers4 (imperative style with method chaining)
import { sort } from '@helpers4/array';

const processData = (users) => 
  sort(
    users.filter(user => user.age > 18),
    'name'
  ).slice(0, 10);
```

### Currying

```typescript
// Ramda provides auto-currying
import * as R from 'ramda';

const add = R.add;
const add5 = add(5); // Partially applied
add5(10); // 15

// Helpers4 - manual currying when needed
const add = (a: number) => (b: number) => a + b;
const add5 = add(5);
add5(10); // 15
```

## Migrating from Underscore.js

Similar to Lodash migration, but with some naming differences:

```typescript
// Underscore.js
import _ from 'underscore';

_.each(array, fn);           // forEach equivalent
_.map(array, fn);            // map equivalent
_.uniq(array);               // unique equivalent
_.difference(arr1, arr2);    // difference equivalent

// Helpers4
import { unique, difference } from '@helpers4/array';

array.forEach(fn);           // Use native forEach
array.map(fn);               // Use native map
unique(array);               // Helpers4 unique
difference(arr1, arr2);      // Helpers4 difference
```

## Upgrading from Helpers4 v1.x to v2.x

### Breaking Changes

#### 1. Package Structure

```typescript
// v1.x - Single package
import { chunk, debounce, omit } from '@helpers4/utils';

// v2.x - Separate packages
import { chunk } from '@helpers4/array';
import { debounce } from '@helpers4/function';
import { omit } from '@helpers4/object';
```

#### 2. Function Signatures

Some functions have updated signatures for better TypeScript support:

```typescript
// v1.x
sort(array, 'property'); // Limited property support

// v2.x
sort(array, 'property'); // Full TypeScript property checking
sort(array, item => item.nested.property); // Accessor function support
```

#### 3. Renamed Functions

```typescript
// v1.x
import { isArrayEqual } from '@helpers4/utils';

// v2.x
import { arrayEquals } from '@helpers4/array';
```

### Migration Steps

1. **Update Package Dependencies**:

   ```bash
   # Remove old package
   npm uninstall @helpers4/utils
   
   # Install new packages
   npm install @helpers4/array @helpers4/function @helpers4/object
   ```

2. **Update Imports**:

   ```typescript
   // Before
   import { chunk, debounce, omit } from '@helpers4/utils';
   
   // After
   import { chunk } from '@helpers4/array';
   import { debounce } from '@helpers4/function';
   import { omit } from '@helpers4/object';
   ```

3. **Update Function Names**:

   ```typescript
   // Before
   isArrayEqual(arr1, arr2);
   
   // After
   arrayEquals(arr1, arr2);
   ```

## Performance Considerations

### Bundle Size Comparison

| Library | Full Import | Tree-shaken |
|---------|------------|-------------|
| Lodash | ~70KB | ~15KB |
| Ramda | ~85KB | ~25KB |
| Helpers4 | ~45KB | ~5KB |

### Tree Shaking Benefits

```typescript
// ❌ Large bundle - imports entire library
import _ from 'lodash';
_.chunk(array, 2);

// ✅ Small bundle - only imports needed function
import { chunk } from '@helpers4/array';
chunk(array, 2);
```

## TypeScript Benefits

### Better Type Inference

```typescript
// Lodash - limited type support
const result = _.sortBy(users, 'name'); // Type: any[]

// Helpers4 - full type preservation
const result = sort(users, 'name'); // Type: User[]
```

### Property Type Checking

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [/*...*/];

// ❌ TypeScript error - 'age' doesn't exist on User
sort(users, 'age');

// ✅ TypeScript validates property exists
sort(users, 'name'); // Valid
sort(users, 'email'); // Valid
```

## Gradual Migration Strategy

### 1. Start with New Features

Use Helpers4 for new functionality while keeping existing code:

```typescript
// Existing code with Lodash
import _ from 'lodash';
const existingLogic = _.chunk(data, 5);

// New features with Helpers4
import { sort } from '@helpers4/array';
const newFeature = sort(data, 'createdAt');
```

### 2. Replace Module by Module

Migrate one utility category at a time:

```typescript
// Week 1: Replace array utilities
// import _ from 'lodash';
import { chunk, unique, difference } from '@helpers4/array';

// Week 2: Replace function utilities
import { debounce, throttle } from '@helpers4/function';

// Week 3: Replace object utilities
import { omit, pick } from '@helpers4/object';
```

### 3. Use Codemods

Create automated migration scripts:

```javascript
// Example codemod for chunk function
module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  
  return j(fileInfo.source)
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: { name: '_' },
        property: { name: 'chunk' }
      }
    })
    .replaceWith(path => {
      return j.callExpression(
        j.identifier('chunk'),
        path.node.arguments
      );
    })
    .toSource();
};
```

## Common Gotchas

### 1. Immutability

```typescript
// Lodash often mutates (_.sortBy creates new array)
const sorted = _.sortBy(users, 'name'); // New array

// Helpers4 always returns new arrays
const sorted = sort(users, 'name'); // New array
console.log(users); // Original unchanged
```

### 2. Error Handling

```typescript
// Lodash is forgiving
_.chunk(null, 2); // Returns []

// Helpers4 is stricter (better for catching bugs)
chunk(null, 2); // Throws TypeError
```

### 3. Comparison Functions

```typescript
// Lodash sortBy
_.sortBy(users, user => user.age); // Always ascending

// Helpers4 sort
sort(users, (a, b) => a.age - b.age); // Explicit comparison
sort(users, user => user.age); // Accessor function (ascending)
```

## Getting Help

- 📖 [API Documentation](../api/array/array-equals.md)
- 💬 [GitHub Discussions](https://github.com/helpers4/helpers4/discussions)
- 🐛 [Report Issues](https://github.com/helpers4/helpers4/issues)
- 📧 [Email Support](mailto:support@helpers4.dev)

## Migration Checklist

- [ ] Audit current utility library usage
- [ ] Install appropriate Helpers4 packages
- [ ] Update import statements
- [ ] Update function names if changed
- [ ] Run tests to ensure functionality
- [ ] Update TypeScript configurations if needed
- [ ] Remove old dependencies
- [ ] Update documentation and team knowledge

Remember: Migration can be gradual. You don't need to replace everything at once!
