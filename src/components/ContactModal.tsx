import { useState, useEffect, useRef } from 'react';
import Button from './Button';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AREAS_OF_INTEREST = [
  'Clinical Trial Feasibility & Planning',
  'Global Trial Management',
  'Regulatory & Compliance Advisory',
  'Medical Writing & Clinical Documentation',
  'Quality Assurance & Audit Readiness',
  'Other Clinical Consulting',
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    organisation: '',
    email: '',
    phone: '',
    areaOfInterest: AREAS_OF_INTEREST[0],
    requirements: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key press & handle body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission with responsive feel
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      organisation: '',
      email: '',
      phone: '',
      areaOfInterest: AREAS_OF_INTEREST[0],
      requirements: '',
    });
    onClose();
  };

  return (
    <div
      id="contact-popup-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        ref={modalContentRef}
        className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_50px_rgba(0,30,60,0.2),0_8px_20px_rgba(0,120,184,0.12)] transition-all transform animate-scaleUp overflow-hidden"
      >
        {/* Top Gradient Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0078B8] via-[#00A8CC] to-[#38BDF8]" />

        {/* Close Button */}
        <button
          type="button"
          id="close-contact-modal-button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all duration-200 z-10 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-4 sm:p-5.5">
          {submitted ? (
            /* Submission Success View */
            <div className="py-5 px-2 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full mb-1.5">
                  Enquiry Received
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 tracking-tight">
                  Thank You for Reaching Out
                </h3>
              </div>

              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.fullName || 'Colleague'}</strong>. Dr. Kavya Kadam and the kRa Life Sciences advisory team will review your objectives and contact you within <span className="text-[#0078B8] font-semibold">24–48 business hours</span>.
              </p>

              <div className="pt-2 flex justify-center">
                <Button
                  type="button"
                  size="compact"
                  variant="primary"
                  onClick={handleResetAndClose}
                >
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            /* Compact Light Theme Enquiry Form View */
            <>
              {/* Header */}
              <div className="mb-2.5 pr-8">
                <h2
                  id="contact-modal-title"
                  className="text-lg sm:text-xl font-serif font-bold text-slate-900 tracking-tight leading-tight"
                >
                  Get in Touch
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Connect with our clinical operations leadership to scope your trial requirements.
                </p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2.5">
                {/* Row 1: Full Name & Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Dr. / Mr. / Ms. Name"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50/80 hover:bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-[#0078B8] focus:ring-1 focus:ring-[#0078B8] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Organisation <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organisation}
                      onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                      placeholder="Pharma / Biotech / CRO"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50/80 hover:bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-[#0078B8] focus:ring-1 focus:ring-[#0078B8] transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Business Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Business Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="colleague@organisation.com"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50/80 hover:bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-[#0078B8] focus:ring-1 focus:ring-[#0078B8] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Phone Number <span className="text-slate-400 font-normal text-[10px]">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+Country (Number)"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50/80 hover:bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-[#0078B8] focus:ring-1 focus:ring-[#0078B8] transition-all"
                    />
                  </div>
                </div>

                {/* Area of Interest */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Area of Interest <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.areaOfInterest}
                      onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50/80 hover:bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-[#0078B8] focus:ring-1 focus:ring-[#0078B8] transition-all appearance-none cursor-pointer"
                    >
                      {AREAS_OF_INTEREST.map((opt) => (
                        <option key={opt} value={opt} className="bg-white text-slate-900 py-1">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">
                      ▼
                    </span>
                  </div>
                </div>

                {/* Requirements / Description */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Trial Objectives & Scoping Needs <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Briefly describe your clinical trial phase, therapeutic area, or advisory requirements..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50/80 hover:bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-[#0078B8] focus:ring-1 focus:ring-[#0078B8] transition-all resize-none h-13"
                  />
                </div>

                {/* Footer Actions */}
                <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Confidential & Leadership Review</span>
                  </div>

                  <Button
                    type="submit"
                    id="modal-submit-enquiry-button"
                    size="sm"
                    variant="primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Send Enquiry'}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
