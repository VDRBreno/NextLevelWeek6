import React from 'react';
import { View, FlatList } from 'react-native';

import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelect }: Props) {

  const guilds: GuildProps[] = [
    { id: '1', name: 'Lendários', icon: null, owner: true },
    { id: '2', name: 'Teste', icon: null, owner: false },
    { id: '3', name: 'ANIday', icon: null, owner: true },
    { id: '4', name: 'Champs', icon: null, owner: false },
    { id: '5', name: 'Champs', icon: null, owner: false },
    { id: '6', name: 'Champs', icon: null, owner: false },
    { id: '7', name: 'Champs', icon: null, owner: false },
    { id: '8', name: 'Champs', icon: null, owner: false }
  ]

  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <ListDivider onCenter />}
        showsHorizontalScrollIndicator={false}
        style={styles.guilds}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <Guild 
            data={item}
            onPress={() => handleGuildSelect(item)}
          />
        )}
      />
    </View>
  );
}