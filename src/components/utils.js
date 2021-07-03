import moment from 'moment/min/moment-with-locales.js';

export const formatDate = (date, format) => {
  return moment(date).format(format);
};

export const setLocale = (locale) => {
  moment.locale(locale);
};

/**
 * @param {String} dayOW
 * @example genDateBlock("mon")
 * @returns {Date}
 */
const genDateBlock = (dayOW) => {
  if (typeof dayOW !== 'string') {
    throw new Error(`genDateBlock got parameter type: ${typeof dayOW}, but string expected`);
  }

  const dayOWMap = {
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

  return new Date(`2019-07-${dayOWMap[dayOW.toLowerCase()]}T00:00:00`);
};

const genTimeBlock = (dayOW, hours = 0, minutes = 0) => {
  const date = genDateBlock(dayOW);
  date.setHours(hours);
  if (minutes != null) {
    date.setMinutes(minutes);
  }
  return date;
};

const assignColor = (events) => {
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
      color: sameOne === undefined ? pickColor(count) : sameOne.color,
      id: idx,
    });
    return acc;
  }, []);
};

const pickColor = (num) => {
  const colorList = [
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
  return colorList[num % colorList.length];
};

export { genDateBlock, genTimeBlock, pickColor, assignColor };

