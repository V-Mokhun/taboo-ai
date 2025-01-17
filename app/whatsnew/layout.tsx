import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What's New?",
  alternates: {
    canonical: '/whatsnew',
  },
  openGraph: {
    url: 'https://taboo-ai.vercel.app/whatsnew',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
