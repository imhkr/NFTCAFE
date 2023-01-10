/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.infura.io', 'nftcafe-nft-marketplace.infura-ipfs.io', 'https://nftcafe-nft-marketplace.infura-ipfs.io/ipfs', 'nftcafe-nft-marketplace.infura-ipfs.io/ipfs'],
  },
  swcMinify: true,
};

module.exports = nextConfig;
