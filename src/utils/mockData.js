import { v4 as uuid } from "uuid";

 const initialColumns = {
  [uuid()]: {
    title: "Ambitie",
    size: 12,
    items: [],
    message: "Nog geen items",
  },
  [uuid()]: {
    title: "Doelstellingen",
    size: 3,
    items: [],

    message: "Nog geen items",
  },
  [uuid()]: {
    title: "Strategie",
    size: 3,
    items: [],
    message: "Nog geen items",
  },
  [uuid()]: {
    title: "Dashboard",
    size: 3,
    items: [],
    message: "Nog geen items",
  },
  [uuid()]: {
    title: "Actieplan",
    size: 3,
    items: [],
    message: "Nog geen items",
  },
  [uuid()]: {
    size: 9,

    items: [],
    message: "Sleep Item Hier Voor Nieuwe Regel",
  },
};
export default initialColumns