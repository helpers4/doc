---
sidebar_position: 6
---

# sort

Sorts an array using a flexible comparison function or property accessor.

## Signature

```typescript
function sort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[]
function sort<T, K>(array: T[], key: keyof T): T[]
function sort<T>(array: T[], accessor: (item: T) => any): T[]
```

## Parameters

- `array` (T[]): The array to sort
- `compareFn` ((a: T, b: T) => number, optional): Custom comparison function
- `key` (keyof T, optional): Property key to sort by
- `accessor` ((item: T) => any, optional): Function to extract sort value

## Returns

`T[]` - Returns a new sorted array (original array is not modified)

## Description

The `sort` function creates a new sorted array without modifying the original. It supports multiple sorting strategies: custom comparison functions, object property sorting, and accessor functions for complex sorting logic.

## Examples

### Basic Sorting

```typescript
import { sort } from '@helpers4/array';

// Numbers (ascending by default)
sort([3, 1, 4, 1, 5, 9]); // [1, 1, 3, 4, 5, 9]

// Strings (alphabetical)
sort(['banana', 'apple', 'cherry']); // ['apple', 'banana', 'cherry']

// Custom comparison function
sort([3, 1, 4, 1, 5, 9], (a, b) => b - a); // [9, 5, 4, 3, 1, 1] (descending)
```

### Sorting Objects by Property

```typescript
import { sort } from '@helpers4/array';

interface User {
  id: number;
  name: string;
  age: number;
  createdAt: Date;
}

const users: User[] = [
  { id: 3, name: 'Charlie', age: 30, createdAt: new Date('2023-01-15') },
  { id: 1, name: 'Alice', age: 25, createdAt: new Date('2023-03-10') },
  { id: 2, name: 'Bob', age: 35, createdAt: new Date('2023-02-20') }
];

// Sort by property key
sort(users, 'name'); // Sorted by name alphabetically
sort(users, 'age');  // Sorted by age ascending
sort(users, 'id');   // Sorted by id ascending
```

### Sorting with Accessor Functions

```typescript
import { sort } from '@helpers4/array';

// Sort by string length
const words = ['typescript', 'js', 'javascript', 'ts'];
sort(words, word => word.length); // ['js', 'ts', 'typescript', 'javascript']

// Sort by nested property
const products = [
  { name: 'Laptop', price: { amount: 999, currency: 'USD' } },
  { name: 'Mouse', price: { amount: 25, currency: 'USD' } },
  { name: 'Keyboard', price: { amount: 75, currency: 'USD' } }
];

sort(products, item => item.price.amount);
// Sorted by price amount: Mouse, Keyboard, Laptop

// Sort by computed value
const students = [
  { name: 'Alice', scores: [85, 92, 78] },
  { name: 'Bob', scores: [90, 88, 95] },
  { name: 'Charlie', scores: [76, 82, 89] }
];

sort(students, student => 
  student.scores.reduce((sum, score) => sum + score, 0) / student.scores.length
); // Sorted by average score
```

### Advanced Sorting

```typescript
import { sort } from '@helpers4/array';

// Multi-level sorting
interface Employee {
  department: string;
  name: string;
  salary: number;
}

const employees: Employee[] = [
  { department: 'Engineering', name: 'Alice', salary: 90000 },
  { department: 'Marketing', name: 'Bob', salary: 75000 },
  { department: 'Engineering', name: 'Charlie', salary: 95000 },
  { department: 'Marketing', name: 'Diana', salary: 80000 }
];

// Sort by department first, then by salary descending
sort(employees, (a, b) => {
  if (a.department !== b.department) {
    return a.department.localeCompare(b.department);
  }
  return b.salary - a.salary; // Descending salary within department
});

// Date sorting
const events = [
  { name: 'Conference', date: new Date('2024-06-15') },
  { name: 'Workshop', date: new Date('2024-03-10') },
  { name: 'Meetup', date: new Date('2024-12-01') }
];

sort(events, event => event.date.getTime()); // Sort by date chronologically
```

### Locale-Aware String Sorting

```typescript
import { sort } from '@helpers4/array';

// Case-insensitive sorting
const names = ['alice', 'Bob', 'Charlie', 'diana'];
sort(names, (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
// Result: ['alice', 'Bob', 'Charlie', 'diana']

// International characters
const cities = ['Zürich', 'Berlin', 'Ålesund', 'Paris'];
sort(cities, (a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
```

### Edge Cases

```typescript
import { sort } from '@helpers4/array';

// Empty array
sort([]); // []

// Single element
sort([42]); // [42]

// Mixed types (be careful!)
sort([1, '2', 3, '10'], (a, b) => Number(a) - Number(b)); // [1, '2', 3, '10']

// Handling null/undefined values
const dataWithNulls = [
  { value: 5 },
  { value: null },
  { value: 3 },
  { value: undefined },
  { value: 1 }
];

sort(dataWithNulls, (a, b) => {
  if (a.value == null && b.value == null) return 0;
  if (a.value == null) return 1; // null values last
  if (b.value == null) return -1;
  return a.value - b.value;
});
```

## Performance

- **Time Complexity**: O(n log n) - uses efficient sorting algorithms
- **Space Complexity**: O(n) - creates a new array

## Type Safety

The function preserves array types and provides IntelliSense for object properties:

```typescript
import { sort } from '@helpers4/array';

interface Product {
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [/* ... */];

// TypeScript knows these are valid properties
sort(products, 'name');     // ✅ Valid
sort(products, 'price');    // ✅ Valid
sort(products, 'category'); // ✅ Valid
// sort(products, 'invalid'); // ❌ TypeScript error

// Accessor function is properly typed
sort(products, (product) => {
  // product is properly typed as Product
  return product.price * 0.9; // Apply discount for sorting
});
```

## Stability

The sort function maintains stable sorting, meaning that elements with equal sort values retain their relative order:

```typescript
import { sort } from '@helpers4/array';

const items = [
  { id: 1, priority: 2, name: 'First' },
  { id: 2, priority: 1, name: 'Second' },
  { id: 3, priority: 2, name: 'Third' },
  { id: 4, priority: 1, name: 'Fourth' }
];

// Stable sort by priority - items with same priority keep original order
sort(items, 'priority');
// Result maintains relative order for items with priority 1 and priority 2
```

## See Also

- [unique](./unique.md) - Remove duplicates before or after sorting
- [chunk](./chunk.md) - Split sorted arrays into chunks
- [difference](./difference.md) - Compare sorted arrays
- [intersection](./intersection.md) - Find common elements in sorted arrays

## Related Functions

- `unique()` - Often used after sorting to remove duplicates
- `chunk()` - Split sorted data into paginated chunks
- `arrayEquals()` - Compare if two arrays are equal after sorting

## Common Use Cases

1. **Data Display**: Sort table data by different columns
2. **Search Results**: Order search results by relevance or date
3. **User Interfaces**: Sort dropdown options alphabetically
4. **Data Analysis**: Order data for better analysis and visualization
5. **Performance Optimization**: Pre-sort data for faster lookups
6. **Report Generation**: Sort data before generating reports
7. **API Responses**: Return sorted data from API endpoints
