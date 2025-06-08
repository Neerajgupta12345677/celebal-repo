import React from "react";
import { useLocation } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-green-600">Form Submitted Successfully!</h2>
      <div className="mt-4 space-y-2">
        {Object.entries(state || {}).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {value.toString()}
          </div>
        ))}
      </div>
    </div>
  );
}
