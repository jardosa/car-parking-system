import { createContext } from "react";

export const Context = createContext({
  state: {},
  parkVehicle: () => undefined,
  unparkVehicle: () => undefined,
});
