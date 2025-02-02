import React from 'react';
    import { Heart } from 'lucide-react';

    interface ProductCardProps {
      product: any;
      toggleWishlist: (product: any) => void;
      addToCart: (product: any) => void;
      wishlistItems: any[];
      setSelectedProduct: (product: any) => void;
    }

    const ProductCard: React.FC<ProductCardProps> = ({
      product,
      toggleWishlist,
      addToCart,
      wishlistItems,
      setSelectedProduct,
    }) => {
      return (
        <div
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
          onClick={() => setSelectedProduct(product)}
        >
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className={`absolute top-2 right-2 p-2 rounded-full ${
                wishlistItems.find((item) => item.id === product.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-gray-600'
              }`}
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <button
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      );
    };

    export default ProductCard;
