"use client";
import { useState } from "react";
import AdminEmptyState from "./AdminEmptyState";

interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
}

interface AdminDataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  sortable?: boolean;
  maxRows?: number;
  emptyLabel?: string;
}

export default function AdminDataTable({ columns, data, sortable = true, maxRows, emptyLabel = "데이터가 없습니다." }: AdminDataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  function toggleSort(key: string) {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  let rows = [...data];
  if (sortKey) {
    rows.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      const as = String(av ?? "");
      const bs = String(bv ?? "");
      return sortDir === "asc" ? as.localeCompare(bs) : bs.localeCompare(as);
    });
  }
  if (maxRows) rows = rows.slice(0, maxRows);

  if (data.length === 0) {
    return <AdminEmptyState title={emptyLabel} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => col.sortable !== false && sortable ? toggleSort(col.key) : undefined}
                className={`px-3 py-2.5 text-xs font-semibold text-gray-500 ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"} ${sortable && col.sortable !== false ? "cursor-pointer hover:text-gray-800" : ""} select-none`}
              >
                {col.label}
                {sortable && col.sortable !== false && sortKey === col.key && (
                  <span className="ml-1 text-indigo-500">{sortDir === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              {columns.map(col => (
                <td key={col.key} className={`px-3 py-2.5 ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : ""}`}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
