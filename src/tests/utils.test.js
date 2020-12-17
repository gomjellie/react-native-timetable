import {
  addColor,
  colorGenerator,
  genDayOfWeek,
  genTimeBlock,
  getCurrentMonth,
  getFormattedDate,
  setLocale,
} from '../components/utils';
import data from './sampleData';

describe('test util functions', () => {
  it('moment wrappers', () => {
    const today = new Date();
    const locale = 'ko';

    expect(() => {
      getFormattedDate(today);
      setLocale(locale);
      getCurrentMonth(today);
    }).not.toThrowError();

    const month = getCurrentMonth(today);
    expect(month).toMatch((today.getMonth() + 1).toString());
  });

  it('genDayOfWeek', () => {
    const dOWS1 = 'mon';
    const dOWS2 = '월';

    expect(() => genDayOfWeek(null)).toThrowError();
    expect(() => genDayOfWeek(0)).toThrowError();

    expect(() => genDayOfWeek(dOWS1).getDate()).not.toThrowError();
    expect(() => genDayOfWeek(dOWS2).getDate()).not.toThrowError();
  });

  it('genTimeBlock', () => {
    const dOWS = 'mon';
    const hours = 13;
    const minutes = 30;

    const timeBlock = genTimeBlock(dOWS, hours, minutes);
    expect(timeBlock.getHours()).toBe(hours);
    expect(timeBlock.getMinutes()).toBe(minutes);
  });

  it('colorGenerator', () => {
    for (let i = 0; i < 200; i += 1) {
      const color = colorGenerator(i);
      expect(typeof color).toBe('string');
      expect(color).toMatch('rgba');
    }
  });

  it('addColor', () => {
    const event1 = 'Math';
    const event2 = 'Lunch';

    const eventsWithColor = addColor(data);
    expect(Array.isArray(eventsWithColor)).toBe(true);

    const mathEvents = eventsWithColor.filter((item) => item.title === event1);
    const lunchEvents = eventsWithColor.filter((item) => item.title === event2);

    expect(mathEvents.length > 0).toBe(true);
    expect(lunchEvents.length > 0).toBe(true);

    expect(Object.prototype.hasOwnProperty.call(mathEvents[0], 'color')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(lunchEvents[0], 'color')).toBe(true);

    const mathEventColor = mathEvents[0].color;
    const lunchEventColor = lunchEvents[0].color;

    mathEvents.forEach((event) => expect(event.color === mathEventColor).toBe(true));
    lunchEvents.forEach((event) => expect(event.color === lunchEventColor).toBe(true));

    /* cause # of events is small, the color will be different */
    expect(mathEventColor !== lunchEventColor).toBe(true);
  });
});
