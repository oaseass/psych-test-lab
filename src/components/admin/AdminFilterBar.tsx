"use client";
import { useState } from "react";

interface FilterItem {
  label: string;
  value: string;
}

interface AdminFilterBarProps {
  filters: FilterItem[];
  active: string;
  onChange: (value: string) => void;
}

export default function AdminFilterBar({ filters, active, onChange }: AdminFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            active === f.value
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
