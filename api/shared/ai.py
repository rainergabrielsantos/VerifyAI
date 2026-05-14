import json
import re
import os
from openai import AzureOpenAI

client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
)

def analyze(content):
    response = client.chat.completions.create(
        model=os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME"),
        messages=[
            {
                "role": "system",
                "content": "Return ONLY valid JSON with keys: label, score (0-100), summary. Do NOT use markdown."
            },
            {"role": "user", "content": content}
        ]
    )

    text = response.choices[0].message.content.strip()

    try:
        # Remove ```json ``` if present
        text = re.sub(r"```json|```", "", text).strip()

        parsed = json.loads(text)

        score_raw = parsed.get("score", 0)
        try:
            score = float(score_raw)
            if score <= 1.0:
                score = int(score * 100)
            else:
                score = int(score)
        except (TypeError, ValueError):
            score = 0

        return {
            "label": parsed.get("label", "Unknown"),
            "score": score,
            "summary": parsed.get("summary", "No summary provided.")
        }

    except Exception as e:
        print("PARSE ERROR:", text)

        return {
            "label": "Error",
            "score": 0,
            "summary": text
        }