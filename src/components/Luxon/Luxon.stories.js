import React from "react";
import Luxon from "./index";
import { DateTime, Interval } from "luxon";

export default {
  component: Luxon,
  title: "Luxon",
};

const LuxonView = (args) => {
  const inter = new Interval({
    start: DateTime.fromISO("202001"),
    end: DateTime.fromISO("202101"),
  });

  const months = inter.splitBy({ months: 1 });

  return (
    <div>
      Format: {args.format}
      <ul>
        {months.map((month, i) => (
          <li key={i}>
            <Luxon {...args}>{month.start.toISODate()}</Luxon>
          </li>
        ))}
      </ul>
    </div>
  );
};

LuxonView.args = {
  format: "MMM-dd",
};

export { LuxonView };
