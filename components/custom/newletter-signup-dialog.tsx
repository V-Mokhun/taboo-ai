'use client';

import {
  getNewsletterPopupString,
  setNewsletterPopupString,
} from '@/lib/cache';
import { CustomEventKey, EventManager } from '@/lib/event-manager';
import { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import semver from 'semver';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export const NewsletterSignupDialog = () => {
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const incomingVersion = process.env.NEXT_PUBLIC_TABOO_AI_VERSION;

  const displayNewletterPopup = () => {
    setTimeout(() => {
      setOpen(true);
      localStorage.removeItem('pwa-user-choice');
    }, 5000);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    !isOpen &&
      setNewsletterPopupString(process.env.NEXT_PUBLIC_TABOO_AI_VERSION);
  };

  const tryOpenNewsletterDialog = useCallback(() => {
    const featurePopupString = getNewsletterPopupString();
    if (!featurePopupString) {
      displayNewletterPopup();
      return;
    }
    if (incomingVersion) {
      try {
        const versionDiff = semver.diff(
          String(incomingVersion),
          String(featurePopupString)
        );
        if (versionDiff === null || versionDiff === 'patch') {
          // If it is a patch release, or no difference, then we do not show,
          // We only update the version in the local storage
          setOpen(false);
          semver.gt(incomingVersion, featurePopupString) &&
            setNewsletterPopupString(incomingVersion);
          return;
        }
        const isIncomingVersionNewer = semver.gt(
          incomingVersion,
          featurePopupString
        );
        if (isIncomingVersionNewer) {
          displayNewletterPopup();
          return;
        }
      } catch {
        displayNewletterPopup();
        return;
      }
    }
    setOpen(false);
  }, [displayNewletterPopup, setOpen, incomingVersion]);

  useEffect(() => {
    tryOpenNewsletterDialog();
  }, [tryOpenNewsletterDialog]);

  useEffect(() => {
    const listener = EventManager.bindEvent(
      CustomEventKey.NEWLETTER_DIALOG,
      () => {
        tryOpenNewsletterDialog();
      }
    );
    return () => {
      EventManager.removeListener(CustomEventKey.NEWLETTER_DIALOG, listener);
    };
  }, [tryOpenNewsletterDialog]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className='!bg-white !text-black !rounded-lg'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Subscribe to receive the latest updates!</DialogTitle>
        </DialogHeader>
        <iframe
          src='https://liyuxuan.substack.com/embed'
          width='auto'
          height='320'
          className={cn(
            resolvedTheme === 'dark' ? '' : '',
            'border-2 rounded-lg bg-card text-card-foreground w-full shadow-lg'
          )}
          scrolling='no'
        ></iframe>
      </DialogContent>
    </Dialog>
  );
};
