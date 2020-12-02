import React from 'react';
import { Text, View } from 'react-native';

import moment, * as _moment from 'moment';

import styles from './Header.styles';

import { formatDate } from '../utils';

const getColumns = (nDays: number, selectedDate: Date) => {
  const columns: Date[] = [];
  for (let i = 0; i < nDays; i++) columns.push(moment(selectedDate).add(i, 'd').toDate());
  return columns;
};
const headerFontSize = (nDays: number) => (nDays > 1 ? 12 : 16);
const dayTextStyle = (nDays: number) => {
  return { fontSize: nDays === 6 ? 10 : 12 };
};

interface ColumnProps {
  column: Date;
  nDays: 1 | 3 | 5 | 6 | 7;
  format: string;
}

const Column: React.FC<ColumnProps> = (props: ColumnProps) => {
  return (
    <View style={styles.column}>
      <Text style={[styles.text, dayTextStyle(props.nDays)]}>{formatDate(props.column, props.format)}</Text>
    </View>
  );
};

interface ColumnsProps {
  columns: Date[];
  nDays: 1 | 3 | 5 | 6 | 7;
  format: string;
}

const Columns: React.FC<ColumnsProps> = (props: ColumnsProps) => {
  return (
    <View style={styles.columns}>
      {props.columns.map((column) => {
        return <Column key={column.toISOString()} column={column} nDays={props.nDays} format={props.format} />;
      })}
    </View>
  );
};

interface TitleProps {
  nDays: 1 | 3 | 5 | 6 | 7;
}

const Title: React.FC<TitleProps> = (props: TitleProps) => {
  return (
    <View style={styles.title}>
      <Text style={[styles.text, { fontSize: headerFontSize(props.nDays) }]}></Text>
    </View>
  );
};

interface WeekViewHeaderProps {
  nDays: 1 | 3 | 5 | 6 | 7;
  selectedDate: Date;
  dateFormat?: string;
  style?: object;
}

const WeekViewHeader: React.FC<WeekViewHeaderProps> = (_props: WeekViewHeaderProps) => {
  const props = { ..._props };
  if (!props.dateFormat) props.dateFormat = 'dddd';
  if (!props.style) props.style = {};

  const columns = getColumns(props.nDays, props.selectedDate);
  return (
    <View style={[styles.container, props.style]}>
      <Title nDays={props.nDays} />
      {columns && <Columns format={props.dateFormat} columns={columns} nDays={props.nDays} />}
    </View>
  );
};

export default WeekViewHeader;
