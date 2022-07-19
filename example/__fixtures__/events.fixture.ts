import {genTimeBlock} from 'react-native-timetable';

const FIXTURE_EVENTS = [
  {
    title: 'Math',
    startTime: genTimeBlock('MON', 9),
    endTime: genTimeBlock('MON', 10, 50),
    location: 'Classroom 403',
    extra_descriptions: ['Kim', 'Lee'],
  },
  {
    title: 'Math',
    startTime: genTimeBlock('WED', 9),
    endTime: genTimeBlock('WED', 10, 50),
    location: 'Classroom 403',
    extra_descriptions: ['Kim', 'Lee'],
  },
  {
    title: 'Physics',
    startTime: genTimeBlock('MON', 11),
    endTime: genTimeBlock('MON', 11, 50),
    location: 'Lab 404',
    extra_descriptions: ['Einstein'],
  },
  {
    title: 'Physics',
    startTime: genTimeBlock('WED', 11),
    endTime: genTimeBlock('WED', 11, 50),
    location: 'Lab 404',
    extra_descriptions: ['Einstein'],
  },
  {
    title: 'Lunch',
    startTime: genTimeBlock('MON', 12),
    endTime: genTimeBlock('MON', 13),
    location: 'Student Restaurant',
  },
  {
    title: 'Lunch',
    startTime: genTimeBlock('TUE', 12),
    endTime: genTimeBlock('TUE', 13),
    location: 'Student Cafeteria',
  },
  {
    title: 'Lunch',
    startTime: genTimeBlock('WED', 12),
    endTime: genTimeBlock('WED', 13),
    location: 'Student Cafeteria',
  },
  {
    title: 'Lunch',
    startTime: genTimeBlock('THU', 12),
    endTime: genTimeBlock('THU', 13),
    location: 'Student Cafeteria',
  },
  {
    title: 'Lunch',
    startTime: genTimeBlock('FRI', 12),
    endTime: genTimeBlock('FRI', 13),
    location: 'Student Restaurant',
  },
  {
    title: 'Mandarin',
    startTime: genTimeBlock('TUE', 9),
    endTime: genTimeBlock('TUE', 10, 50),
    location: 'Language Center',
    extra_descriptions: ['Chen'],
  },
  {
    title: 'Japanese',
    startTime: genTimeBlock('FRI', 9),
    endTime: genTimeBlock('FRI', 10, 50),
    location: 'Language Center',
    extra_descriptions: ['Nakamura'],
  },
  {
    title: 'Club Activity',
    startTime: genTimeBlock('THU', 9),
    endTime: genTimeBlock('THU', 10, 50),
    location: 'Activity Center',
  },
  {
    title: 'Club Activity',
    startTime: genTimeBlock('FRI', 13, 30),
    endTime: genTimeBlock('FRI', 14, 50),
    location: 'Activity Center',
  },
  {
    title: 'Volunteer',
    startTime: genTimeBlock('MON', 13, 30),
    endTime: genTimeBlock('MON', 14, 50),
    location: 'Community Hospital',
  },
  {
    title: 'Volunteer',
    startTime: genTimeBlock('MON', 16),
    endTime: genTimeBlock('MON', 16, 50),
    location: 'Community Hospital',
  },
];

export default FIXTURE_EVENTS;
