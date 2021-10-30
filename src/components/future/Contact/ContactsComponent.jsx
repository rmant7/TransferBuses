import classes from "./Contacts.module.css";
import { ROMAN_EMAIL, ROMAN_PHONE_NUMBER } from "../../../utils/constants";
import i18n from "../../../i18n";
import SocialButtons from "../../SocialButtons/SocialButtons";

const ContactsComponent = () => {
  return (
    <div className={classes.contacts}>
      <span className={classes.contacts_text}>{i18n.t("Contacts")}:</span>
      <span className={classes.contacts_text}>{i18n.t("Name")}</span>
      <span className={classes.contacts_text}>{i18n.t("Founder and Ceo")}</span>
      <span className={classes.contacts_text}>{ROMAN_PHONE_NUMBER}</span>
      <a href="mailto:roman.mantelmakher@gmail.com" rel="noreferrer" target="_blank">
        {ROMAN_EMAIL}
      </a>
      <SocialButtons />
    </div>
  );
};

export default ContactsComponent;
