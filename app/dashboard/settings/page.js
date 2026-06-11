import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import Settings from "@/components/dashboard/settings/Settings";

const page = () => {
  return (
    <>
      <Breadcrumbs title="Settings" />
      <section className="mb-5">
        <h2 className="font-bold text-2xl w-1/2">Settings</h2>
      </section>
      <section>
        <Settings />
      </section>
    </>
  );
};

export default page;
