import React from 'react';
import { Dimensions, View } from 'react-native';

import moment, * as _moment from 'moment';

import styles from './Events.styles';
import HeaderStyles from '../Header/Header.styles';

import Event from '../Event/Event';
import {
  EVENTS_CONTENT_OFFSET as CONTENT_OFFSET,
  EVENTS_ROW_HEIGHT as ROW_HEIGHT,
  MINUTES_IN_DAY,
  MINUTES_IN_HOUR,
  TIME_LABELS_COUNT,
} from '../constant';
import { RNTEvent, RNTEventStyle, RNTEventWithStyle } from '../data';

interface EventsProps {
  nDays: 1 | 3 | 5 | 6 | 7;
  events?: RNTEvent[];
  onEventPress?: (e: RNTEvent) => any;
  selectedDate?: Date;
  times: number[];
  pivotTime?: number;
}

const Events: React.FC<EventsProps> = (_props: EventsProps) => {
  const props = { ..._props };

  if (!props.events) props.events = [];
  if (!props.selectedDate) props.selectedDate = new Date();
  if (!props.pivotTime) props.pivotTime = 8;

  const screenWidth = Dimensions.get('window').width;

  const CONTENT_HEIGHT = ROW_HEIGHT * TIME_LABELS_COUNT;
  const TIME_LABEL_WIDTH = HeaderStyles.title.width;
  const EVENTS_CONTAINER_WIDTH = screenWidth - TIME_LABEL_WIDTH;

  const eventItemWidth = EVENTS_CONTAINER_WIDTH / props.nDays;

  /*
   * categorize events with given days.
   * e.g. [[event1, event2], [event3, event4], [event5]]
   */
  const catEventsByDate = (_nDays: number, _events: RNTEvent[], _selectedDate: Date): RNTEvent[][] => {
    const result = [];
    for (let i = 0; i < _nDays; i++) {
      const currDate = moment(_selectedDate).add(i, 'd');

      /* select events where startTime and endTime has currDate */
      let currEvents = _events.filter(
        (item) => currDate.isSame(item.startTime, 'day') || currDate.isSame(item.endTime, 'day'),
      );

      /* if startTime differs with currDate, assume as long event */
      currEvents = currEvents.map((item) => {
        let startTime = item.startTime;
        if (!currDate.isSame(startTime, 'day')) startTime = currDate.startOf('day').toDate();
        return {
          ...item,
          startTime,
        };
      });
      result.push(currEvents);
    }
    return result;
  };

  /*
   * calculate style for one event.
   * TODO: gotta reduce topOffset value in order to pull events upper
   *  (it should be go together with left time label)
   */
  const calcEventStyle = (item: RNTEvent): RNTEventStyle => {
    const pivotTime = props.pivotTime;
    // @ts-ignore
    const startHours = moment(item.startTime).hours() - pivotTime;
    const startMinutes = moment(item.startTime).minutes();
    const totalStartMinutes = startHours * MINUTES_IN_HOUR + startMinutes;

    const topOffset = (totalStartMinutes * CONTENT_HEIGHT) / MINUTES_IN_DAY;
    const height = (moment(item.endTime).diff(item.startTime, 'minutes') * CONTENT_HEIGHT) / MINUTES_IN_DAY;
    const width = eventItemWidth;

    const top = topOffset + CONTENT_OFFSET;
    const left = 0;
    return {
      top,
      left,
      height,
      width,
    };
  };

  /* calculate, adjust style for all events. */
  const calcEventsStyle = (_allEvents: RNTEvent[][]) => {
    return _allEvents.map((_events) => {
      return _events.reduce((acc: RNTEventWithStyle[], event, idx) => {
        const style = calcEventStyle(event);
        let nDuplicate = 1;

        /* check previous events and current event overlaps */
        for (let i = 0; i < idx; i++) {
          const prevEvent = acc[i];
          /* on overlap, update width of both events */
          if (prevEvent.style.left === style.left && prevEvent.style.top + prevEvent.style.height > style.top) {
            nDuplicate++;
            style.left = 5 + eventItemWidth / nDuplicate;
            style.width = eventItemWidth / nDuplicate;
            prevEvent.style.width = eventItemWidth / nDuplicate;
          }
        }
        acc.push({ event, style });
        return acc;
      }, []);
    });
  };

  /* sort events by date. */
  const sortEventsByDate = (_events: RNTEvent[]) => {
    return _events.slice(0).sort((a, b) => moment(a.startTime).diff(b.startTime, 'minutes'));
  };

  const { events, nDays, selectedDate, times } = props;
  const sortedEvents = sortEventsByDate(events);
  const allEvents = catEventsByDate(nDays, sortedEvents, selectedDate);
  const allEventsWithStyle = calcEventsStyle(allEvents);

  return (
    <View style={styles.container}>
      {times.map((time) => (
        <View key={time} style={styles.timeRow}>
          <View style={styles.timeLabelLine} />
        </View>
      ))}
      <View style={styles.events}>
        {allEventsWithStyle.map((eventsInSection, sectionIndex) => (
          <View key={sectionIndex} style={styles.event}>
            {eventsInSection.map((item) => (
              <Event key={item.event.id} event={item.event} style={item.style} onPress={props.onEventPress} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Events;
