import React, { FC } from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import styles from './Event.styles';
import { CalendarEvent, InternalCalendarEvent } from './EventType';

const Event: FC<{
  event: CalendarEvent;
  onPress: (event: CalendarEvent) => void;
  style: ViewStyle;
}> = ({ event, onPress, style }) => {
  event.extra_descriptions = event.extra_descriptions || [];
  return (
    <TouchableOpacity
      onPress={() => onPress(event)}
      style={[
        styles.item,
        style,
        {
          backgroundColor: (event as any).color,
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

export default Event;
