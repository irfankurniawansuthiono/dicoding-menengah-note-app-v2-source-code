import SignUpTemplateEN from "../components/SignUpTemplateEN";
import SignUpTemplateID from "../components/SignUpTemplateID";
import { useLanguageStore } from "../../../Zustand/UserPreferences";
export default function SignUpPage() {
  const { language } = useLanguageStore();
  return language === "en" ? <SignUpTemplateEN /> : <SignUpTemplateID />;
}
