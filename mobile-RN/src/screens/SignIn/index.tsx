import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  Alert
} from 'react-native';

import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';

import { useAuth } from '../../hooks/auth';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

export function SignIn() {

  const { user, signIn } = useAuth();

  async function handleSignIn() {
    try {

      await signIn();

    } catch(err) {
      Alert.alert(err);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode='stretch'
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}
            e organize suas {'\n'}
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {'\n'}
            favoritos com seus amigos
          </Text>

          <ButtonIcon
            onPress={handleSignIn}
            title='Entrar com Discord'
          />
        </View>
      </View>
    </Background>
  );
}