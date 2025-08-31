import { fetchStories } from "@/utils/storyblok";
import HomeClient from "../components/HomeClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

export default async function Home({ params }: Props) {
  const { locale } = await params; // 👈 await obligatorio

  const stories = await fetchStories("autographs/", locale);

  return <HomeClient data={stories} />;
}
