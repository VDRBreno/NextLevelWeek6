import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

type Props = {
  onCenter?: boolean;
}

export function ListDivider({ onCenter=false }: Props) {
  return (
    <View 
      style={[
        styles.container,
        {
          marginBottom: onCenter ? 15 : 30,
          marginTop: onCenter ? 15 : 5
        }
      ]}
    >

    </View>
  );
}