import AccountInfo from "./customer-dashboard/AccountInfo";
import MyWishlist from "./customer-dashboard/MyWishlist";
import OrderOverview from "./customer-dashboard/OrderOverview";
import OrderTracking from "./customer-dashboard/OrderTracking";
import RecentlyViewed from "./customer-dashboard/RecentlyViewed";
import RecentOrders from "./customer-dashboard/RecentOrders";

const CustomerDashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
      <div className="col-span-12 flex flex-col gap-5 md:col-span-6 lg:col-span-8">
        <OrderOverview />
        <MyWishlist />
        <RecentlyViewed />
        <RecentOrders />
      </div>
      <div className="col-span-12 flex flex-col gap-5 md:col-span-6 lg:col-span-4">
        <OrderTracking />
        <AccountInfo />
      </div>
    </div>
  );
};

export default CustomerDashboard;
