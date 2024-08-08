#!/bin/bash
response=$(curl -X POST \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer ${GROQ_API_KEY}" \
        --data '{
                   "messages": [
                     {
                       "role": "system",
                       "content": "Shell"
                     },
                     {
                       "role": "user",
                       "content": "inputShell"
                     }
                   ],
                   "model": "llama3-8b-8192",
                   "temperature": 1,
                   "max_tokens": 1024,
                   "top_p": 1,
                   "stream": true,
                   "stop": null
                 }' \
        https://api.groq.com/openai/v1/chat/completions)

echo "${response}"
