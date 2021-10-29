import IconComponent from "../Icon/IconComponent";
import TextComponent from "../Text/TextComponent";
import classes from "./IconText.module.css";

const IconTextComponent = ({ icon, text }) => {
  return (
    <div className={classes.icon_text}>
      <IconComponent icon={icon} />
      <TextComponent text={text} />
    </div>
  );
};

export default IconTextComponent;
