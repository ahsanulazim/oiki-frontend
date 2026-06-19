"use client";
import { MyContext } from "@/context/MyProvider";
import Link from "next/link";
import { useContext } from "react";
import { LuMail, LuPhone, LuUser } from "react-icons/lu";

const { default: SettingsCard } = require("../settings/SettingsCard");

const AccountInfo = () => {
  const { newUser, loading } = useContext(MyContext);

  return (
    <SettingsCard title="Account Info">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-5">
            <LuUser size={15} /> {newUser?.user?.name}
          </li>
          <li className="flex items-center gap-5">
            <LuMail size={15} /> {newUser?.user?.email}
          </li>
          <li className="flex items-center gap-5">
            <LuPhone size={15} />{" "}
            {newUser?.user?.phone || "No Phone Number Provided"}
          </li>
        </ul>
      )}
      <Link href="/dashboard/settings" className="mt-5">
        <button className="btn btn-main">Edit Profile</button>
      </Link>
    </SettingsCard>
  );
};

export default AccountInfo;
