import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: 53,
    height: 53,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 22,
    overflow: 'hidden'
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 5
  }
});