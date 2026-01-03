import type { MiddlewareFn } from "grammy";
import { limit } from "@grammyjs/ratelimiter";

const limitMiddleware: MiddlewareFn = limit({
  limit: 3,
  timeFrame: 40000,
  onLimitExceeded: async ctx => await ctx.reply("Iltimos, juda ko‘p so‘rov yubormang!"),
  keyGenerator: ctx => ctx.from?.id.toString(),
});

export default limitMiddleware;
