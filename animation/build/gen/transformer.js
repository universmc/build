const { generateAndConvertImageToBase64 } = require("./imageGenerator");
const { pipeline } = require("@xenova/transformers");

async function transformImage(base64Image, transformation) {
    try {
        const image = Buffer.from(base64Image, "base64");
        const imageProcessor = await pipeline("image-to-image", transformation);
        const output = await imageProcessor(image, { num_inference_steps: 20 });
        return Buffer.from(output.image).toString("base64");
    } catch (error) {
        console.error("Erreur lors de la transformation de l'image :", error);
        throw error;
    }
}

async function createAnimation(prompt, transformation, numFrames = 5) {
    try {
        const base64Image = await generateAndConvertImageToBase64(prompt, "base.png");
        const frames = [base64Image]; // Première frame : image originale
        let currentFrame = base64Image;

        for (let i = 1; i < numFrames; i++) {
            currentFrame = await transformImage(currentFrame, transformation);
            frames.push(currentFrame);
        }
        return frames;
    } catch (error) {
        console.error("Erreur lors de la création de l'animation :", error);
        throw error;
    }
}

async function generateAnimationFiles(prompt, transformation) {
    try {
        const frames = await createAnimation(prompt, transformation);
        const animeJsContent = `
        const frames = ${JSON.stringify(frames)};
        let currentFrame = 0;
        const imgElement = document.getElementById('animatedImage');

        function animate() {
            imgElement.src = 'data:image/png;base64,' + frames[currentFrame];
            currentFrame = (currentFrame + 1) % frames.length;
            requestAnimationFrame(animate);
        }

        animate();
        `;

        const animeScssContent = `
        #animatedImage {
            width: 256px;
            height: 256px;
        }
        `;

        await fs.writeFile(path.join(outputDir, "anime.js"), animeJsContent);
        await fs.writeFile(path.join(outputDir, "anime.scss"), animeScssContent);
    } catch (error) {
        console.error("Erreur lors de la génération des fichiers d'animation :", error);
        throw error;
    }
}

// Exemple d'utilisation :
generateAnimationFiles("a cat flying in space", "image-to-image-sdxl");