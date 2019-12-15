import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    // alignItems: 'center',
    position: 'absolute',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 7,
    flex: 1,
  },
  title: {
    color: '#322425',
    textAlign: 'left',
    fontSize: 13,
  },
  professor: {
    color: '#777',
    textAlign: 'left',
    paddingTop: 4.5,
    fontSize: 10,
  },
  location: {
    color: '#777',
    textAlign: 'left',
    fontSize: 10,
  },
});

export default styles;
