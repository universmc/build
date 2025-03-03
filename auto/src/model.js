const fs = require('fs');
const path = require('path');

function generateJSON(model) {
  const filePath = path.join('json', 'layout.json');
  let content = fs.readFileSync(filePath, 'utf8');
  content += `{
        "model":"llama3-8b-8192",
        "temperature":0.5,
        "max_tokens":"4096",
        "top_p":"1",
        "stream":"True",
        "stop":"None"
    }`;
  fs.writeFileSync(filePath, content);
}

generateJSON('model, json');