import classes from "./BudgetTravelTips.module.css";

const TranslationBox = () => {
  return (
    <div>
      <img
        src={require("../../assets/translate.png")}
        alt="translate"
        className={classes.icon}
      />
      <select className={classes.select}>
        <option value="translate" disabled selected>
          Translate
        </option>
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
      </select>
    </div>
  );
};
export default TranslationBox;
