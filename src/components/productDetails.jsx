import { useContext } from 'react';
import { loginContext } from './../ContextLoginProvider';
import { Link } from 'react-router-dom';
import { Modal, Carousel } from 'antd';
import LoginAgain from './loginAgain';

const ProductDetails = () => {
  const {
    productDetailsDisplay,
    thousandsSeparatorsHandler,
    addToCartHandler,
    isModalVisible,
    modalCancelHandler,
    sizeChoiceHandler,
    sizeSelection,
    setSizeSelecttion,
    currentUser,
  } = useContext(loginContext);

  return (
    <>
      {/* if user still not logged in then the login button will appear */}
      {currentUser[0].username ? (
        <div className='container mx-auto px-4'>
          <h1 className='text-center text-3xl font-semibold py-8'>
            Product Details
          </h1>
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
            <Carousel autoplay dotPosition='bottom'>
              {productDetailsDisplay.img.map((i, index) => (
                <div key={index}>
                  <img
                    src={`${i}`}
                    alt='img'
                    className='w-4/6 mx-auto rounded'
                  />
                </div>
              ))}
            </Carousel>
            <div className='pt-16'>
              <p className='text-xl tracking-wider uppercase text-gray-400'>
                {productDetailsDisplay.type}
              </p>
              <h1 className='text-4xl py-2 font-semibold'>
                {productDetailsDisplay.name}
              </h1>
              <p className='text-xl pb-2'>{productDetailsDisplay.brand}</p>
              <p>{productDetailsDisplay.description}</p>
              <div className='py-10 flex gap-5'>
                {productDetailsDisplay.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() =>
                      sizeChoiceHandler(productDetailsDisplay, size.id)
                    }
                    className='py-1 px-3 outline-none rounded border border-gray-500 uppercase text-sm hover:bg-bluegray-500 hover:text-white transition-all duration-500 ease-in-out focus:bg-bluegray-500 focus:outline-none focus:text-white'
                  >
                    {size.size}
                  </button>
                ))}
              </div>
              <p className='text-3xl font-semibold text-gray-700'>
                Php {thousandsSeparatorsHandler(productDetailsDisplay.price)}
              </p>
              <div className='py-10 flex sm:flex-row flex-col gap-6'>
                {productDetailsDisplay.inCart === true ? (
                  <p className='py-2 px-4 rounded bg-lime-400 uppercase text-xl text-center'>
                    Added to Cart
                  </p>
                ) : (
                  <button
                    onClick={
                      sizeSelection
                        ? () =>
                            addToCartHandler(
                              productDetailsDisplay.id,
                              currentUser[0]
                            )
                        : null
                    }
                    className={`py-2 px-4 ${
                      sizeSelection
                        ? 'bg-bluegray-500 hover:bg-bluegray-600'
                        : 'bg-red-500 hover:bg-red-600'
                    }  text-white  rounded uppercase text-xl`}
                  >
                    {sizeSelection ? 'add to cart' : 'please select your size'}
                  </button>
                )}
                <Link
                  to='/productlist'
                  onClick={() => setSizeSelecttion(false)}
                  className='py-2 px-4 border border-bluegray-500 hover:bg-bluegray-400 hover:text-white rounded uppercase text-xl text-center'
                >
                  choose another
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoginAgain />
      )}
      {console.log('product selected', productDetailsDisplay)}

      <Modal
        closable={false}
        visible={isModalVisible}
        onCancel={modalCancelHandler}
        footer={null}
      >
        <p className='py-1 px-3 bg-lime-300 rounded text-center uppercase text-lg font-semibold'>
          item added to cart
        </p>
        <div className='w-full py-2'>
          <img
            src={productDetailsDisplay.img[0]}
            alt='img'
            className='h-72 w-full sm:h-full'
          />
        </div>
        <div className='flex justify-between gap-5 py-5'>
          <h1 className='text-2xl font-semibold'>
            {productDetailsDisplay.name}
          </h1>
          <h1 className='text-xl font-semibold text-gray-400'>
            Php {thousandsSeparatorsHandler(productDetailsDisplay.price)}
          </h1>
        </div>
        <div className='flex justify-center gap-5'>
          <Link
            to='/productlist'
            onClick={modalCancelHandler}
            className='py-1 px-3 rounded uppercase border border-lightblue-400 hover:bg-lightblue-400 hover:text-white transition-all duration-500 ease-in-out'
          >
            Continue Shopping
          </Link>
          <Link
            to='/mycart'
            onClick={modalCancelHandler}
            className='py-1 px-3 rounded uppercase border border-bluegray-500 hover:bg-bluegray-500 hover:text-white transition-all duration-500 ease-in-out'
          >
            My Cart
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default ProductDetails;
