import React from "react";
import Image from "next/image";
import { type CartProps } from "@/components/Cart";
import { type DataProps } from "@/pages/index";

interface CheckoutProps extends CartProps {
  cartItems: DataProps[];
  reset: () => void;
}

const OrderConfirmation: React.FC<CheckoutProps> = ({
  cartItems,
  total,
  reset,
}) => {
  return (
    <div className="fixed left-0 top-0 flex h-[100vh] w-full items-end justify-center bg-rose900/40 sm:items-center md:fixed">
      <div className="w-full flex-col items-center justify-evenly rounded-xl bg-white px-6 py-10 sm:max-h-full md:max-w-[680px]">
        <Image
          className="mb-4 h-12 w-auto"
          src={"/assets/images/icon-order-confirmed.svg"}
          height={50}
          width={50}
          alt={"Confirmed Icon"}
        />
        <div className="my-4 flex-col items-start justify-center">
          <h2 className="mb-2 text-4xl font-bold">Order Confirmed</h2>
          <p className="text-rose400">We hope you enjoy your food!</p>
        </div>
        <div className="my-8 flex-col rounded-lg bg-rose50 px-3 py-4">
          {cartItems.map((item) => {
            const totalOfItem = item.quantity * item.price;
            return (
              <>
                <div key={item.id} className="mb-3 flex h-16 last:mb-0">
                  <Image
                    src={item.image.thumbnail}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="w-auto rounded-lg"
                  />
                  <div className="flex w-full min-w-0 items-center justify-between">
                    <div className="ml-4 min-w-0 flex-1 flex-col items-stretch justify-between">
                      <span className="w-full truncate font-normal text-rose900">
                        {item.name}
                      </span>
                      <div className="flex items-center justify-start gap-8">
                        <span className="font-medium text-red">
                          {item.quantity}x
                        </span>
                        <span className="text-rose400">
                          @ ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <p className="font-medium text-rose900">
                      ${totalOfItem.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mb-3 border border-b-rose50" />
              </>
            );
          })}
          <div className="mb-3 mt-6 flex items-center justify-between">
            <p>Order Total</p>{" "}
            <p className="text-3xl font-bold">${total.toFixed(2)}</p>
          </div>
        </div>
        <button
          onClick={reset}
          className="hover:bg-redHover h-14 w-full rounded-full bg-red text-white"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
