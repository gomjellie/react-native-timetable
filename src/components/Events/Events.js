import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, View} from 'react-native';
import moment from 'moment';

import Event from '../Event/Event';

import styles, {CONTENT_OFFSET, ROW_HEIGHT} from './Events.styles';
import HeaderStyle from '../Header/Header.styles';

const TIME_LABELS_COUNT = 24;
const { width: screenWidth } = Dimensions.get('window');

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;
const CONTENT_HEIGHT = ROW_HEIGHT * TIME_LABELS_COUNT;
const TIME_LABEL_WIDTH = HeaderStyle.title.width;
const EVENTS_CONTAINER_WIDTH = screenWidth - TIME_LABEL_WIDTH;

class Events extends Component {
  onEventPress = (event) => {
    const { onEventPress } = this.props;
    if (onEventPress) {
      onEventPress(event);
    }
  };

  getEventsByNumberOfDays = (numberOfDays, events, selectedDate) => {
    // total stores events in each day of numberOfDays
    // example: [[event1, event2], [event3, event4], [event5]], each child array
    // is events for specific day in range
    const total = [];
    let initial = 0;
    for (let i = initial; i < (numberOfDays + initial); i += 1) {
      // current date in numberOfDays, calculated from selected date
      const currenDate = moment(selectedDate).add(i, 'd');

      // filter events that have startTime/endTime in current date
      let filteredEvents = events.filter((item) => {
        return currenDate.isSame(item.startTime, 'day') || currenDate.isSame(item.endTime, 'day');
      });

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

  getStyleForEvent = (item) => {
    /**
     * TODO: gotta reduce topOffset value in order to pull events upper (it should be go together with left time label)
     * @type {number}
     */
    const { pivotTime } = this.props;
    const startHours = moment(item.startTime).hours() - pivotTime;
    const startMinutes = moment(item.startTime).minutes();
    const totalStartMinutes = (startHours * MINUTES_IN_HOUR) + startMinutes;
    const topOffset = (totalStartMinutes * CONTENT_HEIGHT) / MINUTES_IN_DAY;
    const height = (moment(item.endTime).diff(item.startTime, 'minutes') * CONTENT_HEIGHT) / MINUTES_IN_DAY;
    const width = this.getEventItemWidth();

    return {
      top: topOffset + CONTENT_OFFSET,
      left: 0,
      height,
      width,
    };
  };

  getEventsWithPosition = (totalEvents) => {
    const itemWidth = this.getEventItemWidth();
    return totalEvents.map((events) => {
      // get position and width for each event
      return events.reduce((eventsAcc, event, i) => {
        let numberOfDuplicate = 1;
        const style = this.getStyleForEvent(event);
        // check if previous events have the same position or not,
        // start from 0 to current index of event item
        for (let j = 0; j < i; j += 1) {
          const previousEvent = eventsAcc[j];
          // if left and top of previous event collides with current item,
          // move current item to the right and update new width for both
          const foundDuplicate = previousEvent.style.left === style.left
            && previousEvent.style.top + previousEvent.style.height > style.top;
          if (foundDuplicate) {
            numberOfDuplicate += 1;
            style.left = 5 + (itemWidth / numberOfDuplicate);
            style.width = itemWidth / numberOfDuplicate;
            previousEvent.style.width = itemWidth / numberOfDuplicate;
          }
        }
        eventsAcc.push({
          data: event,
          style,
        });
        return eventsAcc;
      }, []);
    });
  };

  getEventItemWidth = () => {
    const { numberOfDays } = this.props;
    return EVENTS_CONTAINER_WIDTH / numberOfDays;
  };

  sortEventByDates = (events) => {
    return events.slice(0)
      .sort((a, b) => {
        return moment(a.startTime)
          .diff(b.startTime, 'minutes');
      });
  };

  render() {
    const {
      events,
      numberOfDays,
      selectedDate,
      times,
    } = this.props;
    const sortedEvents = this.sortEventByDates(events);
    let totalEvents = this.getEventsByNumberOfDays(numberOfDays, sortedEvents, selectedDate);
    totalEvents = this.getEventsWithPosition(totalEvents);
    return (
      <View style={styles.container}>
        {times.map(time => (
          <View key={time} style={styles.timeRow}>
            <View style={styles.timeLabelLine} />
          </View>
        ))}
        <View style={styles.events}>
          {totalEvents.map((eventsInSection, sectionIndex) => (
            <View
              key={sectionIndex}
              style={styles.event}
            >
              {eventsInSection.map(item => (
                <Event
                  key={item.data.id}
                  event={item.data}
                  style={item.style}
                  onPress={this.onEventPress}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    );
  }
}

Events.propTypes = {
  numberOfDays: PropTypes.oneOf([1, 3, 5, 6, 7]).isRequired,
  events: PropTypes.arrayOf(Event.propTypes.event),
  onEventPress: PropTypes.func,
  selectedDate: PropTypes.instanceOf(Date),
  times: PropTypes.arrayOf(PropTypes.number),
  pivotTime: PropTypes.number,
};

Events.defaultProps = {
  events: [],
  pivotTime: 8,
  selectedDate: new Date(),
};

export default Events;
