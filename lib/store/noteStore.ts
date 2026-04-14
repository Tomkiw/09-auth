import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CreateNote } from "@/types/note";

type NoteStoreDraft = {
  draft: CreateNote;
  setDraft: (note: CreateNote) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteStoreDraft>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
    },
  ),
);
