import moment from 'moment/min/moment-with-locales.js';

export const getFormattedDate = (date, format) => {
  return moment(date).format(format);
};

export const setLocale = (locale) => {
  moment.locale(locale);
};

export const getCurrentMonth = (date) => {
  return moment(date).format('MMMM Y');
};

const genDayOfWeek = (DayOfWeekString) => {
  /*
    DayOfWeekString : SUN, MON, TUE, WED, THU, FRI, SAT
      type : string
   */
  if (typeof DayOfWeekString !== 'string') {
    throw new Error(`genDayOfWeek got parameter type: ${typeof DayOfWeekString}, but string expected`);
  }
  const str2numberString = {
    'mon': '01',
    'tue': '02',
    'wed': '03',
    'thu': '04',
    'fri': '05',
    'sat': '06',
    'sun': '07',
    '월': '01',
    '화': '02',
    '수': '03',
    '목': '04',
    '금': '05',
    '토': '06',
  };

  return new Date(`2019-07-${str2numberString[DayOfWeekString.toLowerCase()]}T00:00:00`);
};

const genTimeBlock = (dayOfWeek, hours = 0, minutes = 0) => {
  const date = genDayOfWeek(dayOfWeek);
  date.setHours(hours);
  if (minutes != null) {
    date.setMinutes(minutes);
  }
  return date;
};

const addColor = (events) => {
  // add color to item
  return events.reduce((acc, item, idx) => {
    const sameOne = acc.find((elem) => {
      return elem.title === item.title;
    });
    const count = acc.reduce((acc, item) => {
      if (acc[acc.length - 1] !== item.title) {
        acc.push(item.title);
      }
      return acc;
    }, []).length;
    acc.push({
      ...item,
      color: sameOne === undefined ? colorGenerator(count) : sameOne.color,
      id: idx,
    });
    return acc;
  }, []);
};


const hashString = (s) => {
  /**
   * String -> Number
   */
  let h, i;
  for (i = 0, h = 0; i < s.length; i++) {
    // eslint-disable-next-line no-bitwise
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return Math.abs(h);
};

const colorGenerator = (num) => {
  const color_list = [
    // apple calendar color
    'rgba(246,206,218,1)',
    'rgba(250,227,209,1)',
    'rgba(248,238,207,1)',
    'rgba(224,245,214,1)',
    'rgba(215,235,252,1)',
    'rgba(235,217,244,1)',
    'rgba(228,223,217,1)',
    // prev
    'rgba(212,196,251,1)',
    'rgba(193,225,197,1)',
    'rgba(190,211,243,1)',
    '#81E1B8',
    'rgba(190,218,220,1)',
    'rgba(254,243,189,1)',
    'rgba(247,141,167,1)',
    'rgba(196,222,246,1)',
    'rgba(250,208,195,1)',
    '#cc9af4',
    '#f8b3eb',
    '#ff8080',
    '#9af49f',
    '#9aeff4',
    '#a8e6cf',
    '#fdffab',
    'rgba(0,208,132,0.9)',
    'rgba(217,227,240,0.9)',
    'rgba(105,108,137,0.8)',
    'rgba(142,209,252,0.9)',
    'rgba(6,147,227,0.8)',
    'rgba(153,0,239,0.9)',
    'rgba(235,20,76,0.9)',
    'rgba(83,0,235,1)', //
    'rgba(18,115,222,1)',
    'rgba(0,107,118,1)',
    'rgba(129,199,132,1)',
    'rgba(184,0,0,1)',
  ];
  return color_list[num % color_list.length];
};

export {genDayOfWeek, genTimeBlock, colorGenerator, addColor};

