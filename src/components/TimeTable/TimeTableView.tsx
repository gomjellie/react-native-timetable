import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import moment, * as _moment from 'moment';

import Events from '../Events/Events';
import Header from '../Header/Header';
import styles from './TimeTableView.styles';

import { assignColorToEvents, createDate, setLocale } from '../utils';
import { RNTEvent } from '../data';

interface TimeTableViewProps {
  scrollViewRef?: (ref: ScrollView | null) => any;
  events?: RNTEvent[];
  nDays: 1 | 3 | 5 | 6 | 7;
  pivotTime?: number;
  pivotEndTime?: number;
  pivotDate?: Date;
  dateHeaderFormat?: string;
  onEventPress?: (e: RNTEvent) => any;
  headerStyle?: object;
  locale?: string;
}

const TimeTableView: React.FC<TimeTableViewProps> = (_props: TimeTableViewProps) => {
  const props = { ..._props };

  if (!props.events) props.events = [];
  if (!props.pivotTime) props.pivotTime = 8;
  if (!props.pivotEndTime) props.pivotEndTime = 22;
  if (!props.pivotDate) props.pivotDate = createDate('mon');
  if (!props.dateHeaderFormat) props.dateHeaderFormat = 'dddd';
  if (!props.headerStyle) props.headerStyle = {};
  if (!props.locale) props.locale = 'en';

  const getTimes = (_pivotTime: number, _endPivotTime: number) => {
    const _times = [];
    for (let i = _pivotTime; i < _endPivotTime; i++) _times.push(i);
    return _times;
  };

  const [currMoment, setCurrMoment] = React.useState(props.pivotDate);
  const [locale, setLLocale] = React.useState(props.locale);
  const [times, _] = React.useState(getTimes(props.pivotTime, props.pivotEndTime));

  React.useEffect(() => {
    if (props.pivotDate && props.pivotDate !== currMoment) setCurrMoment(props.pivotDate);

    if (props.locale && props.locale !== locale) {
      setLLocale(props.locale);
      setLocale(locale);
    }
  }, [props.locale, props.pivotDate]);

  const { nDays, headerStyle, dateHeaderFormat, onEventPress, pivotTime } = props;
  const events = assignColorToEvents(props.events);
  const date = moment(currMoment);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header style={headerStyle} dateFormat={dateHeaderFormat} selectedDate={currMoment} nDays={nDays} />
      </View>
      <ScrollView ref={(ref) => props.scrollViewRef && props.scrollViewRef(ref)}>
        <View style={styles.scrollViewContent}>
          <View style={styles.timeColumn}>
            {times.map((time) => (
              <View key={time} style={styles.timeLabel}>
                <Text style={styles.timeText}>{time === 12 ? 12 : time % 12}</Text>
              </View>
            ))}
          </View>
          <View key={date.toISOString()} style={styles.eventsContainer}>
            <Events
              pivotTime={pivotTime}
              key={date.toISOString()}
              times={times}
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
};

export default TimeTableView;
