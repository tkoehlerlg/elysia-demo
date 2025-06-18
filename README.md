# Elysia Plugin Demo - t.Transform Issue

This project demonstrates an issue with `t.Transform` in Elysia where transformation logs are not appearing in the console output when using certain Elysia configurations.

## The Problem

When using `t.Transform` from TypeBox with Elysia, the transformation function is not being called when `aot` is set to `false`. The transform works as expected in the default configuration where `aot` is `true`.

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

## Workaround

For the transform to work, avoid setting `aot: false` in the Elysia constructor unless absolutely necessary. The default configuration with `aot: true` (which is the default) works correctly:

```typescript
// This works (default configuration)
const app = new Elysia()

// This also works with explicit aot: true
const app = new Elysia({ aot: true })

// This will break the transform functionality
const app = new Elysia({ aot: false })
```

If you must use `aot: false`, you'll need to handle transformations manually in your route handlers or middleware.

## When is `aot: false` Needed?

While the default `aot: true` works best for most scenarios, there are specific cases where you might need to set `aot: false`:

### Cloudflare Workers

Cloudflare Workers have some limitations that might require disabling AOT:

1. **Module Resolution**: Cloudflare Workers use a different module system than Node.js, which can cause issues with AOT compilation.

2. **Dynamic Imports**: If your application relies on dynamic imports, these might not work as expected with AOT compilation in Cloudflare's environment.

3. **Bundle Size**: AOT can increase the bundle size, which is a concern in Cloudflare Workers where the bundle size is limited to 1MB (or 10MB on paid plans).

4. **Cold Start Performance**: While AOT can improve cold start times in some environments, in Cloudflare Workers the difference is often negligible due to their architecture.

### Other Scenarios

- **Development Environment**: During development, you might want faster iteration cycles where AOT's optimization benefits are less critical.
- **Debugging**: When debugging complex type transformations, disabling AOT can sometimes make it easier to trace issues.
- **Plugin Compatibility**: Some Elysia plugins might not be fully compatible with AOT compilation.

## Workarounds for Cloudflare Workers

If you need to use `aot: false` in Cloudflare Workers but still need transform functionality, consider:

1. **Manual Transformation**: Perform transformations in your route handlers instead of using `t.Transform`.
2. **Pre-process Data**: Transform data before it reaches your Elysia routes if possible.
3. **Use Middleware**: Implement custom middleware to handle transformations when AOT is disabled.

## Project Structure

-   `src/index.ts`: Main application file that demonstrates the Elysia configuration affecting transform behavior
-   `src/tzDate.ts`: Contains the date transformation logic using `t.Transform` from TypeBox

## Development

To start the development server:

```bash
bun run dev
```
