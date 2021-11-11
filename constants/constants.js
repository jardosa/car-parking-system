export const VEHICLE_TYPES = [
  { code: "S", name: "small" },
  { code: "M", name: "medium" },
  { code: "L", name: "large" },
];

export const PARKING_SLOTS = [
  [1, 5, 10, "SP"],
  [2, 5, 10, "SP"],
  [3, 5, 10, "SP"],
  [4, 5, 10, "MP"],
  [5, 5, 12, "MP"],
  [5, 3, 11, "MP"],
  [6, 2, 9, "LP"],
  [7, 1, 8, "LP"],
  [8, 1, 7, "LP"],
  [9, 2, 6, "SP"],
  [10, 3, 5, "SP"],
  [11, 4, 4, "MP"],
  [12, 5, 3, "MP"],
  [12, 6, 3, "LP"],
  [13, 5, 3, "LP"],
];

export const PARKING_SLOT_TYPES = [
  { code: "SP", name: "small" },
  { code: "MP", name: "medium" },
  { code: "LP", name: "large" },
];
export const TWENTYFOUR_HOUR_FEE = 5000;

export const PARKING_MAPPING = () => {
  const pst = PARKING_SLOT_TYPES;
  return {
    S: pst.map(({ code }) => code),
    M: pst.filter(({ code }) => code !== "SP").map(({ code }) => code),
    L: pst.filter(({ code }) => code === "LP").map(({ code }) => code),
  };
};

export const THREE_HOUR_FLAT_RATE = 40;

export const AFTER_THREE_HOUR_RATES = [
  { code: "SP", rate: 20 },
  { code: "MP", rate: 60 },
  { code: "LP", rate: 100 },
];

export const ENTRY_POINTS = ["RizalAve", "26th", "C5"];
