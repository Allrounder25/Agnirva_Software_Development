# Sorting and Searching Algorithms CLI

This is a simple, menu-driven command-line program written in JavaScript (for Node.js) that demonstrates three common algorithms: Bubble Sort, Linear Search, and Binary Search.

## Features

*   **Bubble Sort**: Sort a list of numbers in ascending order.
*   **Linear Search**: Find the index of a specific number in a list.
*   **Binary Search**: Find the index of a specific number in a sorted list.

## Prerequisites

To run this program, you must have [Node.js](https://nodejs.org/) installed on your system.

## How to Use

1.  **Save the Code**: Save the provided JavaScript code into a file named `sortingMethods.js`.

2.  **Open Terminal**: Open your terminal or command prompt.

3.  **Navigate to Directory**: Navigate to the directory where you saved `sortingMethods.js`.
    ```bash
    cd path/to/your/directory
    ```

4.  **Run the Program**: Execute the script using Node.js.
    ```bash
    node sortingMethods.js
    ```

5.  **Interact with the Menu**: Once the program starts, you will see a menu with the following options:

    ```
    --- Mini Menu ---
    1. Bubble Sort
    2. Linear Search
    3. Binary Search
    4. Exit
    Choose an option:
    ```

    *   **Option 1 (Bubble Sort)**: You will be prompted to enter a comma-separated list of numbers. The program will sort these numbers using Bubble Sort and display the result.
    *   **Option 2 (Linear Search)**: You will be prompted for a list of numbers and a target number to find. The program will search the list and show the index of the target if found.
    *   **Option 3 (Binary Search)**: You will be prompted for a list of numbers and a target number. **Note**: Binary Search requires the list to be sorted. The program will automatically sort your provided list first and then perform the search.
    *   **Option 4 (Exit)**: This will terminate the program.

## Example Session

Here is an example of how to use the program to perform a binary search:

```
$ node sortingMethods.js
Welcome to the Sorting and Searching Program!

--- Mini Menu ---
1. Bubble Sort
2. Linear Search
3. Binary Search
4. Exit
Choose an option: 3

--- Binary Search ---
Enter a comma-separated list of numbers (e.g., 5,2,8,1): 10, 50, 2, 88, 14
Note: Binary Search requires a sorted array. Your array has been sorted to: [ 2, 10, 14, 50, 88 ]
Enter the target number to search for: 14
Target 14 found at index: 2 in the sorted array.

--- Mini Menu ---
1. Bubble Sort
2. Linear Search
3. Binary Search
4. Exit
Choose an option: 4
Exiting program. Goodbye!
```