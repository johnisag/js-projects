function fcallback(){
    console.log("First callback");
}

console.log("will call in 5");

setTimeout(fcallback, 5000);