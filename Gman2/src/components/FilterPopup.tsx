import React from 'react';
    import { X, SlidersHorizontal } from 'lucide-react';

    interface FilterPopupProps {
      showFilters: boolean;
      setShowFilters: (show: boolean) => void;
      filters: any;
      setFilters: (filters: any) => void;
    }

    const FilterPopup: React.FC<FilterPopupProps> = ({
      showFilters,
      setShowFilters,
      filters,
      setFilters,
    }) => {
      return (
        showFilters && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Filter Products</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => {
                      setFilters({
                        sort: 'newest',
                      });
                    }}
                    className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      );
    };

    export default FilterPopup;
