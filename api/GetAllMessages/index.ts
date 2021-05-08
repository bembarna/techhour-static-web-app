import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { PrismaClient } from '@prisma/client';

type Message = {
	id: number;
	name: string;
	message: string;
};

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: process.env.DATABASE_CONNECTION_STRING,
		},
	},
});

const httpTrigger: AzureFunction = async function (
	context: Context,
	req: HttpRequest
): Promise<void> {
	try {
		prisma.$connect();

		const getMessages = (await prisma.message.findMany()) as Message[];

		context.res = {
			// status: 200, /* Defaults to 200 */
			body: getMessages,
		};
	} catch (error) {
		context.res = {
			// status: 200, /* Defaults to 200 */
			body: (error as Error).message,
		};
	}
};

export default httpTrigger;
