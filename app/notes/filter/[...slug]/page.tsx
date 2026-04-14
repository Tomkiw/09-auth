import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}

export async function generateMetadata({
  params,
}: FilterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const nameFilter = slug[0];

  return {
    title: `Notehub: ${nameFilter} `,
    description: `Browse notes filtered by category: ${nameFilter}`,
    openGraph: {
      title: `Notes — ${nameFilter}`,
      description: `Browse notes filtered by category: ${nameFilter}`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/notes/filter/${nameFilter}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes — ${nameFilter}`,
        },
      ],
    },
  };
}

export default async function FilterPage({
  params,
  searchParams,
}: FilterPageProps) {
  const { slug } = await params;
  const { page, search } = await searchParams;
  const category = slug?.[0] === "all" ? undefined : slug?.[0];
  const currentPage = Number(page ?? "1");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", currentPage, search, category],
    queryFn: () =>
      fetchNotes({ page: currentPage, perPage: 12, search, tag: category }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
}
