---
sidebar_position: 3
---

# unique

Removes duplicate elements from an array, preserving the order of first occurrence.

## Signature

```typescript
function unique<T>(array: T[]): T[]
```

## Parameters

- `array` (T[]): The array to process

## Returns

`T[]` - Returns a new array with duplicate elements removed

## Description

The `unique` function creates a new array with all duplicate elements removed. It preserves the order of elements as they first appear in the original array. The function uses strict equality (`===`) for primitive values and deep comparison for objects.

## Examples

### Basic Usage

```typescript
import { unique } from '@helpers4/array';

// Primitive values
unique([1, 2, 2, 3, 3, 3, 4]); // [1, 2, 3, 4]
unique(['a', 'b', 'a', 'c', 'b']); // ['a', 'b', 'c']
unique([true, false, true, false]); // [true, false]

// Empty array
unique([]); // []

// Already unique
unique([1, 2, 3, 4]); // [1, 2, 3, 4]
```

### Complex Data Types

```typescript
import { unique } from '@helpers4/array';

// Objects (compared by reference)
const obj1 = { id: 1, name: 'Alice' };
const obj2 = { id: 2, name: 'Bob' };
const obj3 = { id: 1, name: 'Alice' }; // Different reference, same content

unique([obj1, obj2, obj1, obj3]); // [obj1, obj2, obj3]

// Arrays
unique([[1, 2], [3, 4], [1, 2], [5, 6]]); // [[1, 2], [3, 4], [5, 6]]
```

### Mixed Types

```typescript
import { unique } from '@helpers4/array';

// Mixed primitive types
unique([1, '1', 2, '2', 1, 2]); // [1, '1', 2, '2']

// With null and undefined
unique([1, null, 2, undefined, null, 1]); // [1, null, 2, undefined]
```

## Performance

- **Time Complexity**: O(n) for primitive values, O(n²) for objects (due to deep comparison)
- **Space Complexity**: O(n) - creates a new array

## Type Safety

The function is fully typed and preserves the type of the input array:

```typescript
import { unique } from '@helpers4/array';

const numbers: number[] = [1, 2, 2, 3];
const uniqueNumbers = unique(numbers); // Type: number[]

const strings: string[] = ['a', 'b', 'a'];
const uniqueStrings = unique(strings); // Type: string[]
```

## Error Handling

```typescript
import { unique } from '@helpers4/array';

// The function handles various edge cases gracefully
unique([]); // [] - empty array
unique([undefined, null, undefined]); // [undefined, null]
unique([NaN, NaN]); // [NaN] - NaN is considered equal to itself
```

## See Also

- [arrayEquals](./array-equals.md) - Compare arrays for deep equality
- [difference](./difference.md) - Find elements in first array but not in second
- [intersection](./intersection.md) - Find common elements between arrays
- [chunk](./chunk.md) - Split array into smaller chunks

## Related Functions

- `difference()` - Useful when you need elements that are unique to one array
- `intersection()` - Find common elements between multiple arrays
- `arrayEquals()` - Check if arrays are equal after making them unique

## Common Use Cases

1. **Data Deduplication**: Remove duplicate entries from lists
2. **User Input Sanitization**: Clean up form data with duplicate selections
3. **API Response Processing**: Remove duplicate records from API responses
4. **Search Results**: Deduplicate search results from multiple sources
5. **Tag Management**: Maintain unique lists of tags or categories
