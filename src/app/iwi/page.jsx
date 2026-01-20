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

  // ✅ Calculate individual wall area rounded to 2 decimals
  const calculateArea = (wall) => {
    const length = parseFloat(wall.length) || 0;
    const height = parseFloat(wall.height) || 0;
    const subtract = parseFloat(wall.subtract) || 0;

    let area = length * height - subtract;
    if (area < 0) area = 0;

    return Number(area.toFixed(2));
  };

  // ✅ useEffect to sum all wall areas (sum of rounded values)
  useEffect(() => {
    let total = 0;
    let insulated = 0;
    let cavity = 0;

    walls.forEach((wall) => {
      const area = calculateArea(wall); // already toFixed(2)
      total += area;                     // sum of rounded areas
      if (wall.insulate === "Yes") insulated += area;
      if (wall.cavity === "Yes") cavity += area;
    });

    setTotals({
      totalWallArea: Number(total.toFixed(2)),
      insulatedArea: Number(insulated.toFixed(2)),
      cavityArea: Number(cavity.toFixed(2)),
      percentInsulated: total
        ? Number(((insulated / total) * 100).toFixed(2))
        : 0,
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-gray to-amber-100 p-4 sm:p-8 pt-20 sm:pt-28 font-sans">
      <h1 className="text-3xl font-extrabold text-center text-orange-600 mb-6 drop-shadow">
        🏠 IWI POPT Calculator
      </h1>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="min-w-[900px] grid grid-cols-10 gap-2 font-semibold bg-gray-200 p-2 rounded">
          <span className="text-center">Location</span>
          <span className="text-center">Elevation</span>
          <span className="text-center">Floor</span>
          <span className="text-center">Wall Length(m)</span>
          <span className="text-center">Ceiling Height(m)</span>
          <span className="text-center">Subtract Area(m²)</span>
          <span className="text-center">Insulate</span>
          <span className="text-center">Cavity</span>
          <span className="text-center">Total Wall Area</span>
          <span className="text-center">Action</span>
        </div>

        {/* Wall Rows */}
        {walls.map((wall, index) => {
          const area = calculateArea(wall);
          return (
            <div
              key={index}
              className="min-w-[900px] grid grid-cols-10 gap-2 items-center border-b py-2"
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
                  wall.insulate === "Yes" ? "text-orange-500" : "text-red-700"
                }`}
              >
                {`${wall.location} ${wall.elevation} ${wall.floor} IWI Area=(${wall.length}*${wall.height})-(${wall.subtract})=${area.toFixed(2)}m²`}
              </span>

              <button
                onClick={() => removeWall(index)}
                className="px-2 px-1 py-1 bg-red-600 text-white rounded hover:bg-red-700"
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
        className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 w-full sm:w-auto"
      >
        + Add Wall
      </button>

      {/* Report Section */}
      <div
        ref={reportRef}
        className="mt-10 bg-white p-6 rounded shadow overflow-x-auto text-[10px] leading-tight font-[Calibri] w-1/2"
      >
        <h1 className="text-xl font-bold text-purple-600 mb-4">EWI</h1>

        <div className="flex items-center space-x-2">
          <div className="w-12 h-1.5 bg-purple-500 rounded-full"></div>
          <span className="text-purple-500 font-semibold">Insulated Wall</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-12 h-1.5 bg-red-700 rounded-full"></div>
          <span className="text-red-700 font-semibold">Not Insulated Wall</span>
        </div>

        <p className="mt-4 font-semibold text-purple-500">GF = Ground Floor</p>
        <p className="font-semibold text-purple-500 mb-4">FF = First Floor</p>

        {walls.map((wall, index) => (
          <p
            key={index}
            className={`${
              wall.insulate === "Yes"
                ? "text-purple-500 font-semibold"
                : "text-rose-700 font-semibold"
            }`}
          >
            {`${wall.location === "Main" ? "" : wall.location + " "} ${wall.elevation} ${wall.floor} EWI Area=(${wall.length}*${wall.height})-(${wall.subtract})=${calculateArea(wall).toFixed(2)}m²`}
          </p>
        ))}

        <p className="mt-12 font-semibold text-purple-500">EWI</p>
        <p className="mt-4 font-semibold text-purple-500">
          Total Wall Area={totals.totalWallArea}m²
        </p>
        <p className="mt-4 font-semibold text-purple-500">
          Total Solid Wall Area={(totals.totalWallArea - totals.cavityArea).toFixed(2)}m²
        </p>
        {totals.cavityArea > 0 && (
         <p className="mt-4 font-semibold text-purple-500">
           Total Cavity Wall Area={totals.cavityArea}m²
         </p>
        )}
        <p className="mt-3 font-semibold text-purple-500 border-2 border-purple-500 px-2 pb-3 w-48">
          Insulated EWI Solid Wall Area={totals.insulatedArea}m²
        </p>
        <p className="mt-3 font-semibold text-purple-500">
          %age Insulated={Math.floor(totals.percentInsulated)}%
        </p>
        <p className="mt-3 font-semibold text-purple-500">
          Popt={Math.floor(totals.percentInsulated)}%
        </p>
        <p className="mt-3 font-semibold text-purple-500">
          Measure Installed={Math.floor(totals.percentInsulated)}%
        </p>
        <p className="mt-3 font-semibold text-purple-500">Solid Wall={totals.totalWallArea > 0 ? Math.floor(((totals.totalWallArea - totals.cavityArea) / totals.totalWallArea) * 100): 0}%</p>
        {totals.cavityArea > 0 && (
        <p className="mt-3 font-semibold text-purple-500">Cavity Wall={Math.floor((totals.cavityArea / totals.totalWallArea) * 100)}%</p>
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
