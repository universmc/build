curl "https://api.groq.com/openai/v1/chat/completions" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${GROQ_API_KEY}" \
  -d '{
         "messages": [
                    {
             "role": "system",
             "content": "Shell"
           },
           {
             "role": "user",
             "content": "userInput"
           },
                      {
             "role": "assistant",
             "content": "test response au message"
           }
         ],
         "model": "llama3-8b-8192",
         "temperature": 1,
         "max_tokens": 1024,
         "top_p": 1,
         "stream": true,
         "stop": null
       }'
