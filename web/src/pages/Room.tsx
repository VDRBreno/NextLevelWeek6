import React, { FormEvent, useState, useEffect } from 'react';

import { useParams } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { toastStyle } from '../styles/toast/style';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}>

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}

type RoomParams = {
  id: string;
}

export function Room() {

  const { user } = useAuth();

  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  const roomId = params.id;

  async function handleSendQuestion(event: FormEvent) {

    event.preventDefault();

    if(newQuestion.trim() === '') {
      return;
    }

    if(!user) {
      toast.error('Você precisa estar logado(a)!', toastStyle.error);
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');

    toast.success('Pergunta criada!', toastStyle.success);

  }

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  return (
    <div id='page-room'>
      <Toaster />

      <header>
        <div className='content'>
          <img src={logoImg} alt='Letmeask' />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          {questions.length > 0 && 
            <span>{questions.length} pergunta(s)</span>
          }
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder='O que você quer perguntar?'
            value={newQuestion}
            onChange={event => setNewQuestion(event.target.value)}
          />

          <div className='form-footer'>
            {user
              ? (
                <div className='user-info'>
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              )
              : (
                <span>Para enviar uma pergunta, <button>faça seu login</button></span>
              )
            }

            <Button type='submit'>Enviar pergunta</Button>
          </div>
        </form>


      </main>
    </div>
  );
}