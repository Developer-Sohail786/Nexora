const IMAGE_KEYWORDS = [
  "generate image",
  "create image",
  "draw",
  "illustrate",
  "paint",
  "generate a picture",
  "create a picture",
  "make an image",
  "design logo",
  "generate logo",
  "create logo",
  "wallpaper",
  "photo of",
  "image of",
];

export function isImagePrompt(prompt: string){
    const normalized= prompt.toLowerCase()

    return IMAGE_KEYWORDS.some((keyword)=>normalized.includes(keyword))
}