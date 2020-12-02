/* data type that represents a event */
export type RNTEvent = {
  id?: number;
  title: string;
  startTime: Date;
  endTime: Date;
  location: string;
  extraDescriptions?: string[];
  color?: string;
};

/* data type that represents style of event */
export type RNTEventStyle = {
  top: number;
  left: number;
  height: number;
  width: number;
};

/* data type that combines event and style */
export type RNTEventWithStyle = {
  event: RNTEvent;
  style: RNTEventStyle;
};
