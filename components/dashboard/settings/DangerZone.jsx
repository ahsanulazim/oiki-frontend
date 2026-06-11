import SettingsCard from "./SettingsCard";

const DangerZone = () => {
  return (
    <SettingsCard title="Danger Zone">
      <div>
        <button className="btn btn-error">Close Account</button>
        <p className="text-sm text-red-600 mt-3">
          Closing your account will permanently remove all your data.
        </p>
      </div>
    </SettingsCard>
  );
};

export default DangerZone;
