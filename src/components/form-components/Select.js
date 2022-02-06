const Select = ({ title, name, mpaaOptions, value, placeholder, setMovie }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {" "}
        {title}{" "}
      </label>
      <select
        className="form-select"
        name={name}
        value={value}
        onChange={(e) =>
          setMovie((prevState) => ({
            ...prevState,
            mpaa_rating: e.target.value,
          }))
        }
      >
        <option value="">{placeholder}</option>
        {mpaaOptions.map((option) => {
          return (
            <option
              className="form-select"
              key={option.id}
              value={option.id}
              label={option.value}
            >
              {option.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
