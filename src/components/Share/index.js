import React, { forwardRef, useEffect } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

import styles from "./Share.module.scss";
import { useCopy } from "../utils/hooks";
import { cn } from "../utils";

const fb = (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`;
const twitter = (url) => `https://twitter.com/intent/tweet?url=${url}`;
const linkedIn = (url) =>
  `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
const email = (url, subject = "", body = "") => {
  return `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}%0A%0A${encodeURIComponent(url)}`;
};



const ShareButton = ({ onClick, className, ...props }) => {
  function openShare(e) {
    e.preventDefault();
    if (onClick) onClick(e);
  }
  return (
    <button
      className={cn(styles.button, className)}
      onClick={openShare}
      {...props}
    >
      Share
    </button>
  );
};

const SharePopover = forwardRef(
  (
    { url, id, className, contentClass, emailSubject, emailBody, ...props },
    ref
  ) => {
    const { copied, copy, reset } = useCopy(url);

    const copyClassNames = [styles.copyBtn];
    if (copied) {
      copyClassNames.push(styles.green);
    }

    function onCopy(e) {
      e.preventDefault();
      copy();
    }

    useEffect(() => {
      return function onUnmount() {
        reset();
      };
    }, [reset]);

    return (
      <Popover
        ref={ref}
        className={cn([className, styles.pop])}
        {...props}
        id={id}
      >
        <Popover.Content className={cn([contentClass, styles.popContent])}>
          <a href={fb(url)} target="_blank" rel="noopener noreferrer">
            <span className="sr-only">Facebook</span>
            <i className="fa fa-facebook-square fa-3x" />
          </a>
          <a href={twitter(url)} target="_blank" rel="noopener noreferrer">
            <span className="sr-only">Twitter</span>
            <i className="fa fa-twitter-square fa-3x" />
          </a>
          <a href={linkedIn(url)} target="_blank" rel="noopener noreferrer">
            <span className="sr-only">LinkedIn</span>
            <i className="fa fa-linkedin-square fa-3x" />
          </a>
          <a
            href={email(url, emailSubject, emailBody)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">email</span>
            <i className="fa fa-envelope-square fa-3x" />
          </a>
          <button onClick={onCopy} className={cn(copyClassNames)}>
            <span className="sr-only">
              {copied === false ? "Copy to clipboard" : "Copied"}
            </span>
            <i
              className={`fa fa-2x fa-${copied === false ? "copy" : "check"}`}
            />
          </button>
        </Popover.Content>
      </Popover>
    );
  }
);



function Share({
  url,
  id,
  className = '',
  popoverClass,
  popoverContentClass,
  title,
  text,
  emailSubject,
  emailBody,
}) {
  function nativeShare(e) {
    e.preventDefault();
    navigator
      .share({
        title,
        text,
        url,
      })

      .catch(console.error);
  }

  if ("share" in navigator) {
    return <ShareButton className={className} onClick={nativeShare} />;
  }

  return (
    <OverlayTrigger
      trigger="click"
      placement="auto"
      overlay={
        <SharePopover
          id={id}
          className={popoverClass}
          contentClass={popoverContentClass}
          emailSubject={emailSubject}
          emailBody={emailBody}
          url={url}
        />
      }
    >
      <ShareButton className={className} />
    </OverlayTrigger>
  );
}

function getTitle() {
  const head = document.head || document.querySelector("head");
  return (
    head.querySelector('meta[property="og:title"]')?.content || document.title
  );
}

function getDesc() {
  const head = document.head || document.querySelector("head");
  return (
    head.querySelector('meta[property="og:description"]')?.content ||
    head.querySelector('meta[name="description"]')?.content
  );
}

Share.defaultProps = {
  className: "",
  popoverClass: "",
  popoverContentClass: "",
  title: getTitle(),
  text: getDesc(),
};

export default Share;
