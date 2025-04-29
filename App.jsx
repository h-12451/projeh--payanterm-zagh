import { useEffect, useState } from 'react';
import useStore from './store/store'
import Navbar from './components/Navbar';
import Cart from './components/Cart/Cart.jsx'

const App = () => {
  const { searchQuery } = useStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // تولید 10 محصول نمونه
    const generateProducts = () => {
      return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `کفش ورزشی مدل ${i + 1}`,
        price: Math.floor(Math.random() * (500000 - 200000 + 1)) + 200000,
        image: `https://picsum.photos/200/300?random=${i + 1}`
      }));
    };
    
    setProducts(generateProducts());
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Cart />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600 mt-2">
                  {product.price.toLocaleString()} تومان
                </p>
                <button
                  onClick={() => useStore.getState().addToCart(product)}
                  className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  افزودن به سبد خرید
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};



export default App;