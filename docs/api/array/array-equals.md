---
sidebar_position: 1
---

# arrayEquals

Performs a deep equality comparison between two arrays.

## Signature

```typescript
function arrayEquals<T>(a: T[], b: T[]): boolean
```

## Parameters

- `a` (T[]): The first array to compare
- `b` (T[]): The second array to compare

## Returns

`boolean` - Returns `true` if the arrays are deeply equal, `false` otherwise

## Description

The `arrayEquals` function performs a deep comparison between two arrays, checking if they have the same length and all corresponding elements are equal. For nested arrays and objects, it recursively compares their contents.

## Examples

### Basic Usage

```typescript
import { arrayEquals } from '@helpers4/array';

// Simple arrays
arrayEquals([1, 2, 3], [1, 2, 3]); // true
arrayEquals([1, 2, 3], [1, 2, 4]); // false
arrayEquals([], []); // true

// Different lengths
arrayEquals([1, 2], [1, 2, 3]); // false
```

### Nested Arrays

```typescript
import { arrayEquals } from '@helpers4/array';

// Nested arrays
arrayEquals([[1, 2], [3, 4]], [[1, 2], [3, 4]]); // true
arrayEquals([[1, 2], [3, 4]], [[1, 2], [3, 5]]); // false

// Mixed types
arrayEquals([1, 'hello', true], [1, 'hello', true]); // true
arrayEquals([1, 'hello', true], [1, 'hello', false]); // false
```

### Object Arrays

```typescript
import { arrayEquals } from '@helpers4/array';

const users1 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const users2 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const users3 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Charlie' }
];

arrayEquals(users1, users2); // true
arrayEquals(users1, users3); // false
```

### Type Safety

```typescript
import { arrayEquals } from '@helpers4/array';

// TypeScript ensures type consistency
const numbers: number[] = [1, 2, 3];
const strings: string[] = ['1', '2', '3'];
const moreNumbers: number[] = [1, 2, 3];

arrayEquals(numbers, moreNumbers); // ✅ Valid - same types
// arrayEquals(numbers, strings); // ❌ TypeScript error - different types
```

## Performance Considerations

- **Early Exit**: The function returns `false` immediately if array lengths differ
- **Reference Equality**: Uses strict equality (`===`) for primitive values
- **Deep Comparison**: Recursively compares nested structures
- **Time Complexity**: O(n) where n is the total number of elements (including nested)

## Use Cases

### React Component Props Comparison

```typescript
import React, { memo } from 'react';
import { arrayEquals } from '@helpers4/array';

interface Props {
  items: string[];
}

const ItemList = memo(({ items }: Props) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}, (prevProps, nextProps) => {
  return arrayEquals(prevProps.items, nextProps.items);
});
```

### Cache Invalidation

```typescript
import { arrayEquals } from '@helpers4/array';

class DataCache {
  private cache = new Map<string, any>();
  private lastParams = new Map<string, any[]>();

  get(key: string, params: any[]): any {
    const lastParamsForKey = this.lastParams.get(key);
    
    if (lastParamsForKey && arrayEquals(params, lastParamsForKey)) {
      return this.cache.get(key);
    }
    
    // Cache miss - fetch new data
    const data = this.fetchData(key, params);
    this.cache.set(key, data);
    this.lastParams.set(key, params);
    
    return data;
  }
  
  private fetchData(key: string, params: any[]): any {
    // Implementation...
  }
}
```

### State Management

```typescript
import { arrayEquals } from '@helpers4/array';

interface State {
  selectedIds: number[];
}

class Store {
  private state: State = { selectedIds: [] };
  private listeners: ((state: State) => void)[] = [];

  updateSelection(newIds: number[]) {
    if (!arrayEquals(this.state.selectedIds, newIds)) {
      this.state = { ...this.state, selectedIds: newIds };
      this.notifyListeners();
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}
```

## Related Functions

- [`unique`](./unique.md) - Remove duplicate elements from an array
- [`difference`](./difference.md) - Find elements that are in one array but not another
- [`intersection`](./intersection.md) - Find common elements between arrays

## Notes

- This function performs a **deep** comparison, which means it will recursively compare nested objects and arrays
- For shallow comparison of arrays with primitive values, you might prefer using a simpler approach for better performance
- When comparing large or deeply nested structures, consider the performance implications
- The function handles `null` and `undefined` values correctly
