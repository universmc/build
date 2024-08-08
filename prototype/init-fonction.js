const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
async function main() {
    groq.chat.completions.create({
        //
        // Required parameters
        //
        messages: [
            // Set an optional system message. This sets the behavior of the
            // assistant and can be used to provide specific instructions for
            // how it should behave throughout the conversation.
            {
                role: "assistant",
                content: "Step 1 : initialisation"
            },
            {
                role: "system",
                content: "initialiser Mode Brainstorming({estimationDurée: true, optimiserGanttModel: true} https://github.com/universmc/pi:initializeAssistant() avec 'git'"            
            },
            {
                role: "assistant",
                content: "Step 1-1 : init function initializeAssistant(Initialize the assistant by defining its role and context in the brainstorming session. Set up the assistant to be able to ask open-ended questions and provide helpful feedback. Configure the initializeAssistant() function to execute this process);"
            },
            {
                role: "user",
                content: "(// Mettre en place la boucle de feedback et l'auto-apprentissage)"
            },
        ],
        // The language model which will generate the completion.
        model: "mixtral-8x7b-32768",
        //
        // Optional parameters
        
        // Controls randomness: lowering results in less random completions.
        // As the temperature approaches zero, the model will become deterministic
        // and repetitive.
        temperature: 0.6,
        // The maximum number of tokens to generate. Requests can use up to
        // 2048 tokens shared between prompt and completion.
        max_tokens: 2048,
        // Controls diversity via nucleus sampling: 0.5 means half of all
        // likelihood-weighted options are considered.
        top_p: 1,
        // A stop sequence is a predefined or user-specified text string that
        // signals an AI to stop generating content, ensuring its responses
        // remain focused and concise. Examples include punctuation marks and
        // markers like "[end]".
        stop: null,
        // If set, partial message deltas will be sent.
        stream: false
    }).then((chatCompletion)=>{
        // Print the completion returned by the LLM.
        const jsContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = "output/Function_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".js";
        fs.writeFileSync(outputFilePath, jsContent);
        console.log("Documentation généré et enregistré dans " + outputFilePath);
    });
}
main();
