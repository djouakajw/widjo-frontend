const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://widjo-ai.vercel.app';

export async function generateVideo(params: {
  prompt: string; style?: string; duration?: number;
  type?: string; user_id?: string; source_image_url?: string;
}) {
  const res = await fetch(`${API_URL}/api/generate-video`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return res.json();
}

export async function getJobStatus(jobId: string) {
  const res = await fetch(`${API_URL}/api/status/${jobId}`);
  return res.json();
}

export async function getVideos(userId?: string) {
  const url = userId ? `${API_URL}/api/videos?user_id=${userId}` : `${API_URL}/api/videos`;
  const res = await fetch(url);
  return res.json();
}

export async function getJobs(status?: string) {
  const url = status ? `${API_URL}/api/jobs?status=${status}` : `${API_URL}/api/jobs`;
  const res = await fetch(url);
  return res.json();
}

export async function enhancePrompt(prompt: string, style: string, language = 'fr') {
  const res = await fetch(`${API_URL}/api/prompt/enhance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, style, language }),
  });
  return res.json();
}

export async function getTemplates() {
  const res = await fetch(`${API_URL}/api/prompt/templates`);
  return res.json();
}

export async function getUserCredits(userId: string) {
  const res = await fetch(`${API_URL}/api/users/${userId}/credits`);
  return res.json();
}

export async function getUserHistory(userId: string) {
  const res = await fetch(`${API_URL}/api/users/${userId}/history`);
  return res.json();
}
