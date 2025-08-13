const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function bubbleSort(arr) {
    const n = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
    } while (swapped);
    return arr;
}

function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

function askForArray(callback) {
    rl.question('Enter a comma-separated list of numbers (e.g., 5,2,8,1): ', (input) => {
        const arr = input.split(',').map(item => parseInt(item.trim(), 10)).filter(item => !isNaN(item));
        if (arr.length === 0) {
            console.log('Invalid input. Please enter a list of numbers.');
            askForArray(callback);
        } else {
            callback(arr);
        }
    });
}

function askForTarget(callback) {
    rl.question('Enter the target number to search for: ', (input) => {
        const target = parseInt(input.trim(), 10);
        if (isNaN(target)) {
            console.log('Invalid input. Please enter a valid number.');
            askForTarget(callback);
        } else {
            callback(target);
        }
    });
}

function showMenu() {
    console.log('\n--- Mini Menu ---');
    console.log('1. Bubble Sort');
    console.log('2. Linear Search');
    console.log('3. Binary Search');
    console.log('4. Exit');
    rl.question('Choose an option: ', (choice) => {
        handleMenuChoice(choice.trim());
    });
}

function handleMenuChoice(choice) {
    switch (choice) {
        case '1':
            console.log('\n--- Bubble Sort ---');
            askForArray((arr) => {
                const sortedArray = bubbleSort(arr);
                console.log('Sorted array:', sortedArray);
                showMenu();
            });
            break;
        case '2':
            console.log('\n--- Linear Search ---');
            askForArray((arr) => {
                askForTarget((target) => {
                    const index = linearSearch(arr, target);
                    if (index !== -1) {
                        console.log(`Target ${target} found at index: ${index}`);
                    } else {
                        console.log(`Target ${target} not found in the array.`);
                    }
                    showMenu();
                });
            });
            break;
        case '3':
            console.log('\n--- Binary Search ---');
            askForArray((arr) => {
                const sortedArr = bubbleSort([...arr]);
                console.log('Note: Binary Search requires a sorted array. Your array has been sorted to:', sortedArr);
                askForTarget((target) => {
                    const index = binarySearch(sortedArr, target);
                    if (index !== -1) {
                        console.log(`Target ${target} found at index: ${index} in the sorted array.`);
                    } else {
                        console.log(`Target ${target} not found in the sorted array.`);
                    }
                    showMenu();
                });
            });
            break;
        case '4':
            console.log('\n---Program is closed---\n');
            rl.close();
            break;
        default:
            console.log('Invalid option. Please choose a number from 1 to 4.');
            showMenu();
            break;
    }
}

console.log('Welcome to the Sorting and Searching Program!');
showMenu();
