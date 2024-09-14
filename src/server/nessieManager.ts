import { env } from "~/env";

export const nessieManager = {
    async getCustomerById(id: string) {

        const response = await fetch(`http://api.nessieisreal.com/accounts/${id}/customer?key=${env.NESSIE_API_KEY}`);

        if (!response.ok) {
            throw new Error("Failed to fetch customers");
        }

        console.log("response", response);

        return response.json();
    }
}