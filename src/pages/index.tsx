import Head from "next/head";
import { useEffect, useState } from "react";
// Local imports
import Cart from "@/components/Cart";
import Item from "@/components/Item";
import OrderConfirmation from "@/components/OrderConfirmation";

export interface DataProps {
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
    thumbnail: string;
  };
  name: string;
  category: string;
  price: number;
  id: string;
  isAddedToCart: boolean;
  quantity: number;
  total: number;
}

export default function Home() {
  const [items, setItems] = useState<DataProps[]>([]);
  const [cart, setCart] = useState<DataProps[]>([]);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);

  // Fetch data from the JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = (await response.json()) as DataProps[];
        const updatedItems = data.map((item) => ({
          ...item,
          id: item.name,
          isAddedToCart: false,
          quantity: 0,
          totalOfItem: 0,
        }));
        setItems(updatedItems);
      } catch (error) {
        console.error("error fetching data:", error);
      }
    };
    void fetchData();
  }, []);

  // Add to cart function
  const addToCart = (item: DataProps) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, isAddedToCart: true, quantity: 1 }
          : prevItem,
      ),
    );
    setCart((prevCart) => [
      ...prevCart,
      { ...item, isAddedToCart: true, quantity: 1 },
    ]);
    updateTotal();
  };

  // Remove from cart function
  const removeFromCart = (item: DataProps) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, isAddedToCart: false, quantity: 0 }
          : prevItem,
      ),
    );
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== item.id),
    );
    updateTotal();
  };

  // Increase quantity function
  const increaseQuantity = (item: DataProps) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, quantity: prevItem.quantity + 1 }
          : prevItem,
      ),
    );
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      ),
    );
    updateTotal();
  };

  // Decrease quantity function
  const decreaseQuantity = (item: DataProps) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? prevItem.quantity === 1
            ? { ...prevItem, quantity: 0, isAddedToCart: false }
            : { ...prevItem, quantity: prevItem.quantity - 1 }
          : prevItem,
      ),
    );
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
    updateTotal();
  };

  // Total per item
  const calculateTotalOfItem = (item: DataProps) => {
    return item.price * item.quantity;
  };

  // Total all items
  const calculateTotal = (cart: DataProps[]) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const updateTotal = () => {
    setTotal(calculateTotal(cart));
  };

  // handle checkout
  const handleCheckout: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();
    setCheckoutOpen(true);
  };

  // Reset cart
  const reset = () => {
    setCart([]);
    setItems((prevItems) =>
      prevItems.map((prevItem) => ({
        ...prevItem,
        isAddedToCart: false,
        quantity: 0,
      })),
    );
    setTotal(0);
    setCheckoutOpen(false);
  };

  return (
    <>
      <Head>
        <title>Product List with Cart</title>
        <meta name="description" content="product-list-with-cart" />
        <link rel="icon" href="/assets/images/favicon-32x32.png" />
      </Head>
      <main className="relative flex min-h-screen flex-col items-center justify-center gap-8 bg-rose50 px-4 py-4 font-redHatText lg:flex-row lg:items-start lg:px-8 lg:py-10 xl:px-16">
        {/* Desserts Container */}
        <div className="flex h-full w-full flex-col items-center justify-center lg:w-2/3">
          <h2 className="mb-6 self-start text-4xl font-bold tracking-wide">
            Desserts
          </h2>
          {items.length === 0 ? (
            <p>No items available</p>
          ) : (
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Item
                  addToCart={addToCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  calculateTotalOfItem={calculateTotalOfItem}
                  key={item.id}
                  item={item}
                  isAddedToCart={item.isAddedToCart}
                  quantity={item.quantity}
                />
              ))}
            </div>
          )}
        </div>
        {/* Cart Container */}
        <div className="sticky top-10 h-full w-full lg:w-1/3">
          <Cart
            cartItems={cart}
            removeFromCart={removeFromCart}
            total={total}
            handleCheckout={handleCheckout}
          />
        </div>
        {checkoutOpen && (
          <OrderConfirmation cartItems={cart} total={total} reset={reset} />
        )}
      </main>
    </>
  );
}
