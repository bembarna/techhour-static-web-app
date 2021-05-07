import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { PrismaClient } from '@prisma/client'

type Message = {
    name: string,
    message: string
}

const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_CONNECTION_STRING,
      },
    },
  });

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const createUser = await prisma.message.create({
        data: {
          name: req.body.name,
          message: req.body.message,
        },
      })   

    const responseMessage = "Success!"

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;