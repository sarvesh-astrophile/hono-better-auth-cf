import { createMiddleware } from "hono/factory";
import { createAuth } from "@/lib/auth";
import type { HonoEnv } from "@/types";


export const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const auth = createAuth();
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});