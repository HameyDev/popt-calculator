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
    totalWallArea: 0,
    insulatedArea: 0,
    cavityArea: 0,
    percentInsulated: 0,
  });

  const reportRef = useRef(null);

  // ✅ Correct area calculation (meters only)
  const calculateArea = (wall) => {
    const length = Number(wall.length) || 0;
    const height = Number(wall.height) || 0;
    const subtract = Number(wall.subtract) || 0;

    const area = length * height - subtract;
    return area > 0 ? Number(area.toFixed(2)) : 0;
  };

  useEffect(() => {
    let total = 0;
    let insulated = 0;
    let cavity = 0;

    walls.forEach((wall) => {
      const area = calculateArea(wall);
      total += area;

      if (wall.cavity === "Yes") {
        cavity += area;
      } else if (wall.insulate === "Yes") {
        insulated += area;
      }
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
    updated[index] = { ...updated[index], [field]: value };
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
    setWalls(walls.filter((_, i) => i !== index));
  };

  const generateReport = async () => {
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", 1);
    link.download = "IWI_Report.jpg";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-gray-100 to-amber-100 p-4 sm:p-8 pt-24">
      <h1 className="text-3xl font-extrabold text-center text-orange-600 mb-6">
        🏠 IWI POPT Calculator
      </h1>

      <div className="overflow-x-auto">
        <div className="min-w-[900px] grid grid-cols-10 gap-2 bg-gray-200 p-2 font-semibold rounded">
          {[
            "Location",
            "Elevation",
            "Floor",
            "Wall Length (m)",
            "Ceiling Height (m)",
            "Subtract Area (m²)",
            "Insulate",
            "Cavity",
            "Total Wall Area",
            "Action",
          ].map((h) => (
            <span key={h} className="text-center">{h}</span>
          ))}
        </div>

        {walls.map((wall, index) => (
          <div key={index} className="min-w-[900px] grid grid-cols-10 gap-2 py-2 border-b">
            {["location", "elevation", "floor"].map((field) => (
              <select
                key={field}
                value={wall[field]}
                onChange={(e) => handleChange(index, field, e.target.value)}
                className="border p-1 rounded"
              >
                {(field === "location"
                  ? ["Main", "Ext 1", "Ext 2", "Ext 3", "Ext 4"]
                  : field === "elevation"
                  ? ["Front", "Rear", "Side"]
                  : ["GF", "FF", "SF"]
                ).map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            ))}

            {["length", "height", "subtract"].map((field) => (
              <input
                key={field}
                type="number"
                step="0.01"
                placeholder="0.00"
                value={wall[field]}
                onChange={(e) => handleChange(index, field, e.target.value)}
                className="border p-1 rounded"
              />
            ))}

            {["insulate", "cavity"].map((field) => (
              <select
                key={field}
                value={wall[field]}
                onChange={(e) => handleChange(index, field, e.target.value)}
                className="border p-1 rounded"
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            ))}

            <span className="font-semibold text-orange-600">
              {calculateArea(wall)} m²
            </span>

            <button
              onClick={() => removeWall(index)}
              className="px-2 py-1 bg-red-600 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addWall}
        className="mt-4 px-4 py-2 bg-orange-600 text-white rounded w-full sm:w-auto"
      >
        + Add Wall
      </button>

      <div
        ref={reportRef}
        className="mt-10 bg-white p-6 rounded shadow text-[10px] max-w-lg mx-auto"
      >
        <p>Total Wall Area = {totals.totalWallArea} m²</p>
        <p>Solid Wall Area = {(totals.totalWallArea - totals.cavityArea).toFixed(2)} m²</p>
        <p>Insulated Solid Wall Area = {totals.insulatedArea} m²</p>
        <p>POPT = {Math.floor(totals.percentInsulated)}%</p>
      </div>

      <button
        onClick={generateReport}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded w-full sm:w-auto"
      >
        Generate Report (JPEG)
      </button>
    </div>
  );
}
