import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AzureOpenAI } from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Azure OpenAI conditionally
let openai = null;
const azureKey = process.env.AZURE_OPENAI_API_KEY;
const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

if (azureKey && azureEndpoint && azureDeployment) {
  try {
    openai = new AzureOpenAI({
      endpoint: azureEndpoint,
      apiKey: azureKey,
      apiVersion: "2025-01-01-preview",
      deployment: azureDeployment,
    });
    console.log("Azure OpenAI Client initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Azure OpenAI Client:", err.message);
  }
}

app.post('/api/analyze', async (req, res) => {
  const { claim } = req.body;

  if (!claim) {
    return res.status(400).json({ error: 'Claim text is required' });
  }

  // If we have an Azure OpenAI API Key, use actual AI
  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an expert fact-checker. 
Analyze the user's claim and respond ONLY with a JSON object. No markdown, no markdown blocks.
The JSON must have these exact keys:
- "status": exactly one of "true", "false", or "unverified".
  (true if factually proven, false if disproven, unverified if not enough info or highly subjective)
- "credibility": an integer from 0 to 100 representing the strength of evidence.
- "reasoning": a paragraph explaining your findings.
- "sources": an array containing exactly ONE object with "name" and "url" if status is true/false. If unverified, an empty array [].
  Example source: { "name": "Google Search", "url": "https://google.com/search?q=..." }`
          },
          { role: "user", content: claim }
        ],
        temperature: 0.1,
      });

      const resultText = response.choices[0].message.content.trim();
      // Attempt to clean markdown if the AI ignored the instruction
      const cleanedText = resultText.replace(/```json|```/g, '').trim();
      const resultData = JSON.parse(cleanedText);
      
      return res.json(resultData);
    } catch (error) {
      console.error("Azure OpenAI API Error:", error);
      return res.status(500).json({ error: 'Failed to process with Azure AI' });
    }
  } 
  
  // FALLBACK: If no Azure OpenAI keys are provided, use a smart mock/Wikipedia heuristic
  console.log("Missing Azure OpenAI keys. Using fallback heuristic logic.");
  const lowerClaim = claim.toLowerCase();
  
  let status = 'unverified';
  let credibility = 0;
  let reasoning = "We could not verify this claim. Please add your Azure OpenAI keys to the .env file for full AI analysis.";
  let sources = [];

  // Very basic heuristic for demonstration
  if (lowerClaim.includes('ucla is a college') || lowerClaim.includes('ucla is a university')) {
    status = 'true';
    credibility = 100;
    reasoning = "UCLA (University of California, Los Angeles) is a renowned public land-grant research university in Los Angeles, California. (Note: This is a fallback response because no Azure OpenAI API key was found).";
    sources = [{ name: "UCLA Official Website", url: "https://www.ucla.edu/" }];
  } else if (lowerClaim.includes('csun')) {
    status = 'true';
    credibility = 100;
    reasoning = "CSUN is a college. (Fallback response)";
    sources = [{ name: "CSUN", url: "https://www.csun.edu/" }];
  } else if (lowerClaim.includes('false') || lowerClaim.includes('fake') || lowerClaim.includes('middle school')) {
    status = 'false';
    credibility = 0;
    reasoning = "This statement is generally false based on heuristic matching. (Fallback response)";
    sources = [{ name: "Google Search", url: `https://google.com/search?q=${encodeURIComponent(claim)}` }];
  }

  // Simulate AI delay
  setTimeout(() => {
    res.json({
      status,
      credibility,
      reasoning,
      sources
    });
  }, 1500);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`VerifyAI Backend running on http://localhost:${PORT}`);
  if (!openai) {
    console.warn("WARNING: Missing one or more Azure OpenAI environment variables. Using fallback logic.");
  }
});
