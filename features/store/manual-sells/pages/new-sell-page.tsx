"use client";

import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

export function NewSellPage() {
  const [codes, setCodes] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Activates scan mode and instantly targets the hidden input
  const enableScanMode = () => {
    setIsScanning(true);
    // Timeout ensures the input is rendered/visible in the DOM before focusing
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (value.trim() !== "") {
        setCodes((prev) => [...prev, value]);
        setValue(""); // Clear text back to empty ready for the next QR scan
      }
    }
  };

  return (
    <div className="space-y-6 p-5 max-w-md mx-auto">
      {/* 1. Interactive Button Interface */}
      <button
        onClick={enableScanMode}
        // Disables scan mode visually and structurally if focus leaves to another element
        onBlur={(e) => {
          // Check if the newly focused element is outside this scanning context
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsScanning(false);
          }
        }}
        className={`w-full p-6 -xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group
          ${
            isScanning
              ? "bg-accent border-emerald-500 shadow-lg shadow-emerald-100 ring-2 ring-emerald-500/20"
              : "bg-accent border-dashed border-slate-300 hover:border-slate-400 active:bg-accent"
          }`}
      >
        {/* Pulsing radar ring element shown only when actively scanning */}
        {isScanning && (
          <span className="absolute inset-0 bg-accent0/5 animate-ping -xl pointer-events-none" />
        )}

        <div className="flex items-center justify-center w-12 h-12 -full transition-colors">
          {isScanning ? (
            <span className="text-2xl animate-pulse">🟢</span>
          ) : (
            <span className="text-2xl group-hover:scale-110 transition-transform">
              🖨️
            </span>
          )}
        </div>

        <div className="text-center z-10">
          <p
            className={`font-semibold text-lg ${isScanning ? "text-emerald-700" : "text-slate-700"}`}
          >
            {isScanning ? "Scan Mode is Active" : "Click to Enable Scanner"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {isScanning
              ? "Aim barcode gun and click hardware trigger"
              : "Awaiting activation trigger"}
          </p>
        </div>

        {/* 2. Hidden Background Input */}
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          // Cleans up state variables if focus drops out
          onBlur={() => setIsScanning(false)}
          // Completely hidden visually, but present in the DOM layout for event listeners
          className="absolute opacity-0 pointer-events-none w-0 h-0"
          placeholder="Hidden background collector"
          autoComplete="off"
        />
      </button>

      {/* 3. Scanned Codes Results List Display */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider px-1">
          Scanned Batch Items ({codes.length})
        </h3>
        {codes.length === 0 ? (
          <div className="text-sm text-slate-400 text-center py-8 border border-dashed border-slate-200  bg-accent/50">
            No items captured yet.
          </div>
        ) : (
          <div className="bg-accent  border border-slate-200 divide-y divide-slate-200 max-h-60 overflow-y-auto">
            {codes.map((code, i) => (
              <div
                key={i}
                className="p-3 text-sm font-mono text-slate-700 flex items-center justify-between"
              >
                <span>{code}</span>
                <span className="text-xs text-slate-400 bg-accent  border px-1.5 py-0.5 ">
                  #{i + 1}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
