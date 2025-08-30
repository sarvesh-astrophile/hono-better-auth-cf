import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { todos } from "./db/schema";
import type { Session, User } from "better-auth";

export type Todo = InferSelectModel<typeof todos>;
export type NewTodo = InferInsertModel<typeof todos>;

export type HonoEnv = {
    Variables: {
        user: User | null;
        session: Session | null;
    };
}