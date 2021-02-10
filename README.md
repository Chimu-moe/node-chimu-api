# node-chimu-api
NodeJS Wrapper for Chimu API


Example:

```ts
import ChimuAPI from "@chimumoe/api";


const api = new ChimuAPI;

(async () => {
    console.log(await api.search({ query: "peppy" }));
})();
```
