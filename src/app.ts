import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { extractErrorMessage } from "utilzify";
import { StatusCodes } from "http-status-codes";

import type { ApiError } from "@/utils";

const app = new Hono();
type AppType = typeof app;

app.use(logger());
app.use(
  "*",
  cors({
    origin: origin => {
      return origin ?? "*";
    },
    allowMethods: ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowHeaders: ["*"],
    credentials: true,
  }),
);

// not found handler
app.notFound(ctx => ctx.json({ message: "Not Found" }, StatusCodes.NOT_FOUND));

// error handler
app.onError((err, ctx) => {
  const apiError = err as ApiError;
  const errMessage = apiError.message;
  const statusCode = apiError.statusCode || 500;
  const internalServerErrorMessage = "Internal Server Error";

  const parsedMessage = extractErrorMessage(err) || errMessage;
  const message = parsedMessage || internalServerErrorMessage;
  console.log(message);
  return ctx.json({ error: [{ message }] }, statusCode as never);
});

const runServer = (callback: (url: string) => void, port: number = Number(Bun.env.PORT)) => {
  if (!port || isNaN(port)) throw new Error("Invalid or missing port number");

  const server = Bun.serve({
    port,
    fetch: app.fetch,
    development: Bun.env.NODE_ENV !== "production",
    error: error => console.error("Error occurred:", error),
  });

  callback(String(server.url));
  return server;
};

export { app, runServer, type AppType };
