const SettingsCard = ({ children, title }) => {
  return (
    <div className="card card-border bg-base-100">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="divider my-0"></div>
        {children}
      </div>
    </div>
  );
};

export default SettingsCard;
