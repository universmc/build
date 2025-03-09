const { generateAndConvertImageToBase64 } = require("./imageGenerator");

async function createAnimation(prompt, numFrames = 5) {
    try {
        const frames = [];
        for (let i = 0; i < numFrames; i++) {
            const modifiedPrompt = `${prompt}, frame ${i + 1} of animation`;
            const base64Image = await generateAndConvertImageToBase64(modifiedPrompt, `frame_${i + 1}.png`);
            frames.push(base64Image);
        }
        return frames;
    } catch (error) {
        console.error("Erreur lors de la création de l'animation :", error);
        throw error;
    }
}

async function generateAnimationFiles(prompt) {
    const frames = await createAnimation(prompt);
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
        width: 1024px;
        height: 1024px;
    }
    `;

    await fs.writeFile(path.join(outputDir, "anime.js"), animeJsContent);
    await fs.writeFile(path.join(outputDir, "anime.scss"), animeScssContent);
}

generateAnimationFiles("a cat flying in space");