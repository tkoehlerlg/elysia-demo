import { t } from "elysia"
import { DateTime } from "luxon"
import { DateOptions } from "@sinclair/typebox"

export const exampleTimeZone = "Europe/Berlin"
const exampleDate = DateTime.now().setZone(exampleTimeZone).toISO()

// https://github.com/sinclairzx81/typebox?tab=readme-ov-file#transform-types
export const tzDate = (options?: DateOptions) =>
    t
        .Transform(
            t.String({
                description: "Date in ISO format with timezone",
                examples: [exampleDate],
                ...options,
            })
        )
        .Decode((s) => {
            console.log("s:", s)
            return new Date(s)
        })
        .Encode((d) => {
            const timeZone = "Europe/Berlin"
            const timeZonedDate = DateTime.fromISO(d.toISOString()).setZone(
                timeZone
            )
            console.log("timeZonedDate:", timeZonedDate.toISO())
            return timeZonedDate.toISO()!
        })
