import React, { useState, useEffect } from 'react';

import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>

export type QuestionProps = {
  id: string;
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function useRoom(roomId: string) {
  
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [error, setError] = useState('');
  const [isEndedRoom, setIsEndedRoom] = useState(false);

  function sortQuestions(a: any, b: any, type: string) {

    if(a[type] < b[type]) {
      return -1;
    }
    if(a[type] > b[type]) {
      return 1;
    }

    return 0;

  }

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      
      if(!databaseRoom) {
        setError('Esta sala não existe!');
        return;
      }

      if(databaseRoom?.endedAt) {
        setIsEndedRoom(true);
      }

      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId == user?.id)?.[0]
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions.sort((a, b) => sortQuestions(a, b, 'isAnswered')));
    });

    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id]);

  return { questions, title, error, isEndedRoom }
}