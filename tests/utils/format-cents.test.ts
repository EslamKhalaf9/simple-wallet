import { formatCents } from '../../src/utils/format-cents';

describe('formatCents', () => {
  it('should format cents to EGP currency', () => {
    expect(formatCents(1000)).toBe('EGP 10.00');
  });

  it('should return 0 when amount is 0', () => {
    expect(formatCents(0)).toBe('EGP 0.00');
  });

  it('should handle negative amounts', () => {
    expect(formatCents(-1000)).toBe('-EGP 10.00');
  });
});
