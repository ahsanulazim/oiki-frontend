"use client";

import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import Settings from "@/components/dashboard/settings/Settings";
import { MyContext } from "@/context/MyProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const page = () => {
  const router = useRouter();

  const { newUser, loading } = useContext(MyContext);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!newUser) {
      router.push("/");
    }
  }, [newUser, loading]);

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
