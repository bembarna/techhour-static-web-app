import { AzureFunction, Context, HttpRequest } from "@azure/functions"
type Message = {
    id: number,
    name: string,
    message: string
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    console.log(process.env.DATABASE_CONNECTION_STRING);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: process.env.DATABASE_CONNECTION_STRING
    };


};

export default httpTrigger;