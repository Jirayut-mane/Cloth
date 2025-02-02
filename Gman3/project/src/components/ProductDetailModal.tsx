import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';

interface ProductDetailModalProps {
  selectedProduct: any;
  setSelectedProduct: (product: any) => void;
  addToCart: (product: any, options: any) => void;
  toggleWishlist: (product: any, options: any) => void;
  wishlistItems: any[];
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  selectedProduct,
  setSelectedProduct,
  addToCart,
  toggleWishlist,
  wishlistItems,
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setError('Please select both size and color');
      return;
    }
    
    const productWithOptions = {
      ...selectedProduct,
      selectedSize,
      selectedColor,
      quantity
    };
    
    addToCart(productWithOptions);
    setSelectedProduct(null);
  };

  const handleWishlist = () => {
    const productWithOptions = {
      ...selectedProduct,
      selectedSize,
      selectedColor
    };
    toggleWishlist(productWithOptions);
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Black', class: 'bg-black' },
    { name: 'White', class: 'bg-white' },
    { name: 'Blue', class: 'bg-blue-500' },
    { name: 'Red', class: 'bg-red-500' },
    { name: 'Green', class: 'bg-green-500' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-semibold">{selectedProduct.name}</h3>
          <button
            onClick={() => setSelectedProduct(null)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold">${selectedProduct.price}</h4>
              <p className="text-gray-600 mt-2">
                {selectedProduct.description || 'No description available'}
              </p>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Size
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 border rounded-lg ${
                        selectedSize === size
                          ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                          : 'hover:border-indigo-600 hover:text-indigo-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Color
                </label>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full ${color.class} border-2 ${
                        selectedColor === color.name
                          ? 'border-indigo-600 ring-2 ring-indigo-600 ring-offset-2'
                          : 'border-gray-300 hover:border-indigo-600'
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border rounded-lg hover:border-indigo-600"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border rounded-lg hover:border-indigo-600"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`p-3 border rounded-lg ${
                  wishlistItems.find((item) => item.id === selectedProduct.id)
                    ? 'bg-red-500 text-white border-red-500'
                    : 'hover:border-indigo-600 hover:text-indigo-600'
                }`}
              >
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;