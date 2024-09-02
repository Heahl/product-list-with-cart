import React from "react";
import Image from "next/image";
import { type DataProps } from "@/pages/index";

export interface CartProps {
  cartItems: DataProps[];
  removeFromCart: (item: DataProps) => void;
  total: number;
  handleCheckout: React.MouseEventHandler<HTMLButtonElement>;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  removeFromCart,
  total,
  handleCheckout,
}) => {
  return (
    <div className="flex min-h-72 w-full flex-col items-center justify-start gap-4 rounded-xl bg-white px-4 py-6">
      <p className="mb-2 self-start text-2xl font-bold text-red">
        Your Cart ({cartItems.length})
      </p>
      {cartItems.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <Image
            className="h-32 w-auto"
            src="/assets/images/illustration-empty-cart.svg"
            width={100}
            height={100}
            alt="Shopping Cart"
          />
          <p className="text-sm font-medium text-rose500">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          <div className="h-full min-h-64 w-full flex-col items-start justify-center gap-2">
            {cartItems.map((item) => {
              const totalOfItem = item.price * item.quantity;
              return (
                <>
                  <div
                    key={item.id}
                    className="mb-2 mt-4 flex w-full items-center justify-between text-rose900"
                  >
                    <div className="flex-col items-center justify-start">
                      <div className="mb-1 flex items-center justify-start">
                        <p>{item.name}</p>
                      </div>
                      <div className="flex items-center justify-start gap-4">
                        <p className="font-medium text-red">{item.quantity}x</p>
                        <p className="font-light text-rose400">
                          @ ${item.price.toFixed(2)}
                        </p>
                        <p className="font-medium text-rose500">
                          ${totalOfItem.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-rose400 hover:bg-rose400"
                      onClick={() => removeFromCart(item)}
                    >
                      <Image
                        className="h-3 w-auto"
                        src="/assets/images/icon-remove-item.svg"
                        width={24}
                        height={24}
                        alt="Remove Item"
                      />
                    </button>
                  </div>
                  <div className="w-full border-b border-rose100" />
                </>
              );
            })}
          </div>
          {/* Order Total + Confirm Order */}
          <div className="w-full translate-y-4 flex-col items-center justify-end">
            <div className="flex h-16 items-center justify-between">
              <p>Order Total</p>
              <p className="text-2xl font-bold">${total.toFixed(2)}</p>
            </div>
            <div className="flex h-12 items-center justify-center gap-2 rounded-xl bg-rose50">
              <Image
                src={"/assets/images/icon-carbon-neutral.svg"}
                height={24}
                width={24}
                alt="Carbon Neutral Icon"
              />
              <p>
                This is a <strong>carbon-neutral</strong> delivery
              </p>
            </div>
            <div className="flex h-16 items-center justify-center">
              <button
                className="hover:bg-redHover mt-2 flex h-12 w-full items-center justify-center rounded-full bg-red text-white"
                onClick={handleCheckout}
              >
                <p className="">Confirm Order</p>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
