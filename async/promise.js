// create promise to be resolved after 6 sec
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise is resolved');
    }, 6000);
}); 

console.log("Before calling promise");

promise.then((data) => {
    console.log(data);
}); 

console.log("After calling promise");