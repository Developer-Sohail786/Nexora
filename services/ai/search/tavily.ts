import { WebSearchResponse } from "@/types/search";

const TAVILY_API_URL =
  "https://api.tavily.com/search";

type TavilyResult = {
  title: string;
  url: string;
  content: string;
};

type TavilyResponse = {
  results: TavilyResult[];
};

export async function searchTavily(
  query: string,
): Promise<WebSearchResponse> {
  const response = await fetch(
    TAVILY_API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        api_key:
          process.env.TAVILY_API_KEY,
        query,
        search_depth: "basic",
        max_results: 5,
        include_answer: false,
        include_raw_content: false,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      "Tavily search failed",
    );
  }

  const data: TavilyResponse =
    await response.json();

  return {
    results: data.results.map(
      (result) => ({
        title: result.title,
        url: result.url,
        content: result.content,
      }),
    ),
  };
}