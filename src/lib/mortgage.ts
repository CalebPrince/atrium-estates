export interface MortgageInput {
  price: number;
  /** Deposit as a percentage of the price, e.g. 20 for 20%. */
  depositPercent: number;
  /** Nominal annual interest rate as a percentage, e.g. 4.5. */
  annualRatePercent: number;
  termYears: number;
}

export interface MortgageResult {
  deposit: number;
  loanAmount: number;
  monthlyPayment: number;
  totalRepaid: number;
  totalInterest: number;
}

/**
 * Standard amortising repayment mortgage.
 *
 *   M = P · r(1 + r)^n / ((1 + r)^n − 1)
 *
 * where r is the monthly rate and n the number of payments. A 0% rate is a
 * separate case because the formula divides by zero there.
 */
export function calculateMortgage({
  price,
  depositPercent,
  annualRatePercent,
  termYears,
}: MortgageInput): MortgageResult {
  const deposit = price * (depositPercent / 100);
  const loanAmount = Math.max(price - deposit, 0);
  const monthlyRate = annualRatePercent / 100 / 12;
  const payments = termYears * 12;

  let monthlyPayment: number;
  if (loanAmount === 0 || payments === 0) {
    monthlyPayment = 0;
  } else if (monthlyRate === 0) {
    monthlyPayment = loanAmount / payments;
  } else {
    const growth = Math.pow(1 + monthlyRate, payments);
    monthlyPayment = (loanAmount * monthlyRate * growth) / (growth - 1);
  }

  const totalRepaid = monthlyPayment * payments;

  return {
    deposit,
    loanAmount,
    monthlyPayment,
    totalRepaid,
    totalInterest: Math.max(totalRepaid - loanAmount, 0),
  };
}
