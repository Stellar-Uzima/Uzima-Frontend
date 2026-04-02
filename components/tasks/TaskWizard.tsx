"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export interface TaskWizardProps {
  task: {
    id: string;
    title: string;
    description: string;
    whyItMatters: string;
    instructions: string[];
    proofType: "photo" | "self-report";
    rewardXLM: number;
  };
  onSubmit: (data: { proofType: "photo" | "self-report"; file?: File; confirmed?: boolean }) => void;
  onClose?: () => void;
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => {
        const step = i + 1;
        const isDone = step < current;
        const isActive = step === current;
        return (
          <div key={step} className="flex items-center gap-2">
            <div className={`relative flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-110" : ""} ${isDone ? "bg-emerald-100 text-emerald-700" : ""} ${!isActive && !isDone ? "bg-slate-100 text-slate-400" : ""}`}>
              {isDone ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : step}
            </div>
            {i < total - 1 && (
              <div className={`h-0.5 w-8 rounded transition-all duration-500 ${isDone ? "bg-emerald-400" : "bg-slate-200"}`} />
            )}
          </div>
        );
      })}
      <span className="ml-3 text-xs font-medium text-slate-400 tracking-wide uppercase">
        Step {current} of {total}
      </span>
    </div>
  );
}

function StepLearn({ task }: { task: TaskWizardProps["task"] }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="text-sm font-semibold text-emerald-800 uppercase tracking-wider mb-1">Why this matters</h3>
            <p className="text-slate-700 text-sm leading-relaxed">{task.whyItMatters}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="text-base">📋</span> Health Instructions
        </h3>
        <ol className="space-y-3">
          {task.instructions.map((instruction, i) => (
            <li key={i} className="flex items-start gap-3 bg-white rounded-xl border border-slate-100 p-3.5 shadow-sm">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justifnter mt-0.5">
                {i + 1}
              </span>
              <span className="text-slate-700 text-sm leading-relaxed">{instruction}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function PhotoUpload({ onFileSelect, file }: { onFileSelect: (f: File | null) => void; file: File | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [file]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("image/")) onFileSelect(dropped);
  }, [onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked) onFileSelect(picked);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <p className="text-slate-600 text-sm">Take a photo as proof of completing this health task and upload it below.</p>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center min-h-[200px] p-6 text-center ${dragging ? "border-emerald-500 bg-emerald-50 scale-[1.01]" : "border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/50"}`}
      >
        <input ref={inputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleChange} />
        {preview ? (
          <div className="w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="mx-auto max-h-48 rounded-xl object-cover shadow-md" />
            <p className="mt-3 text-xs text-slate-500 font-medium">{file?.name}</p>
            <button type="button" onClick={(e) => { e.stopPropagation(); onFileSelect(null); }} className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium">
              Remove photo
            </button>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-3">
              <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="font-semibold text-slate-700 text-sm">Drag & drop or tap to upload</p>
            <p className="text-xs text-slate-400 mt-1">JPG, PNG, HEIC supported</p>
          </>
        )}
      </div>
    </div>
  );
}

function SelfReport({ confirmed, onToggle }: { confirmed: boolean; onToggle: () => void }) {
  return (
    <div className="space-y-4 animate-fadeIn">
      <p className="text-slate-600 text-sm">Confirm that you have completed the health task as described.</p>
      <button type="button" onClick={onToggle} className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 flex items-start gap-4 ${confirmed ? "border-emerald-500 bg-emerald-50 shadow-emerald-100 shadow-md" : "border-slate-200 bg-white hover:border-slate-300"}`}>
        <div className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 transition-all duration-200 ${confirmed ? "bg-emerald-600 border-emerald-600" : "border-slate-300 bg-white"}`}>
          {confirmed && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm">I confirm I completed this task</p>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">I have followed the health instructions honestly and to the best of my ability.</p>
        </div>
      </button>
      {confirmed && (
        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 rounded-xl px-4 py-3 animate-fadeIn">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs font-medium">Great! You&apos;re ready to claim your reward.</p>
        </div>
      )}
    </div>
  );
}

function ClaimReward({ reward, onSubmit, loading }: { reward: number; onSubmit: () => void; loading: boolean }) {
  const [displayAmount, setDisplayAmount] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!revealed) return;
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayAmount(Math.floor(eased * reward * 10000) / 10000);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [revealed, reward]);

  return (
    <div className="space-y-6 animate-fadeIn text-center">
      <div className="flex flex-col items-center gap-2">
        <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-yellow-300 flex items-center justify-center shadow-xl shadow-amber-200 transition-all duration-700 ${revealed ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
          <span className="text-4xl">🪙</span>
        </div>
        <div className={`transition-all duration-500 delay-300 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1">Your Reward</p>
          <div className="text-4xl font-bold text-slate-800 tabular-nums">
            {displayAmount.toFixed(4)}
            <span className="text-2xl text-amber-500 ml-1.5 font-semibold">XLM</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Stellar Lumens</p>
      </div>
      </div>
      <div className={`bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 transition-all duration-500 delay-500 ${revealed ? "opacity-100" : "opacity-0"}`}>
        <div className="flex items-center gap-3 text-left">
          <span className="text-xl">🏆</span>
          <div>
            <p className="text-sm font-semibold text-slate-700">Task complete!</p>
            <p className="text-xs text-slate-500 leading-relaxed mt-0.5">Your XLM reward will be transferred to your Stellar wallet within a few seconds.</p>
          </div>
        </div>
      </div>
      <button type="button" onClick={onSubmit} disabled={loading} className={`w-full py-4 rounded-2xl font-semibold text-white text-sm tracking-wide transition-all duration-200 ${loading ? "bg-slate-300 cursor-not-allowed" : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-200 active:scale-[0.98]"}`}>
        {loading ? (
          <span className="flex ite-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Submitting…
          </span>
        ) : "Claim My XLM Reward 🚀"}
      </button>
    </div>
  );
}

export function TaskWizard({ task, onSubmit, onClose }: TaskWizardProps) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const canAdvance = () => {
    if (step === 1) return true;
    if (step === 2) {
      if (task.proofType === "photo") return file !== null;
      if (task.proofType === "self-report") return confirmed;
    }
    return false;
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit({ proofType: task.proofType, file: file ?? undefined, confirmed });
    setLoading(false);
  };

  const stepTitles = ["Learn", "Do", "Claim"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-100 px-5 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">{stepTitles[step - 1]}</p>
            <h1 className="text-lg font-bold text-slate-900 leading-tight mt-0.5 max-w-[260px]">{task.title}</h1>
          </div>
          {onClose && (
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors" aria-label="Close">
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <StepIndicator current={step} total={3} />
      </div>
      <div className="flex-1 px-5 py-6 overflow-y-auto">
        {step === 1 && <StepLearn task={task} />}
        {step === 2 && task.proofType === "photo" && <PhotoUpload file={file} onFileSelect={setFile} />}
        {step === 2 && task.proofType === "self-report" && <SelfReport confirmed={confirmed} onToggle={() => setConfirmed((c) => !c)} />}
        {step === 3 && <ClaimReward reward={task.rewardXLM} onSubmit={handleSubmit} loading={loading} />}
      </div>
      {step < 3 && (
        <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t border-slate-100 px-5 py-4 flex gap-3">
          {step > 1 && (
            <button onClick={() => setStep((s) => s - 1)} className="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-all">
              ← Back
            </button>
          )}
          <button onClick={() => setStep((s) => s + 1)} disabled={!canAdvance()} className={`flex-1 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 ${canAdvance() ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200 active:scale-[0.98]" : "bg-slate-100 text-slate-300 cursor-not-allowed"}`}>
            {step === 2 ? "Continue to Claim →" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskWizard;
