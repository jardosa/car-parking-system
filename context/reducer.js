export const PARK_VEHICLE = "PARK_VEHICLE";
export const UNPARK_VEHICLE = "UNPARK_VEHICLE";

const parkVehicle = (state, payload) => {
  const dataToRecord = [
    ...payload.parkingSlot,
    payload.plateNumber,
    payload.dateTimeParked,
  ];

  return {
    ...state,
    occupiedParkingSlots: [...state.occupiedParkingSlots].concat([
      dataToRecord,
    ]),
  };
};

const unparkVehicle = (state, payload) => {
  return {
    ...state,
    occupiedParkingSlots: [...state.occupiedParkingSlots].filter(
      (ps) => !ps.includes(payload)
    ),
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case PARK_VEHICLE:
      return parkVehicle(state, action.payload);
    case UNPARK_VEHICLE:
      return unparkVehicle(state, action.payload);
    default:
      return state;
  }
};
