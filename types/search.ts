export interface SearchResult {
    title: string;
    url:string;
    content: string;
}

export interface WebSearchResponse{
    results: SearchResult[]
}