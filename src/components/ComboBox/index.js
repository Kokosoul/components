import React, {  useState, useEffect, useRef } from "react";
import _omit from "lodash-es/omit";
import { useUniqueId } from "../utils/hooks";
import { cn, KEYCODES } from "../utils";
import styles from "./Combobox.module.scss";


/**
 * Component for a single list item representing options to select for the input
 */
function Option({ id, value, selected = false }) {
  return (
    <li
      className={cn(styles.result, selected && styles.focused)}
      role="option"
      id={id}
      aria-selected={selected}
    >
      {value}
    </li>
  );
}

/**
 * filter out list of input attributes already handled so they are not accidentally
 * overidden since all remaining props are passed down to the input
 */
const handledInputAttributes = [
  "onKeyUp",
  "onKeyDown",
  "onFocus",
  "onBlur",
  "type",
  "id",
  "ref",
  "autoComplete",
  "aria-autocomplete",
  "aria-controls",
  "aria-labelledby",
  "aria-activedescendant",
  "onChange",
];

/**
 * Combobox
 * a typeahead autocompleting search with list dropdown
 *
 * Based on the examples from this link which strictly follows WAI-ARIA 1.1 accessibility guidelines
 * https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
 */
const Combobox = ({
  autoSelect,
  clearOnBlur,
  onSearch,
  label,
  hideLabel,
  className,
  value,
  ...inputProps
}) => {
  const [options, setOptions] = useState(Array(0));
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [activeIndex, setActiveIndex] = useState(-1);
  const comboId = useUniqueId("combo");
  const inputId = useUniqueId("comboInput");
  const listboxId = useUniqueId("comboListBox");
  const listLabel = useUniqueId("comboListLabel");
  const inputRef = useRef(null);
  const formGroupRef = useRef(null);
  const filteredProps = _omit(inputProps, handledInputAttributes);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function hideListbox() {
    setExpanded(false);
    setActiveIndex(-1);
    setOptions([]);
  }

  function selectItem(item) {
    setInputValue(item);
    hideListbox();
  }

  function handleBlur() {
    if (clearOnBlur && !autoSelect) {
      setInputValue("");
      return;
    }

    if (activeIndex < 0) {
      return;
    }

    if (autoSelect) {
      selectItem(options[activeIndex]);
    }
  }

  function clickItem(evt) {
    if (evt.currentTarget && evt.currentTarget.nodeName === "LI" && evt.currentTarget.textContent) {
      selectItem(evt.currentTarget.textContent.trim());
    }
  }

  useEffect(() => {
    function checkHide(e) {
      if (
        e.target === inputRef.current ||
        formGroupRef.current?.contains(e.currentTarget)
      ) {
        return;
      }
      hideListbox();
    }

    document.body.addEventListener("click",  checkHide);

    return function cleanup() {
      document.body.removeEventListener("click", checkHide);
    };
  }, []);

  async function getResults() {
    const searchString = inputValue?.toLowerCase().trim();

    if (!searchString) {
      hideListbox();
      return;
    }

    // we use the provided external function to handle filtering results
    const results = await onSearch(searchString);

    if (results.length) {
      if (results.length === 1) {
        setActiveIndex(0);
      }
      setOptions(results);
      setExpanded(true);
    }
  }

  /**
   * this kicks off the searching during typing
   */
  function onKeyUp(evt) {
    const key = evt.which || evt.keyCode;

    switch (key) {
      case KEYCODES.UP:
      case KEYCODES.DOWN:
      case KEYCODES.ESC:
      case KEYCODES.RETURN:
        evt.preventDefault();
        return;
      default:
        getResults();
    }
  }

  /**
   * This handles traversing the open results and selecting an item
   */
  function setActiveItem(evt) {
    const key = evt.which || evt.keyCode;

    if (key === KEYCODES.ESC) {
      // ESC should always reset and clear the input
      hideListbox();
      setInputValue("");
      return;
    }

    const resultsCount = options.length;

    if (resultsCount < 1) {
      return;
    }

    switch (key) {
      case KEYCODES.UP:
        if (activeIndex <= 0) {
          setActiveIndex(resultsCount - 1);
        } else {
          setActiveIndex(activeIndex - 1);
        }
        break;
      case KEYCODES.DOWN:
        if (activeIndex === -1 || activeIndex >= resultsCount - 1) {
          setActiveIndex(0);
        } else {
          setActiveIndex(activeIndex + 1);
        }
        break;
      case KEYCODES.RETURN:
        selectItem(options[activeIndex]);
        return;
      case KEYCODES.TAB:
        handleBlur();
        hideListbox();
        return;
      default:
        return;
    }

    evt.preventDefault();
  }

  return (
    <div ref={formGroupRef} className={cn("form-group", className)}>
      <label
        className={cn("form-label", hideLabel ? "sr-only" : undefined)}
        id={listLabel}
      >
        {label}
      </label>
      <div className={styles.wrapper}>
        <div
          // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
          role="combobox"
          aria-expanded={!!expanded.toString()}
          aria-owns={listboxId}
          aria-haspopup="listbox"
          id={comboId}
        >
          <input
            {...filteredProps}
            onKeyUp={onKeyUp}
            onKeyDown={setActiveItem}
            onFocus={getResults}
            onBlur={handleBlur}
            type="search"
            id={inputId}
            ref={inputRef}
            autoComplete="off"
            className={cn("form-control", styles.input)}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-labelledby={listLabel}
            aria-activedescendant={
              activeIndex < 0 ? undefined : `result-item-${activeIndex}`
            }
            value={inputValue}
            onChange={handleChange}
          />
        </div>
        <ul
          hidden={!expanded}
          aria-labelledby={listLabel}
          role="listbox"
          id={listboxId}
          className={styles.listbox}
          onClick={clickItem}
        >
          {options.map((o, i) => {
            const optId = `result-item-${i}`;
            return (
              <Option
                key={o}
                value={o}
                id={optId}
                selected={activeIndex === i}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

Combobox.defaultProps = {
  hideLabel: false,
  className: "",
  autoSelect: false,
  clearOnBlur: false,
  value: "",
};

export default Combobox;
