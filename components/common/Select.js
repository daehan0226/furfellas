const Select = ({ options }) => {
  return (
    <select value="1">
      {options.map(([value, option]) => (
        <option value={value}>{option}</option>
      ))}
    </select>
  );
};

export default Select;
