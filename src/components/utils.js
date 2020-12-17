import moment from 'moment/min/moment-with-locales';

export const getFormattedDate = (date, format) => moment(date).format(format);
export const setLocale = (locale) => moment.locale(locale);
export const getCurrentMonth = (date) => moment(date).format('MMMM Y');

const genDayOfWeek = (DayOfWeekString) => {
  /*
    DayOfWeekString : SUN, MON, TUE, WED, THU, FRI, SAT
      type : string
   */
  if (typeof DayOfWeekString !== 'string') {
    throw new Error(`genDayOfWeek got parameter type: ${typeof DayOfWeekString}, but string expected`);
  }
  const str2numberString = {
    mon: '01',
    tue: '02',
    wed: '03',
    thu: '04',
    fri: '05',
    sat: '06',
    sun: '07',
    /* TODO: remove non-ASCII */
    월: '01',
    화: '02',
    수: '03',
    목: '04',
    금: '05',
    토: '06',
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

const colorGenerator = (num) => {
  const colorList = [
    /* apple theme start */
    'rgba(246,206,218,1)',
    'rgba(250,227,209,1)',
    'rgba(248,238,207,1)',
    'rgba(224,245,214,1)',
    'rgba(215,235,252,1)',
    'rgba(235,217,244,1)',
    'rgba(228,223,217,1)',
    /* apple theme end */
    'rgba(212,196,251,1)',
    'rgba(193,225,197,1)',
    'rgba(190,211,243,1)',
    'rgba(129,225,184,1)',
    'rgba(190,218,220,1)',
    'rgba(254,243,189,1)',
    'rgba(247,141,167,1)',
    'rgba(196,222,246,1)',
    'rgba(250,208,195,1)',
    'rgba(204,154,244,1)',
    'rgba(248,179,235,1)',
    'rgba(255,128,128,1)',
    'rgba(154,244,159,1)',
    'rgba(154,239,244,1)',
    'rgba(168,230,207,1)',
    'rgba(253,255,171,1)',
    'rgba(000,208,132,0.9)',
    'rgba(217,227,240,0.9)',
    'rgba(105,108,137,0.8)',
    'rgba(142,209,252,0.9)',
    'rgba(006,147,227,0.8)',
    'rgba(153,000,239,0.9)',
    'rgba(235,020,076,0.9)',
    'rgba(083,000,235,1)',
    'rgba(018,115,222,1)',
    'rgba(000,107,118,1)',
    'rgba(129,199,132,1)',
    'rgba(184,000,000,1)',
  ];
  return colorList[num % colorList.length];
};

const addColor = (events) => events.reduce((acc, item, idx) => {
  const sameOne = acc.find((elem) => elem.title === item.title);
  const count = acc.reduce((_acc, _item) => {
    if (_acc[_acc.length - 1] !== _item.title) {
      _acc.push(_item.title);
    }
    return _acc;
  }, []).length;
  acc.push({
    ...item,
    color: sameOne === undefined ? colorGenerator(count) : sameOne.color,
    id: idx,
  });
  return acc;
}, []);

// const hashString = (s) => {
//   /**
//    * String -> Number
//    */
//   let h; let i;
//   for (i = 0, h = 0; i < s.length; i++) {
//     // eslint-disable-next-line no-bitwise
//     h = Math.imul(31, h) + s.charCodeAt(i) | 0;
//   }
//   return Math.abs(h);
// };

export {
  genDayOfWeek, genTimeBlock, colorGenerator, addColor,
};
