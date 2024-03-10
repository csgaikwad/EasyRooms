import React from 'react'

export default function BookingWidget() {
  return (
    <div>BookingWidget
                    <div className="flex flex-col">
              <label
                htmlFor="check-in"
                className="text-lg font-semibold text-gray-700"
              >
                Check In
              </label>
              <input
                type="date"
                id="check-in"
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="check-out"
                className="text-lg font-semibold text-gray-700"
              >
                Check Out
              </label>
              <input
                type="date"
                id="check-out"
                className="border border-gray-300 rounded-md p-2"
              />
            </div>






    </div>
  )
}
