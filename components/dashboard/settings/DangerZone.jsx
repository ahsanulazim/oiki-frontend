import { useRef } from "react";
import SettingsCard from "./SettingsCard";
import AcDeleteModal from "./AcDeleteModal";

const DangerZone = () => {
  const acDeleteRef = useRef();

  return (
    <SettingsCard title="Danger Zone">
      <AcDeleteModal ref={acDeleteRef} />
      <div>
        <button
          onClick={() => acDeleteRef.current.showModal()}
          className="btn btn-error"
        >
          Close Account
        </button>
        <p className="text-sm text-red-600 mt-3">
          Closing your account will permanently remove all your data.
        </p>
      </div>
    </SettingsCard>
  );
};

export default DangerZone;
