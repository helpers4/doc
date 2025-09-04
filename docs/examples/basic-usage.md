---
sidebar_position: 1
---

# Basic Usage

This guide covers the most common usage patterns and examples for Helpers4 functions across different categories.

## Array Helpers

### Working with Collections

```typescript
import { chunk, unique, arrayEquals, difference } from '@helpers4/array';

// Example: Processing user data in batches
const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Charlie', role: 'user' },
  { id: 4, name: 'David', role: 'admin' },
  { id: 5, name: 'Eve', role: 'user' },
  { id: 6, name: 'Frank', role: 'user' },
];

// Process users in batches of 3
const userBatches = chunk(users, 3);
console.log(userBatches);
// Output: [
//   [{ id: 1, name: 'Alice', role: 'admin' }, ...],
//   [{ id: 4, name: 'David', role: 'admin' }, ...],
// ]

// Get unique roles
const roles = unique(users.map(user => user.role));
console.log(roles); // ['admin', 'user']

// Compare user lists
const currentUsers = [users[0], users[1], users[2]];
const newUsers = [users[0], users[1], users[3]];

const isEqual = arrayEquals(currentUsers, newUsers);
console.log(isEqual); // false

const removedUsers = difference(
  currentUsers.map(u => u.id), 
  newUsers.map(u => u.id)
);
console.log(removedUsers); // [3]
```

### Data Deduplication

```typescript
import { unique, arrayEquals } from '@helpers4/array';

// Remove duplicate products
const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 1, name: 'Laptop', price: 999 }, // duplicate
  { id: 3, name: 'Keyboard', price: 75 },
  { id: 2, name: 'Mouse', price: 25 }, // duplicate
];

// Using unique with custom comparison
const uniqueProducts = unique(products, (a, b) => a.id === b.id);
console.log(uniqueProducts);
// Output: [
//   { id: 1, name: 'Laptop', price: 999 },
//   { id: 2, name: 'Mouse', price: 25 },
//   { id: 3, name: 'Keyboard', price: 75 },
// ]
```

## Function Helpers

### Event Handling Optimization

```typescript
import { debounce, throttle } from '@helpers4/function';

// Search input with debouncing
const searchInput = document.getElementById('search') as HTMLInputElement;

const performSearch = debounce((query: string) => {
  console.log('Searching for:', query);
  // API call here
  fetch(`/api/search?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(results => {
      // Update UI with results
      console.log('Search results:', results);
    });
}, 300);

searchInput?.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement;
  performSearch(target.value);
});

// Scroll event with throttling
const updateScrollIndicator = throttle(() => {
  const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  const indicator = document.getElementById('scroll-indicator');
  if (indicator) {
    indicator.style.width = `${scrollPercent}%`;
  }
}, 100);

window.addEventListener('scroll', updateScrollIndicator);
```

### Memoization for Performance

```typescript
import { memoize } from '@helpers4/function';

// Expensive calculation with memoization
const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// API call memoization
const fetchUserData = memoize(async (userId: number) => {
  console.log(`Fetching data for user ${userId}`);
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

// Usage
console.log(fibonacci(10)); // Calculates and caches
console.log(fibonacci(10)); // Returns cached result

fetchUserData(1); // Makes API call
fetchUserData(1); // Returns cached promise
```

## Object Helpers

### Configuration Management

```typescript
import { deepMerge, get, set, deepClone } from '@helpers4/object';

// Default application configuration
const defaultConfig = {
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
  },
  ui: {
    theme: 'light',
    animations: true,
    language: 'en',
  },
  features: {
    analytics: false,
    debugging: false,
  },
};

// User preferences
const userConfig = {
  api: {
    timeout: 10000, // Override timeout
  },
  ui: {
    theme: 'dark', // Override theme
  },
  features: {
    analytics: true, // Enable analytics
  },
};

// Merge configurations
const finalConfig = deepMerge(defaultConfig, userConfig);
console.log(finalConfig);
// Output: {
//   api: { baseUrl: '...', timeout: 10000, retries: 3 },
//   ui: { theme: 'dark', animations: true, language: 'en' },
//   features: { analytics: true, debugging: false },
// }

// Safe property access
const apiTimeout = get(finalConfig, 'api.timeout', 3000);
const nonExistentProp = get(finalConfig, 'database.host', 'localhost');

console.log(apiTimeout); // 10000
console.log(nonExistentProp); // 'localhost'

// Dynamic property setting
const newConfig = deepClone(finalConfig);
set(newConfig, 'cache.redis.host', 'localhost:6379');
set(newConfig, 'cache.redis.db', 0);

console.log(get(newConfig, 'cache.redis.host')); // 'localhost:6379'
```

### Form Data Processing

```typescript
import { removeUndefinedNull, deepClone } from '@helpers4/object';

// Clean form data before submission
const formData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: undefined,
  address: {
    street: '123 Main St',
    city: 'New York',
    zipCode: null,
    country: 'USA',
  },
  preferences: {
    newsletter: true,
    notifications: null,
    theme: undefined,
  },
};

// Remove undefined and null values
const cleanData = removeUndefinedNull(formData);
console.log(cleanData);
// Output: {
//   name: 'John Doe',
//   email: 'john@example.com',
//   address: {
//     street: '123 Main St',
//     city: 'New York',
//     country: 'USA',
//   },
//   preferences: {
//     newsletter: true,
//   },
// }
```

## Promise Helpers

### API Error Handling

```typescript
import { retry, meaningPromiseOrThrow, delay } from '@helpers4/promise';

// Retry failed API calls
const fetchWithRetry = retry(
  async () => {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  },
  {
    retries: 3,
    delay: 1000, // Wait 1 second between retries
    backoff: 'exponential', // Increase delay exponentially
  }
);

