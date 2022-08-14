import React, {useMemo} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import TimeTableView, {genTimeBlock} from 'react-native-timetable';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import FIXTURE_EVENTS from './__fixtures__/events.fixture';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const pivotDate = useMemo(() => genTimeBlock('MON'), []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <TimeTableView
          // scrollViewRef={this.scrollViewRef}
          events={FIXTURE_EVENTS}
          pivotTime={9}
          pivotEndTime={20}
          pivotDate={pivotDate}
          nDays={5}
          headerStyle={styles.headerStyle}
          formatDateHeader="dddd"
          locale="ko"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#81E1B8',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
