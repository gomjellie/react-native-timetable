import { StyleProp, ViewStyle } from 'react-native';

export type InternalCalendarEvent = {
  title: string;
  extra_descriptions: string[];
  startTime: Date;
  endTime: Date;
  location: string;
  id: string | number;
  color: string;
  style: ViewStyle;
};

export type CalendarEvent = Pick<
  InternalCalendarEvent,
  'startTime' | 'endTime' | 'title' | 'extra_descriptions' | 'location'
>;

// color: PropTypes.string,
//   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   title: PropTypes.string,
//   extra_descriptions: PropTypes.arrayOf(PropTypes.string),
//   location: PropTypes.string,
//   startTime: PropTypes.instanceOf(Date).isRequired,
//   endTime: PropTypes.instanceOf(Date).isRequired,
