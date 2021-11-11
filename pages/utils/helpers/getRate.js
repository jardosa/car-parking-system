import {
  AFTER_THREE_HOUR_RATES,
  THREE_HOUR_FLAT_RATE,
  TWENTYFOUR_HOUR_FEE,
} from "../../../constants/constants";

function getRate(checkoutTime, parkingSlotType) {
  const flatRateMaxMinutes = 180;

  if (checkoutTime < flatRateMaxMinutes) return THREE_HOUR_FLAT_RATE;

  const rate = AFTER_THREE_HOUR_RATES.find(
    (val) => val.code === parkingSlotType
  ).rate;

  const minutesExceeded = checkoutTime - flatRateMaxMinutes;

  const exceeded24Hours = checkoutTime > 60 * 24;

  const exceeded24HoursRate =
    Math.floor(checkoutTime / 60 / 24) * TWENTYFOUR_HOUR_FEE;

  if (exceeded24Hours)
    return (
      THREE_HOUR_FLAT_RATE +
      Math.ceil(minutesExceeded / 60) * rate +
      exceeded24HoursRate
    );

  return THREE_HOUR_FLAT_RATE + Math.ceil(minutesExceeded / 60) * rate;
}

export default getRate;

export const getParkingSlotType = (parkingInstance) => {
  const [, , , parkingSlotType] = parkingInstance;

  return parkingSlotType;
};
