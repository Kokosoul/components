import React from "react";
import Share from "./index";

export default {
  title: "Share",
  component: Share,
};

export const basicUsage = () => {
  return (
    <Share
      url="https://www.reddit.com/r/cats/"
      id="share1"
      popoverContentClass="shareContent"
    />
  );
};

export const emailSubjectAndBody = () => {
  return (
    <Share
      url="https://www.reddit.com/r/cats/"
      id="share3"
      emailSubject="Check out our app"
      emailBody="Give to non profits while you shop!"
      popoverContentClass="shareContent"
    />
  );
};
