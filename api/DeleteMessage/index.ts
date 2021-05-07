import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_CONNECTION_STRING,
      },
    },
  });
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const deleteUser = await prisma.message.delete({
        where: {
          id: req.body,
        },
      }) 

    const responseMessage = "Success!"

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;