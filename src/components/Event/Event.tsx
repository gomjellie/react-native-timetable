import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './Event.styles';

import { RNTEvent } from '../data';

interface EventProps {
  event: RNTEvent;
  onPress?: (e: RNTEvent) => any;
  style: object;
}

const Event: React.FC<EventProps> = (props: EventProps) => {
  const e = props.event;
  const style = props.style;

  return (
    <TouchableOpacity
      onPress={() => props.onPress && props.onPress(e)}
      style={[styles.item, style, { backgroundColor: e.color }]}
    >
      <Text style={styles.title}>{e.title}</Text>
      <Text style={styles.location}>{e.location}</Text>
      {e.extraDescriptions &&
        e.extraDescriptions.map((description, idx) => (
          <Text key={idx} style={styles.description}>
            {description}
          </Text>
        ))}
    </TouchableOpacity>
  );
};

export default Event;
