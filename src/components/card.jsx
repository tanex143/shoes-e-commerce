const Card = ({ data, thousandsSeparatorsHandler }) => {
  return (
    <div className='max-w-sm h-96 bg-bluegray-100 shadow-lg rounded relative cursor-pointer'>
      <div className='w-full h-72 rounded overflow-hidden'>
        <img src={data.img[0]} alt='img' className='w-full h-72' />
      </div>

      <h1 className='text-2xl pl-2'>{data.name}</h1>
      <p className='text-2xl absolute left-0 bottom-0 pl-2 pb-1'>
        ₱{thousandsSeparatorsHandler(data.price)}
      </p>
    </div>
  );
};

export default Card;
