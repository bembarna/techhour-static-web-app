import { AzureFunction, Context, HttpRequest } from "@azure/functions"

type Message = {
    name: string,
    message: string
}


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {   

    const responseMessage = "Success!"

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;