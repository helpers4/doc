---
sidebar_position: 4
---

# difference

Returns the elements from the first array that are not present in the second array.

## Signature

```typescript
function difference<T>(array: T[], values: T[]): T[]
```

## Parameters

- `array` (T[]): The array to inspect
- `values` (T[]): The values to exclude

## Returns

`T[]` - Returns a new array with the elements from `array` that are not in `values`

## Description

The `difference` function creates a new array containing elements from the first array that are not present in the second array. It performs element comparison using strict equality (`===`) for primitive values and deep comparison for objects and arrays.

## Examples

### Basic Usage

```typescript
import { difference } from '@helpers4/array';

// Primitive values
difference([1, 2, 3, 4, 5], [2, 4]); // [1, 3, 5]
difference(['a', 'b', 'c', 'd'], ['b', 'd']); // ['a', 'c']
difference([true, false, true], [false]); // [true, true]

// No differences
difference([1, 2, 3], [4, 5, 6]); // [1, 2, 3]

// All elements excluded
difference([1, 2, 3], [1, 2, 3, 4]); // []
```

### Complex Data Types

```typescript
import { difference } from '@helpers4/array';

// Objects
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Diana' }
];

const excludeUsers = [
  { id: 2, name: 'Bob' },
  { id: 4, name: 'Diana' }
];

difference(users, excludeUsers);
// Result: [{ id: 1, name: 'Alice' }, { id: 3, name: 'Charlie' }]

// Arrays
difference([[1, 2], [3, 4], [5, 6]], [[3, 4]]); // [[1, 2], [5, 6]]
```

### String Arrays

```typescript
import { difference } from '@helpers4/array';

// Case-sensitive comparison
difference(['Apple', 'Banana', 'apple'], ['Apple']); // ['Banana', 'apple']

// Working with file extensions
const allFiles = ['doc.txt', 'image.jpg', 'data.csv', 'script.js'];
const excludeExtensions = ['script.js', 'data.csv'];
difference(allFiles, excludeExtensions); // ['doc.txt', 'image.jpg']
```

### Edge Cases

```typescript
import { difference } from '@helpers4/array';

// Empty arrays
difference([], [1, 2, 3]); // []
difference([1, 2, 3], []); // [1, 2, 3]
difference([], []); // []

// With null and undefined
difference([1, null, 2, undefined], [null]); // [1, 2, undefined]
difference([null, undefined, null], [undefined]); // [null, null]

// Duplicate values in source array
difference([1, 1, 2, 2, 3], [1]); // [2, 2, 3]
```

## Performance

- **Time Complexity**: O(n × m) where n is the length of the first array and m is the length of the second array
- **Space Complexity**: O(n) - creates a new array

## Type Safety

The function preserves the type of the input array:

```typescript
import { difference } from '@helpers4/array';

const numbers: number[] = [1, 2, 3, 4, 5];
const toExclude: number[] = [2, 4];
const result = difference(numbers, toExclude); // Type: number[]

interface User {
  id: number;
  name: string;
}

const users: User[] = [/* ... */];
const excludeUsers: User[] = [/* ... */];
const filteredUsers = difference(users, excludeUsers); // Type: User[]
```

## Practical Examples

### Filtering API Results

```typescript
import { difference } from '@helpers4/array';

// Remove already processed items
const allItems = await fetchAllItems();
const processedItems = await fetchProcessedItems();
const itemsToProcess = difference(allItems, processedItems);

processItemsBatch(itemsToProcess);
```

### User Permission Management

```typescript
import { difference } from '@helpers4/array';

const userPermissions = ['read', 'write', 'delete', 'admin'];
const revokedPermissions = ['delete', 'admin'];
const currentPermissions = difference(userPermissions, revokedPermissions);
// Result: ['read', 'write']
```

### Shopping Cart Management

```typescript
import { difference } from '@helpers4/array';

const cartItems = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mouse' },
  { id: 3, name: 'Keyboard' }
];

const outOfStockItems = [{ id: 2, name: 'Mouse' }];
const availableItems = difference(cartItems, outOfStockItems);
// Result: [{ id: 1, name: 'Laptop' }, { id: 3, name: 'Keyboard' }]
```

## See Also

- [unique](./unique.md) - Remove duplicate elements from array
- [intersection](./intersection.md) - Find common elements between arrays
- [arrayEquals](./array-equals.md) - Compare arrays for deep equality
- [chunk](./chunk.md) - Split array into smaller chunks

## Related Functions

- `intersection()` - Find elements common to both arrays
- `unique()` - Remove duplicates before finding differences
- `arrayEquals()` - Check if difference result is empty

## Common Use Cases

1. **Data Filtering**: Remove unwanted items from datasets
2. **Permission Management**: Calculate remaining permissions after revocation
3. **Inventory Management**: Find available items by excluding out-of-stock items
4. **List Comparison**: Compare two lists to find what's unique to the first
5. **Batch Processing**: Process only items that haven't been handled yet
