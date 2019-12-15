import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import moment from 'moment';
import { setLocale } from '../utils';
import Events from '../Events/Events';
import Header from '../Header/Header';
import styles from './TimeTableView.styles';

export const TIME_LABELS_COUNT = 22;

export default class TimeTableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMoment: props.selectedDate,
    };
    const { startTime } = this.props;
    this.calendar = null;
    setLocale(props.locale);
    this.times = this.generateTimes(startTime);
  }

  componentDidMount() {
    // this.calendar.scrollTo({ y: (300), x: 0, animated: true });
    // requestAnimationFrame(() => {
    //   this.calendar.scrollTo({ y: (SCREEN_HEIGHT - 300), x: 0, animated: false });
    // });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate) {
      this.setState({ currentMoment: nextProps.selectedDate });
    }
    if (nextProps.locale !== this.props.locale) {
      setLocale(nextProps.locale);
    }
  }

  generateTimes = (startTime) => {
    const times = [];
    for (let i = startTime; i < TIME_LABELS_COUNT; i += 1) {
      times.push(i);
    }
    return times;
  };

  prepareDates = (currentMoment, numberOfDays) => {
    const dates = [];
    for (let i = 0; i < 1; i += 1) {
      const date = moment(currentMoment).add(numberOfDays * i, 'd');
      dates.push(date);
    }
    return dates;
  };

  render() {
    const {
      numberOfDays,
      headerStyle,
      formatDateHeader,
      onEventPress,
      events,
      startTime,
    } = this.props;
    const { currentMoment } = this.state;
    // const dates = this.prepareDates(currentMoment, numberOfDays);
    const date = moment(currentMoment);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header
            style={headerStyle}
            formatDate={formatDateHeader}
            selectedDate={currentMoment}
            numberOfDays={numberOfDays}
          />
        </View>
        <ScrollView ref={this.props.scrollViewRef}>
          <View style={styles.scrollViewContent}>
            <View style={styles.timeColumn}>
              {this.times.map(time => (
                <View key={time} style={styles.timeLabel}>
                  <Text style={styles.timeText}>{time === 12 ? 12 : time % 12}</Text>
                </View>
              ))}
            </View>
            <View
              key={date}
              style={styles.eventsContainer}
            >
              <Events
                startTime={startTime}
                key={date}
                times={this.times}
                selectedDate={date.toDate()}
                numberOfDays={numberOfDays}
                onEventPress={onEventPress}
                events={events}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

TimeTableView.propTypes = {
  events: Events.propTypes.events,
  numberOfDays: PropTypes.oneOf([1, 3, 5, 6]).isRequired,
  startTime: PropTypes.number,
  onSwipeNext: PropTypes.func,
  onSwipePrev: PropTypes.func,
  formatDateHeader: PropTypes.string,
  onEventPress: PropTypes.func,
  headerStyle: PropTypes.object,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string,
};

TimeTableView.defaultProps = {
  events: [],
  locale: 'en',
  startTime: 8,
};
