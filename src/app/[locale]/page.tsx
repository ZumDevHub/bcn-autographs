import { getStoryblokApi } from "@/utils/storyblok";
import HomeClient from "../components/HomeClient";

export const revalidate = 60;

export default async function Home({ params }: { params: Promise<{ locale: string}>}) {
  const { locale } = await params;

  let stories = [];
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      starts_with: "autographs/",
      per_page: 100,
      language: locale, // <-- usar el locale dinámico
    });
    stories = data.stories;
  } catch (error) {
    console.error("Storyblok fetch failed:", error);
  }

  return <HomeClient 
    data={stories}
    />;
}
