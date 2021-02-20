import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Luxon from "../Luxon";
import sortBy from "lodash-es/sortBy";
import styles from "./SorTable.module.scss";
import { mapToPrettyHeader } from "../utils/tables";
import { useUniqueId } from "../utils/hooks";
import { cn, KEYCODES } from "../utils";


const Arrow = ({
  dir = "asc",
  className,
}) => {
  return (
    <svg
      className={className}
      width="12"
      height="6"
      viewBox="0 0 12 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        transform={dir === "desc" ? "scale(1, -1) translate(0, -6)" : ""}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 -5.24537e-07L6 6L-2.62268e-07 0"
        fill="#536567"
      />
    </svg>
  );
};


/**
 * Table Header <th> component which also handles triggering sort for its column
 */
const TableHeader = ({
  children,
  sortFunc,
  sortKey,
  sortingBy,
  dataType,
}) => {
  const [dir, setdir] = useState(null);

  function handleSort() {
    setdir(dir === "desc" ? "asc" : "desc");
    sortFunc(sortKey, dir);
  }

  function onKeyUp(e) {
    if (e.keyCode === KEYCODES.RETURN) {
      e.preventDefault();
      handleSort();
    }
  }
  function onKeyDown(e) {
    if (e.keyCode === KEYCODES.SPACE) {
      e.preventDefault();
      handleSort();
    }
  }

  const thClassName = ["text-left"];
  if (dataType === "currency") {
    thClassName.push("text-right");
  }

  if (dir && sortingBy && sortingBy === sortKey) {
    return (
      <th
        scope="col"
        tabIndex={0}
        className={cn(thClassName)}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onClick={handleSort}
      >
        {children}
        <Arrow dir={dir} className={styles.sort} />
        <span className="sr-only">
          sorted in {dir !== "asc" ? "ascending" : "descending"} order
        </span>
      </th>
    );
  }

  return (
    <th
      scope="col"
      tabIndex={0}
      className={cn(thClassName)}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onClick={handleSort}
    >
      {children}
      <span className="sr-only">
        click to sort {dir !== "asc" ? "ascending" : "descending"}
      </span>
    </th>
  );
};



/**
 * Sortable Table component
 */
function SortableTable({
  id,
  data,
  ignore,
  columnTypes = {},
  rowKey,
  headers,
}){
  const [sortingBy, setSortingBy] = useState('');
  const [rowData, setRowData] = useState(data);
  const backupId = useUniqueId("sorTable");

  const _id = id || backupId;

  // create an array of keys with the "ignored" items removed
  const tableKeys = Object.keys(data[0]).filter(
    (key) => !ignore?.includes(key)
  );
  const prettyHeaders = mapToPrettyHeader(tableKeys, headers);

  function doSort(property, dir) {
    let sorted = sortBy(data, property);
    if (dir === "desc") {
      sorted = sorted.reverse();
    }
    setSortingBy(property);
    setRowData(sorted);
  }

  return (
    <Table id={_id} borderless striped responsive className={styles.table}>
      <thead>
        <tr>
          {prettyHeaders.map((header, i) => {
            return (
              <TableHeader
                sortingBy={sortingBy}
                key={`${_id}-th-${i}`}
                sortFunc={doSort}
                sortKey={tableKeys[i]}
                dataType={columnTypes[tableKeys[i]]}
              >
                {header}
              </TableHeader>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rowData.map((row, i) => {
          const _key = String(row[rowKey]);
          return (
            <tr key={_key}>
              {Object.keys(row)
                .filter((key) => !ignore?.includes(key))
                .map((key) => {
                  const val = row[key];
                  const reactKey = `${_key}-${key}`;
                  const dataType = columnTypes[key] || "string";
                  if (dataType === "date" && (typeof val === 'string' || val instanceof Date)) {
                    return (
                      <td key={reactKey}>
                        <Luxon format="MMM dd, yyyy" date={val} />
                      </td>
                    );
                  }
                  if (dataType === "currency") {
                    return (
                      <td key={reactKey} className="text-right">
                        ${val.toLocaleString()}
                      </td>
                    );
                  }
                  return <td key={reactKey}>{val}</td>;
                })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

SortableTable.defaultProps = {
  ignore: [],
  columnTypes: {},
  headers: {},
};

export default SortableTable;
