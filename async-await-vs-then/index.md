## Async code

```js
function printLine() {
  console.log("ONE");
}

setTimeout(printLine, 10000);

console.log("TWO");
```

## 1. starter

```js
const url = `https://jsonplaceholder.typicode.com/todos/1`;

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
```

## 2. async

```js
const loadData = async () => {
  const url = `https://jsonplaceholder.typicode.com/todos/1`;
  const res = await fetch(url);
  console.log(res);
  const data = await res.json();
  console.log(data);
};

loadData();
```

```js
// 3a. async error handling
const loadData = async () => {
  try {
    const url = `https://XXXX-jsonplaceholder.typicode.com/todos/1`;
    const res = await fetch(url);
    console.log(res);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.warn(err);
  }
};

loadData();
```

```js
// 3b. checking fetch res.ok
// error might not come through catch but elsewhere
const loadData = async () => {
  try {
    const url = `https://jsonplaceholder.typicode.com/todos/1`;
    const res = await fetch(url);
    console.log(res);
    console.log("200-209", res.ok);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.warn(err);
  }
};

loadData();
```

```js
// 4. async functions return a promise
const loadData = async () => {
  try {
    const url = `https://jsonplaceholder.typicode.com/todos/1`;
    const res = await fetch(url);
    console.log("200-209", res.ok);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
};

// returns a promise
const stuff = loadData();
console.log("stuff", stuff);

// so we need to chain .then
const stuff = loadData().then((data) => console.log("dot then", data));
console.log("stuff", stuff);
```

```js
// 5. NOT promise.all
const loadData = async () => {
  try {
    const url1 = `https://jsonplaceholder.typicode.com/todos/1`;
    const url2 = `https://jsonplaceholder.typicode.com/todos/2`;
    const url3 = `https://jsonplaceholder.typicode.com/todos/3`;

    const res1 = await fetch(url1);
    const data1 = await res1.json();

    const res2 = await fetch(url2);
    const data2 = await res2.json();

    const res3 = await fetch(url3);
    const data3 = await res3.json();

    return [data1, data2, data3];
  } catch (err) {
    console.warn(err);
  }
};

const stuff = loadData().then((data) => console.log("dot then", data));
```

```js
// 6.  promise.all
const loadData = async () => {
  try {
    const url1 = `https://jsonplaceholder.typicode.com/todos/1`;
    const url2 = `https://jsonplaceholder.typicode.com/todos/2`;
    const url3 = `https://jsonplaceholder.typicode.com/todos/3`;

    const results = await Promise.all([fetch(url1), fetch(url2), fetch(url3)]);

    const dataPromises = results.map((result) => result.json());
    const finalData = await Promise.all(dataPromises);
    console.log("finalData", finalData);
    return finalData;
  } catch (err) {
    console.warn(err);
  }
};

const stuff = loadData().then((data) => console.log("dot then", data));
```

```js
// 7 alt
const finalData = await Promise.all(results.map((result) => result.json()));
```
