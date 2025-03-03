const axios = require('axios');
import OpenAI from "openai";
const openai = new OpenAI();

async function getOpenAIBalance() {
    try {
        const response = await axios.get("https://api.openai.com/v1/dashboard/billing/credit_grants", {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        });

        console.log("💰 Solde restant :", response.data.total_available, "USD");
    } catch (error) {
        console.error("❌ Erreur lors de la récupération du solde :", error.response ? error.response.data : error.message);
    }
}

getOpenAIBalance();
