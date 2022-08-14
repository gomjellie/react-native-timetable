export type CalendarEvent = {
  title: string;
  startTime: Date;
  endTime: Date;
  location: string;
  extra_descriptions: string[];
  id: string | number;
  color: string;
};

// color: PropTypes.string,
//   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   title: PropTypes.string,
//   extra_descriptions: PropTypes.arrayOf(PropTypes.string),
//   location: PropTypes.string,
//   startTime: PropTypes.instanceOf(Date).isRequired,
//   endTime: PropTypes.instanceOf(Date).isRequired,
