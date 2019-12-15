import { StyleSheet } from 'react-native';
import { Theme } from 'teaset';
import MintTheme from '../../../../MintTheme';
Theme.set(MintTheme);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Theme.defaultColor,
    borderTopWidth: 1,
    width: 26,
  },
  columns: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Theme.defaultColor,
    borderTopWidth: 1,
    borderLeftWidth: 1,
  },
  text: {
    color: Theme.defaultColor,
  },
});

export default styles;
