import { Elysia, t } from "elysia"
import { tzDate } from "./tzDate"

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
