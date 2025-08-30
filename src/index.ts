import { Hono } from "hono";
import { createAuth } from "./lib/auth";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app
	.on(['POST','GET'], '/api/auth/**', (c) => {
		const auth = createAuth(c.env.hono_better_auth_cf);
		return auth.handler(c.req.raw);
	})
	.get('/', (c) => {
		return c.text("Hello Hono!");
	});


export default app;
