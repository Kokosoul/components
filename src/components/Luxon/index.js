import React from "react";
import { DateTime, Settings } from "luxon";

Settings.defaultLocale = "en";


const LuxonView = ({ children, date, format }) => {
  let finalDate;
  if (date ) {
    finalDate = DateTime.fromJSDate(date || children);
  } else if (typeof date === "string") {
    finalDate = DateTime.fromISO(date);
  } else if  (typeof children === "string") {
    finalDate = DateTime.fromISO(children);
  } else {
    return <span>Invalid Date</span>;
  }

  return <time dateTime={String(finalDate.toMillis())}>{finalDate.toFormat(format)}</time>;
}

export default LuxonView;
