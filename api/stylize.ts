import { GoogleGenAI, Modality } from '@google/genai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const apiKey = process.env.GEMINI_API_KEY;

const aiClient = apiKey ? new GoogleGenAI({ apiKey }) : null;

async function parseBody(req: VercelRequest): Promise<Record<string, unknown>> {
  if (req.body) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }

  const rawData: Uint8Array[] = [];

  for await (const chunk of req) {
    rawData.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  if (!rawData.length) {
    return {};
  }

  return JSON.parse(Buffer.concat(rawData).toString('utf8'));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!apiKey || !aiClient) {
    console.error('GEMINI_API_KEY is not configured');
    return res.status(500).json({ error: 'Server misconfigured: missing GEMINI_API_KEY' });
  }

  try {
    const body = await parseBody(req);
    const imageData = typeof body.imageData === 'string' ? body.imageData : null;
    const mimeType = typeof body.mimeType === 'string' ? body.mimeType : null;
    const prompt = typeof body.prompt === 'string' ? body.prompt : null;

    if (!imageData || !mimeType || !prompt) {
      return res.status(400).json({ error: 'imageData, mimeType, and prompt are required' });
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageData,
              mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        return res.status(200).json({ imageBase64: part.inlineData.data });
      }
    }

    return res.status(502).json({ error: 'Gemini API did not return an image' });
  } catch (error) {
    console.error('Error in stylize handler:', error);
    return res.status(500).json({ error: 'Failed to stylize image' });
  }
}
