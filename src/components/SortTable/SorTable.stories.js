import React from "react";
import SorTable from "./index";
import { v4 as uuidv4 } from 'uuid';
import { ranB, arrRandomItem } from '../utils';

const firstNames = [
  'John', 'Jackie', 'Scott', 'Eduardo', 'Liza', 'Susan', 'Valentina', 'Gloria', 'Bob' 
]
const lastNames = [
  'Smith', 'Xu', 'Rodriguez', 'Gutierrez', 'Bennett', 'Sonntag', 'Fiorelli', 'B', 'Odenkirk'
]

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function fakeUserTableData() {
  return Array(30)
    .fill(0)
    .map((_, i) => {
      const fn = arrRandomItem(firstNames);
      const ln = arrRandomItem(lastNames);
      const email = `${fn}.${ln}@gmail.com`;
      const date = new Date();
      return {
        user_id: uuidv4(),
        date: addDays(date, i),
        firstName: fn,
        lastName: ln,
        email,
        phone: `${ranB(100, 999)}-${ranB(100, 999)}-${ranB(1000, 9999)}`,
        amount: ranB(10, 500),
      };
    });
}

export default {
  component: SorTable,
  title: "Tables/SorTable",
};

export const Example = (args) => {
  return <SorTable {...args} />;
};

Example.args = {
  data: fakeUserTableData(),
  ignore: ["user_id"],
  columnTypes: { amount: "currency", date: "date" },
  headers: {
    date: "Date",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    amount: "Amount",
  },
  rowKey: "user_id",
};
