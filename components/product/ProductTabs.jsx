import parse from "html-react-parser";

const ProductTabs = ({ product }) => {
  const description = product?.productDescription
    ? product.productDescription.replace(/\u00A0/g, " ")
    : "No description available.";

  return (
    <section className="my-10 px-5">
      <div className="max-w-360 mx-auto w-full">
        <div className="tabs tabs-lift">
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Description"
            defaultChecked
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 wrap-break-word whitespace-normal">
            {parse(description)}
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Return Policy"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            {product?.returnPolicy || "No return policy specified."}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;
