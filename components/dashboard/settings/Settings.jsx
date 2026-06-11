"use client";

import SettingsCard from "./SettingsCard";
import ProfileForm from "./ProfileForm";
import { useContext, useEffect } from "react";
import { MyContext } from "@/context/MyProvider";
import { useRouter } from "next/navigation";
import ChangePassword from "./ChangePassword";
import NotificationPreferences from "./NotificationPreferences";
import ShippingAddress from "./ShippingAddress";

const Settings = () => {
  const { newUser, loading } = useContext(MyContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !newUser) {
      router.push("/login");
    }
  }, [loading, newUser, router]);

  return (
    <>
      <div className="grid grid-cols-12 gap-5 items-start">
        <div className="xl:col-span-9 lg:col-span-8 col-span-12 grid gap-5 items-start">
          <ProfileForm />
          <ChangePassword />
          <ShippingAddress />
        </div>
        <div className="xl:col-span-3 lg:col-span-4 col-span-12 grid gap-5 items-start">
          <NotificationPreferences />
          <SettingsCard title="Danger Zone"></SettingsCard>
        </div>
      </div>
    </>
  );
};

export default Settings;
