import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { PrismaClient } from "@prisma/client";

type Message = {
    id: number,
    name: string,
    message: string
}

const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.connectionString,
      },
    },
  });

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const getMessages = await prisma.message.findMany() as Message[];

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: getMessages
    };

};

export default httpTrigger;