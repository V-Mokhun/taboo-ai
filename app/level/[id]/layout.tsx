import { Metadata, ResolvingMetadata } from 'next';
import { getAllLevels, getLevel } from '@/lib/services/levelService';

export async function generateMetadata(
  { params: { id } }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const level = await getLevel(id);
  return {
    title: level?.name ?? 'Level',
    alternates: {
      canonical: `/level/${id}`,
    },
    openGraph: {
      url: 'https://taboo-ai.vercel.app/level/' + id,
    },
  };
}

export async function generateStaticParams() {
  const levels = await getAllLevels();
  return levels.map((level) => ({ id: level.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
