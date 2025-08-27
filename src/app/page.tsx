
import { getStoryblokApi } from "@/utils/storyblok";
import HomeClient from "./components/HomeClient";

export default async function Home() {

const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "draft",
    starts_with: "autographs/", // si tienes carpeta autographs en Content
  });

  return (
    <>
      <HomeClient
        data ={data.stories}
      />
    </>
  );
}