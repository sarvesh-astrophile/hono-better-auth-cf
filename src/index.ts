import { Hono } from "hono";
import { createAuth } from "./lib/auth";
import { initDB } from "./db/db";
import { env } from "cloudflare:workers";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use('*', async (c, next) => {
  initDB(env.hono_better_auth_cf);
  await next();
});

app
  .on(['POST','GET'], '/api/auth/**', (c) => {
    const auth = createAuth();
    return auth.handler(c.req.raw);
  })
  .get('/', (c) => {
    return c.text("Hello Hono!");
  });

export default app;