import React from 'react';
import { ArrowLeft, Package } from 'lucide-react';

interface OrdersPageProps {
  onClose: () => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ onClose }) => {
  const orders = [
    {
      id: '1',
      date: '2024-03-15',
      status: 'Delivered',
      total: 159.97,
      items: [
        { name: 'Classic White T-Shirt', quantity: 2, price: 29.99 },
        { name: 'Slim Fit Jeans', quantity: 1, price: 99.99 }
      ]
    },
    {
      id: '2',
      date: '2024-03-10',
      status: 'Processing',
      total: 79.99,
      items: [
        { name: 'Floral Summer Dress', quantity: 1, price: 79.99 }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center mb-8">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">My Orders</h2>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Package className="w-10 h-10 text-gray-400" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${item.price}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">${order.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
