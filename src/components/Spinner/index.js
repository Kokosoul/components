import styles from "./Spinner.module.scss";

const Cube = (
  <div className={styles.spinner}>
    <div className={styles.cube1}></div>
    <div className={styles.cube2}></div>
  </div>
);

const Bouncer = (
  <div className={styles.bouncer}>
    <div className={styles.bounce1}></div>
    <div className={styles.bounce2}></div>
    <div className={styles.bounce3}></div>
  </div>
);

const Loader = <div className={styles.loader} />;

const Dot = (
  <div className={styles.dot}>
    <div className={styles.dot1}></div>
    <div className={styles.dot2}></div>
  </div>
);



const Spinner = ({ type }) => {
  switch (type) {
    case "bouncer":
      return (
        <span>
          {Bouncer}
          <span className="sr-only">Loading...</span>
        </span>
      );
    case "loader":
      return (
        <span>
          {Loader}
          <span className="sr-only">Loading...</span>
        </span>
      );
    case "cube":
      return (
        <span>
          {Cube}
          <span className="sr-only">Loading...</span>
        </span>
      );
    case "dot":
    default:
      return (
        <span>
          {Dot}
          <span className="sr-only">Loading...</span>
        </span>
      );
  }
}

Spinner.defaultProps = {
  type: "dot",
};

export default Spinner;
