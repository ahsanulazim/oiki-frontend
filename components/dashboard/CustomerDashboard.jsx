import OrderOverview from "./customer-dashboard/OrderOverview";
import OrderTracking from "./customer-dashboard/OrderTracking";

const CustomerDashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
      <div className="col-span-12 md:col-span-6 lg:col-span-8">
        <OrderOverview />
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <OrderTracking />
      </div>
    </div>
  );
};

export default CustomerDashboard;
