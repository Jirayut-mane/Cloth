import React, { useState } from 'react';
import { Heart, ArrowLeft, X } from 'lucide-react';
import ProductDetailModal from './ProductDetailModal';

interface WishlistPageProps {
  showWishlist: boolean;
  setShowWishlist: (show: boolean) => void;
  wishlistItems: any[];
  toggleWishlist: (product: any) => void;
  addToCart: (product: any) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({
  showWishlist,
  setShowWishlist,
  wishlistItems,
  toggleWishlist,
  addToCart,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
  };

  return (
    showWishlist && (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center mb-8">
            <button
              onClick={() => setShowWishlist(false)}
              className="p-2 hover:bg-gray-100 rounded-full mr-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold">Wishlist ({wishlistItems.length})</h2>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-600">Your wishlist is empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-2">${item.price}</p>
                    {item.selectedSize && item.selectedColor && (
                      <div className="mb-4 text-sm text-gray-500">
                        <p>Size: {item.selectedSize}</p>
                        <p>Color: {item.selectedColor}</p>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="p-2 border rounded-lg hover:bg-gray-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedProduct && (
          <ProductDetailModal
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlistItems={wishlistItems}
          />
        )}
      </div>
    )
  );
};

export default WishlistPage;