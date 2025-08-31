import { fetchStories } from "@/utils/storyblok";
import HomeClient from "../components/HomeClient";

type Props = {
  params: { locale: string }; // ✅ objeto normal
};

export const revalidate = 60;

export default async function Home({ params }: Props) {
  const { locale } = params; // ✅ sin await

  const stories = await fetchStories("autographs/", locale);

  return <HomeClient data={stories} />;
}

