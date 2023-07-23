'use client';

import ReactMarkdown from 'react-markdown';
import ruleContent from './rule.md';
import challengeContent from './challenge.md';
import style from './style.module.css';
import Link from 'next/link';
import SocialLinkButton from '../../components/SocialLinkButton';
import { SiDiscord } from 'react-icons/si';

interface RulePageProps {}

export default function RulePage(props: RulePageProps) {
  return (
    <section className='flex justify-center'>
      <h1
        data-testid='heading-rule-title'
        className='h-32 fixed top-0 z-50 leading-normal text-white pt-4 text-xl'
      >
        How To Play Taboo AI?
      </h1>
      <section className='w-full h-full flex flex-col pt-20 px-8 lg:px-48 lg:pt-32 lg:text-2xl'>
        <article className='leading-normal'>
          <ReactMarkdown className={`${style.markdown}`}>
            {ruleContent}
          </ReactMarkdown>
        </article>
        <div className='flex flex-row justify-start gap-8 items-center'>
          <Link
            id='start'
            href='/levels'
            data-testid='link-start'
            data-style='none'
          >
            <div className='btn-menu'>Choose Topics</div>
          </Link>
        </div>
        <br />
        <hr />
        <br />
        <p className='text-justify text-gray text-base'>
          Disclaimer: Please note that Taboo AI relies solely on{' '}
          <a className='underline' href='https://openai.com/api/pricing/'>
            OpenAI AI Model
          </a>{' '}
          for generating responses and taboo words. In the event that the API
          experiences overload due to high traffic, you may encounter some
          internet hiccups while playing the game. However, don&apos;t worry!
          Just try submitting your prompt again until it succeeds. The timer
          will be paused so that you won&apos;t be at a disadvantage if this
          occurs. Typically, after a maximum of five tries, you should be able
          to get your response.
        </p>
      </section>
    </section>
  );
}
