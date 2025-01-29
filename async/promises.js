let promise_1 = new Promise((resolse, reject) => {
    setTimeout(() => {
        resolse('Promise 1 is resolved');
    }, 6000);   
})

let promise_2 = new Promise((resolse, reject) => {
    setTimeout(() => {
        resolse('Promise 2 is resolved');
    }, 3000);   
})

promise_1.then((data) => {
    console.log(data);

    promise_2.then((data) => {
        console.log(data);
    })  
})
