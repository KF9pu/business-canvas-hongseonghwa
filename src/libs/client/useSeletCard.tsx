import { E_CardsType, I_card } from "@/libs/types";
import { create } from "zustand";

export const SeletedDataInitialState = {
  key: 0,
  url: "",
  name: "",
  type: E_CardsType.NONE,
  date: 0,
} as I_card;

type Action = {
  setSeletCard: (status: I_card) => void;
  setResetSeletedCard: () => void;
};

const useSeletCardStore = create<I_card & Action>(set => ({
  key: undefined,
  url: "",
  name: "",
  type: E_CardsType.NONE,
  date: 0,
  setSeletCard: card => set(() => ({ ...card })),
  setResetSeletedCard: () => set(() => SeletedDataInitialState),
}));

export default useSeletCardStore;
