import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import styles from './Event.styles';
import { CalendarEvent } from './EventType';

const Event: FC<{
  event: CalendarEvent;
  onPress: (event: CalendarEvent) => void;
  style: StyleProp<ViewStyle>;
}> = ({ event, onPress, style }) => {
  event.extra_descriptions = event.extra_descriptions || [];
  return (
    <TouchableOpacity
      onPress={() => onPress(event)}
      style={[
        styles.item,
        style,
        {
          backgroundColor: event.color,
        },
      ]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.location}>{event.location}</Text>
      {event.extra_descriptions.map((description, idx) => (
        <Text key={idx} style={styles.description}>
          {description}
        </Text>
      ))}
    </TouchableOpacity>
  );
};

// Event.propTypes = {
//   event: PropTypes.any.isRequired,
//   onPress: PropTypes.any,
//   style: PropTypes.object,
// };

export default Event;
