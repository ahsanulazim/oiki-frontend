import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import AddAVariant from "@/components/dashboard/variants/add-variant/AddAVariant";
import AddedVariants from "@/components/dashboard/variants/add-variant/AddedVariants";

const page = async ({ params }) => {
  const { slug } = await params;

  const variant = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/variants/getAVariant/${slug}`,
  ).then((res) => res.json());

  return (
    <>
      <Breadcrumbs title="Variants" subtitle="Add Variants" />
      <section className="mb-5">
        <h2 className="font-bold text-2xl w-1/2">Add Variants</h2>
      </section>
      <section>
        <div className="grid grid-cols-4 gap-5 items-start">
          <AddAVariant variant={variant} />
          <AddedVariants slug={slug} />
        </div>
      </section>
    </>
  );
};

export default page;
