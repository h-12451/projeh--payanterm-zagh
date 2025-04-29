const Count = ({ count, onIncrement, onDecrement }) => {
    return (
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
        <button
          onClick={onDecrement}
          disabled={count <= 1}
          className="text-gray-600 disabled:opacity-50"
        >
          -
        </button>
        <span className="font-medium">{count}</span>
        <button
          onClick={onIncrement}
          className="text-gray-600"
        >
          +
        </button>
      </div>
    );
  };
  
  export default Count;