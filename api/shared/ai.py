import json
import re

def analyze(content):
    response = client.chat.completions.create(
        model="gpt-4o",
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

        return {
            "label": parsed.get("label"),
            "score": int(float(parsed.get("score")) * 100) if parsed.get("score") <= 1 else parsed.get("score"),
            "summary": parsed.get("summary")
        }

    except Exception as e:
        print("PARSE ERROR:", text)

        return {
            "label": "Error",
            "score": 0,
            "summary": text
        }