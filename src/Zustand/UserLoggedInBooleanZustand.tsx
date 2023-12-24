import { create } from "zustand";
import { getAccessToken } from "../Api/Api";

type userLoggedInBooleanProps = {
  userLoggedInBoolean: boolean;
  setUserLoggedInBoolean: (userLoggedInBoolean: boolean) => void;
};

export const useUserLoggedInBooleanStore = create<userLoggedInBooleanProps>(
  (set) => ({
    userLoggedInBoolean: getAccessToken() ? true : false,
    setUserLoggedInBoolean: (userLoggedInBoolean: boolean) =>
      set({ userLoggedInBoolean }),
  })
);
