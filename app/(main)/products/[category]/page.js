const page = async ({ params }) => {
  const { category } = await params;

  return <div>page</div>;
};

export default page;
