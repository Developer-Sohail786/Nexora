const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /ignore\s+(all\s+)?prior\s+instructions/i,
  /ignore\s+system\s+instructions/i,
  /disregard\s+(all\s+)?previous\s+instructions/i,
  /forget\s+(all\s+)?previous\s+instructions/i,
  /reveal\s+(your\s+)?system\s+prompt/i,
  /show\s+(me\s+)?your\s+system\s+prompt/i,
  /print\s+(your\s+)?system\s+prompt/i,
  /reveal\s+(your\s+)?hidden\s+instructions/i,
  /bypass\s+(your\s+)?safety/i,
  /disable\s+(your\s+)?safety/i,
  /override\s+(your\s+)?instructions/i,
  /you\s+are\s+now\s+/i,
  /act\s+as\s+(an?\s+)?unrestricted/i,
];

export interface InjectionCheckResult {
  detected: boolean;
  reasons: string[];
}

export function detectPromptInjection(
  content: string,
): InjectionCheckResult {
  const reasons: string[] = [];

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(content)) {
      reasons.push(pattern.source);
    }
  }

  return {
    detected: reasons.length > 0,
    reasons,
  };
}