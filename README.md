# react-native-timetable

timetable library for React Native

![demo-3](./.github/iOS_screen_shot.png)

##  HOW TO INSTALL

### Using npm

```sh
npm install react-native-timetable
```
### Using yarn

```sh
yarn add react-native-timetable
```

No need to link just install it.

## TimeTableView Props

 - [scrollViewRef](#scrollViewRef)
 - [events](#events)
 - [numberOfDays](#numberOfDays)
 - [pivotTime](#pivotTime)
 - [pivotDate](#pivotDate)
 - [onEventPress](#onEventPress)
 - [headerStyle](#headerStyle)
 - [locale](#locale)

### scrollViewRef

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

### events

Type: array of [event](#event)

#### event

Type: Object

 - title: String
 - startTime: Date (result of [genTimeBlock](#genTimeBlock))
 - endTime: Date (result of [genTimeBlock](#genTimeBlock))
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

### numberOfDays

Type: Number

it must be one of 3, 5, 6

### pivotTime

Type: Number(default: 8)

it tells what time to start timetable view

if it is 9, it means the view start with 9AM.

### pivotDate

Type: Date

I surely recommend to make date with [genTimeBlock](#genTimeBlock) function

e.g.)

```js
const pivotTime = genTimeBlock("MON");
```

### onEventPress

Type: Function

callBackFunction that triggered when event is pressed

It takes [event](#event) as parameter.

### headerStyle

Type: object

e.g.)

```
headerStyle: {
  backgroundColor: '#81E1B8'
}
```

### locale

Type: string

TODO: make this works better

## Helper Functions

 - [genTimeBlock](#genTimeBlock)
 - [addLocale](#addLocale)

### genTimeBlock

Type: Function

#### params

 - dayOfWeek (String, One of "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT")
 - hours (Number, default 0)
 - minutes (Number, default 0)

### addLocale

not yet
