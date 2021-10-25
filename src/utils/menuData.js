import { ADD_TRANSFER_ROUTE, CONTACTS_ROUTE, MAIN_ROUTE, TRANSFERS_ROUTE } from "./constants";

export const menuData = [
  { title: "Home", path: MAIN_ROUTE },
  { title: "I\u0027m a passenger", path: TRANSFERS_ROUTE },
  { title: "I\u0027m a driver", path: ADD_TRANSFER_ROUTE },
  { title: "Contacts", path: CONTACTS_ROUTE },
];
