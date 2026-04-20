import { nextServer } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { FetchNotesResponse, FetchNotesParams } from "./clientApi";
import { Note } from "@/types/note";

type CheckSession = User | null;

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const response = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};

export const checkSession = async () => {
  const cookiesStore = await cookies();

  const response = await nextServer.get<CheckSession>(`/auth/session`, {
    headers: { Cookie: cookiesStore.toString() },
  });
  return response.data;
};

export const checkServerSession = async () => {
  const cookiesStore = await cookies();

  const response = await nextServer.get<CheckSession>("/auth/session", {
    headers: { Cookie: cookiesStore.toString() },
  });
  return response;
};

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams) => {
  const cookiesStore = await cookies();

  const response = await nextServer.get<FetchNotesResponse>(`/notes`, {
    headers: { Cookie: cookiesStore.toString() },
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookiesStore = await cookies();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookiesStore.toString() },
  });

  return response.data;
};
