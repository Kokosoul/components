import React from "react";
import BootStrapTable from "react-bootstrap/Table";
import { cn } from "../utils";



/**
 * Responsive Table that switches to a list on mobile. It will only render the
 * <tbody> so you must handle everything else
 */
const Table = ({
  data = [],
  bp = "md",
  header: Thead,
  className,
  labelMap = {},
}) => {
  return (
    <div className={cn(className, "ggd-table")}>
      <BootStrapTable className={cn("table", "d-none", `d-${bp}-table`)}>
        <Thead />
        <tbody>
          {data.map((row) => {
            return (
              <tr key={"tr" + row.id}>
                {Object.values(row).map((val, x) => {
                  return <td key={`td-${row.id}${x}`}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </BootStrapTable>
      {data.map((row) => {
        return (
          <ul key={"ul" + row.id} className={`d-${bp}-none`}>
            {Object.keys(row).map((key, i) => {
              return (
                <li key={`li-${row.id}-${i}`}>
                  <b>{labelMap[key] || key}</b>: {row[key]}
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}

export default Table;
