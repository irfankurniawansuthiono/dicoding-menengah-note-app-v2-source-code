import SignInTemplateEN from "../components/SignInTemplateEN";
import SignInTemplateID from "../components/SignInTemplateID";
import { useLanguageStore } from "../../../Zustand/UserPreferences";
import { useUserLoggedInBooleanStore } from "../../../Zustand/UserLoggedInBooleanZustand";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function SignInPage() {
  const navigate = useNavigate();
  const { userLoggedInBoolean } = useUserLoggedInBooleanStore();
  useEffect(() => {
    if (userLoggedInBoolean) {
      navigate("/notes/active");
    }
  }, []);
  const { language } = useLanguageStore();
  return language === "en" ? <SignInTemplateEN /> : <SignInTemplateID />;
}
