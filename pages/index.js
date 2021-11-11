import Head from "next/head";
import { useContext } from "react";
import {
  ENTRY_POINTS,
  PARKING_SLOTS,
  VEHICLE_TYPES,
} from "../constants/constants";
import { Context } from "../context/context";
import titleCase from "./utils/helpers/titleCase";

export default function Home() {
  const context = useContext(Context);
  const { state, parkVehicle } = context;
  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const vehicleType = form.get("vehicle-type");
    const entryPoint = form.get("entry-point");
    const plateNumber = form.get("plate-number");
    parkVehicle({ vehicleType, entryPoint, plateNumber });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="w-full mx-auto  border rounded-lg border-purple-400 shadow-md p-5 space-y-10">
          <form
            className="flex flex-col items-start justify-start w-full space-y-5"
            onSubmit={onSubmit}
          >
            <div className="w-full flex flex-col items-start">
              <div>
                <label htmlFor="entry-point">ENTRY POINT</label>
              </div>
              <div className="w-full">
                <select
                  name="entry-point"
                  id="entry-point"
                  className="w-full p-2 rounded-md"
                >
                  {ENTRY_POINTS.map((point) => (
                    <option value={point}>{point}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full flex flex-col items-start">
              <div>
                <label htmlFor="vehicle-type">Vehicle Type</label>
              </div>
              <div className="w-full">
                <select
                  name="vehicle-type"
                  id="vehicle-type"
                  className="w-full p-2 rounded-md"
                >
                  {VEHICLE_TYPES.map((type) => (
                    <option value={type.code}>{titleCase(type.name)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full flex flex-col items-start">
              <div>
                <label htmlFor="plate-number">Plate Number</label>
              </div>
              <div className="w-full">
                <input
                  required
                  type="text"
                  name="plate-number"
                  id="plate-number"
                  placeholder="Plate Number"
                  className="w-full rounded-md border p-2"
                />
              </div>
            </div>
            <input
              role="button"
              type="submit"
              className="w-[196px] h-[46px] rounded-lg bg-purple-300 hover:bg-green-400 duration-200"
            />
          </form>
          <ParkingMapComponent
            parkingSlots={PARKING_SLOTS}
            occupiedParkingSlots={state.occupiedParkingSlots}
          />
        </div>
      </main>
    </div>
  );
}

const ParkingMapComponent = ({ parkingSlots, occupiedParkingSlots }) => {
  const context = useContext(Context);
  const occupiedParkingSlotsStringified = occupiedParkingSlots.map(
    ([distance1, distance2, distance3, size, plateNumber]) => [
      [distance1, distance2, distance3, size].join(""),
      plateNumber,
    ]
  );

  return (
    <div className="grid grid-cols-3 gap-1">
      {parkingSlots.map(([distance1, distance2, distance3, size]) => {
        const occupiedDetails = occupiedParkingSlotsStringified.find(
          ([stringifiedParkingSlot, plateNumber]) =>
            stringifiedParkingSlot ===
            [distance1, distance2, distance3, size].join("")
        );
        return (
          <div
            className={[
              occupiedDetails?.length > 0 ? "bg-red-500" : "bg-green-500",
              "text-center",
            ].join(" ")}
          >
            <p>{occupiedDetails?.[1]}</p>
            <p>{size}</p>
            {occupiedDetails?.length > 0 && (
              <div className="flex flex-col justify-center items-center mx-5">
                <button
                  className="h-[46px] w-full my-2 bg-green-400 rounded-md shadow-md hover:bg-opacity-90 duration-200 text-lg font-medium"
                  type="button"
                  onClick={() => {
                    context.unparkVehicle({ plateNumber: occupiedDetails[1] });
                  }}
                >
                  Unpark
                </button>
                <button
                  className="h-[46px] w-full my-2 bg-blue-400 rounded-md shadow-md hover:bg-opacity-90 duration-200 text-lg font-medium"
                  type="button"
                  onClick={() => {
                    const currentRate = context.getCurrentRate(
                      occupiedDetails[1]
                    );

                    alert(`Current Rate is PHP ${currentRate}`);
                  }}
                >
                  Get Rate
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
