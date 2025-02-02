import React, { useState } from 'react';
import { ArrowLeft, Plus, CreditCard, Trash2 } from 'lucide-react';

interface PaymentMethodsPageProps {
  onClose: () => void;
}

const PaymentMethodsPage: React.FC<PaymentMethodsPageProps> = ({ onClose }) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [cards, setCards] = useState([
    {
      id: '1',
      type: 'Visa',
      last4: '4242',
      expiry: '12/24'
    },
    {
      id: '2',
      type: 'Mastercard',
      last4: '8888',
      expiry: '06/25'
    }
  ]);

  const removeCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
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
          <h2 className="text-2xl font-bold">Payment Methods</h2>
        </div>

        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <CreditCard className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="font-medium">{card.type} •••• {card.last4}</p>
                  <p className="text-sm text-gray-600">Expires {card.expiry}</p>
                </div>
              </div>
              <button
                onClick={() => removeCard(card.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <button
            onClick={() => setShowAddCard(true)}
            className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Card</span>
          </button>
        </div>

        {showAddCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Add New Card</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="123"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddCard(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add Card
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

export default PaymentMethodsPage;
