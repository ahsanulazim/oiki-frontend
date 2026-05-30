const OrderDataAccordion = ({ title, children }) => {
  return (
    <details className="collapse bg-base-100 border border-base-300" open>
      <summary className="collapse-title font-semibold">{title}</summary>
      {children}
    </details>
  );
};

export default OrderDataAccordion;
