
import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react";
import ContextInfo from "@/app/components/ContextInfo";
import AutographPage from "@/app/autographs/[slug]/page";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN, 
  use: [apiPlugin],
   components: {
    AutographPage,
    ContextInfo
  },
});

export { getStoryblokApi };