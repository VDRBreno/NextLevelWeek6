import { StyleSheet, StatusBar } from 'react-native';
import { theme } from '../../global/styles/theme';

const barHeight = StatusBar.currentHeight || 0;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 104,
    paddingTop: barHeight,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.title700,
    fontSize: 20,
    color: theme.colors.heading
  }
});