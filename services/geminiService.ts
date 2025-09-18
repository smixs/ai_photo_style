const baseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? '';
const endpoint = `${baseUrl}/api/stylize`;

interface StylizeRequestPayload {
  imageData: string;
  mimeType: string;
  prompt: string;
}

interface StylizeResponseBody {
  imageBase64: string;
  error?: string;
}

export const stylizeImage = async (
  base64ImageData: string,
  mimeType: string,
  stylePrompt: string
): Promise<string> => {
  const payload: StylizeRequestPayload = {
    imageData: base64ImageData,
    mimeType,
    prompt: stylePrompt,
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let body: StylizeResponseBody;
  try {
    body = (await response.json()) as StylizeResponseBody;
  } catch (error) {
    console.error('Failed to parse stylize response:', error);
    throw new Error('Unexpected server response');
  }

  if (!response.ok) {
    throw new Error(body?.error ?? 'Failed to stylize image');
  }

  if (!body?.imageBase64) {
    throw new Error('Stylize response did not include an image payload');
  }

  return body.imageBase64;
};
