# Elysia Plugin Demo - Async Plugin Issue

This project demonstrates an issue with async plugins in Elysia when using the `resolve` method with `as: "scoped"` parameter.

## The Problem

When using an async plugin with async resolve, the status code is not properly propagated to the response. This issue occurs specifically when:

1. Using an async plugin with `resolve` method
2. Setting `as: "scoped"` in the resolve options
3. Returning a status code from the async function

## How to Reproduce

1. Start the development server:

```bash
bun run dev
```

2. Test the following routes in your browser:

    - **Async Plugin Route**: http://localhost:3000/async
        - Expected: 401 Unauthorized
        - Actual: `{ "a": "Undefined" }`
    - **Sync Plugin Route**: http://localhost:3000/
        - Expected: `{ "b": 10 }`
        - Actual: `{ "b": 10 }` (works correctly)
    - **Sync Plugin with Query**: http://localhost:3000/?input=secure
        - Expected: 401 Unauthorized
        - Actual: 401 Unauthorized (works correctly)

## Project Structure

-   `src/index.ts`: Main application file that sets up routes using both async and sync plugins
-   `src/plugin.ts`: Contains the plugin definitions
    -   `asyncPlugin`: An async plugin that should return 401 status but doesn't
    -   `plugin`: A sync plugin that correctly handles status codes

## Development

To start the development server:

```bash
bun run dev
```
