"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

export default function TelemedicinePage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setIsBooked(true);
    } else {
      alert("Please select both date and time.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Telemedicine</h1>
        <p className="text-gray-600 mt-2">
          Schedule your online consultation and connect with a doctor.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Scheduling Section */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Schedule a Session
          </h2>

          <div className="flex flex-col gap-4">
            {/* Date Picker */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Date
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Time Picker */}
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Time
              </label>
              <input
                type="time"
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Book Button */}
            <button
              onClick={handleBooking}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Book Session
            </button>

            {isBooked && (
              <p className="text-green-600 font-medium mt-2">
                ✅ Session booked for {selectedDate} at {selectedTime}.
              </p>
            )}
          </div>
        </div>

        {/* Video Placeholder */}
        <div className="bg-gray-900 text-white rounded-2xl shadow flex flex-col items-center justify-center p-6">
          <h2 className="text-xl font-semibold mb-4">Video Consultation</h2>
          <div className="w-full aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-300">
              📹 Low-Bandwidth Video Placeholder
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            Video will appear here once the session starts.
          </p>
        </div>
      </div>
    </div>
  );
}
