"use client";

import { useMemo, useState } from "react";
import { calculateMortgage } from "@/lib/mortgage";
import { formatPrice } from "@/lib/format";

const rangeClass =
  "mt-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-hairline accent-ember";

const labelClass =
  "flex items-baseline justify-between font-body text-[11px] uppercase tracking-[0.16em] text-paper/40";

export function MortgageCalculator({ price }: { price: number }) {
  const [depositPercent, setDepositPercent] = useState(20);
  const [annualRatePercent, setAnnualRatePercent] = useState(4.5);
  const [termYears, setTermYears] = useState(25);

  const result = useMemo(
    () =>
      calculateMortgage({
        price,
        depositPercent,
        annualRatePercent,
        termYears,
      }),
    [price, depositPercent, annualRatePercent, termYears],
  );

  return (
    <section className="rounded-3xl border border-hairline bg-ink-soft p-8">
      <div className="mb-2 flex items-center gap-2 text-stone">
        <span className="font-body text-[11px] uppercase tracking-[0.2em]">
          [ Repayment Estimate ]
        </span>
      </div>
      <p className="mb-8 font-body text-sm leading-relaxed text-paper/50">
        Move the sliders to see how the monthly figure changes.
      </p>

      <div className="flex flex-col gap-7">
        <label className="block">
          <span className={labelClass}>
            <span>Deposit</span>
            <span className="font-display text-sm font-semibold text-paper">
              {depositPercent}% · {formatPrice(result.deposit)}
            </span>
          </span>
          <input
            type="range"
            min={5}
            max={60}
            step={1}
            value={depositPercent}
            onChange={(e) => setDepositPercent(Number(e.target.value))}
            className={rangeClass}
          />
        </label>

        <label className="block">
          <span className={labelClass}>
            <span>Interest rate</span>
            <span className="font-display text-sm font-semibold text-paper">
              {annualRatePercent.toFixed(1)}%
            </span>
          </span>
          <input
            type="range"
            min={1}
            max={9}
            step={0.1}
            value={annualRatePercent}
            onChange={(e) => setAnnualRatePercent(Number(e.target.value))}
            className={rangeClass}
          />
        </label>

        <label className="block">
          <span className={labelClass}>
            <span>Term</span>
            <span className="font-display text-sm font-semibold text-paper">
              {termYears} years
            </span>
          </span>
          <input
            type="range"
            min={5}
            max={35}
            step={1}
            value={termYears}
            onChange={(e) => setTermYears(Number(e.target.value))}
            className={rangeClass}
          />
        </label>
      </div>

      <div className="mt-8 border-t border-hairline pt-6">
        <p className="font-body text-[11px] uppercase tracking-[0.16em] text-paper/40">
          Estimated monthly repayment
        </p>
        <p className="mt-1 font-display text-4xl font-semibold tracking-tight text-ember-glow">
          {formatPrice(Math.round(result.monthlyPayment))}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
          <div className="bg-ink-soft p-4">
            <dt className="font-body text-[11px] uppercase tracking-[0.1em] text-paper/40">
              Loan amount
            </dt>
            <dd className="mt-1 font-display text-lg font-semibold text-paper">
              {formatPrice(Math.round(result.loanAmount))}
            </dd>
          </div>
          <div className="bg-ink-soft p-4">
            <dt className="font-body text-[11px] uppercase tracking-[0.1em] text-paper/40">
              Total interest
            </dt>
            <dd className="mt-1 font-display text-lg font-semibold text-paper">
              {formatPrice(Math.round(result.totalInterest))}
            </dd>
          </div>
        </dl>

        <p className="mt-5 font-body text-xs leading-relaxed text-paper/35">
          Indicative only. Figures assume a capital repayment mortgage at a fixed
          rate and exclude fees, taxes and insurance. Not financial advice.
        </p>
      </div>
    </section>
  );
}
