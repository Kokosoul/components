import React from "react";
import Select, { components } from "react-select";



const MultiValueRemove = (props) => {
  return (
    <components.MultiValueRemove {...props}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.18 9.98C11.23 10.03 11.25 10.09 11.25 10.17C11.25 10.25 11.23 10.32 11.18 10.36L10.37 11.17C10.32 11.22 10.26 11.24 10.18 11.24C10.1 11.24 10.03 11.22 9.99 11.17L5.62 6.82L1.26 11.18C1.21 11.23 1.15 11.25 1.07 11.25C0.99 11.25 0.92 11.23 0.88 11.18L0.07 10.37C0.02 10.32 0 10.26 0 10.18C0 10.1 0.02 10.03 0.07 9.99L4.43 5.63L0.07 1.27C0.02 1.22 0 1.15 0 1.07C0 0.99 0.02 0.92 0.07 0.88L0.88 0.07C0.93 0.02 0.99 0 1.07 0C1.15 0 1.22 0.02 1.26 0.07L5.62 4.43L9.98 0.07C10.03 0.02 10.1 0 10.18 0C10.26 0 10.33 0.02 10.37 0.07L11.18 0.88C11.23 0.93 11.25 0.99 11.25 1.07C11.25 1.15 11.23 1.22 11.18 1.26L10.44 2L6.82 5.62L11.18 9.98Z"
          fill="white"
        />
      </svg>
    </components.MultiValueRemove>
  );
};

const customStyles= {
  multiValueRemove: (base) => ({
    ...base,
    backgroundColor: "#EB5757",
    color: "white",
    paddingLeft: "6px",
    paddingRight: "6px",
    paddingTop: "5px",
    paddingBottom: "5px",
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
  }),
  multiValue: (base) => ({
    ...base,
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    backgroundColor: "white",
    fontFamily: '"Circular Std", sans-serif',
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "1",
    color: "#212B36",
    opacity: "0.8",
    paddingLeft: "9px",
    paddingRight: "7px",
    borderLeft: "1px solid #E0E0E0",
    borderTop: "1px solid #E0E0E0",
    borderBottom: "1px solid #E0E0E0",
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
  }),
};

function MultiSelect(props){
  return (
    <Select
      isMulti
      {...props}
      styles={customStyles}
      components={{ MultiValueRemove }}
    />
  );
}

export default MultiSelect;
