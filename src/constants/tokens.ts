import type { Token } from '@/types/domain';
import { TokenSymbol, Network } from '@/types/domain';

export const SUPPORTED_TOKENS: Token[] = [
  {
    symbol: TokenSymbol.USDC,
    name: 'USD Coin',
    decimals: 6,
    network: Network.ETHEREUM,
    contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    logoUrl: '/icons/usdc.svg',
  },
  {
    symbol: TokenSymbol.USDC,
    name: 'USD Coin (Polygon)',
    decimals: 6,
    network: Network.POLYGON,
    contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    logoUrl: '/icons/usdc.svg',
  },
  {
    symbol: TokenSymbol.USDT,
    name: 'Tether USD',
    decimals: 6,
    network: Network.ETHEREUM,
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    logoUrl: '/icons/usdt.svg',
  },
  {
    symbol: TokenSymbol.USDT,
    name: 'Tether USD (Tron)',
    decimals: 6,
    network: Network.TRON,
    contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    logoUrl: '/icons/usdt.svg',
  },
  {
    symbol: TokenSymbol.ETH,
    name: 'Ether',
    decimals: 18,
    network: Network.ETHEREUM,
    logoUrl: '/icons/eth.svg',
  },
  {
    symbol: TokenSymbol.SOL,
    name: 'Solana',
    decimals: 9,
    network: Network.SOLANA,
    logoUrl: '/icons/solana.svg',
  },
  {
    symbol: TokenSymbol.BTC,
    name: 'Bitcoin',
    decimals: 8,
    network: Network.BITCOIN,
    logoUrl: '/icons/btc.svg',
  },
];
