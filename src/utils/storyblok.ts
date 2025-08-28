
// src/utils/storyblok.ts
import { storyblokInit, apiPlugin } from "@storyblok/react";
import StoryblokClient from "storyblok-js-client";

// Importa tus componentes para usarlos en Storyblok
import ContextInfo from "@/app/components/ContextInfo";
import AutographPage from "@/app/autographs/[slug]/page";
console.log("TOKEN 1", process.env.STORYBLOK_API_TOKEN)
const accessToken = process.env.STORYBLOK_API_TOKEN;
console.log("TOKEN 2", process.env.STORYBLOK_API_TOKEN)
// 🔒 Verificación de seguridad
if (!accessToken) {
  console.error(
    "❌ ERROR: La variable STORYBLOK_API_TOKEN no está definida. " +
      "Configúrala en Vercel → Project Settings → Environment Variables."
  );
}
console.log("TOKEN 3", process.env.STORYBLOK_API_TOKEN)
// Inicialización de Storyblok React (para componentes visuales)
storyblokInit({
  accessToken,
  use: [apiPlugin],
  components: {
    AutographPage,
    ContextInfo,
  },
});

// Cliente de Storyblok para llamadas a la API
let storyblokApi: StoryblokClient | null = null;
console.log("TOKEN 4", process.env.STORYBLOK_API_TOKEN)
export function getStoryblokApi(): StoryblokClient {
  if (!storyblokApi) {
    if (!accessToken) {
      throw new Error(
        "❌ STORYBLOK_API_TOKEN no definido. Revisa las variables de entorno."
      );
    }
    storyblokApi = new StoryblokClient({
      accessToken,
      cache: { clear: "auto", type: "memory" },
    });
  }
  return storyblokApi;
}