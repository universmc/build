const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {

const TensorWindows="╔╗╚╝═║╠╣╦╩╬";
const tensorReplie = '├┤┬┴┼╠╣╩';
const tensorRendu = '─│·░▒▓█';

const Tensor = `${TensorWindows}+${tensorReplie}+${tensorRendu}`
const codex = "+╔╗╔╝═╣╠╣╦╩╬+├┤┬┴┼╠╣╩+─│·░▒▓█ ";
const tensorCodex = `${Tensor}+${codex}`

const CMS = `
    echo "  ╔═══════════════════════════════════════════════════════════════════════════╗";
    echo "  ║ [💫] [💻] [📱] [💬] [🔷] [🧾] [💳] [💾]                                  [🛰]║";
    echo "  ╚═══════════════════════════════════════════════════════════════════════════╝"
    echo ""`
const windows = `
    echo "  ╔═══════════════════════════════════════════════════════════════════════════╗";
    echo "  ║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   ║";
    echo "  ║ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ║";
    echo "  ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
    echo "  ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
    echo "  ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
    echo "  ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
    echo "  ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
    echo "  ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
    echo "  ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
    echo "  ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
    echo "  ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
    echo "  ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
    echo "  ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
    echo "  ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
    echo "  ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
    echo "  ║ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ║";
    echo "  ║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║";
    echo "  ╚═══════════════════════════════════════════════════════════════════════════╝"
    echo ""
`
const loader = `
    echo "  ╔═══════════════════════════════════════════════════════════════════════════╗";
    echo "  ║[:📡/<]                                                                 /🛰️>║";
    echo "  ╚═══════════════════════════════════════════════════════════════════════════╝"
    echo ""
    `
const chunk = `${CMS}+${windows}+${loader}`


const chatCompletion = await groq.chat.completions.create({
    "messages": [
        
      {role: "system",name:"[🌌_system", content:`Response in ${tensorCodex},${chunk}`},
      {role: "user",name:"user", content:`operation: supperposition scss() affichage.html de l'interface graphique de $Response()`},
      {role: "assistant",name:"assistant", content:` ta réponse doit intégralement être rédigé au format HTML, respectant les normes du Web sémantique W3C`},
    
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.6,
    max_tokens: 4096,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const htmlContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "ascii-lvl-_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}
main();