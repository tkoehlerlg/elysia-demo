import { Elysia, t } from "elysia"
import { tzDate } from "./tzDate"

// https://elysiajs.com/patterns/configuration#encodeschema
// when enabling aot it works
const app = new Elysia({ aot: false, encodeSchema: true }).get(
    "/",
    () => {
        const date = new Date()
        console.log("date:", date)
        return { date }
    },
    {
        response: {
            200: t.Object({
                date: tzDate(),
            }),
        },
    }
)

export default app
