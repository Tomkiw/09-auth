import { nextServer } from "@/lib/api/api";

import type { Note, CreateNote } from "@/types/note";
import { User } from "@/types/user";

type CheckSession = User | null;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });

  return response.data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", newNote);
  return data;
};

export const deleteNote = async (deleteNoteId: Note["id"]): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${deleteNoteId}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export interface AuthRequest {
  email: string;
  password: string;
}

export const registerUser = async (data: AuthRequest) => {
  const response = await nextServer.post<User>(`/auth/register`, data);
  return response.data;
};

export const login = async (data: AuthRequest) => {
  const response = await nextServer.post<User>(`/auth/login`, data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post(`/auth/logout`);
};

export const checkSession = async () => {
  const response = await nextServer.get<CheckSession>(`/auth/session`);
  return response.data;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>(`/users/me`);
  return data;
};

type UserResponse = {
  email?: string;
  username?: string;
};

export const updateMe = async (data: User): Promise<UserResponse> => {
  const response = await nextServer.patch<User>(`/users/me`, data);
  return response.data;
};
