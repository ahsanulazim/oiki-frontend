import TakaSymbol from "@/components/ui/TakaSymbol";
import OrderDataAccordion from "../OrderDataAccordion";

const OrderSummary = ({ order }) => {
  const totalProducts = order.products.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <OrderDataAccordion
      title={"Order Summary"}
      badge={"Payment Pending"}
      badgeColor={"badge-warning"}
    >
      <div className="collapse-content text-sm">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-5">
            <div className="flex-2">Subtotal</div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                {totalProducts} {totalProducts === 1 ? "Item" : "Items"}
              </div>
              <div>
                <TakaSymbol />
                {order.subtotal}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-5">
            <div className="flex-2">Discount</div>
            <div className="flex-1 flex justify-between items-center">
              <div>No coupons</div>
              <div>
                <TakaSymbol />
                {order.discount || 0}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div className="flex-2">Shipping</div>
            <div className="flex-1 flex justify-between items-center">
              <div>Standard Shipping</div>
              <div>
                <TakaSymbol />
                {order.shippingCharge}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-5 font-bold text-base">
            <div>Total</div>
            <div>
              <TakaSymbol />
              {order.totalPrice}
            </div>
          </div>
        </div>
      </div>
    </OrderDataAccordion>
  );
};

export default OrderSummary;
