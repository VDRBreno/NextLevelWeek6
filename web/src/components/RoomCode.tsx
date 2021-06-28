import React from 'react';

import toast from 'react-hot-toast';

import { toastStyle } from '../styles/toast/style';

import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss'

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    toast.success('Código copiado', toastStyle.success);
  }

  return (
    <button className='room-code' onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt='Copiar room code' />
      </div>
      <span>Sala {props.code}</span>
    </button> 
  );
}