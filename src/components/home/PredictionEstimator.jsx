import { motion } from 'framer-motion';
import { Calculator, Home, MapPin, Sparkles, WalletCards } from 'lucide-react';
import { useState } from 'react';
import { requestPrediction } from '../../api/prediction';
import { Button } from '../common/Button';

const initialForm = { location: 'Whitefield', total_sqft: '1200', bath: '2', bhk: '2' };

function validate(form) {
  const errors = {};
  if (form.location.trim().length < 2) errors.location = 'Enter a Bengaluru locality.';
  const sqft = Number(form.total_sqft);
  const bath = Number(form.bath);
  const bhk = Number(form.bhk);
  if (!Number.isFinite(sqft) || sqft < 300 || sqft > 50_000) errors.total_sqft = 'Use a value from 300 to 50,000 sq ft.';
  if (!Number.isInteger(bhk) || bhk < 1 || bhk > 20) errors.bhk = 'Select a valid BHK count.';
  if (!Number.isInteger(bath) || bath < 1 || bath > 20) errors.bath = 'Select a valid bathroom count.';
  if (Number.isFinite(sqft) && Number.isInteger(bhk) && bhk > 0 && sqft / bhk < 250) errors.total_sqft = 'Allow at least 250 sq ft per BHK.';
  if (Number.isInteger(bath) && Number.isInteger(bhk) && bath > bhk + 2) errors.bath = 'Bathrooms cannot exceed BHK by more than 2.';
  return errors;
}

export function PredictionEstimator() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setServerError('');
    if (Object.keys(nextErrors).length) return;
    setIsLoading(true);
    try {
      const prediction = await requestPrediction({ location: form.location.trim(), total_sqft: Number(form.total_sqft), bath: Number(form.bath), bhk: Number(form.bhk) });
      setResult(prediction);
    } catch (error) {
      setResult(null);
      setServerError(error.message || 'We could not calculate an estimate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="estimator" className="scroll-mt-20 bg-slate-100 px-4 py-24 dark:bg-slate-900/60 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-card dark:bg-slate-900 lg:grid-cols-[.95fr_1.05fr]">
        <div className="relative overflow-hidden bg-slate-950 p-8 sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-slate-800/70 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-brand-200">Instant estimate</span>
            <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">What could your home be worth?</h2>
            <p className="mt-5 max-w-sm leading-7 text-slate-300">Get a better sense of Bengaluru value with a concise estimate made for local search.</p>

            <div className="mt-10 grid gap-4 text-slate-200 sm:grid-cols-2">
              {[[MapPin, 'Locality-first', 'A more meaningful input for Bangalore areas.'], [Calculator, 'Clear estimates', 'Focused on the numbers that matter.'], [WalletCards, 'Readable results', 'Price shown clearly in INR.'], [Home, 'Real confidence', 'Designed for practical decisions.']].map(([Icon, title, subtitle]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-slate-950/10 backdrop-blur transition hover:border-brand-300/40 hover:bg-white/10">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-400/10 text-brand-200">
                    <Icon size={18} />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="rounded-[1.75rem] bg-slate-50 p-6 shadow-2xl shadow-slate-200/40 dark:bg-slate-950 dark:shadow-black/20 sm:p-8">
            <div className="flex flex-col gap-2 text-slate-800 dark:text-slate-100">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">Estimator</p>
              <h3 className="text-3xl font-black">Quick Bengaluru price estimate</h3>
              <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">Enter the property details below to generate a local estimate in Indian rupees.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Locality" name="location" value={form.location} onChange={updateField} error={errors.location} className="sm:col-span-2" icon={MapPin} />
                <Field label="Built-up area (sq ft)" name="total_sqft" value={form.total_sqft} onChange={updateField} error={errors.total_sqft} type="number" min="300" max="50000" step="1" />
                <Field label="Bedrooms (BHK)" name="bhk" value={form.bhk} onChange={updateField} error={errors.bhk} type="number" min="1" max="20" step="1" />
                <Field label="Bathrooms" name="bath" value={form.bath} onChange={updateField} error={errors.bath} type="number" min="1" max="20" step="1" />
              </div>

              <Button type="submit" loading={isLoading} className="w-full" size="lg">
                <Home size={18} /> Calculate estimate
              </Button>
            </form>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Result</p>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Your estimate appears here after submission.</p>
                </div>
                <div className="rounded-3xl bg-slate-950/95 p-4 text-slate-50 dark:bg-slate-800/90">
                  <p className="text-xs uppercase tracking-[0.24em] text-brand-300">Fast &amp; friendly</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">The estimate is calculated from the trained model and displayed in INR.</p>
                </div>
              </div>

              {serverError && <p role="alert" className="mt-6 rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-300">{serverError}</p>}

              {result && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-[1.5rem] border border-brand-100/50 bg-brand-50 p-6 dark:border-brand-300/20 dark:bg-slate-900/80">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-300">Estimated property price</p>
                  <p className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white">{result.formatted_price}</p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">Approximately {result.price_lakh.toLocaleString('en-IN', { maximumFractionDigits: 2 })} lakh INR, based on the supplied property details.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, error, type = 'text', className = '', icon: Icon, ...attributes }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-sm font-bold text-slate-800 dark:text-slate-100">{label}</span><span className={`flex items-center gap-2 rounded-xl border bg-white px-3 transition focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-100 dark:bg-slate-950 dark:focus-within:ring-brand-900 ${error ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}>{Icon && <Icon size={18} className="shrink-0 text-brand-700 dark:text-brand-300" />}<input className="min-h-11 w-full bg-transparent text-sm font-semibold text-slate-950 outline-none dark:text-white" name={name} type={type} value={value} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} {...attributes} /></span>{error && <span id={`${name}-error`} className="mt-1.5 block text-xs font-medium text-red-600 dark:text-red-400">{error}</span>}</label>;
}
