import { env } from "~/env";

export const nessieManager = {
    async getCustomerById(id: string) {

        const response = await fetch(`http://api.nessieisreal.com/customers${id}?key=${env.NESSIE_API_KEY}`);

        if (!response.ok) {
            throw new Error("Failed to fetch customers");
        }

        console.log("response", response);

        return response.json();
    },

    async getMerchants() {
        const response = await fetch(`http://api.nessieisreal.com/merchants?key=${env
    }`);
        if (!response.ok) {
            throw new Error("Failed to fetch merchants");
        }
    
        return response.json();
    },

    async getMerchantById(id: string) {
        const response = await fetch(`http://api.nessieisreal.com/merchants/${id}?key=${env.NESSIE_API_KEY}`);
        if (!response.ok) {
            throw new Error("Failed to fetch merchant");
        }
    
        return response.json();
    },

    async getAccounts() {
        const response = await fetch(`http://api.nessieisreal.com/accounts?key=${env.NESSIE_API_KEY}`);
        if (!response.ok) {
            throw new Error("Failed to fetch accounts");
        }
    
        return response.json();
    }
}