import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { cn } from "../utils";
import styles from "./index.module.scss";



const AjaxButton = ({
  className,
  isLoading = false,
  isSuccess = false,
  isError = false,
  variant = "primary",
  text,
  loadingText,
  successText,
  errorText,
  disabled = false,
  spinnerSize = "sm",
  ...props
}) => {
  const isIdle = !(isLoading || isSuccess || isError);

  let currentVariant = variant;
  if (isLoading) {
    currentVariant = "primary";
  } else if (isSuccess) {
    currentVariant = "success";
  } else if (isError) {
    currentVariant = "danger";
  }

  return (
    <Button
      className={cn(styles.button, className)}
      variant={currentVariant}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Spinner
          className={styles.spinner}
          as="span"
          size={spinnerSize}
          animation="border"
          role="status"
          aria-hidden="true"
        />
      )}

      {isIdle && <span className={styles.fadable}>{text}</span>}

      {/* on Loading we display the optional loadingText or the default text */}
      {isLoading && (
        <span className={styles.fadable}>{loadingText || text}</span>
      )}

      {/* if no loading text was provided we should always have some kind of loading text for a11y */}
      {isLoading && !loadingText && <span className="sr-only">Loading...</span>}

      {/* on Success we display the optional successText or the default text */}
      {!isLoading && isSuccess && (
        <span className={styles.fadable}>{successText || text}</span>
      )}

      {/* on Error we display the optional errorText or the default text */}
      {!isLoading && isError && (
        <span className={styles.fadable}>{errorText || text}</span>
      )}
    </Button>
  );
};

export default AjaxButton;
