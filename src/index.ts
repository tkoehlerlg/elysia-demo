import { Elysia, t } from "elysia"
import { tzDate } from "./tzDate"

const app = new Elysia({ aot: false, encodeSchema: true }).get(
    "/",
    () => ({ date: new Date() }),
    {
        response: {
            200: t.Object({
                date: tzDate(),
            }),
        },
    }
)

export default app
