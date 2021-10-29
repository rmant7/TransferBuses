import classes from "./Icon.module.css";

const IconComponent = ({ icon, someClass }) => {
  return <img src={icon} className={someClass ? someClass : classes.icon} alt="icon" />;
};

export default IconComponent;
