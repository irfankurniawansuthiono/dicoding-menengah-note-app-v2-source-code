import { create } from "zustand";
type UserLoggedDataProps = {
  userLoggedData: { id?: string; email?: string; name?: string };
  setUserLoggedData: (user: {
    id?: string;
    email?: string;
    name?: string;
  }) => void;
};
export const useUserLoggedDataStore = create<UserLoggedDataProps>((set) => ({
  userLoggedData: {},
  setUserLoggedData: (user) => set({ userLoggedData: user }),
}));
