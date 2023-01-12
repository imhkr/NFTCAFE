import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NFTContext } from '../context/NFTContext';
import { NFTCard, Loader, Button, Modal } from '../components';
import { shortenAddress } from '../utils/shortenAddress';
import images from '../assets';

const PaymentBodyCmp = ({ nft, nftCurrency }) => (
  <div className="flex flex-col">
    <div className="flexBetween">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">Item</p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">Subtotal</p>
    </div>

    <div className="flexBetweenStart my-5">
      <div className="flex-1 flexStartCenter">
        <div className="relative w-28 h-28">
          <Image src={nft.image || images[`nft${nft.i}`]} layout="fill" objectFit="cover" />
        </div>
        <div className="flexCenterStart flex-col ml-5">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">{shortenAddress(nft.seller)}</p>
          <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">{nft.name}</p>
        </div>
      </div>

      <div>
        <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">{nft.price} <span className="font-semibold">{nftCurrency}</span></p>
      </div>
    </div>

    <div className="flexBetween mt-10">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">Total</p>
      <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-xl font-normal">{nft.price} <span className="font-semibold">{nftCurrency}</span></p>
    </div>
  </div>
);

const NFTDetails = () => {
  const { currentAccount, nftCurrency, buyNFT, isLoadingNFT } = useContext(NFTContext);
  const [isLoading, setisLoading] = useState(true);
  const router = useRouter();
  const [nft, setnft] = useState({ image: '', tokenId: '', name: '', owner: '', price: '', seller: '' });

  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    setnft(router.query);
    if (isLoading) return <Loader />;
    setisLoading(false);
  }, [router.isReady]);

  const checkout = async () => {
    await buyNFT(nft);

    setPaymentModal(false);
    setSuccessModal(true);
  };
  if (isLoadingNFT) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
        <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
          { nft.image
          && <Image src={nft.image} objectFit="cover" className="rounded-xl shadow-lg" layout="fill" />}
        </div>
      </div>
      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
            {nft.name}
          </h2>
        </div>
        <div className="mt-10 ">
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">Creator</p>
          <div className="flex flex-row items-center mt-3">
            <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image src={images.creator1} objectFit="cover" className="rounded-full " />
            </div>
            <p className='font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-semi bold"'>{shortenAddress(nft.seller)}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col">
          <div className="w-full border-b dark:border-x-nft-black-1 border-nft-gray-1 flex-row">
            <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-medium">
              Details
            </p>
          </div>
          <div className="mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal">{nft.description}</p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col mt-10">
          {
              currentAccount === nft.seller.toLowerCase() ? (
                <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal border border-gray-2">
                  Sorry,You cannot buy your own NFT.
                </p>
              )
                : currentAccount === nft.owner.toLowerCase()
                  ? (
                    <Button
                      BtnName="List on Markeplace"
                      classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                      handleClick={() => router.push(`/resell-nft?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                    />
                  ) : (
                    <Button
                      BtnName={`Buy for ${nft.price} ${nftCurrency}`}
                      classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                      handleClick={() => setPaymentModal(true)}
                    />
                  )
            }
        </div>
      </div>
      {paymentModal
      && (
      <Modal
        header="Check Out"
        body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
        footer={(
          <div className="flex flex-row sm:flex-col">
            <Button
              BtnName="Checkout"
              classStyles="mr-5 sm:mb-5 sm:mr-0 rounded-xl"
              handleClick={checkout}
            />
            <Button
              BtnName="Cancel"
              classStyles="rounded-xl"
              handleClick={() => setPaymentModal(false)}
            />
          </div>
        )}
        handleClose={() => setPaymentModal(false)}
      />
      )}
      {isLoadingNFT && (
      <Modal
        header="Buying NFT..."
        body={(
          <div className="flexCenter flex-col text-center">
            <div className="relative w-52 h-52">
              <Loader />
            </div>
          </div>
        )}
        handleClose={() => setPaymentModal(false)}
      />
      )}
      {successModal
      && (
      <Modal
        header="Payment Successful"
        body={(
          <div className="flexCenter flex-col text-center" onClick={() => setSuccessModal(false)}>
            <div className="relative w-52 h-52">
              <Image src={nft.image} objectFit="cover" layout="fill" />
            </div>
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal  text-sm minlg:text-xl mt-10">You successfully purchased <span className="font-semibold">{` ${nft.name}`}</span> from <span className="font-semibold"> {shortenAddress(nft.seller)}</span></p>
          </div>
)}
        footer={(
          <div className="flexCenter flex-col">
            <Button
              BtnName="Check it out"
              classStyles="sm:mb-5 sm:mr-0 rounded-xl"
              handleClick={() => router.push('/my-nfts')}
            />
          </div>
        )}
        handleClose={() => setPaymentModal(false)}
      />
      )}
    </div>
  );
};

export default NFTDetails;
