import { Context, type NextFunction } from "grammy";

const ignoreOldMiddleware = <T extends Context>(threshold = 5 * 60) => {
  return (ctx: T, next: NextFunction) => {
    if (ctx.msg?.date && new Date().getTime() / 1000 - ctx.msg.date > threshold) {
      console.log(
        `Ignoring message from user ${ctx.from?.id} at chat ${ctx.chat?.id} (${
          new Date().getTime() / 1000
        }:${ctx.msg.date})`,
      );
      return;
    }
    return next();
  };
};

export default ignoreOldMiddleware;
