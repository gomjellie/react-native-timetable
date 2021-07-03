import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import moment from 'moment';
import { setLocale, assignColor, genTimeBlock } from '../utils';
import Events from '../Events/Events';
import Header from '../Header/Header';
import styles from './TimeTableView.styles';

export default class TimeTableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: props.pivotDate,
    };
    const { pivotTime, pivotEndTime } = this.props;
    this.calendar = null;
    setLocale(props.locale);
    this.times = this.genTimes(pivotTime, pivotEndTime);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate) {
      this.setState({ currentDate: nextProps.selectedDate });
    }
    if (nextProps.locale !== this.props.locale) {
      setLocale(nextProps.locale);
    }
  }

  genTimes = (pivotTime, endPivotTime) => {
    const times = [];
    for (let i = pivotTime; i < endPivotTime; i += 1) {
      times.push(i);
    }
    return times;
  };

  render() {
    const {
      nDays,
      headerStyle,
      dateHeaderFormat,
      onEventPress,
      pivotTime,
    } = this.props;
    const events = assignColor(this.props.events);
    const { currentDate } = this.state;
    // const dates = this.prepareDates(currentMoment, nDays);
    const date = moment(currentDate);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header
            style={headerStyle}
            dateFormat={dateHeaderFormat}
            selectedDate={currentDate}
            nDays={nDays}
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
                pivotTime={pivotTime}
                key={date}
                times={this.times}
                selectedDate={date.toDate()}
                nDays={nDays}
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
  scrollViewRef: PropTypes.func,
  events: Events.propTypes.events,
  nDays: PropTypes.oneOf([1, 3, 5, 6, 7]).isRequired,
  pivotTime: PropTypes.number,
  pivotEndTime: PropTypes.number,
  pivotDate: PropTypes.instanceOf(Date).isRequired,
  dateHeaderFormat: PropTypes.string,
  onEventPress: PropTypes.func,
  headerStyle: PropTypes.object,
  locale: PropTypes.string,
};

TimeTableView.defaultProps = {
  events: [],
  locale: 'en',
  pivotTime: 8,
  pivotEndTime: 22,
  pivotDate: genTimeBlock('mon'),
  dateHeaderFormat: "dddd",
};
