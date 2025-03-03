import { pipeline } from '@xenova/transformers';
let pipe = await pipeline('sentiment-analysis');
let result = await pipe('J adore transformers.js !');
console.log(result); // Peut retourner quelque chose comme [{'label': 'POSITIVE', 'score': 0.99}]