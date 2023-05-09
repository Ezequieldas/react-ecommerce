import { useContext } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../OrderCard";
import { totalPrice } from "../../utils";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id != id
    );
    context.setCartProducts(filteredProducts);
  };
  const handleCheckout = () => {
    const orderToAdd = {
      date: "",
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    };
    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
    context.setSearchByTitle(null);
  };

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } lex flex-col fixed right-2 border bg-white border-black rounded-lg w-[340px] h-[calc(100vh-90px)]`}
    >
      <div className="flex justify-between items-center p-6 ">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.closeCheckoutSideMenu()}
          ></XMarkIcon>
        </div>
      </div>
      <div className="px-6 mb-2 ">
        <p className="flex justify-between items-center">
          <span className="font-light text-2xl">Total:</span>
          <span className="font-medium text-2xl">
            ${totalPrice(context.cartProducts)}
          </span>
        </p>
      </div>
      <div className="px-6 overflow-y-scroll ">
        {context.cartProducts.map((product) => (
          <OrderCard
            id={product.id}
            key={product.id}
            title={product.title}
            imageUrl={product.images}
            price={product.price}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="mx-4 my-4 absolute bottom-0 w-full">
        <Link to="/my-orders/last">
          <button
            className="w-[90%] bg-black py-3 text-white rounded-lg"
            onClick={() => [handleCheckout(), context.closeCheckoutSideMenu()]}
          >
            CHECKOUT
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
