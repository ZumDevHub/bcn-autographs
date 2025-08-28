import { Suspense } from "react";
import { getStoryblokApi } from "@/utils/storyblok";
import HomeClient from "./components/HomeClient";

export default async function Home() {
  let stories = [];
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      starts_with: "autographs/",
    });
    stories = data.stories;
  } catch (error) {
    console.error("Storyblok fetch failed:", error);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeClient data={stories} />
    </Suspense>
  );
}
