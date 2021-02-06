# node-chimu-api
NodeJS Wrapper for Chimu API


Example:

```js
const ChimuAPI = require('@chimumoe/api');

const api = new ChimuAPI;

(async () => {
    console.log(await api.search({ query: "peppy" }));
})();
```
