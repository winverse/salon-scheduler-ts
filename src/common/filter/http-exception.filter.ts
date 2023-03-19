import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import type { FastifyReply } from "fastify";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();

    if (process.env.NODE_ENV !== "test") {
      console.log("hio");
      console.error(exception);
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const response = exception.getResponse();

      /**
       * @typedef {Object} Response
       * @property {number} statusCode - The HTTP status code of the response
       * @property {string} message - The message associated with the response
       * @property {string} error - The error associated with the response
       *
       * @example
       * Example res object:
       * {
       *   "statusCode": 404,
       *   "message": "수요일 영업 정보를 찾을 수 없습니다.",
       *   "error": "Not Found"
       * }
       */
      reply.status(statusCode).send(response);
    } else {
      reply
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  }
}
