// Configuration Groq
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY,dangerouslyAllowBrowser: true });

// Fonction pour interroger l’IA
async function getPencilShaderExplanation() {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant specialized in WebGL and Three.js shaders. Explain how a pencil shader works in simple terms."
            },
            {
                role: "user",
                content: "Tell me about pencil shaders."
            }
        ],
        model: "llama3-8b-8192", // Modèle Groq performant
        temperature: 0.7,
        max_tokens: 200
    });
    return chatCompletion.choices[0].message.content;
}

// Afficher la réponse de l’IA
const iaOutput = document.getElementById('ia-output');
getPencilShaderExplanation().then((response) => {
    iaOutput.innerText = response;
}).catch((error) => {
    console.error('Erreur Groq :', error);
    iaOutput.innerText = "Erreur lors de la récupération de la réponse.";
});

// Animation
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    sphere.rotation.y += 0.02 * delta * 60;
    sphere.position.z = Math.sin(time) * 2;
    material.uniforms.time.value = time;

    renderer.render(scene, camera);
}
animate();