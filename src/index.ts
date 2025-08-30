import { Hono } from "hono";
import { db } from "@/db/db";
import { user } from "@/db/schema";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.get("/users", async (c) => {
	const dbInstance = db(c.env.hono_better_auth_cf);
	const result = await dbInstance.select().from(user).all();
	return c.json(result);
});

app.get("/add-users", async (c) => {
	const dbInstance = db(c.env.hono_better_auth_cf);
	const result = await dbInstance.insert(user).values({
		id: crypto.randomUUID(),
		name: "John Doe",
		email: "john.doe@example.com",
	});
	return c.json(result);
});

export default app;
