import React, { Component, FC } from 'react';
import { Dimensions, View } from 'react-native';
import moment from 'moment';

import Event from '../Event/Event';

import styles, { CONTENT_OFFSET, ROW_HEIGHT } from './Events.styles';
import HeaderStyle from '../Header/Header.styles';
import {
  CalendarEvent,
  InternalCalendarEvent,
} from 'components/Event/EventType';

const TIME_LABELS_COUNT = 24;
const { width: screenWidth } = Dimensions.get('window');

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;
const CONTENT_HEIGHT = ROW_HEIGHT * TIME_LABELS_COUNT;
const TIME_LABEL_WIDTH = HeaderStyle.title.width;
const EVENTS_CONTAINER_WIDTH = screenWidth - TIME_LABEL_WIDTH;

type Props = {
  numDays: 1 | 3 | 5 | 6 | 7;
  events: InternalCalendarEvent[];
  onEventPress(event: CalendarEvent): void;
  selectedDate: Date;
  times: number[];
  pivotTime: number;
};

/**
 * total stores events in each day of nDays
 * @returns [[event1, event2], [event3, event4], [event5]], each child array is events for specific day in range
 */
const catEventsByDays = (
  numDays: number,
  events: InternalCalendarEvent[],
  selectedDate: Date
) => {
  const total: InternalCalendarEvent[][] = [];
  let initial = 0;
  for (let i = initial; i < numDays + initial; i += 1) {
    // current date in nDays, calculated from selected date
    const currenDate = moment(selectedDate).add(i, 'd');

    // filter events that have startTime/endTime in current date
    let filteredEvents = events.filter((item) => {
      return (
        currenDate.isSame(item.startTime, 'day') ||
        currenDate.isSame(item.endTime, 'day')
      );
    });
    console.log(filteredEvents);

    filteredEvents = filteredEvents.map((item) => {
      let { startTime } = item;
      // if endTime is in next day, set starDate to begin time of current date (00:00)
      if (!currenDate.isSame(startTime, 'day')) {
        startTime = currenDate.startOf('day').toDate();
      }
      return {
        ...item,
        startTime,
      };
    });
    total.push(filteredEvents);
  }
  return total;
};

const calcEventStyle = (
  item: CalendarEvent,
  pivotTime: number,
  width: number
) => {
  const startHours = moment(item.startTime).hours() - pivotTime;
  const startMinutes = moment(item.startTime).minutes();
  const totalStartMinutes = startHours * MINUTES_IN_HOUR + startMinutes;
  const topOffset = (totalStartMinutes * CONTENT_HEIGHT) / MINUTES_IN_DAY;
  const height =
    (moment(item.endTime).diff(item.startTime, 'minutes') * CONTENT_HEIGHT) /
    MINUTES_IN_DAY;

  return {
    top: topOffset + CONTENT_OFFSET,
    left: 0,
    height,
    width,
  };
};

const adjustEventStyle = (
  totalEvents: InternalCalendarEvent[][],
  pivotTime: number,
  itemWidth: number
) => {
  // const itemWidth = this.getEventItemWidth();
  return totalEvents.map((events) => {
    // get position and width for each event
    return events.reduce((eventsAcc, event, i) => {
      let numberOfDuplicate = 1;
      const style = calcEventStyle(event, pivotTime, itemWidth);
      // check if previous events have the same position or not,
      // start from 0 to current index of event item
      for (let j = 0; j < i; j += 1) {
        const previousEvent = eventsAcc[j];
        // if left and top of previous event collides with current item,
        // move current item to the right and update new width for both
        const foundDuplicate =
          previousEvent?.style?.left === style?.left &&
          Number(previousEvent?.style?.top) +
            Number(previousEvent.style.height) >
            style.top;
        if (foundDuplicate) {
          numberOfDuplicate += 1;
          style.left = 5 + itemWidth / numberOfDuplicate;
          style.width = itemWidth / numberOfDuplicate;
          previousEvent.style.width = itemWidth / numberOfDuplicate;
        }
      }
      eventsAcc.push({
        ...event,
        style,
      });
      return eventsAcc;
    }, [] as InternalCalendarEvent[]);
  });
};

const sortEventsByDate = <T extends CalendarEvent>(events: T[]) => {
  return events.slice(0).sort((a, b) => {
    return moment(a.startTime).diff(b.startTime, 'minutes');
  });
};

const Events: FC<Props> = ({
  numDays,
  events,
  onEventPress,
  selectedDate,
  pivotTime,
  times,
}) => {
  const sortedEvents = sortEventsByDate(events);
  console.log(sortedEvents);
  const internalCalendarEvents = (() => {
    const t = catEventsByDays(numDays, sortedEvents, selectedDate);
    console.log(t);
    return adjustEventStyle(t, pivotTime, EVENTS_CONTAINER_WIDTH / numDays);
  })();

  console.log(internalCalendarEvents);

  return (
    <View style={styles.container}>
      {times.map((time) => (
        <View key={time} style={styles.timeRow}>
          <View style={styles.timeLabelLine} />
        </View>
      ))}
      <View style={styles.events}>
        {internalCalendarEvents.map((eventsInSection, sectionIndex) => (
          <View key={sectionIndex} style={styles.event}>
            {eventsInSection.map((item) => (
              <Event
                key={item.id}
                event={item}
                style={item.style}
                onPress={onEventPress}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Events;
