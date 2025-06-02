export type AIRequestMatch = {
  matched: boolean;
  confidence: number; // score between 0 (no confidence) and 1 (high confidence)
  reason: string[];
};

const aiKeywords = [
  '/gpt', '/openai', '/ai/', '/chat', '/llm', '/prompt', '/v1/completions', '/api/generate',
  '/text-generation', '/chatgpt', '/anthropic', '/bard', '/vertex-ai'
];

const aiDomains = [
  'openai.com', 'chatgpt.com', 'anthropic.com', 'bard.google.com', 'claude.ai',
  'gemini.google.com', 'huggingface.co', 'perplexity.ai'
];

export function isAIRequest(url: string, initiator?: string, headers?: Record<string, string>): AIRequestMatch {
  const lowerUrl = url.toLowerCase();
  const lowerInitiator = initiator?.toLowerCase() || '';
  const lowerHeaders = Object.fromEntries(Object.entries(headers || {}).map(([k, v]) => [k.toLowerCase(), v.toLowerCase()]));
  let score = 0;
  const reasons: string[] = [];

  // Check domain match in the URL
  if (aiDomains.some(domain => lowerUrl.includes(domain))) {
    score += 60;
    reasons.push('URL domain matched');
  }

  // Check if any AI-related keywords are present in the URL path
  if (aiKeywords.some(keyword => lowerUrl.includes(keyword))) {
    score += 25;
    reasons.push('URL keyword matched');
  }

  // Check if initiator domain matches known AI domains
  if (aiDomains.some(domain => lowerInitiator.includes(domain))) {
    score += 15;
    reasons.push('Initiator domain matched');
  }

  // Heuristic: AI-specific headers
  const aiHeaderKeywords = ['openai-organization', 'x-openai', 'anthropic-version', 'bard-client'];
  for (const key of Object.keys(lowerHeaders)) {
    if (aiHeaderKeywords.some(h => key.includes(h))) {
      score += 10;
      reasons.push(`Header matched: ${key}`);
    }
  }

  // Heuristic: AI-related content-type (if passed)
  const contentType = lowerHeaders['content-type'];
  if (contentType?.includes('application/json') || contentType?.includes('application/x-ndjson')) {
    score += 5;
    reasons.push('Content-Type indicates JSON/NDJSON');
  }

  const matched = score > 0;
  const normalizedConfidence = Math.min(score, 100) / 100;

  return {
    matched,
    confidence: normalizedConfidence,
    reason: matched ? reasons : ['No match']
  };
}