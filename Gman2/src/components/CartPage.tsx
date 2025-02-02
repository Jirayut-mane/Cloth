import React from 'react';
    import { ShoppingCart, ArrowLeft, X } from 'lucide-react';

    interface CartPageProps {
      showCart: boolean;
      setShowCart: (show: boolean) => void;
      cartItems: any[];
      updateQuantity: (itemId: number, change: number) => void;
      removeFromCart: (itemId: number) => void;
      calculateTotal: () => string;
      products: any[];
    }

    const CartPage: React.FC<CartPageProps> = ({
      showCart,
      setShowCart,
      cartItems,
      updateQuantity,
      removeFromCart,
      calculateTotal,
      products,
    }) => {
      return (
        showCart && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="flex items-center mb-8">
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-full mr-4"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold">Shopping Cart ({cartItems.length})</h2>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-xl text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-6 mb-8">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                        <div className="flex items-center space-x-4">
                          <img
                            src={products.find((p) => p.id === item.id)?.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-600">${item.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${calculateTotal()}</span>
                    </div>
                    <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      );
    };

    export default CartPage;
