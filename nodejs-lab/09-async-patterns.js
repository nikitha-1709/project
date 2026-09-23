function callbackExample(done) { setTimeout(() => done('Callback complete'), 100); }
const promiseExample = new Promise(resolve => setTimeout(() => resolve('Promise complete'), 100));
callbackExample(console.log);
promiseExample.then(console.log);
(async () => console.log('Async/await complete'))();