import { Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";

function AddToCartControls({ productId }) {
  const { cart, dispatch } = useCart();

  const item = cart.find((i) => i.id === productId);
  const quantity = item?.quantity || 0;

  const handleAdd = () => {
    dispatch({ type: "ADD_ITEM", payload: productId });
  };

  const handleIncrement = () => {
    dispatch({ type: "INCREMENT_ITEM", payload: productId });
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      dispatch({ type: "REMOVE_ITEM", payload: productId });
    } else {
      dispatch({ type: "DECREMENT_ITEM", payload: productId });
    }
  };

  return (
    <>
      {quantity === 0 ? (
        <Button variant="primary" onClick={handleAdd}>
          Add to Cart
        </Button>
      ) : (
        <div className="d-flex align-items-center">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={handleDecrement}
          >
            -
          </Button>
          <span className="mx-2">{quantity}</span>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={handleIncrement}
          >
            +
          </Button>
        </div>
      )}
    </>
  );
}

export default AddToCartControls;
