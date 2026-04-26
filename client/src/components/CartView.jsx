import React from "react";
import api from "../api/axios";

const CartView = ({ cart, updateCart }) => {

  if (!cart || !cart.items || cart.items.length === 0) {
    return <p>No items in cart</p>;
  }

  const changeQty = async (name, action) => {

    try {

      const transcript =
        action === "add"
          ? `add one ${name}`
          : `remove one ${name}`;

      const res = await api.post("/billing/command", {
        transcript
      });

      if (res.data.total !== undefined) {
        updateCart(res.data);
      }

    } catch (err) {
      console.error(err);
    }

  };

  return (

    <div className="space-y-4">

      <table className="w-full border-collapse">

        <thead>
          <tr className="border-b">
            <th className="text-left">Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {cart.items.map((item, index) => {

            const subtotal = item.quantity * item.price;

            return (
              <tr key={index} className="border-b">

                <td>{item.name}</td>

                <td className="flex items-center justify-center gap-2">

                  <button
                    onClick={() => changeQty(item.name, "remove")}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    −
                  </button>

                  {item.quantity}

                  <button
                    onClick={() => changeQty(item.name, "add")}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>

                </td>

                <td>₹{item.price}</td>
                <td>₹{subtotal}</td>

              </tr>
            );

          })}
        </tbody>

      </table>

      <h3 className="text-right font-semibold">
        Total: ₹{cart.total}
      </h3>

    </div>
  );
};

export default CartView;