import React from "react";
import { SectionTitle } from "../../shared/components/section-title";

export function GridCategorySection() {
  return (
    <div className="bg-muted py-10 px-4">
      <SectionTitle title="Browse by cateogry" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 max-w-7xl m-auto mb-6">
        <div className="bg-white rounded-xl h-80  "></div>
        <div className="bg-white rounded-xl h-80 md:col-span-2"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 max-w-7xl m-auto">
        <div className="bg-white rounded-xl h-80 md:col-span-2"></div>
        <div className="bg-white rounded-xl h-80"></div>
      </div>
    </div>
  );
}
