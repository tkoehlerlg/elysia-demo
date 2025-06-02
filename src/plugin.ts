import { Elysia } from "elysia"

export const asyncPlugin = new Elysia().resolve(
    { as: "scoped" },
    async ({ status }) => {
        if (1 === 1) return status(401)
        return { a: 10 }
    }
)

export const plugin = new Elysia().resolve(
    { as: "scoped" },
    ({ status, query }) => {
        if ("secure" === query.input) return status(401)
        return { b: 10 }
    }
)
