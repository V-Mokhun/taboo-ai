import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Choose Topic',
  alternates: {
    canonical: '/levels',
  },
  openGraph: {
    url: 'https://taboo-ai.vercel.app/levels',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex justify-center w-full h-full'>{children}</section>
  );
}
