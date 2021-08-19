const Select = ({ options }) => {
  return (
    <select value="1">
      {options.map(([value, option]) => (
        <option key={value} value={value}>{option}</option>
      ))}
    </select>
  );
};

export default Select;
