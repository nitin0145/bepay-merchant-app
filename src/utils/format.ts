/**
 * Format a cryptocurrency amount with its proper decimals and symbol.
 */
export function formatCryptoAmount(amount: number, symbol: string, decimals = 4): string {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
  return `${formatter.format(amount)} ${symbol}`;
}

/**
 * Format fiat amounts using localized currencies (e.g. USD, EUR).
 */
export function formatFiatAmount(amount: number, currency = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });
  return formatter.format(amount);
}

/**
 * Shorten wallet addresses for display (e.g. 0x71C7...476B).
 */
export function formatAddress(address?: string): string {
  if (!address) return '';
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Shorten transaction hashes for display.
 */
export function formatTxHash(txHash?: string): string {
  if (!txHash) return '';
  if (txHash.length <= 12) return txHash;
  return `${txHash.slice(0, 8)}...${txHash.slice(-6)}`;
}

/**
 * Format dates/timestamps consistently.
 */
export function formatDate(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
