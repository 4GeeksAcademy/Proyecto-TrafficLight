import React, { useState, useEffect } from "react";

const TrafficLight = () => {
  const [color, setColor] = useState("red");
  const [hasPurple, setHasPurple] = useState(false);
  const [autoChange, setAutoChange] = useState(false);

  const colors = hasPurple ? ["red", "yellow", "green", "purple"] : ["red", "yellow", "green"];

  useEffect(() => {
    if (!autoChange) return;

    const interval = setInterval(() => {
      setColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [autoChange, colors]);

  const getLightStyle = (lightColor) =>
    `w-20 h-20 rounded-full transition-all duration-300 ${
      lightColor === color ? `brightness-150 shadow-md` : "opacity-30"
    } ${
      lightColor === "red" ? "bg-red-500" :
      lightColor === "yellow" ? "bg-yellow-400" :
      lightColor === "green" ? "bg-green-500" :
      "bg-purple-600"
    }`;

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <div className="flex flex-col gap-4 bg-gray-800 p-6 rounded-xl">
        {colors.map((c) => (
          <div key={c} onClick={() => setColor(c)} className={getLightStyle(c)} />
        ))}
      </div>

      <div className="flex gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => setAutoChange(!autoChange)}
        >
          {autoChange ? "Detener cambio automático" : "Cambiar automáticamente"}
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
          onClick={() => setHasPurple(true)}
        >
          Añadir púrpura
        </button>
      </div>
    </div>
  );
};

export default TrafficLight;
