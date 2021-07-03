import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import moment from 'moment';

import { formatDate } from '../utils';

import styles from './Header.styles';

const datesFrom = (nDays, selectedDate) => {
  const columns = [];
  let initial = 0;
  for (let i = initial; i < (nDays + initial); i += 1) {
    let date = moment(selectedDate);
    date = date.add(i, 'd');
    columns.push(date.toDate());
  }
  return columns;
};

const headerFontSize = (nDays) => {
  if (nDays > 1) {
    return 12;
  }

  return 16;
};

const dayTextStyle = (nDays) => {
  const fontSize = nDays === 6 ? 10 : 12;
  return {
    fontSize,
  };
};

const Column = ({
                  column, nDays, format,
                }) => {
  return (
      <View style={styles.column}>
        <Text style={[styles.text, dayTextStyle(nDays)]}>
          {formatDate(column, format)}
        </Text>
      </View>
  );
};

const DaysHeader = ({ columns, nDays, format }) => {
  return (
      <View style={styles.columns}>
        {columns.map((column) => {
          return (
              <Column
                  key={column}
                  column={column}
                  nDays={nDays}
                  format={format}
              />
          )
        })}
      </View>
  );
};

const Title = ({ nDays }) => {
  return (
      <View style={styles.title}>
        <Text
            style={[styles.text, { fontSize: headerFontSize(nDays) }]}
        >

        </Text>
      </View>
  );
};

const WeekViewHeader = ({
                          nDays, selectedDate, dateFormat, style,
                        }) => {
  const columns = datesFrom(nDays, selectedDate);
  return (
      <View style={[styles.container, style]}>
        <Title nDays={nDays} selectedDate={selectedDate} />
        {columns && <DaysHeader format={dateFormat} columns={columns} nDays={nDays} />}
      </View>
  );
};

WeekViewHeader.propTypes = {
  nDays: PropTypes.oneOf([1, 3, 5, 6, 7]).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  dateFormat: PropTypes.string,
  style: PropTypes.object,
};

WeekViewHeader.defaultProps = {
  dateFormat: 'dddd', // day of week
};

export default WeekViewHeader;
