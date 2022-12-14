import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { NFTContext } from '../context/NFTContext';
import { Button, Loader, Input } from '../components';

const ResellNFT = () => {
  const { createSale } = useContext(NFTContext);
  const router = useRouter();
  const { tokenId, tokenURI } = router.query;
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);

    setPrice(data.price);
    setImage(data.image);
  };
  useEffect(() => {
    if (tokenURI) fetchNFT();
  }, [tokenURI]);
  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  const resell = async () => {
    await createSale(tokenURI, price, true, tokenId);
    router.push('/');
  };

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black font-semibold text-2xl">ResellNFT</h1>
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setPrice(e.target.value)}
        />
        {image && <img src={image} className="rounded mt-4" width={350} />}
        <div className="mt-7 w-full flex justify-end">
          <Button
            BtnName="List NFT"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
};

export default ResellNFT;
