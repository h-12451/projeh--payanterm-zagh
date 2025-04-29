import useStore from '../store/store';
import Count from './Count';

const Cart = () => {
  const { isCartOpen, cart, toggleCart, removeFromCart, updateQuantity } = useStore();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">سبد خرید ({cart.length})</h2>
          <button 
            onClick={toggleCart}
            className="text-3xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              سبد خرید خالی است
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600 mt-1">{item.price.toLocaleString()} تومان</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    حذف
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <Count
                    count={item.quantity}
                    onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                    onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                  />
                  <p className="font-medium">
                    {(item.price * item.quantity).toLocaleString()} تومان
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">مجموع:</span>
              <span className="font-bold text-xl">{total.toLocaleString()} تومان</span>
            </div>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
              پرداخت
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;