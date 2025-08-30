import { Hono } from "hono";
import { authMiddleware } from "@/middleware/auth.middleware";
import { createTodoValidator } from "@/validators/create-todo.validator";
import { getTodosByUserId, insertTodo } from "@/db/queries";
import type { HonoEnv } from "@/types";
import { todos } from "@/db/schema";

export const todosRoute = new Hono<HonoEnv>()

todosRoute.use(authMiddleware);

todosRoute.get('/', async (c) => {
    const user = c.get("user");

    try {
        const todos = await getTodosByUserId(user!.id);
        return c.json(todos, 200);
    } catch (error) {
        return c.json({ error: "Failed to get todos" }, 500);
    }
});

todosRoute.post('/', createTodoValidator, async (c) => {
    const user = c.get("user");
    const { title, description, completed } = c.req.valid("json");

    try {
        const todo = await insertTodo({ title, description, completed, userId: user!.id });
        return c.json(todo, 201);
    } catch (error) {
        return c.json({ error: "Failed to create todo" }, 500);
    }
});