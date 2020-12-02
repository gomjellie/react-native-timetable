import { Dimensions, StyleSheet } from 'react-native';

import HeaderStyle from '../Header/Header.styles';
import { EVENTS_ROW_HEIGHT as ROW_HEIGHT } from '../constant';

const SCREEN_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  header: {
    height: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeLabel: {
    flex: -1,
    height: ROW_HEIGHT,
  },
  timeText: {
    fontSize: 12,
    textAlign: 'center',
  },
  timeColumn: {
    paddingTop: 4,
    width: HeaderStyle.title.width,
  },
  eventsContainer: {
    flex: 1,
    width: SCREEN_WIDTH - HeaderStyle.title.width,
  },
});

export default styles;
