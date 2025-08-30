import { db } from "./db";
import { todos } from "./schema";
import type { Todo, NewTodo } from "@/types";
import { eq, desc } from "drizzle-orm";

export const insertTodo = async (todo: NewTodo) => {
  const [result] = await db().insert(todos).values(todo).returning();
  return result;
};

export const getTodosByUserId = async (userId: string) => {
  const todoList = await db().select().from(todos).where(eq(todos.userId, userId)).orderBy(desc(todos.createdAt));
  return todoList;
};