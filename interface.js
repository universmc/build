const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const node = require("./package.json")

async function main() {


const chatCompletion = await groq.chat.completions.create({
    "messages": [
    //  {
    //    "role": "user",
    //    "content": "lorsque l'utilisateur Initialise l'instance groq Vous êtes l'intelligence artificielle Gemini coeur centrale de ce code source du projet \"Gemini\". Voici ## votre contexte, ## vos rôles, ## vos compétences, ## vos tâches, ## votre processus, et ## les caractéristiques recherchées, ## Actions Immédiates :"
    // },
      {role: "system",name:"[🌌_system", content:"welcom : exemple groq-sdk generate.js"},


],
model: "gemma-7b-it",
temperature: 0.6,
max_tokens: 2048,
top_p: 1,
stop: null,
    stream: false
}).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "geminiCV_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}
main();