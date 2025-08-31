import StoryblokClient from "storyblok-js-client";

let storyblokApi: StoryblokClient | null = null;

export function getStoryblokApi(): StoryblokClient {
  if (!storyblokApi) {
    if (!process.env.STORYBLOK_API_TOKEN) {
      throw new Error("❌ STORYBLOK_API_TOKEN no definido");
    }
    storyblokApi = new StoryblokClient({
      accessToken: process.env.STORYBLOK_API_TOKEN,
      cache: { clear: "auto", type: "memory" },
    });
  }
  return storyblokApi;
}

// 👇 función centralizada para pedir stories con idioma
export async function fetchStory(slug: string, locale: string) {
  const api = getStoryblokApi();
  const { data } = await api.get(`cdn/stories/${slug}`, {
    version: "published",
    language: locale, // 👈 clave para multilenguaje
  });
  return data?.story;
}

// 👇 opcional: función para traer múltiples stories
export async function fetchStories(startsWith: string, locale: string) {
  const api = getStoryblokApi();
  const { data } = await api.get("cdn/stories", {
    version: "published",
    starts_with: startsWith,
    per_page: 100,
    language: locale, // 👈 también multilenguaje
  });
  return data?.stories ?? [];
}


