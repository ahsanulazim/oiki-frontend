import OverviewCard from "./OverviewCard";

const OrderOverview = () => {
  const overviews = [
    {
      id: 1,
      title: "On the Way",
      count: 5,
    },
    {
      id: 2,
      title: "Delivered",
      count: 5,
    },
    {
      id: 3,
      title: "Pending",
      count: 5,
    },
    {
      id: 4,
      title: "Cancelled",
      count: 5,
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 lg:grid-cols-4">
        {overviews.map((overview) => (
          <OverviewCard key={overview.id} overview={overview} />
        ))}
      </div>
    </section>
  );
};

export default OrderOverview;
