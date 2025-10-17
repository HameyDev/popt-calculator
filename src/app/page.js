"use client";
import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

export default function IWICalculator() {
  const [walls, setWalls] = useState(
    Array.from({ length: 5 }, () => ({
      location: "Main",
      elevation: "Front",
      floor: "GF",
      length: "",
      height: "",
      subtract: "",
      insulate: "Yes",
      cavity: "No",
    }))
  );

  const [totals, setTotals] = useState({
    totalWallArea: 0.0,
    insulatedArea: 0.0,
    cavityArea: 0.0,
    percentInsulated: 0.0,
  });

  const reportRef = useRef();

  const calculateArea = (wall) => {
    const area =
      parseFloat(wall.length || 0) * parseFloat(wall.height || 0) -
      parseFloat(wall.subtract || 0);
    return area > 0 ? area : 0;
  };

  useEffect(() => {
    let total = 0;
    let insulated = 0;
    let cavity = 0;

    walls.forEach((wall) => {
      const area = calculateArea(wall);
      total += area;
      if (wall.insulate === "Yes") insulated += area;
      if (wall.cavity === "Yes") cavity += area;
    });

    const percent = total ? ((insulated / total) * 100).toFixed(2) : 0;
    setTotals({
      totalWallArea: total.toFixed(2),
      insulatedArea: insulated.toFixed(2),
      cavityArea: cavity.toFixed(2),
      percentInsulated: percent,
    });
  }, [walls]);

  const handleChange = (index, field, value) => {
    const updated = [...walls];
    updated[index][field] = value;
    setWalls(updated);
  };

  const addWall = () => {
    setWalls([
      ...walls,
      {
        location: "Main",
        elevation: "Front",
        floor: "GF",
        length: "",
        height: "",
        subtract: "",
        insulate: "Yes",
        cavity: "No",
      },
    ]);
  };

  const removeWall = (index) => {
    const updated = walls.filter((_, i) => i !== index);
    setWalls(updated);
  };

  const generateReport = async () => {
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const link = document.createElement("a");
    link.href = imgData;
    link.download = "IWI_Report.jpg";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50 p-4 sm:p-8 font-sans">
      <h1 className="text-3xl font-extrabold text-center text-orange-600 mb-6 drop-shadow">
        🏠 IWI POPT Calculator
      </h1>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="min-w-[900px] grid grid-cols-9 gap-2 font-semibold bg-gray-200 p-2 rounded">
          <span>Location</span>
          <span>Elevation</span>
          <span>Floor</span>
          <span>Wall Length (m)</span>
          <span>Ceiling Height (m)</span>
          <span>Subtract Area (m²)</span>
          <span>Insulate</span>
          <span>Cavity</span>
          <span>Total Wall Area</span>
          <span>Action</span>
        </div>

        {/* Wall Rows */}
        {walls.map((wall, index) => {
          const area = calculateArea(wall);
          return (
            <div
              key={index}
              className="min-w-[900px] grid grid-cols-9 gap-2 items-center border-b py-2"
            >
              <select
                value={wall.location}
                onChange={(e) =>
                  handleChange(index, "location", e.target.value)
                }
                className="border p-1 rounded"
              >
                <option>Main</option>
                <option>Ext 1</option>
                <option>Ext 2</option>
                <option>Ext 3</option>
                <option>Ext 4</option>
              </select>

              <select
                value={wall.elevation}
                onChange={(e) =>
                  handleChange(index, "elevation", e.target.value)
                }
                className="border p-1 rounded"
              >
                <option>Front</option>
                <option>Rear</option>
                <option>Side</option>
              </select>

              <select
                value={wall.floor}
                onChange={(e) => handleChange(index, "floor", e.target.value)}
                className="border p-1 rounded"
              >
                <option>GF</option>
                <option>FF</option>
                <option>SF</option>
              </select>

              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={wall.length}
                onChange={(e) => handleChange(index, "length", e.target.value)}
                className="border p-1 rounded"
              />

              <input
                type="number"
                step="0.01"
                value={wall.height}
                placeholder="0.00"
                onChange={(e) => handleChange(index, "height", e.target.value)}
                className="border p-1 rounded"
              />

              <input
                type="number"
                step="0.01"
                value={wall.subtract}
                placeholder="0.00"
                onChange={(e) =>
                  handleChange(index, "subtract", e.target.value)
                }
                className="border p-1 rounded"
              />

              <select
                value={wall.insulate}
                onChange={(e) =>
                  handleChange(index, "insulate", e.target.value)
                }
                className="border p-1 rounded"
              >
                <option>Yes</option>
                <option>No</option>
              </select>

              {/* 🆕 Cavity Option */}
              <select
                value={wall.cavity}
                onChange={(e) => handleChange(index, "cavity", e.target.value)}
                className="border p-1 rounded"
              >
                <option>No</option>
                <option>Yes</option>
              </select>

              <span
                className={`font-semibold ${
                  wall.insulate === "Yes"
                    ? "text-orange-500"
                    : "text-red-700"
                }`}
              >
                {`${wall.location} ${wall.elevation} ${wall.floor} IWI Area=(${wall.length}*${wall.height})-(${wall.subtract})=${calculateArea(wall).toFixed(2)}m²`}
              </span>

              <button
                onClick={() => removeWall(index)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Wall Button */}
      <button
        onClick={addWall}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto"
      >
        + Add Wall
      </button>

      {/* Report Section */}
      <div
        ref={reportRef}
        className="mt-10 bg-white p-6 rounded shadow overflow-x-auto text-[10px] leading-tight font-[Calibri] w-1/2"
      >
        <h1 className="text-xl font-bold text-orange-600 mb-4">IWI</h1>

        <div className="flex items-center space-x-2">
          <div className="w-12 h-1.5 bg-orange-500 rounded-full"></div>
          <span className="text-orange-500 font-semibold">Insulated Wall</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-12 h-1.5 bg-red-700 rounded-full"></div>
          <span className="text-red-700 font-semibold">Not Insulated Wall</span>
        </div>

        <p className="mt-4 font-semibold text-orange-500">GF = Ground Floor</p>
        <p className="font-semibold text-orange-500 mb-4">FF = First Floor</p>

        {walls.map((wall, index) => (
          <p
            key={index}
            className={`${
              wall.insulate === "Yes"
                ? "text-orange-500 font-semibold"
                : "text-rose-700 font-semibold"
            }`}
          >
            {`${wall.location === "Main" ? "" : wall.location + " "} ${wall.elevation} ${wall.floor} IWI Area=(${wall.length}*${wall.height})-(${wall.subtract})=${calculateArea(wall).toFixed(2)}m²`}
          </p>
        ))}

        <p className="mt-12 font-semibold text-orange-500">IWI</p>
        <p className="mt-4 font-semibold text-orange-500">
          Total IWI Wall Area={totals.totalWallArea}m²
        </p>
        <p className="mt-4 font-semibold text-orange-500">
          Total IWI Solid Wall Area={(totals.totalWallArea - totals.cavityArea).toFixed(2)}m²
        </p>
        {totals.cavityArea > 0 && (
         <p className="mt-4 font-semibold text-orange-500">
           Total Cavity Wall Area={totals.cavityArea}m²
         </p>
        )}
        <p className="mt-3 font-semibold text-orange-500">
          Insulated IWI Solid Wall Area={totals.insulatedArea}m²
        </p>
        <p className="mt-3 font-semibold text-orange-500">
          %age Insulated={Math.round(totals.percentInsulated)}%
        </p>
        <p className="mt-3 font-semibold text-orange-500">
          Popt={Math.round(totals.percentInsulated)}%
        </p>
        <p className="mt-3 font-semibold text-orange-500">
          Measure Installed={Math.round(totals.percentInsulated)}%
        </p>
        <p className="mt-3 font-semibold text-orange-500">Solid Wall={Math.round(((totals.totalWallArea - totals.cavityArea) / totals.totalWallArea) * 100)}%</p>
        {totals.cavityArea > 0 && (
        <p className="mt-3 font-semibold text-orange-500">Cavity Wall={Math.round((totals.cavityArea / totals.totalWallArea) * 100)}%</p>
        )}
        <h4 className="text-[10px] leading-tight font-[Calibri] mt-4 font-bold text-rose-700">Notes:</h4>
        <ul className="text-[10px] leading-tight font-[Calibri] text-rose-700 font-bold list-disc ml-5">
          <li>Wet rooms are not to be insulated.</li>
          <li>DMEV fan will be installed in Kitchen and Bathroom.</li>
          <li>
            Kitchen and Bathroom will have radiators and can be heated to a
            minimum of 18°C.
          </li>
        </ul>
      </div>

      {/* Generate JPEG Button */}
      <button
        onClick={generateReport}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto"
      >
        Generate Report (JPEG)
      </button>
    </div>
  );
}
