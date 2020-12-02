import moment, * as _moment from 'moment';

import { RNTEvent } from './data';

/* wraps moment.format() */
export const formatDate = (date: any, format: any) => moment(date).format(format);
/* wraps moment.locale() */
export const setLocale = (locale: any) => moment.locale(locale);

/* force dayOW as lowercase */
type dayOWType = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
/* convert day of the week to date. */
export const dayOW2date = (dayOW: dayOWType) => {
  const dayOW2day = {
    mon: '01',
    tue: '02',
    wed: '03',
    thu: '04',
    fri: '05',
    sat: '06',
    sun: '07',
  };
  const day = dayOW2day[dayOW];

  return new Date(`2019-07-${day}T00:00:00`);
};

/* create date with time. */
export const createDate = (dayOW: dayOWType, hours = 0, minutes = 0) => {
  const date = dayOW2date(dayOW);
  date.setHours(hours);
  date.setMinutes(minutes);

  return date;
};
/*
 * @deprecated getTimeBlock() is changed to {@link createDate}().
 */
export const genTimeBlock = createDate;

/*
 * assign colors to provided events.
 */
export const assignColorToEvents = (events: RNTEvent[]) => {
  const eventCache: { [key: string]: string } = Object();

  return events.reduce((acc: RNTEvent[], event, idx) => {
    if (!eventCache.hasOwnProperty(event.title)) eventCache[event.title] = pickColor(Object.keys(eventCache).length);
    acc.push({ ...event, color: eventCache[event.title], id: idx });
    return acc;
  }, []);
};
/*
 * @deprecated addColor() is changed to {@link assignColorToEvents}().
 */
export const addColor = assignColorToEvents;

export const colors = [
  /* start of apple calendar colors */
  'rgba(246,206,218,1)',
  'rgba(250,227,209,1)',
  'rgba(248,238,207,1)',
  'rgba(224,245,214,1)',
  'rgba(215,235,252,1)',
  'rgba(235,217,244,1)',
  'rgba(228,223,217,1)',
  /* end of apple calendar colors */
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

/*
 * pick color from colors by index.
 */
export const pickColor = (idx: number) => {
  return colors[idx % colors.length];
};
