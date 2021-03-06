const Input = ({
  type,
  className,
  title,
  name,
  value,
  changeState,
  errorDiv,
  errorMsg,
  performSearch,
}) => {
  const handleChange = (e) => {
    changeState((prevState) => ({ ...prevState, [name]: e.target.value }));
    if (name === "search") {
      performSearch();
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <input
        type={type}
        className={`form-control ${className}`}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      />
      <div className={errorDiv}>{errorMsg}</div>
    </div>
  );
};

export default Input;
