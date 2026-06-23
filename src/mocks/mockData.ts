import type { Transaction, PaymentLink } from '@/types/domain';
import { SUPPORTED_TOKENS as TOKENS } from '@/constants/tokens';

export const mockTokens = TOKENS;

const daysAgo = (num: number) => {
  const d = new Date();
  d.setDate(d.getDate() - num);
  return d.toISOString();
};

export const initialTransactions: Transaction[] = [
  {
    id: 'tx_01h7x8v5a2y9z4r8q1k0w5p7m1',
    merchantId: 'mch_bepay_demo_01',
    amount: 150.0,
    fiatAmount: 150.0,
    fiatCurrency: 'USD',
    token: mockTokens[0], // USDC (Ethereum)
    network: mockTokens[0].network,
    txHash: '0x7e5f8d9b1c3a6f4e8d2c9b5a7d6f8e3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e',
    senderAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d1476B',
    recipientAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    status: 'COMPLETED',
    description: 'Invoice #1042 Payment',
    paymentLinkId: 'pl_01h7x8v5a2y9z4r8q1k0w5p7a1',
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'tx_02h7x8v5a2y9z4r8q1k0w5p7m2',
    merchantId: 'mch_bepay_demo_01',
    amount: 0.054,
    fiatAmount: 1850.25,
    fiatCurrency: 'USD',
    token: mockTokens[4], // ETH
    network: mockTokens[4].network,
    txHash: '0x8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b',
    senderAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    recipientAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    status: 'COMPLETED',
    description: 'Web3 Consultation Fee',
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: 'tx_03h7x8v5a2y9z4r8q1k0w5p7m3',
    merchantId: 'mch_bepay_demo_01',
    amount: 75.0,
    fiatAmount: 75.0,
    fiatCurrency: 'USD',
    token: mockTokens[1], // USDC (Polygon)
    network: mockTokens[1].network,
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    senderAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    recipientAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    status: 'PENDING',
    description: 'Pro Subscription Upgrade',
    paymentLinkId: 'pl_01h7x8v5a2y9z4r8q1k0w5p7a2',
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: 'tx_04h7x8v5a2y9z4r8q1k0w5p7m4',
    merchantId: 'mch_bepay_demo_01',
    amount: 10.5,
    fiatAmount: 154.2,
    fiatCurrency: 'USD',
    token: mockTokens[5], // SOL
    network: mockTokens[5].network,
    txHash: '5K3Mh1Vn2B7xC9zD6yF8gJ3kM4pQ5rS6tU8vW9xY1zA2b3c4d5e6f7g8h9i0j1k2',
    senderAddress: 'AmW3Qc9W6rS5tY7uI9oP1pL2kK3jH4gF5dS6aA7sD8fF',
    recipientAddress: 'HN7cABviR7rPBHwyucBrdtQXS6v99W3S3oWvH2n7c1V2',
    status: 'COMPLETED',
    description: 'Bepay Custom T-Shirt',
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
  },
  {
    id: 'tx_05h7x8v5a2y9z4r8q1k0w5p7m5',
    merchantId: 'mch_bepay_demo_01',
    amount: 0.0025,
    fiatAmount: 168.5,
    fiatCurrency: 'USD',
    token: mockTokens[6], // BTC
    network: mockTokens[6].network,
    txHash: 'f4b3c2a1e0f9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3',
    senderAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    recipientAddress: '3FZbgi29cpau2GuxECi3SGoP7N6r1JyZ5S',
    status: 'FAILED',
    description: 'E-commerce Checkout Fail',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
  },
  {
    id: 'tx_06h7x8v5a2y9z4r8q1k0w5p7m6',
    merchantId: 'mch_bepay_demo_01',
    amount: 300.0,
    fiatAmount: 300.0,
    fiatCurrency: 'USD',
    token: mockTokens[3], // USDT (Tron)
    network: mockTokens[3].network,
    txHash: 'f5d8e7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8',
    senderAddress: 'TY1i4h9Xn7vB6sC8mD9dE0fA1bC2dE3fG4',
    recipientAddress: 'TX4k5h8Yn9vC7sB8mD0dE1fA2bC3dE4fG5',
    status: 'EXPIRED',
    description: 'API Integration Plan',
    paymentLinkId: 'pl_01h7x8v5a2y9z4r8q1k0w5p7a3',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5),
  },
  {
    id: 'tx_07h7x8v5a2y9z4r8q1k0w5p7m7',
    merchantId: 'mch_bepay_demo_01',
    amount: 50.0,
    fiatAmount: 50.0,
    fiatCurrency: 'USD',
    token: mockTokens[0], // USDC (Ethereum)
    network: mockTokens[0].network,
    txHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
    senderAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    recipientAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    status: 'COMPLETED',
    description: 'API Usage Fee (May)',
    createdAt: daysAgo(6),
    updatedAt: daysAgo(6),
  },
];

export const initialPaymentLinks: PaymentLink[] = [
  {
    id: 'pl_01h7x8v5a2y9z4r8q1k0w5p7a1',
    merchantId: 'mch_bepay_demo_01',
    amount: 150.0,
    fiatCurrency: 'USD',
    description: 'Invoice #1042 Payment',
    supportedTokens: [mockTokens[0], mockTokens[2]], // USDC, USDT Ethereum
    supportedNetworks: [mockTokens[0].network],
    status: 'PAID',
    url: 'https://pay.bepay.to/pl_01h7x8v5a2y9z4r8q1k0w5p7a1',
    expiresAt: daysAgo(-5),
    createdAt: daysAgo(4),
  },
  {
    id: 'pl_01h7x8v5a2y9z4r8q1k0w5p7a2',
    merchantId: 'mch_bepay_demo_01',
    amount: 75.0,
    fiatCurrency: 'USD',
    description: 'Pro Subscription Upgrade',
    supportedTokens: [mockTokens[1], mockTokens[5]], // USDC Polygon, SOL
    supportedNetworks: [mockTokens[1].network, mockTokens[5].network],
    status: 'ACTIVE',
    url: 'https://pay.bepay.to/pl_01h7x8v5a2y9z4r8q1k0w5p7a2',
    expiresAt: daysAgo(-10),
    createdAt: daysAgo(1),
  },
  {
    id: 'pl_01h7x8v5a2y9z4r8q1k0w5p7a3',
    merchantId: 'mch_bepay_demo_01',
    amount: 300.0,
    fiatCurrency: 'USD',
    description: 'API Integration Plan',
    supportedTokens: [mockTokens[3]], // USDT Tron
    supportedNetworks: [mockTokens[3].network],
    status: 'EXPIRED',
    url: 'https://pay.bepay.to/pl_01h7x8v5a2y9z4r8q1k0w5p7a3',
    expiresAt: daysAgo(0),
    createdAt: daysAgo(5),
  },
  {
    id: 'pl_01h7x8v5a2y9z4r8q1k0w5p7a4',
    merchantId: 'mch_bepay_demo_01',
    amount: 1200.0,
    fiatCurrency: 'USD',
    description: 'Wholesale Hardware Order',
    supportedTokens: [mockTokens[0], mockTokens[4], mockTokens[6]], // USDC, ETH, BTC
    supportedNetworks: [mockTokens[0].network, mockTokens[6].network],
    status: 'ACTIVE',
    url: 'https://pay.bepay.to/pl_01h7x8v5a2y9z4r8q1k0w5p7a4',
    createdAt: daysAgo(2),
  },
];
