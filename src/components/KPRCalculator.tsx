import React, { useState, useEffect } from 'react';
import { Calculator, MessageCircle, DollarSign, Percent, Clock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { openWhatsAppKPR } from '../lib/whatsapp';

interface KPRCalculatorProps {
  initialPrice?: number;
  initialTitle?: string;
}

export const KPRCalculator: React.FC<KPRCalculatorProps> = ({ initialPrice = 1500000000, initialTitle = "" }) => {
  const [price, setPrice] = useState<number>(initialPrice);
  const [dpPercent, setDpPercent] = useState<number>(10);
  const [tenorYears, setTenorYears] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (initialPrice) {
      setPrice(initialPrice);
    }
  }, [initialPrice]);

  // Calculations
  const dpAmount = (price * dpPercent) / 100;
  const loanAmount = price - dpAmount;
  const totalMonths = tenorYears * 12;
  const monthlyRate = interestRate / 100 / 12;

  // Monthly payment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyPayment = loanAmount / totalMonths;
  }

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatRupiah = (val: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val).replace("IDR", "Rp");
  };

  const handleSendWA = () => {
    const formattedPrice = formatRupiah(price);
    const formattedMonthly = new Intl.NumberFormat('id-ID').format(Math.round(monthlyPayment));
    openWhatsAppKPR(formattedPrice, dpPercent, tenorYears, interestRate, formattedMonthly, userName);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8 overflow-hidden relative">
      {/* Background Decorative accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
        <div>
          <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2 inline-block">
            Simulasi KPR Akurat
          </span>
          <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>Kalkulator Simulasi KPR</span>
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {initialTitle ? `Hitung cicilan untuk "${initialTitle}"` : "Hitung estimasi cicilan bulanan untuk rumah impian Anda di Bandung Raya"}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-gray-900 px-3 py-2 rounded-xl border border-emerald-100 dark:border-gray-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Rekanan 10+ Bank Terkemuka</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Sliders & Inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Harga Properti */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Harga Properti (Rupiah)</span>
              </label>
              <span className="font-heading font-bold text-lg text-emerald-600 dark:text-emerald-400">
                {formatRupiah(price)}
              </span>
            </div>
            <input
              type="range"
              min={300000000}
              max={10000000000}
              step={50000000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>Rp 300 Juta</span>
              <span>Rp 5 Milyar</span>
              <span>Rp 10 Milyar</span>
            </div>
          </div>

          {/* Uang Muka (DP) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-emerald-600" />
                <span>Uang Muka / DP ({dpPercent}%)</span>
              </label>
              <span className="font-heading font-bold text-base text-gray-800 dark:text-gray-200">
                {formatRupiah(dpAmount)}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {[0, 5, 10, 20, 30].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setDpPercent(val)}
                  className={`py-1.5 rounded-xl text-xs font-bold border transition ${
                    dpPercent === val
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-emerald-500'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* Tenor / Jangka Waktu */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Tenor Cicilan ({tenorYears} Tahun)</span>
              </label>
              <span className="text-xs font-semibold text-gray-500">
                {totalMonths} Bulan
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[5, 10, 15, 20, 25].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTenorYears(val)}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    tenorYears === val
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-emerald-500'
                  }`}
                >
                  {val} Thn
                </button>
              ))}
            </div>
          </div>

          {/* Suku Bunga per Tahun */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Suku Bunga KPR (% per tahun)
              </label>
              <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                {interestRate}% / tahun
              </span>
            </div>
            <div className="flex items-center gap-2">
              {[3.75, 4.5, 5.5, 7.5, 9.5].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setInterestRate(rate)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition ${
                    interestRate === rate
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-emerald-500'
                  }`}
                >
                  {rate}%
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5">
              *Promo bunga fixed 1-3 tahun pertama tergantung kebijakan bank (BCA, Mandiri, BNI, BSI, BTN).
            </p>
          </div>

        </div>

        {/* Right Column: Results Box */}
        <div className="lg:col-span-5 bg-gradient-to-br from-gray-900 to-gray-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between border border-gray-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              Estimasi Angsuran per Bulan
            </div>
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight text-emerald-400 my-2">
              {formatRupiah(Math.round(monthlyPayment))}
              <span className="text-sm font-normal text-gray-400"> / bulan</span>
            </div>

            <div className="my-6 pt-6 border-t border-gray-800 space-y-3.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Pokok Pinjaman (KPR)</span>
                <span className="font-bold text-white">{formatRupiah(loanAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Uang Muka ({dpPercent}%)</span>
                <span className="font-bold text-emerald-400">{formatRupiah(dpAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Estimasi Total Bunga ({tenorYears} Thn)</span>
                <span className="font-bold text-gray-300">{formatRupiah(Math.round(totalInterest))}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-800/80 font-bold">
                <span className="text-gray-300">Total Pembayaran</span>
                <span className="text-white">{formatRupiah(Math.round(totalPayment))}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-800">
            <div>
              <input
                type="text"
                placeholder="Nama Anda (Opsional)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-gray-800/80 px-3.5 py-2.5 rounded-xl text-sm border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 mb-2.5"
              />
            </div>
            <button
              onClick={handleSendWA}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Konsultasikan Hasil KPR ke WA</span>
            </button>
            <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gratis konsultasi & pengecekan BI Checking</span>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
