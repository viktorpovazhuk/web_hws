async function try_promise() {
    await new Promise(() => {
        setTimeout(() => console.log('in promise'), 2000);
    });

    return 0;
}

// execution don't stop => executed in seperate thread
try_promise();

// printed previously
console.log('after promise');