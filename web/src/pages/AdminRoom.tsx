import React from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';


import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {

  const { user } = useAuth();

  const params = useParams<RoomParams>();

  const roomId = params.id;
  const history = useHistory();

  const { questions, title } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });

    history.push('/');
  }

  return (
    <div id='page-room'>
      <Toaster />

      <header>
        <div className='content'>
          <img src={logoImg} alt='Letmeask' />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          {questions.length > 0 && 
            <span>{questions.length} pergunta(s)</span>
          }
        </div>

        <div className='question-list'>
          {questions.map(question => (
            <Question
              key={question.id}
              author={question.author}
              content={question.content}
            >
              <button
                type='button'
                onClick={() => {handleDeleteQuestion(question.id)}}
              >
                <img src={deleteImg} alt='Remover pergunta' />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}