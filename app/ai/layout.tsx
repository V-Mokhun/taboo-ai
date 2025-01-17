import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Mode',
  alternates: {
    canonical: '/ai',
  },
  openGraph: {
    url: 'https://taboo-ai.vercel.app/ai',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
