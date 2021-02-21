# node-chimu-api
NodeJS Wrapper for Chimu API

Example:

### TypeScript

```ts
import ChimuAPI from "@chimumoe/api";

const api = new ChimuAPI;

(async () => {
    console.log(await api.search({ query: "peppy" }));
})();
```

### JavaScript

```js
const ChimuAPI = require("@chimumoe/api").default

const api = new ChimuAPI;

(async () => {
    console.log(await api.search({ query: "peppy" }));
})();
```