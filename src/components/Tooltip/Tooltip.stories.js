import React from "react";
import Tooltip from "./index";

export default {
  title: "Tooltip",
  component: Tooltip,
};

const placements = [
  "auto-start",
  "auto",
  "auto-end",
  "top-start",
  "top",
  "top-end",
  "right-start",
  "right",
  "right-end",
  "bottom-end",
  "bottom",
  "bottom-start",
  "left-end",
  "left",
  "left-start",
];

export const DefaultTrigger = (args) => {
  return (
    <div className="pt-5">
      <p> Default trigger is this help icon</p>
      <h1>
        Headline{" "}
        <Tooltip {...args}>
          <Tooltip.Content>
            <p>
              <b>How can I update my organization's profile information?</b>
            </p>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout
            </p>
            <p>
              <b>How can I update my organization's profile information?</b>
            </p>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout
            </p>
            <p>
              <b>How can I update my organization's profile information?</b>
            </p>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout
            </p>
          </Tooltip.Content>
        </Tooltip>
      </h1>
    </div>
  );
};

DefaultTrigger.args = {
  id: "tooltip-1",
  icon: "question",
  className: "sample-class",
};

export const Options = (args) => {
  return (
    <div className="pt-5 d-flex justify-content-center align-items-center flex-column h-100">
      <Tooltip {...args}>
        <Tooltip.Content>
          <p>
            <b>How can I update my organization's profile information?</b>
          </p>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout
          </p>
          <p>
            <b>How can I update my organization's profile information?</b>
          </p>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout
          </p>
          <p>
            <b>How can I update my organization's profile information?</b>
          </p>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout
          </p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
};

Options.args = {
  id: "tooltip-2",
  className: "sample-class",
  trigger: "click",
  defaultShow: true,
  placement: "bottom",
  style: { width: "50px" },
};

Options.argTypes = {
  placement: { control: { type: "select", options: placements } },
  trigger: {
    control: { type: "select", options: ["hover", "click", "focus"] },
  },
};

Options.parameters = {
  controls: { expanded: false },
};

export const customTrigger = () => {
  return (
    <>
      <div className="pt-5">
        <Tooltip id="customTrigger">
          <Tooltip.Trigger>
            <span role="button">hover over me</span>
          </Tooltip.Trigger>

          <Tooltip.Content>
            <p>
              <b>How can I update my organization's profile information?</b>
            </p>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout
            </p>
            <p>
              <b>How can I update my organization's profile information?</b>
            </p>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout
            </p>
            <p>
              <b>How can I update my organization's profile information?</b>
            </p>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout
            </p>
          </Tooltip.Content>
        </Tooltip>
      </div>
      <div className="pt-5">
        <Tooltip id="customTrigger2" placement="right">
          <Tooltip.Trigger>
            <button>hover over me</button>
          </Tooltip.Trigger>

          <Tooltip.Content>
            <p>
              <b>How can I update my organization's profile information?</b>
            </p>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout
            </p>
          </Tooltip.Content>
        </Tooltip>
      </div>
    </>
  );
};
