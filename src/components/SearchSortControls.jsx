import React from "react";
import { Search, Filter, ChevronDown, X } from "lucide-react";

const SearchSortControls = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  showSortMenu,
  setShowSortMenu,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Tìm kiếm địa điểm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowSortMenu(!showSortMenu)}
          className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          <div className="flex items-center">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm">
              Sắp xếp theo: {sortBy === "rating" ? "Đánh giá" : "Tên"}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {showSortMenu && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <button
              onClick={() => {
                setSortBy("name");
                setShowSortMenu(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
            >
              Tên
            </button>
            <button
              onClick={() => {
                setSortBy("rating");
                setShowSortMenu(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
            >
              Đánh giá
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSortControls;
