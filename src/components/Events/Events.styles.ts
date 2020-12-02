import { StyleSheet } from 'react-native';
import {
  EVENTS_CONTENT_OFFSET as CONTENT_OFFSET,
  EVENTS_GREY_HEX as GREY_HEX,
  EVENTS_ROW_HEIGHT as ROW_HEIGHT,
} from '../constant';

const styles = StyleSheet.create({
  container: {
    paddingTop: CONTENT_OFFSET,
  },
  timeRow: {
    flex: 0,
    height: ROW_HEIGHT,
  },
  timeLabelLine: {
    height: 1,
    backgroundColor: GREY_HEX,
    position: 'absolute',
    right: 0,
    left: 0,
  },
  event: {
    flex: 1,
    overflow: 'hidden',
    borderColor: GREY_HEX,
    borderLeftWidth: 1,
  },
  events: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
});

export default styles;
