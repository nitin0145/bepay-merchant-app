import { Network } from '@/types/domain';

export const SUPPORTED_NETWORKS = [
  { id: Network.ETHEREUM, name: 'Ethereum Mainnet', shortName: 'Ethereum', iconUrl: '/icons/eth.svg' },
  { id: Network.POLYGON, name: 'Polygon PoS', shortName: 'Polygon', iconUrl: '/icons/polygon.svg' },
  { id: Network.SOLANA, name: 'Solana', shortName: 'Solana', iconUrl: '/icons/solana.svg' },
  { id: Network.BITCOIN, name: 'Bitcoin', shortName: 'Bitcoin', iconUrl: '/icons/bitcoin.svg' },
  { id: Network.TRON, name: 'TRON Network', shortName: 'TRON', iconUrl: '/icons/tron.svg' },
] as const;
