---
sidebar_position: 5
---

# intersection

Returns an array of elements that are present in both input arrays.

## Signature

```typescript
function intersection<T>(array: T[], values: T[]): T[]
```

## Parameters

- `array` (T[]): The first array to inspect
- `values` (T[]): The second array to inspect

## Returns

`T[]` - Returns a new array containing elements that exist in both input arrays

## Description

The `intersection` function creates a new array containing only the elements that are present in both input arrays. It maintains the order of elements as they appear in the first array and removes duplicates from the result.

## Examples

### Basic Usage

```typescript
import { intersection } from '@helpers4/array';

// Primitive values
intersection([1, 2, 3, 4], [2, 3, 5, 6]); // [2, 3]
intersection(['a', 'b', 'c'], ['b', 'c', 'd']); // ['b', 'c']
intersection([true, false], [false, true]); // [true, false]

// No intersection
intersection([1, 2, 3], [4, 5, 6]); // []

// Complete intersection
intersection([1, 2, 3], [1, 2, 3]); // [1, 2, 3]
```

### Complex Data Types

```typescript
import { intersection } from '@helpers4/array';

// Objects (deep comparison)
const users1 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const users2 = [
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Diana' }
];

intersection(users1, users2);
// Result: [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]

// Arrays
intersection([[1, 2], [3, 4], [5, 6]], [[3, 4], [7, 8]]); // [[3, 4]]
```

### Working with Strings

```typescript
import { intersection } from '@helpers4/array';

// Case-sensitive comparison
intersection(['Apple', 'Banana', 'Cherry'], ['apple', 'Banana', 'Date']);
// Result: ['Banana']

// Finding common file types
const frontendFiles = ['component.tsx', 'styles.css', 'utils.ts', 'config.json'];
const backendFiles = ['server.ts', 'config.json', 'database.sql', 'utils.ts'];
intersection(frontendFiles, backendFiles); // ['utils.ts', 'config.json']
```

### Edge Cases

```typescript
import { intersection } from '@helpers4/array';

// Empty arrays
intersection([], [1, 2, 3]); // []
intersection([1, 2, 3], []); // []
intersection([], []); // []

// With null and undefined
intersection([1, null, 2, undefined], [null, 3, undefined, 4]);
// Result: [null, undefined]

// Duplicate values
intersection([1, 1, 2, 2], [1, 2, 3]); // [1, 2] (duplicates removed)
intersection([1, 2, 2, 3], [2, 2, 4]); // [2] (duplicates removed)
```

## Performance

- **Time Complexity**: O(n × m) where n and m are the lengths of the input arrays
- **Space Complexity**: O(min(n, m)) - result size is limited by the smaller array

## Type Safety

The function preserves the type of the input arrays:

```typescript
import { intersection } from '@helpers4/array';

const numbers1: number[] = [1, 2, 3, 4];
const numbers2: number[] = [3, 4, 5, 6];
const commonNumbers = intersection(numbers1, numbers2); // Type: number[]

interface Product {
  id: number;
  category: string;
}

const products1: Product[] = [/* ... */];
const products2: Product[] = [/* ... */];
const commonProducts = intersection(products1, products2); // Type: Product[]
```

## Practical Examples

### Finding Common Interests

```typescript
import { intersection } from '@helpers4/array';

const user1Interests = ['music', 'sports', 'reading', 'movies'];
const user2Interests = ['cooking', 'sports', 'movies', 'travel'];
const commonInterests = intersection(user1Interests, user2Interests);
// Result: ['sports', 'movies']
```

### Permission Systems

```typescript
import { intersection } from '@helpers4/array';

const userPermissions = ['read', 'write', 'delete'];
const requiredPermissions = ['read', 'write', 'admin'];
const grantedPermissions = intersection(userPermissions, requiredPermissions);
// Result: ['read', 'write']

const hasAllPermissions = grantedPermissions.length === requiredPermissions.length;
```

### Data Validation

```typescript
import { intersection } from '@helpers4/array';

const allowedTags = ['javascript', 'typescript', 'react', 'vue', 'angular'];
const submittedTags = ['typescript', 'python', 'react', 'java'];
const validTags = intersection(submittedTags, allowedTags);
// Result: ['typescript', 'react']

if (validTags.length !== submittedTags.length) {
  console.warn('Some tags were invalid and removed');
}
```

### E-commerce Product Filtering

```typescript
import { intersection } from '@helpers4/array';

const availableProducts = [
  { id: 1, category: 'electronics' },
  { id: 2, category: 'clothing' },
  { id: 3, category: 'books' }
];

const userWishlist = [
  { id: 1, category: 'electronics' },
  { id: 4, category: 'furniture' },
  { id: 3, category: 'books' }
];

const availableWishlistItems = intersection(userWishlist, availableProducts);
// Result: Products that are both wished for and available
```

## Multiple Array Intersection

```typescript
import { intersection } from '@helpers4/array';

// Finding intersection of multiple arrays
function multipleIntersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return arrays[0];
  
  return arrays.reduce((acc, current) => intersection(acc, current));
}

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];
const arr3 = [4, 5, 6, 7, 8];

multipleIntersection(arr1, arr2, arr3); // [4, 5]
```

## See Also

- [unique](./unique.md) - Remove duplicate elements from array
- [difference](./difference.md) - Find elements in first array but not in second
- [arrayEquals](./array-equals.md) - Compare arrays for deep equality
- [chunk](./chunk.md) - Split array into smaller chunks

## Related Functions

- `difference()` - Find elements that are NOT common between arrays
- `unique()` - Remove duplicates from intersection results
- `arrayEquals()` - Check if arrays have identical intersections

## Common Use Cases

1. **User Matching**: Find common interests between users
2. **Permission Systems**: Calculate effective permissions
3. **Data Validation**: Filter valid values from user input
4. **Inventory Management**: Find products available in multiple warehouses
5. **Tag Systems**: Find common tags between different entities
6. **Set Operations**: Implement mathematical set intersection operations
