import React, { useState } from 'react';
import { ArrowLeft, Plus, MapPin, Trash2, Home } from 'lucide-react';

interface AddressesPageProps {
  onClose: () => void;
}

const AddressesPage: React.FC<AddressesPageProps> = ({ onClose }) => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'Home',
      street: '123 Main St',
      city: 'Bangkok',
      state: 'Bangkok',
      zipCode: '10110',
      isDefault: true
    },
    {
      id: '2',
      name: 'Office',
      street: '456 Business Ave',
      city: 'Bangkok',
      state: 'Bangkok',
      zipCode: '10120',
      isDefault: false
    }
  ]);

  const removeAddress = (id: string) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center mb-8">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">My Addresses</h2>
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Home className="w-6 h-6 text-gray-400 mt-1" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{address.name}</p>
                      {address.isDefault && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{address.street}</p>
                    <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeAddress(address.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => setShowAddAddress(true)}
            className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Address</span>
          </button>
        </div>

        {showAddAddress && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Add New Address</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="e.g., Home, Office"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Street address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="State"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="ZIP code"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="defaultAddress"
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="defaultAddress" className="ml-2 text-sm text-gray-700">
                    Set as default address
                  </label>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddAddress(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressesPage;
