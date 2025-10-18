"use client";
import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

export default function CWICalculator() {
  const [walls, setWalls] = useState(
    Array.from({ length: 5 }, () => ({
      location: "Main",
      elevation: "Front",
      floor: "GF",
      length: "",
      height: "",
      subtract: "",
      insulate: "Yes",
      solid: "No",
    }))
  );

  const [totals, setTotals] = useState({
    totalWallArea: 0.0,
    insulatedArea: 0.0,
    solidArea: 0.0,
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
    let solid = 0;

    walls.forEach((wall) => {
      const area = calculateArea(wall);
      total += area;
      if (wall.insulate === "Yes") insulated += area;
      if (wall.solid === "Yes") solid += area;
    });

    const percent = total ? ((insulated / total) * 100).toFixed(2) : 0;
    setTotals({
      totalWallArea: total.toFixed(2),
      insulatedArea: insulated.toFixed(2),
      solidArea: solid.toFixed(2),
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
        solid: "No",
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray to-green-100 p-4 sm:p-8 pt-20 sm:pt-28 font-sans">
      <h1 className="text-3xl font-extrabold text-center text-green-600 mb-6 drop-shadow">
        🏕️ CWI POPT Calculator
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
          <span className="text-center">Solid</span>
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

              {/* 🆕 Cavity Option */}
              <select
                value={wall.solid}
                onChange={(e) => handleChange(index, "solid", e.target.value)}
                className="border p-1 rounded"
              >
                <option>No</option>
                <option>Yes</option>
              </select>

              <span
                className={`font-semibold ${
                  wall.insulate === "Yes"
                    ? "text-green-500"
                    : "text-red-700"
                }`}
              >
                {`${wall.location} ${wall.elevation} ${wall.floor} CWI Area=(${wall.length}*${wall.height})-(${wall.subtract})=${calculateArea(wall).toFixed(2)}m²`}
              </span>

              <button
                onClick={() => removeWall(index)}
                className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
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
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto"
      >
        + Add Wall
      </button>

      {/* Report Section */}
      <div
        ref={reportRef}
        className="mt-10 bg-white p-6 rounded shadow overflow-x-auto text-[10px] leading-tight font-[Calibri] w-1/2"
      >
        <h1 className="text-xl font-bold text-green-600 underline mb-2">CAVITY WALL INSULATION</h1>

        <div className="flex items-center space-x-2">
          <span className="text-green-600 font-semibold text-[16px]">Insulated Wall</span>
          <div className="w-24 h-1.5 bg-green-600 rounded-full"></div>
        </div>

        <div className="flex items-center space-x-2 mb-12">
          <span className="text-red-700 font-semibold text-[16px]">Not Insulated Wall</span>
          <div className="w-24 h-1.5 bg-red-700 rounded-full"></div>
        </div>

        {walls.map((wall, index) => (
          <p
            key={index}
            className={`${
              wall.insulate === "Yes"
                ? "text-green-500 font-semibold"
                : "text-rose-700 font-semibold"
            }`}
          >
            {`${wall.location === "Main" ? "" : wall.location + " "} ${wall.elevation} ${wall.floor} CWI Area=(${wall.length}*${wall.height})-(${wall.subtract})=${calculateArea(wall).toFixed(2)}m²`}
          </p>
        ))}

        <p className="mt-12 font-semibold text-green-500">CWI</p>
        <p className="mt-4 font-semibold text-green-500">
          Total Wall Area={totals.totalWallArea}m²
        </p>
        {totals.solidArea > 0 && (
        <p className="mt-4 font-semibold text-green-500">
          Total CWI Wall Area={(totals.totalWallArea - totals.solidArea).toFixed(2)}m²
        </p>
        )}
        {totals.solidArea > 0 && (
         <p className="mt-4 font-semibold text-green-500">
           Total Solid Wall Area={totals.solidArea}m²
         </p>
        )}
        <p className="mt-3 font-semibold text-green-500 border-2 border-green-500 px-2 py-1 w-44">
          Insulated CWI Wall Area={totals.insulatedArea}m²
        </p>
        <p className="mt-3 font-semibold text-green-500">
          %age Insulated={totals.percentInsulated}%
        </p>
        <p className="mt-3 font-semibold text-green-500">
          Popt={totals.percentInsulated}%
        </p>
        <p className="mt-3 font-semibold text-green-500">
          Measure Installed={totals.percentInsulated}%
        </p>
        <p className="mt-3 font-semibold text-green-500">Cavity Wall={totals.totalWallArea > 0 ? Math.round(((totals.totalWallArea - totals.solidArea) / totals.totalWallArea) * 100): 0}%</p>
        {totals.cavityArea > 0 && (
        <p className="mt-3 font-semibold text-green-500">Solid Wall={Math.round((totals.solidArea / totals.totalWallArea) * 100)}%</p>
        )}
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
