const CardBody = ({ data }) => {
  return (
    <div>
      <p>{data.birthdate}</p>
      <p>{data.color}</p>
      {data.personality.map((item) => (
        <p key={item}>{item}</p>
      ))}
      <p>{data.weight}</p>
    </div>
  );
};

export default CardBody;
