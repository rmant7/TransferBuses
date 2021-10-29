import classes from "./Text.module.css";

const TextComponent = ({ text }) => {
  return <span className={classes.text}>{text}</span>;
};

export default TextComponent;
