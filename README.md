# react-native-timetable

timetable library for React Native

![demo-3](./.github/iOS_screen_shot.png)

# Real world example

![real-world-example](./.github/timetabler.gif)

Download at [App Store](https://apps.apple.com/kr/app/%EC%9C%A0%EC%83%81%EB%AC%B4/id1476194177),    Get it On [Play Store](https://play.google.com/store/apps/details?id=com.usaintmu)

#  INSTALLATION

```sh
npm install react-native-timetable
```

No need to link just install it.

# Example

```jsx
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';
const events_data = [
  {
    title: "Math",
    startTime: genTimeBlock("MON", 9),
    endTime: genTimeBlock("MON", 10, 50),
    location: "Classroom 403",
    extra_descriptions: ["Kim", "Lee"],
  },
  {
    title: "Math",
    startTime: genTimeBlock("WED", 9),
    endTime: genTimeBlock("WED", 10, 50),
    location: "Classroom 403",
    extra_descriptions: ["Kim", "Lee"],
  },
  {
    title: "Physics",
    startTime: genTimeBlock("MON", 11),
    endTime: genTimeBlock("MON", 11, 50),
    location: "Lab 404",
    extra_descriptions: ["Einstein"],
  },
  {
    title: "Physics",
    startTime: genTimeBlock("WED", 11),
    endTime: genTimeBlock("WED", 11, 50),
    location: "Lab 404",
    extra_descriptions: ["Einstein"],
  },
  {
    title: "Mandarin",
    startTime: genTimeBlock("TUE", 9),
    endTime: genTimeBlock("TUE", 10, 50),
    location: "Language Center",
    extra_descriptions: ["Chen"],
  },
  {
    title: "Japanese",
    startTime: genTimeBlock("FRI", 9),
    endTime: genTimeBlock("FRI", 10, 50),
    location: "Language Center",
    extra_descriptions: ["Nakamura"],
  },
  {
    title: "Club Activity",
    startTime: genTimeBlock("THU", 9),
    endTime: genTimeBlock("THU", 10, 50),
    location: "Activity Center",
  },
  {
    title: "Club Activity",
    startTime: genTimeBlock("FRI", 13, 30),
    endTime: genTimeBlock("FRI", 14, 50),
    location: "Activity Center",
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.numOfDays = 5;
    this.pivotDate = genTimeBlock('mon');
  }

  scrollViewRef = (ref) => {
    this.timetableRef = ref;
  };

  onEventPress = (evt) => {
    Alert.alert("onEventPress", JSON.stringify(evt));
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <TimeTableView
            scrollViewRef={this.scrollViewRef}
            events={events_data}
            pivotTime={9}
            pivotEndTime={20}
            pivotDate={this.pivotDate}
            nDays={this.numOfDays}
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
```

# TimeTableView Props

 - [`scrollViewRef`](#scrollViewRef) (Function(`ref`)) function that takes timetableView's ref as parameter
 - [`events`](#events) (array of [`event`](#event))
 - `nDays` (Number) it must be one of `3`, `5`, `6`, `7`
 - `pivotTime` (Number `default: 8`) it tells what time to start timetable view
 - `pivotEndTime` (Number `default: 22`) it tells what time to end timetable view
 - `pivotDate` (Date, `default monday`, return value of [`genTimeBlock`](#genTimeBlock))
 - `onEventPress` (function([`event`](#event)) callBackFunction that triggered when event is pressed
 - [`headerStyle`](#headerStyle) (object) style for header
 - `formatDateHeader` (string default `"dddd"`) dddd -> Monday, ddd -> Mon [checkout more details](https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/)
 - [`locale`](#locale) (string) country code

## scrollViewRef

Type: Function

function that takes timetableView's ref as parameter

Usage:

```jsx
<TimeTableView 
  scrollViewRef={(ref) => {
    this.timetableRef = ref;
  }}
/>
```

## events

Type: array of [event](#event)

### event

Type: Object

 - title: String
 - startTime: Date (result of [`genTimeBlock`](#genTimeBlock))
 - endTime: Date (result of [`genTimeBlock`](#genTimeBlock))
 - location: String
 - extra_descriptions: Array Of String

e.g.)

```
{
    title: String,
    startTime: Date, // I surely recommend to make Date using genTimeBlock function
    endTime: Date,
    location: String,
    extra_descriptions: Array Of String,
}
```

## headerStyle

Type: object

e.g.)

```
headerStyle: {
  backgroundColor: '#81E1B8'
}
```

## locale

Type: string (e.g. `en-US`)

Check the [locale options](https://github.com/moment/moment/tree/develop/locale) from momentjs.

# Helper Functions

 - [`genTimeBlock`](#genTimeBlock) (function(`String`, `Number`, `Number`)) returns Date

## genTimeBlock

Type: Function

### params

 - dayOfWeek (String, One of `"SUN"`, `"MON"`, `"TUE"`, `"WED"`, `"THU"`, `"FRI"`, `"SAT"`)
 - hours (Number, default `0`)
 - minutes (Number, default `0`)

# Inspirations

https://github.com/hoangnm/react-native-week-view