// Usage
try {
  const data = await fetchWithRetry();
  console.log('Data fetched successfully:', data);
} catch (error) {
  console.error('Failed to fetch data after retries:', error);
}

// Validate API responses
const fetchUserProfile = async (userId: number) => {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  
  // Ensure we have meaningful data
  return meaningPromiseOrThrow(
    data,
    (user) => user && user.id && user.name,
    'Invalid user data received'
  );
};

// Usage with error handling
try {
  const user = await fetchUserProfile(123);
  console.log('Valid user:', user);
} catch (error) {
  console.error('Invalid or missing user data:', error.message);
}
```

### Sequential Processing with Delays

```typescript
import { delay } from '@helpers4/promise';

// Process items with rate limiting
async function processItemsWithDelay<T>(
  items: T[],
  processor: (item: T) => Promise<void>,
  delayMs: number = 1000
) {
  for (let i = 0; i < items.length; i++) {
    await processor(items[i]);
    
    // Add delay between items (except for the last one)
    if (i < items.length - 1) {
      await delay(delayMs);
    }
  }
}

// Usage
const emails = ['user1@example.com', 'user2@example.com', 'user3@example.com'];

await processItemsWithDelay(
  emails,
  async (email) => {
    console.log(`Sending email to ${email}`);
    // Simulate API call
    await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ to: email }),
    });
  },
  2000 // 2 second delay between emails
);
```

## String Helpers

### Text Processing Pipeline

```typescript
import { capitalize, camelCase } from '@helpers4/string';

// Process user input
const userInputs = [
  'hello world',
  'user-name',
  'api_endpoint',
  'BUTTON_LABEL',
];

const processedInputs = userInputs.map(input => ({
  original: input,
  capitalized: capitalize(input),
  camelCase: camelCase(input),
}));

console.log(processedInputs);
// Output: [
//   { original: 'hello world', capitalized: 'Hello world', camelCase: 'helloWorld' },
//   { original: 'user-name', capitalized: 'User-name', camelCase: 'userName' },
//   { original: 'api_endpoint', capitalized: 'Api_endpoint', camelCase: 'apiEndpoint' },
//   { original: 'BUTTON_LABEL', capitalized: 'BUTTON_LABEL', camelCase: 'buttonLabel' },
// ]
```

## Combining Multiple Helpers

### Data Processing Pipeline

```typescript
import { chunk, unique } from '@helpers4/array';
import { debounce } from '@helpers4/function';
import { deepMerge } from '@helpers4/object';
import { retry } from '@helpers4/promise';

// Complex data processing example
class DataProcessor {
  private processedData: any[] = [];
  
  // Debounced processing to avoid excessive calls
  private debouncedProcess = debounce(
    (data: any[]) => this.processInternalData(data),
    500
  );

  async processData(rawData: any[]) {
    // Remove duplicates
    const uniqueData = unique(rawData, (a, b) => a.id === b.id);
    
    // Process in chunks for better performance
    const chunks = chunk(uniqueData, 100);
    
    for (const chunk of chunks) {
      await this.processChunk(chunk);
    }
    
    return this.processedData;
  }

  private async processChunk(chunk: any[]) {
    // Process each item with retry logic
    const processItem = retry(
      async (item: any) => {
        const processed = await this.enrichItem(item);
        return processed;
      },
      { retries: 2, delay: 100 }
    );

    const processedChunk = await Promise.all(
      chunk.map(item => processItem(item))
    );

    this.processedData.push(...processedChunk);
  }

  private async enrichItem(item: any) {
    // Merge with default values
    const enriched = deepMerge(
      {
        processed: true,
        timestamp: Date.now(),
        metadata: {},
      },
      item
    );

    return enriched;
  }

  private processInternalData(data: any[]) {
    // Internal processing logic
    console.log(`Processing ${data.length} items internally`);
  }

  // Public method that uses debounced processing
  addData(newData: any[]) {
    this.debouncedProcess(newData);
  }
}

// Usage
const processor = new DataProcessor();
const data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 1, name: 'Item 1' }, // duplicate
];

const result = await processor.processData(data);
console.log('Processed data:', result);
```

## Best Practices

### 1. Import Only What You Need

```typescript
// ✅ Good - Tree-shaking friendly
import { chunk, unique } from '@helpers4/array';
import { debounce } from '@helpers4/function';

// ❌ Avoid - Imports entire packages
import * as arrayHelpers from '@helpers4/array';
import * as functionHelpers from '@helpers4/function';
```

### 2. Type Safety

```typescript
// Use TypeScript for better development experience
import { memoize } from '@helpers4/function';

// Function is properly typed
const calculateTotal = memoize((items: { price: number }[]) => {
  return items.reduce((sum, item) => sum + item.price, 0);
});

// TypeScript will catch type errors
const items = [{ price: 10 }, { price: 20 }];
const total = calculateTotal(items); // number
```

### 3. Error Handling

```typescript
import { meaningPromiseOrThrow } from '@helpers4/promise';

// Always handle potential errors
try {
  const result = await meaningPromiseOrThrow(
    apiCall(),
    (data) => data && data.success,
    'API call failed'
  );
  // Use result safely
} catch (error) {
  console.error('Operation failed:', error.message);
  // Handle error appropriately
}
```

### 4. Performance Considerations

```typescript
import { debounce, throttle, memoize } from '@helpers4/function';

// Use debounce for user input
const handleSearch = debounce(searchFunction, 300);

// Use throttle for scroll/resize events
const handleScroll = throttle(updateUI, 100);

// Use memoize for expensive calculations
const expensiveCalculation = memoize(heavyComputeFunction);
```

These examples demonstrate the practical usage of Helpers4 functions in real-world scenarios. Each helper is designed to solve common programming challenges while maintaining type safety and performance.
