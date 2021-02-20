import React, { useState } from "react";
import AjaxButton from "./index";

const variants = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "light",
  "link",
  "outline-primary",
  "outline-secondary",
  "outline-success",
  "outline-danger",
  "outline-warning",
  "outline-info",
  "outline-dark",
  "outline-light",
];

export default {
  title: "AjaxButton",
  component: AjaxButton,
  argTypes: {
    variant: { control: { type: "select", options: variants } },
    spinnerSize: { control: { type: "select", options: ["sm", "lg"] } },
  },
};

const baseArgs = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  text: "Submit",
  loadingText: "Submitting...",
  successText: "Success!",
  errorText: "Error!",
  disabled: false,
  variant: "primary",
  spinnerSize: "sm",
};

export const Success = (args) => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  function mockRequest() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  }

  return (
    <AjaxButton
      size="lg"
      {...args}
      isLoading={args.isLoading || isLoading}
      isSuccess={args.isSuccess || isSuccess}
      onClick={mockRequest}
    />
  );
};

Success.args = {
  ...baseArgs,
  text: "Click to see success example",
};

export const Error = (args) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  function mockRequest() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 1500);
  }

  return (
    <AjaxButton
      {...args}
      isLoading={args.isLoading || isLoading}
      isError={args.isSuccess || isError}
      onClick={mockRequest}
    />
  );
};

Error.args = {
  ...baseArgs,
  text: "Click to see error example",
};

export const FixedWidth = (args) => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  function mockRequest() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  }

  return (
    <div style={{ width: "500px" }}>
      <AjaxButton
        size="lg"
        style={{ width: "100%" }}
        {...args}
        isLoading={args.isLoading || isLoading}
        isSuccess={args.isSuccess || isSuccess}
        onClick={mockRequest}
      />
    </div>
  );
};

FixedWidth.args = {
  ...baseArgs,
  text: "Submit",
};
