import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import useGetProfileByUserId from "../hooks/useGetProfileByUserId";
import { Profile } from "../types";
interface ProfileStore {
  currentProfile: Profile | null;
  setCurrentProfile: (userId: string) => void;
}
export const useProfileStore = create<ProfileStore>()(
  devtools(
    persist(
      (set) => ({
        currentProfile: null,
        setCurrentProfile: async (userId: string) => {
          const result = await useGetProfileByUserId(userId);
          set({ currentProfile: result });
        },
      }),
      { name: "store", storage: createJSONStorage(() => localStorage) }
    )
  )
);
