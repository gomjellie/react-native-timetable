/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import TimeTableView, { filterEvents, genTimeBlock } from 'react-native-timetable';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.numOfDays = 5;
    this.selectedDate = genTimeBlock('mon');
  }

  onEventPress = (evt) => {
    Alert.alert("onEventPress", JSON.stringify(evt));
  };

  render() {
    const events = [
      {
        code: 1,
        title: "Math",
        id: "id must be unique",
        startDate: genTimeBlock("MON", 9),
        endDate: genTimeBlock("MON", 10, 50),
        location: "Classroom 403",
        professor: "Kim",
      },
      {
        code: 1,
        title: "Math",
        id: "id must be unique 2",
        startDate: genTimeBlock("WED", 9),
        endDate: genTimeBlock("WED", 10, 50),
        location: "Classroom 403",
        professor: "Kim",
      },
      {
        code: 2,
        title: "Physics",
        id: "id must be unique 3",
        startDate: genTimeBlock("MON", 11),
        endDate: genTimeBlock("MON", 11, 50),
        location: "Lab 404",
        professor: "Einstein",
      },
      {
        code: 2,
        title: "Physics",
        id: "id must be unique 4",
        startDate: genTimeBlock("WED", 11),
        endDate: genTimeBlock("WED", 11, 50),
        location: "Lab 404",
        professor: "Einstein",
      },
      {
        code: 3,
        title: "Lunch",
        id: "5",
        startDate: genTimeBlock("MON", 12),
        endDate: genTimeBlock("MON", 13),
        location: "Student Restaurant",
        professor: "",
      },
      {
        code: 3,
        title: "Lunch",
        id: "6",
        startDate: genTimeBlock("TUE", 12),
        endDate: genTimeBlock("TUE", 13),
        location: "Student Cafeteria",
        professor: "",
      },
      {
        code: 3,
        title: "Lunch",
        id: "7",
        startDate: genTimeBlock("WED", 12),
        endDate: genTimeBlock("WED", 13),
        location: "Student Cafeteria",
        professor: "",
      },
      {
        code: 3,
        title: "Lunch",
        id: "8",
        startDate: genTimeBlock("THU", 12),
        endDate: genTimeBlock("THU", 13),
        location: "Student Cafeteria",
        professor: "",
      },
      {
        code: 3,
        title: "Lunch",
        id: "9",
        startDate: genTimeBlock("FRI", 12),
        endDate: genTimeBlock("FRI", 13),
        location: "Student Restaurant",
        professor: "",
      },
      {
        code: 4,
        title: "Mandarin",
        id: "10",
        startDate: genTimeBlock("TUE", 9),
        endDate: genTimeBlock("TUE", 10, 50),
        location: "Language Center",
        professor: "Chen",
      },
      {
        code: 5,
        title: "Japanese",
        id: "11",
        startDate: genTimeBlock("FRI", 9),
        endDate: genTimeBlock("FRI", 10, 50),
        location: "Language Center",
        professor: "Nakamura",
      },
      {
        code: 6,
        title: "Club Activity",
        id: "12",
        startDate: genTimeBlock("THU", 9),
        endDate: genTimeBlock("THU", 10, 50),
        location: "Activity Center",
        professor: "",
      },
      {
        code: 6,
        title: "Club Activity",
        id: "12",
        startDate: genTimeBlock("FRI", 13, 30),
        endDate: genTimeBlock("FRI", 14, 50),
        location: "Activity Center",
        professor: "",
      },
      {
        code: 7,
        title: "Volunteer",
        id: "13",
        startDate: genTimeBlock("MON", 13, 30),
        endDate: genTimeBlock("MON", 14, 50),
        location: "Community Hospital",
        professor: "",
      },
      {
        code: 7,
        title: "Volunteer",
        id: "14",
        startDate: genTimeBlock("MON", 16),
        endDate: genTimeBlock("MON", 16, 50),
        location: "Community Hospital",
        professor: "",
      },
    ];
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <TimeTableView
            // scrollViewRef={this.scrollViewRef}
            events={[...filterEvents(events)]}
            startTime={9}
            selectedDate={this.selectedDate}
            numberOfDays={this.numOfDays}
            onEventPress={this.onEventPress}
            headerStyle={styles.headerStyle}
            formatDateHeader="dddd"
            locale="ko"
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#81E1B8'
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
});
