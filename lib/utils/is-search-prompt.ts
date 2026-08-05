const SEARCH_KEYWORDS = [
  "latest",
  "today",
  "current",
  "news",
  "recent",
  "price",
  "weather",
  "score",
  "live",
  "stock",
  "bitcoin",
  "crypto",
  "exchange rate",
  "who won",
  "happening",
  "trending",
];

export function isSearchPrompt(prompt: string): boolean{
    const text= prompt.toLowerCase()

    return SEARCH_KEYWORDS.some((keyword)=>
    text.includes(keyword))
}