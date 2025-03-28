export function formatCents(amountCents: number) {
  return (amountCents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'EGP',
  });
}
