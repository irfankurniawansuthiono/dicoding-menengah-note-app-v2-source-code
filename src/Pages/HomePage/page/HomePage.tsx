import { useLanguageStore } from "../../../Zustand/UserPreferences";
import HomePageTemplateEN from "../components/HomePageTemplateEN";
import HomePageTemplateID from "../components/HomePageTemplateID";
export default function HomePage() {
  const { language } = useLanguageStore();
  return language === "en" ? <HomePageTemplateEN /> : <HomePageTemplateID />;
}
