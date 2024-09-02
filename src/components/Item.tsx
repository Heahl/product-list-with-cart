import React, { useState } from "react";
import Image from "next/image";
import { type DataProps } from "@/pages/index";

interface ItemProps {
  item: DataProps;
  addToCart: (item: DataProps) => void;
  increaseQuantity: (item: DataProps) => void;
  decreaseQuantity: (item: DataProps) => void;
  calculateTotalOfItem: (item: DataProps) => number;
  isAddedToCart: boolean;
  quantity: number;
}

const Item: React.FC<ItemProps> = ({
  item,
  addToCart,
  isAddedToCart,
  quantity,
  increaseQuantity,
  decreaseQuantity,
  calculateTotalOfItem,
}) => {
  const [decrementHover, setDecrementHover] = useState<boolean>(false);
  const [incrementHover, setIncrementHover] = useState<boolean>(false);

  const handleAddToCart = (item: DataProps) => {
    if (!isAddedToCart) {
      addToCart(item);
    }
  };

  return (
    <div
      className="my-3 flex h-full w-full transform flex-col transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
      onClick={() => handleAddToCart(item)}
    >
      {/* Images */}
      <div
        className={`h-68 relative mb-8 flex w-full rounded-xl ${isAddedToCart ? "border-2 border-red" : ""} `}
      >
        <div className="block h-full w-full md:hidden">
          <Image
            className="h-full w-full rounded-xl"
            src={item.image.mobile}
            width={100}
            height={100}
            alt={item.name}
          />
        </div>
        <div className="hidden h-full w-full object-contain md:block lg:hidden">
          <Image
            className="h-full w-full rounded-xl"
            src={item.image.tablet}
            width={100}
            height={100}
            alt={item.name}
          />
        </div>
        <div className="hidden h-full w-full lg:block">
          <Image
            className="h-full w-full rounded-xl object-cover"
            src={item.image.desktop}
            width={100}
            height={100}
            alt={item.name}
          />
        </div>
        {/* maybe just quantity === 0??? */}
        {!isAddedToCart && quantity === 0 ? (
          //  Add to Cart Button
          <button className="border-rose800 absolute bottom-0 left-1/2 flex h-12 w-auto min-w-44 -translate-x-1/2 translate-y-1/2 items-center justify-center gap-2 rounded-full border border-rose300 bg-rose50 px-8 text-sm font-medium text-rose900 hover:border-red">
            <Image
              className="h-5 w-5"
              src={"/assets/images/icon-add-to-cart.svg"}
              width={24}
              height={24}
              alt="Add to Cart"
            />
            Add to Cart
          </button>
        ) : (
          // Manipulate Quantity Button
          <div className="absolute bottom-0 left-1/2 flex h-12 w-auto min-w-44 -translate-x-1/2 translate-y-1/2 items-center justify-between rounded-full border border-red bg-red px-2 text-sm font-medium text-rose900">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-red p-1 hover:bg-white"
              onClick={() => {
                decreaseQuantity(item);
                calculateTotalOfItem(item);
              }}
              onMouseEnter={() => setDecrementHover(true)}
              onMouseLeave={() => setDecrementHover(false)}
            >
              <Image
                className="h-1 w-auto"
                src={
                  !decrementHover
                    ? "/assets/images/icon-decrement-quantity.svg"
                    : "/assets/images/icon-decrement-quantity-inverted.svg"
                }
                height={24}
                width={24}
                alt="Decrement Quantity"
              />
            </button>
            <p className="text-lg text-white">{quantity}</p>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-red p-1 hover:bg-white"
              onClick={() => {
                increaseQuantity(item);
                calculateTotalOfItem(item);
              }}
              onMouseEnter={() => setIncrementHover(true)}
              onMouseLeave={() => setIncrementHover(false)}
            >
              <Image
                className="h-5 w-auto"
                src={
                  !incrementHover
                    ? "/assets/images/icon-increment-quantity.svg"
                    : "/assets/images/icon-increment-quantity-inverted.svg"
                }
                height={24}
                width={24}
                alt="Increment Quantity"
              />
            </button>
          </div>
        )}
      </div>
      {/* Item details */}
      <p className="text-sm text-rose400">{item.category}</p>
      <p className="text-lg font-medium">{item.name}</p>
      <p className="text-lg font-medium text-red">${item.price.toFixed(2)}</p>
    </div>
  );
};

export default Item;
