import axios from "axios";

const OrderModal = ({ order, onClose, onUpdate }: any) => {
  const updateStatus = async (status: string) => {
    const token = localStorage.getItem("accessToken");
    await axios.put(`http://localhost:5000/api/v1/orders/${order._id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    onUpdate();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl w-96">
        <h3 className="text-xl font-bold mb-4">Update Order Status</h3>
        <div className="flex flex-col gap-3">
          {['Pending', 'Shipped', 'Delivered'].map(status => (
            <button key={status} onClick={() => updateStatus(status)} className="bg-gray-100 p-3 rounded-xl hover:bg-green-100">
              {status}
            </button>
          ))}
          <button onClick={onClose} className="mt-4 text-red-600">Cancel</button>
        </div>
      </div>
    </div>
  );
};