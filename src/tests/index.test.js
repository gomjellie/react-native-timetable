/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render } from '@testing-library/react-native';

import TimeTableView, { genTimeBlock } from '../index';

describe('<TimeTableView>', () => {
  it('renders without error', () => {
    render(
      <TimeTableView
        numberOfDays={3}
        pivotDate={genTimeBlock('mon')}
      />,
    );
  });
});
