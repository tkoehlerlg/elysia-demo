# Elysia Plugin Demo - t.Transform Issue

This project demonstrates an issue with `t.Transform` in Elysia where transformation logs are not appearing in the console output.

## How to Reproduce

1. Start the development server:

```bash
bun run dev
```

2. Check the console output for the development server. You should see the server start message:
   ```
   Started development server: http://localhost:3000
   date: [current-date-time]
   ```
   However, you won't see any transformation logs from `t.Transform`.

## Project Structure

-   `src/index.ts`: Main application file that sets up the Elysia server
-   `src/tzDate.ts`: Contains the date transformation logic using `t.Transform`

## Development

To start the development server:

```bash
bun run dev
```
