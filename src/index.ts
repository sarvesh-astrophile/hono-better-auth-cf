import { Hono } from "hono";
import { createAuth } from "./lib/auth";
import { initDB } from "./db/db";
import { env } from "cloudflare:workers";
import { todosRoute } from "./routes/todo.routes";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(
	'/api/auth/**', 
	cors(
		{
			origin: env.CORS_ORIGIN,
			allowMethods: ["GET", "POST", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization"],
			exposeHeaders: ["Content-Type"],
			maxAge: 600,
			credentials: true,
		}
	)
);

app.use('*', async (c, next) => {
  initDB(env.hono_better_auth_cf);
  await next();
});

app
  .on(['POST','GET'], '/api/auth/**', (c) => {
    const auth = createAuth();
    return auth.handler(c.req.raw);
  })
  .route('/api/todos', todosRoute)
  .get('/', (c) => {
    return c.text("Hello Hono!");
  });

export default app;