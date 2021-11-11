import { differenceInMinutes, format } from "date-fns";
import { useReducer } from "react";
import {
  ENTRY_POINTS,
  PARKING_MAPPING,
  PARKING_SLOTS,
} from "../constants/constants";
import getRate, { getParkingSlotType } from "../pages/utils/helpers/getRate";
import { Context } from "./context";
import { PARK_VEHICLE, reducer, UNPARK_VEHICLE } from "./reducer";

const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    entryPoints: [...ENTRY_POINTS],
    occupiedParkingSlots: [],
  });

  const parkVehicle = (
    payload = {
      vehicleType: "",
      entryPoint: "",
      plateNumber: "",
    }
  ) => {
    //CHECK IF PLATE NUMBER IS STILL PARKED
    const isParked = !!state.occupiedParkingSlots.find((parkingSlot) =>
      parkingSlot.includes(payload.plateNumber.toUpperCase())
    );

    const dateTimeParked = format(new Date(), "dd MMMM yyyy KK:mm:ss aa");
    if (isParked) {
      alert("CAR ALREADY PARKED");
      return;
    }

    //GET AVAILABLE PARKING SLOTS
    const availableParkingSlots = [...PARKING_SLOTS].filter((parkingSlot) => {
      // CHECK IF PARKING SLOT IS ALREADY OCCUPIED
      return !state.occupiedParkingSlots.find(
        ([distance1, distance2, distance3, size]) =>
          [distance1, distance2, distance3, size].toString() ===
          parkingSlot.toString()
      );
    });

    // CHECK WHERE THE CAR FITS
    const whereToFit = availableParkingSlots.filter(([, , , ps]) => {
      return PARKING_MAPPING()[payload["vehicleType"]].includes(ps);
    });

    // CHECK INDEX OF PARKING ENTRANCE

    const parkingIndex = ENTRY_POINTS.indexOf(payload.entryPoint);

    // SORT PARKING SLOTS BY DISTANCE TO ENTRANCE

    const sortByEntrance = whereToFit.sort((a, b) => {
      if (a[parkingIndex] < b[parkingIndex]) {
        return -1;
      } else if (a[parkingIndex] > b[parkingIndex]) {
        return 1;
      } else {
        return parkingIndex;
      }
    });

    // GET CLOSEST PARKING SLOT
    const closestParkingSlot = sortByEntrance[0];

    // DISPATCH TO REDUCER TO ASSIGN PARKING SLOT
    dispatch({
      type: PARK_VEHICLE,
      payload: {
        parkingSlot: closestParkingSlot,
        plateNumber: payload.plateNumber.toUpperCase(),
        dateTimeParked,
      },
    });
  };

  const getCurrentRate = (plateNumber) => {
    const parkingSlot = state.occupiedParkingSlots.find((data) =>
      data.includes(plateNumber)
    );

    const timeDifference = differenceInMinutes(
      new Date(),
      new Date(parkingSlot.at(-1))
    );

    const parkingSlotType = getParkingSlotType(parkingSlot);

    return getRate(timeDifference, parkingSlotType);
  };

  const unparkVehicle = (payload = {}) => {
    const parkingSlotToUnpark = state.occupiedParkingSlots.find((data) =>
      data.includes(payload.plateNumber)
    );

    dispatch({ type: UNPARK_VEHICLE, payload: payload.plateNumber });
  };

  const initialValue = {
    state,
    parkVehicle,
    unparkVehicle,
    getCurrentRate,
  };
  return <Context.Provider value={initialValue}>{children}</Context.Provider>;
};

export default GlobalState;
