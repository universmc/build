from diffusers import StableDiffusionPipeline
import torch
import json

# Charger le modèle
pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")
pipe = pipe.to("cuda")  # Utiliser le GPU

# Charger votre db_prompt.json
with open("db_prompt.json", "r") as f:
    prompts = json.load(f)

# Générer une image pour chaque prompt
for entry in prompts:
    image = pipe(
        entry["prompt"],
        height=576 if entry["details"]["resolution"] == "16:9" else 1024,
        width=1024 if entry["details"]["resolution"] == "16:9" else 1024,
        num_inference_steps=50,
        guidance_scale=7.5
    ).images[0]
    # Sauvegarder l'image
    image.save(f"{entry['topic']}.{entry['details']['format']}")