import { Elysia, t } from "elysia"
import { asyncPlugin, plugin } from "./plugin"

// Async plugin with async resolve
const asyncPluginRoute = new Elysia()
    .use(asyncPlugin)
    // (parameter) a: 10
    .get("/async", ({ a }) => ({ a: a ?? "Undefined" }))

// Non async plugin with sync resolve
// (parameter) b: 10
const pluginRoute = new Elysia()
    .use(plugin)
    .get("/", ({ b }) => ({ b: b ?? "Undefined" }))

const app = new Elysia({ aot: false }).use(asyncPluginRoute).use(pluginRoute)

export default app

// Please test the following routes in your browser
// http://localhost:3000/async - Expected: 401, Actual: { "a": "Undefined" }
// http://localhost:3000/ - Expected: { "b": 10 }, Actual: { "b": 10 }
// http://localhost:3000/?input=secure - Expected: 401, Actual: 401

//
//
//
//
//
//
// Wrangler Code

// export default {
//     async fetch(
//         request: Request,
//         env: unknown,
//         ctx: unknown
//     ): Promise<Response> {
//         const app = new Elysia({ aot: false })
//             .use(plugin)
//             .get("/", ({ a }) => a ?? "Help")

//         return await app.handle(request)
//     },
// }
