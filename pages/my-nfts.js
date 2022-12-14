import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { NFTContext } from '../context/NFTContext';
import { NFTCard, Loader, Banner } from '../components';
import images from '../assets';
import { shortenAddress } from '../utils/shortenAddress';

const MyNFTs = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setnfts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs()
      .then((items) => {
        setnfts(items);
        setIsLoading(false);
        console.log(items);
      });
  }, []);
  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full flex justify-start items-start flex-col min-h-screen">
      <div className="w-full flexCenter flex-col"> <Banner
        name="Your Nifty NFTs"
        childStyles="text-center mb-4"
        parentStyles="h-80 justify-center"
      />

        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            <Image
              src={images.creator1}
              className="rounded-full object-cover"
              objectFit="cover"
            />
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">{shortenAddress(currentAccount)}</p>
        </div>
      </div>
      {
        !isLoading && !nfts.length ? (
          <div className="flexCenter sm:p-4 p-16">
            <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">No NFTs Owned</h1>
          </div>
        ) : (
          <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
            <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
              Search Bar
            </div>
            <div>
              {nfts.map((nft) => <NFTCard key={nft.token} nft={nft} onPofilePage />)}
            </div>
          </div>
        )
    }
    </div>
  );
};

export default MyNFTs;
