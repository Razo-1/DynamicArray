# DynamicArray

A JavaScript implementation of a dynamic array with private fields support, automatic memory expansion, and fast QuickSort algorithm.

## About the Project

`DynamicArray` is a class that works like a regular array but uses `Int32Array` for storing 32-bit integers. The array automatically expands by a factor of 2 when its capacity is exceeded.

**Key Features:**
- 🔒 Private fields (`#`) for data protection
- 📈 Automatic memory expansion (2x growth)
- ⚡ Fast QuickSort algorithm
- 🔄 Iterator support for `for...of` loops
- ✅ Full input validation

---

## Usage

### Creating an Array

```javascript
// Default: capacity = 8, fill = 0
let arr = new DynamicArray();

// With custom size and fill value
let arr = new DynamicArray(16, 0);
```

### Adding Elements

```javascript
arr.pushBack(10);   // Add to end
arr.pushBack(20);
arr.pushBack(30);

arr.insert(1, 99);  // Insert 99 at position 1
// Result: [10, 99, 20, 30]
```

### Removing Elements

```javascript
let last = arr.popBack();  // Remove from end
// Result: last = 30
```

### Getting Elements

```javascript
let element = arr.at(0);   // Get element by index
let first = arr.front();   // First element
let last = arr.back();     // Last element
```

### Modifying Elements

```javascript
arr.set(2, 100);  // Change element at position 2
// Result: [10, 99, 100, 20]
```

### Sorting

```javascript
arr.sort((a, b) => a - b);  // Sort in ascending order
console.log(arr.toString());  // [10, 20, 99, 100]

// For descending order:
arr.sort((a, b) => a - b);
arr.reverse();
console.log(arr.toString());  // [100, 99, 20, 10]
```

### Reversing

```javascript
arr.reverse();  // Reverse the array
```

### Using in Loops

```javascript
// Method 1: for...of (thanks to Iterator)
for(let value of arr) {
    console.log(value);
}

// Method 2: Generator enteris()
for(let [index, value] of arr.enteris()) {
    console.log(`Index: ${index}, Value: ${value}`);
}

// Method 3: Manual loop
for(let i = 0; i < arr.size(); i++) {
    console.log(arr.at(i));
}
```

---

## API Methods

### Array Information

| Method | Description | Returns |
|--------|-------------|---------|
| `size()` | Number of elements | number |
| `capacity()` | Allocated memory | number |
| `isEmpty()` | Is array empty? | boolean |

### Element Operations

| Method | Description |
|--------|-------------|
| `at(index)` | Get element by index |
| `set(index, value)` | Change element |
| `insert(index, value)` | Insert element (shifts others) |
| `pushBack(value)` | Add to end |
| `popBack()` | Remove from end |
| `front()` | First element |
| `back()` | Last element |

### Array Operations

| Method | Description |
|--------|-------------|
| `clear()` | Clear the array |
| `reverse()` | Reverse the array |
| `sort(compareFn)` | Sort using QuickSort |
| `swap(i, j)` | Swap two elements |
| `toArray()` | Convert to regular array |
| `toString()` | Return Int32Array |

### Iteration

| Method | Description |
|--------|-------------|
| `[Symbol.iterator]()` | Support for `for...of` |
| `*enteris()` | Generator for [index, value] pairs |

---

## Examples

### Example 1: Basic Usage

```javascript
let arr = new DynamicArray();

arr.pushBack(67);
arr.pushBack(-7);
arr.pushBack(54);
arr.pushBack(5417);

console.log(arr.toString());  // [67, -7, 54, 5417]
console.log(arr.size());      // 4
console.log(arr.capacity());  // 8
```

### Example 2: Inserting and Removing

```javascript
let arr = new DynamicArray();

arr.pushBack(10);
arr.pushBack(20);
arr.pushBack(30);

arr.insert(1, 15);  // Insert 15 at position 1
console.log(arr.toString());  // [10, 15, 20, 30]

arr.popBack();
console.log(arr.toString());  // [10, 15, 20]
```

### Example 3: Sorting

```javascript
let arr = new DynamicArray();

arr.pushBack(3);
arr.pushBack(1);
arr.pushBack(4);
arr.pushBack(1);
arr.pushBack(5);

// Ascending order
arr.sort((a, b) => a - b);
console.log(arr.toString());  // [1, 1, 3, 4, 5]

// Descending order
arr.reverse();
console.log(arr.toString());  // [5, 4, 3, 1, 1]
```

### Example 4: Iteration

```javascript
let arr = new DynamicArray();

arr.pushBack(10);
arr.pushBack(20);
arr.pushBack(30);

// Using for...of
for(let value of arr) {
    console.log(value);  // 10, 20, 30
}

// Using enteris() with index
for(let [index, value] of arr.enteris()) {
    console.log(`[${index}] = ${value}`);
}
// [0] = 10
// [1] = 20
// [2] = 30
```

---

## How Memory Expansion Works

When you add elements, the array automatically expands:

```javascript
let arr = new DynamicArray(4);  // capacity = 4

arr.pushBack(10);  // size = 1, capacity = 4
arr.pushBack(20);  // size = 2, capacity = 4
arr.pushBack(30);  // size = 3, capacity = 4
arr.pushBack(40);  // size = 4, capacity = 4 (FULL!)

arr.pushBack(50);  // Automatic resize!
                   // size = 5, capacity = 8 (4 * 2)
```

**Growth Factor:** `#GROWTH = 2` (doubles the capacity)

---

## Encapsulation and Private Fields

All internal data is protected by private fields (`#`):

```javascript
arr.#size = 100;  // ❌ ERROR! Private field
arr.size();       // ✅ OK! Public method

arr.#arr[0] = 5;  // ❌ ERROR! Direct access forbidden
arr.at(0);        // ✅ OK! Through public method
```

This ensures **data integrity** and prevents accidental errors.

---

## Requirements

- **Node.js** version 12+ (for private fields support)
- **Int32Array** is supported in all modern browsers

---

## Errors and Exceptions

The class will throw an error in the following cases:

```javascript
new DynamicArray(-5);           // ❌ Capacity must be > 0
new DynamicArray("abc");        // ❌ Must be a number

arr.at(10);                     // ❌ Index out of bounds
arr.at("string");               // ❌ Index must be a number

arr.pushBack("text");           // ❌ Value must be a number
arr.set(0, null);               // ❌ Value must be a number

arr.sort((a, b) => b - a);      // ⚠️  May not work as expected
```

---

## Time Complexity

| Operation | Complexity |
|-----------|-----------|
| `pushBack()` | O(1) amortized |
| `popBack()` | O(1) |
| `at()`, `set()` | O(1) |
| `insert()` | O(n) |
| `sort()` | O(n log n) average |
| `reverse()` | O(n) |

---

## License

MIT

---

## Author

Created for learning data structures in JavaScript.

---

## Notes

- The array stores only **32-bit signed integers** (`Int32Array`)
- For other data types, the class needs to be modified
- For descending sort, use `sort()` + `reverse()`
- The QuickSort implementation works best with ascending comparators
