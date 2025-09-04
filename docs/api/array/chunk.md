---
sidebar_position: 2
---

# chunk

Splits an array into chunks of a specified size.

## Signature

```typescript
function chunk<T>(array: T[], size: number): T[][]
```

## Parameters

- `array` (T[]): The array to chunk
- `size` (number): The size of each chunk (must be positive)

## Returns

`T[][]` - Returns an array of chunks, where each chunk is an array of up to `size` elements

## Description

The `chunk` function divides an array into smaller arrays of a specified maximum size. If the array can't be split evenly, the final chunk will contain the remaining elements.

## Examples

### Basic Usage

```typescript
import { chunk } from '@helpers4/array';

// Basic chunking
chunk([1, 2, 3, 4, 5, 6], 2);
// Result: [[1, 2], [3, 4], [5, 6]]

chunk([1, 2, 3, 4, 5], 2);
// Result: [[1, 2], [3, 4], [5]]

chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Result: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```

### Edge Cases

```typescript
import { chunk } from '@helpers4/array';

// Empty array
chunk([], 3); // []

// Single element
chunk([1], 3); // [[1]]

// Chunk size larger than array
chunk([1, 2], 5); // [[1, 2]]

// Chunk size of 1
chunk([1, 2, 3], 1); // [[1], [2], [3]]
```

### Complex Data Types

```typescript
import { chunk } from '@helpers4/array';

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Eve' }
];

const userChunks = chunk(users, 2);
// Result: [
//   [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
//   [{ id: 3, name: 'Charlie' }, { id: 4, name: 'David' }],
//   [{ id: 5, name: 'Eve' }]
// ]
```

## Use Cases

### Pagination

```typescript
import { chunk } from '@helpers4/array';

class Paginator<T> {
  private items: T[];
  private pageSize: number;

  constructor(items: T[], pageSize: number) {
    this.items = items;
    this.pageSize = pageSize;
  }

  getPage(pageNumber: number): T[] {
    const chunks = chunk(this.items, this.pageSize);
    return chunks[pageNumber - 1] || [];
  }

  getTotalPages(): number {
    return Math.ceil(this.items.length / this.pageSize);
  }
}

// Usage
const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
const paginator = new Paginator(items, 10);

console.log(paginator.getPage(1)); // First 10 items
console.log(paginator.getTotalPages()); // 10
```

### Batch Processing

```typescript
import { chunk } from '@helpers4/array';

async function processItemsInBatches<T>(
  items: T[],
  batchSize: number,
  processor: (batch: T[]) => Promise<void>
): Promise<void> {
  const batches = chunk(items, batchSize);
  
  for (const batch of batches) {
    await processor(batch);
    console.log(`Processed batch of ${batch.length} items`);
  }
}

// Usage
const urls = [
  'https://api.example.com/user/1',
  'https://api.example.com/user/2',
  // ... more URLs
];

await processItemsInBatches(urls, 5, async (urlBatch) => {
  const promises = urlBatch.map(url => fetch(url));
  await Promise.all(promises);
});
```

### Grid Layout

```typescript
import { chunk } from '@helpers4/array';

interface GridProps<T> {
  items: T[];
  columns: number;
  renderItem: (item: T) => React.ReactNode;
}

function Grid<T>({ items, columns, renderItem }: GridProps<T>) {
  const rows = chunk(items, columns);

  return (
    <div className="grid">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((item, itemIndex) => (
            <div key={itemIndex} className="grid-item">
              {renderItem(item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

### Data Processing Pipeline

```typescript
import { chunk } from '@helpers4/array';

class DataProcessor {
  async processLargeDataset(data: any[], chunkSize = 1000) {
    const chunks = chunk(data, chunkSize);
    const results = [];

    for (let i = 0; i < chunks.length; i++) {
      console.log(`Processing chunk ${i + 1}/${chunks.length}`);
      
      const chunkResult = await this.processChunk(chunks[i]);
      results.push(...chunkResult);
      
      // Allow other tasks to run
      await new Promise(resolve => setTimeout(resolve, 0));
    }

    return results;
  }

  private async processChunk(chunk: any[]): Promise<any[]> {
    // Simulate heavy processing
    return chunk.map(item => ({
      ...item,
      processed: true,
      timestamp: Date.now()
    }));
  }
}
```

## Performance Considerations

- **Time Complexity**: O(n) where n is the length of the input array
- **Space Complexity**: O(n) for the output array
- **Memory Efficient**: Creates a new array structure but preserves original element references
- **No Mutation**: The original array is not modified

## Error Handling

```typescript
import { chunk } from '@helpers4/array';

// The function validates the chunk size
try {
  chunk([1, 2, 3], 0); // Throws error: Chunk size must be positive
} catch (error) {
  console.error(error.message);
}

try {
  chunk([1, 2, 3], -1); // Throws error: Chunk size must be positive
} catch (error) {
  console.error(error.message);
}
```

## Related Functions

- [`unique`](./unique.md) - Remove duplicate elements from an array
- [`sort`](./sort.md) - Sort array elements
- [`difference`](./difference.md) - Find elements that are in one array but not another

## Notes

- The chunk size must be a positive integer
- The function returns a shallow copy of the chunks - original elements are preserved by reference
- Empty arrays return an empty array of chunks
- If the chunk size is larger than the array length, returns a single chunk containing all elements
