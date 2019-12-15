import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './Event.styles';

const Event = ({ event, onPress, style }) => {
  /*
    TODO: <Text> {event.description} </Text>
    이부분을 description -> professor, title, location 으로 3단 으로 변경
   */
  return (
    <TouchableOpacity
      onPress={() => onPress(event)}
      style={[styles.item, style, {
        backgroundColor: event.color,
      }]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.professor}>{event.professor}</Text>
      <Text style={styles.location}>{event.location}</Text>
    </TouchableOpacity>
  );
};

const eventPropTypes = PropTypes.shape({
  color: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
  professor: PropTypes.string,
  location: PropTypes.string,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
});

Event.propTypes = {
  event: eventPropTypes.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

export default Event;
