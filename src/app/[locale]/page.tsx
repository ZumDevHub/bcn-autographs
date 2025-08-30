import { getStoryblokApi } from "@/utils/storyblok";
import HomeClient from "../components/HomeClient";


// Esto le dice a Next que revalide cuando tú se lo pidas
export const revalidate = 60; // valor cualquiera, pero obligatorio para ISR

export default async function Home() {
  
  let stories = [];
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      starts_with: "autographs/",
      per_page: 100,
      language: "en",
    });
    stories = data.stories;

  } catch (error) {
    console.error("Storyblok fetch failed:", error);
  }

  return <HomeClient data={stories} />;
}