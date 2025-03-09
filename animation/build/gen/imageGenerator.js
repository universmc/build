const OpenAI = require("openai");
const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const path = require("path");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const axiosInstance = axios.create();

const outputDir = path.join(__dirname, "output");

async function ensureDirectoryExists(dirPath) {
    try {
        await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
        console.error(`Erreur lors de la création du répertoire ${dirPath} :`, error);
        throw error;
    }
}

async function generateImage(prompt, outputPath) {
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "url",
        });

        const imageUrl = response.data[0].url;
        const imageResponse = await axiosInstance.get(imageUrl, { responseType: "arraybuffer" });
        await fs.writeFile(outputPath, imageResponse.data);
        console.log(`✅ Image enregistrée sous : ${outputPath}`);
    } catch (error) {
        console.error("❌ Erreur lors de la génération de l'image :", error);
        throw error;
    }
}

async function generateAndConvertImageToBase64(prompt, outputFilename) {
    try {
        await ensureDirectoryExists(outputDir);
        const imagePath = path.join(outputDir, outputFilename);
        await generateImage(prompt, imagePath);
        const imageBuffer = await fs.readFile(imagePath);
        const base64Image = imageBuffer.toString("base64");
        return base64Image;
    } catch (error) {
        console.error("Erreur lors de la génération et de la conversion :", error);
        throw error;
    }
}

module.exports = { generateAndConvertImageToBase64 };