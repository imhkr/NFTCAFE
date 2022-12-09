import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Banner, CreaterCard, NFTCard, Button } from '../components';
import images from '../assets';
import { makeId } from '../utils/makeId';

const Home = () => {
  const [hideButtons, sethideButtons] = useState(false);
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { theme } = useTheme();

  const handleScroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth > 1080 ? 300 : 210;
    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;
    if (current?.scrollWidth >= parent?.offsetWidth) {
      sethideButtons(false);
    } else {
      sethideButtons(true);
    }
  };
  useEffect(() => () => {
    isScrollable();
    window.addEventListener('resize', isScrollable);
    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          parentStyles="justify-start mb-6 h-72 sm:h-69 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text:4xl sm:text-2xl xs=text-xl text-left"
          BannerText="Discover, collect, and sell extraordinary NFTs"
        />
        <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Best Creators</h1>
          <div className="relative flex-1 max-w-full flex mt-3" ref={[parentRef]}>
            <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none" ref={scrollRef}>
              {[1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <CreaterCard
                  key={`creater-${i}`}
                  rank={i}
                  createrImage={images[`creator${i}`]}
                  createrName={`0x${makeId(3)}...${makeId(4)}`}
                  createrEths={10 - i * 0.5}
                />
              ))}
              {hideButtons
              && (
              <>
                <div onClick={() => handleScroll('left')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0">
                  <Image
                    src={images.left}
                    layout="fill"
                    objectFit='contain alt="left-arrow'
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>
                <div onClick={() => handleScroll('right')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0">
                  <Image
                    src={images.right}
                    layout="fill"
                    objectFit='contain alt="right-arrow'
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>
              </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className="flex-1 before:first:font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">Hot Bids</h1>
            <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 rounded-md">
              <input
                type="search"
                placeholder="Search NFT"
                className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none"
              />
              <div className="flex-initial">
                <Button
                  BtnName="Search"
                  classStyles="rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="mt-3 px-14 w-full flex flex-wrap justify-start md:justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nifty NFT ${i}`,
                  price: (10 - i * 0.534),
                  seller: `0x${makeId(3)}...${makeId(4)}`,
                  owner: `0x${makeId(3)}...${makeId(4)}`,
                  description: 'Cool NFT on Sale',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;
