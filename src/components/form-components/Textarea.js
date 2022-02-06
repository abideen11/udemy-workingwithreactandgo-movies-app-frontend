const Textarea = ({ title, name, rows, value, setMovie }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <textarea
        className="form-control"
        name={name}
        rows={rows}
        value={value}
        onChange={(e) =>
          setMovie((prevState) => ({
            ...prevState,
            description: e.target.value,
          }))
        }
      />
    </div>
  );
};

export default Textarea;
