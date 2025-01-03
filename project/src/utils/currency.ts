const GHS_TO_USD_RATE = 12.5; // Example rate, should be updated regularly

export function convertToGHS(usdAmount: number): number {
  return usdAmount * GHS_TO_USD_RATE;
}

export function formatGHS(amount: number): string {
  return `GH₵${amount.toFixed(2)}`;
}