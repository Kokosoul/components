import React, { forwardRef, cloneElement } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Popover } from "react-bootstrap";
import styles from "./Tooltip.module.scss";
import { cn } from "../utils";

function Trigger({ id, children, ...props }) {
    const child = children.props.children;
    props["aria-describedby"] = id;
  
    if (child.type !== "button") {
      // if not a <button> then always make sure child element has role = button
      props.role = "button";
    }
  
    return cloneElement(child, props);
}

const TriggerHolder = ({ children }) => {
    return children;
};
TriggerHolder.id = "TriggerHolder";

const ContentHolder = ({ children }) => {
return children;
};
ContentHolder.id = "ContentHolder";

const Content = forwardRef(
({ id, className, children, ...props }, ref) => {
    return (
    <Popover
        ref={ref}
        id={id}
        className={cn([className, styles.popup])}
        {...props}
    >
        <Popover.Content>{children}</Popover.Content>
    </Popover>
    );
}
);

const DefaultIcon = ({ id, className = null, ...props }) => {
    return (
      <span
        aria-describedby={id}
        role="button"
        className={cn(className, styles.icon)}
        {...props}
      >
        <span className="sr-only">More info.</span>
      </span>
    );
  };

  const Tooltip = ({
    style,
    className,
    children,
    placement,
    icon,
    id,
    ...rootProps
  }) => {
    let triggerElem;
    let targetContent;
  
    if (Array.isArray(children)) {
      triggerElem = children.find((child) => child.type.id === "TriggerHolder");
      targetContent = children.find((child) => child.type.id === "ContentHolder");
    } else {
      targetContent = React.Children.only(children);
    }
  
    if (!targetContent) {
      throw new Error("<Tooltip> requires a ContentHolder child prop");
    }
  
    const { ...contentProps } = targetContent.props;
  
    if (!id) {
      throw new Error('<Tooltip> requires an "id" prop');
    }
  
    return (
      <OverlayTrigger
        placement={placement}
        delay={{ show: 250, hide: 400 }}
        {...rootProps}
        overlay={
          <Content id={id} {...contentProps}>
            {targetContent}
          </Content>
        }
      >
        {triggerElem ? (
          <Trigger id={id}>{triggerElem}</Trigger>
        ) : (
          <DefaultIcon
            id={id}
            style={style}
            className={cn(icon ? styles[icon] : undefined, className)}
          />
        )}
      </OverlayTrigger>
    );
  };
  
  /**
   * This hold the tooltip content and is required
   */
  Tooltip.Content = ContentHolder;
  
  /**
   * If you want to pass a custom trigger to use instead of the default you wrap
   * it in this react component
   */
  Tooltip.Trigger = TriggerHolder;
  
  Tooltip.defaultProps = {
    placement: "bottom",
    icon: "question",
  };
  
  export default Tooltip;