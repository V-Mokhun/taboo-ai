'use client';

import IconButton from '@/components/ui/icon-button';
import { getLevelsByUser } from '@/lib/services/levelService';
import IUser from '@/lib/types/user.type';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Skeleton } from '../skeleton';
import IUserLevel from '@/lib/types/userLevel.type';
import ProfileTopicsCardView from './topics/profile-topics-card-view';
import { RefreshCcw } from 'lucide-react';

export default function ProfilePlayedTopicScrollView({
  user,
}: {
  user: IUser;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [playedTopics, setPlayedTopics] = useState<IUserLevel[]>([]);

  useEffect(() => {
    getPlayedTopicsData(user.email);
  }, []);

  const getPlayedTopicsData = async (email: string) => {
    try {
      setIsLoading(true);
      const playedTopics = await getLevelsByUser(email);
      sortPlayedTopics(playedTopics);
      setPlayedTopics(playedTopics);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sort the given IUserLevel array.
   * Firstly by attempts count (descending),
   * Then by last played date (descending),
   * Lastly by best score (descending)
   */
  const sortPlayedTopics = (playedTopics: IUserLevel[]) => {
    playedTopics.sort((a, b) => {
      if (a.attempts === b.attempts) {
        if (a.lastPlayedAt && b.lastPlayedAt) {
          if (a.lastPlayedAt === b.lastPlayedAt) {
            return b.bestScore - a.bestScore;
          }
          return a.lastPlayedAt > b.lastPlayedAt ? -1 : 1;
        }
        return 0;
      }
      return b.attempts - a.attempts;
    });
  };

  return (
    <div className='w-full flex flex-col gap-2 justify-start'>
      <div className='w-full flex flex-row gap-2 items-center'>
        <h2 className='text-2xl'>Completed Topics</h2>
        <IconButton
          asChild
          tooltip='Refresh past games'
          variant='link'
          onClick={() => {
            getPlayedTopicsData(user.email);
          }}
        >
          <RefreshCcw
            className={cn(isLoading ? 'animate-spin' : 'animate-none')}
          />
        </IconButton>
      </div>
      <div className='w-full overflow-x-auto flex flex-row gap-8 p-8 justify-start rounded-lg border leading-snug'>
        {isLoading ? (
          <Skeleton className='w-full h-[350px]' numberOfRows={12} />
        ) : (
          playedTopics.map((topic) => (
            <ProfileTopicsCardView
              key={topic.levelId}
              userEmail={user.email}
              topic={topic}
            />
          ))
        )}
      </div>
    </div>
  );
}
