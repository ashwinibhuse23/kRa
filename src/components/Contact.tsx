import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import SectionTag from './SectionTag';
import Button from './Button';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    organisation: '',
    email: '',
    phone: '',
    areaOfInterest: 'Clinical Trial Feasibility & Planning',
    requirements: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let ctx: gsap.Context;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && contentRef.current) {
            ctx = gsap.context(() => {
              const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

              // 1. Ambient Background Glows: Soft bloom and continuous slow organic drift
              tl.fromTo(
                '.contact-glow-1',
                { opacity: 0, scale: 0.6 },
                { opacity: 1, scale: 1, duration: 2.4, ease: 'sine.out' },
                0
              );
              tl.fromTo(
                '.contact-glow-2',
                { opacity: 0, scale: 0.6 },
                { opacity: 1, scale: 1, duration: 2.4, ease: 'sine.out' },
                0.2
              );

              gsap.to('.contact-glow-1', {
                x: 22,
                y: -16,
                duration: 7.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              });
              gsap.to('.contact-glow-2', {
                x: -18,
                y: 14,
                duration: 8.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              });

              // 2. Section Tag glide & reveal
              tl.fromTo(
                '.contact-tag',
                { opacity: 0, x: -28, filter: 'blur(8px)' },
                { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.3, clearProps: 'all' },
                0.15
              );

              // 3. Section Title & Subtitles with smooth vertical lift
              tl.fromTo(
                '.contact-title',
                { opacity: 0, y: 32, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, clearProps: 'all' },
                0.25
              );

              tl.fromTo(
                '.contact-desc',
                { opacity: 0, y: 22, filter: 'blur(6px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, clearProps: 'all' },
                0.4
              );

              tl.fromTo(
                '.contact-subtext',
                { opacity: 0, y: 18, filter: 'blur(6px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.25, clearProps: 'all' },
                0.55
              );

              // 4. Contact Cards Reveal: Slow, modern staggered ascent
              // Left leadership card
              tl.fromTo(
                '.contact-card-left',
                { opacity: 0, y: 38, scale: 0.97, filter: 'blur(10px)' },
                { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.5, clearProps: 'all' },
                0.4
              );

              // Contact channels stagger inside left card
              tl.fromTo(
                '.contact-channel-item',
                { opacity: 0, x: -16, filter: 'blur(4px)' },
                { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.1, clearProps: 'all' },
                0.65
              );

              // Collaborative engagement pathway card
              tl.fromTo(
                '.contact-pathway-card',
                { opacity: 0, y: 28, filter: 'blur(8px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.35, clearProps: 'all' },
                0.75
              );

              // Right form card
              tl.fromTo(
                '.contact-card-right',
                { opacity: 0, y: 44, scale: 0.97, filter: 'blur(12px)' },
                { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.55, clearProps: 'all' },
                0.5
              );

              // Form fields subtle stagger
              tl.fromTo(
                '.contact-form-row',
                { opacity: 0, y: 18, filter: 'blur(4px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.15, stagger: 0.08, clearProps: 'all' },
                0.7
              );
            }, sectionRef);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      ctx?.revert();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate brief network submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const areasOfInterest = [
    'Clinical Trial Feasibility & Planning',
    'Clinical Operations & Department Setup',
    'Patient Recruitment & Site Strategy',
    'Cross-Functional Integration & Vendor Oversight',
    'Phase I & TQT Facility Planning',
    'Study Protocol & Regulatory Advisory',
    'Other Clinical Advisory',
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#F0F7FA] via-white to-[#F8FAFC] pt-10 sm:pt-12 lg:pt-14 pb-5 sm:pb-6 lg:pb-7 text-slate-900 border-t border-slate-200/90 font-sans"
    >
      {/* ── Ambient Background Glows ── */}
      <div className="contact-glow-1 absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#0078B8]/10 via-[#00A8CC]/8 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="contact-glow-2 absolute bottom-10 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-sky-200/40 via-blue-100/30 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#0078B8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.035] pointer-events-none" />

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ── Section Header ── */}
        <div className="max-w-4xl lg:max-w-5xl mb-9 sm:mb-10 lg:mb-11 pl-3 sm:pl-5 lg:pl-4">
          <div className="contact-tag">
            <SectionTag text="Let's Connect" variant="red" className="mb-4" />
          </div>

          <h2 className="contact-title text-2xl sm:text-3xl lg:text-[40px] xl:text-[42px] font-bold text-slate-900 tracking-tight leading-[1.2] mb-4 sm:mb-5 font-serif">
            Have a Clinical Development <br/>
            <span className="bg-gradient-to-r from-[#0078B8] via-[#0094C6] to-[#00A8CC] bg-clip-text text-transparent">
             Programme to Plan or Deliver?
            </span>
          </h2>

          <p className="contact-desc text-slate-600 text-sm sm:text-[15px] lg:text-base leading-relaxed mb-3">
            Whether you are planning a new clinical trial, strengthening clinical operations, addressing recruitment challenges or seeking better coordination across multiple teams and vendors,{' '}
            <strong className="text-slate-900 font-semibold">kRa Life Sciences</strong> can help you define the priorities and build a practical path to execution.
          </p>

          <p className="contact-subtext text-[#0078B8] font-semibold text-sm sm:text-[15px] lg:text-base lg:whitespace-nowrap">
            Let&apos;s discuss your programme objectives, operational challenges and clinical development requirements.
          </p>
        </div>

        {/* ── Main Contact Grid: Left Contact Card & Right Form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ════ Left Column: Contact kRa Life Sciences (5 Columns) ════ */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Leadership Card */}
            <div className="contact-card-left relative rounded-3xl p-7 sm:p-8 bg-white border border-slate-200/90 shadow-[0_10px_35px_rgba(0,40,80,0.06)] overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0078B8] via-[#00A8CC] to-[#38BDF8]" />

              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-50 text-[#0078B8] border border-sky-200/80 inline-block mb-3">
                  Contact kRa Life Sciences
                </span>

                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                  Dr. Kavya Appaiah
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#0078B8] mt-1">
                  Founder & Principal Clinical Consultant
                </p>
              </div>

              {/* Contact Channels */}
              <div className="space-y-4 pt-4 border-t border-slate-100 text-sm">
                {/* Email */}
                <div className="contact-channel-item flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100/80 flex items-center justify-center text-[#0078B8] shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Business Email</div>
                    <a
                      href="mailto:contact@kralifesciences.com"
                      className="font-medium text-slate-900 hover:text-[#0078B8] transition-colors"
                    >
                      contact@kralifesciences.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-channel-item flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100/80 flex items-center justify-center text-[#0078B8] shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Contact Number</div>
                    <span className="font-medium text-slate-900">
                      +91 (0) 80 4123 4567
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="contact-channel-item flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100/80 flex items-center justify-center text-[#0078B8] shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Location</div>
                    <span className="font-medium text-slate-900">
                      Bengaluru, India (Global Advisory Reach)
                    </span>
                  </div>
                </div>

                {/* Website */}
                <div className="contact-channel-item flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100/80 flex items-center justify-center text-[#0078B8] shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Website</div>
                    <span className="font-medium text-slate-900">
                      www.kralifesciences.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Consultation Turnaround Note */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>
                  Direct leadership review within{' '}
                  <strong className="text-slate-800">24–48 business hours</strong>.
                </span>
              </div>
            </div>

            {/* Structured Engagement Pathway Pill */}
            <div className="contact-pathway-card rounded-2xl p-5 bg-slate-50/90 border border-slate-200/80 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0078B8]">
                Collaborative Engagement Pathway
              </div>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0078B8] flex items-center justify-center text-[10px] font-bold">
                    1
                  </span>
                  <span>Confidential Programme Scoping Discussion</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0078B8] flex items-center justify-center text-[10px] font-bold">
                    2
                  </span>
                  <span>Operational Gap & Feasibility Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0078B8] flex items-center justify-center text-[10px] font-bold">
                    3
                  </span>
                  <span>Actionable Execution & Governance Blueprint</span>
                </div>
              </div>
            </div>
          </div>

          {/* ════ Right Column: Enquiry Form Card (7 Columns) ════ */}
          <div className="lg:col-span-7">
            <div className="contact-card-right relative rounded-3xl p-7 sm:p-9 bg-white border border-slate-200/90 shadow-[0_15px_45px_rgba(0,40,80,0.08)] overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0078B8] via-[#00A8CC] to-[#38BDF8]" />

              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Send Your Programme Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your study requirements to arrange an exploratory technical consultation.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 px-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Enquiry Received Successfully
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.fullName || 'Colleague'}</strong>. Dr. Kavya Appaiah and the kRa Life Sciences team will review your objectives and contact you shortly.
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        organisation: '',
                        email: '',
                        phone: '',
                        areaOfInterest: 'Clinical Trial Feasibility & Planning',
                        requirements: '',
                      });
                    }}
                    className="mt-4"
                  >
                    Send Another Enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="contact-form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Dr. / Mr. / Ms. Name"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#0078B8] focus:ring-1 focus:ring-[#0078B8] transition-all"
                      />
                    </div>

                    {/* Organisation */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Organisation <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.organisation}
                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                        placeholder="Pharma / Biotech / CRO"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#0078B8] focus:ring-1 focus:ring-[#0078B8] transition-all"
                      />
                    </div>
                  </div>

                  <div className="contact-form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Business Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Business Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="colleague@organisation.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#0078B8] focus:ring-1 focus:ring-[#0078B8] transition-all"
                      />
                    </div>

                    {/* Phone Number (optional) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Phone Number <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+Country (Number)"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#0078B8] focus:ring-1 focus:ring-[#0078B8] transition-all"
                      />
                    </div>
                  </div>

                  {/* Area of Interest */}
                  <div className="contact-form-row">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Area of Interest <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.areaOfInterest}
                        onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-[#0078B8] focus:ring-1 focus:ring-[#0078B8] transition-all appearance-none cursor-pointer"
                      >
                        {areasOfInterest.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-slate-900">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        ▾
                      </span>
                    </div>
                  </div>

                  {/* Brief Description of Your Requirements */}
                  <div className="contact-form-row">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Brief Description of Your Requirements <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="Outline your study phase, therapeutic focus, operational challenge, or target milestone..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#0078B8] focus:ring-1 focus:ring-[#0078B8] transition-all resize-none"
                    />
                  </div>

                  {/* High-Trust Compliance Disclaimer Notice */}
                  <div className="contact-form-row p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
                    <span className="text-amber-600 font-bold shrink-0 mt-0.5">ℹ</span>
                    <span>
                      <strong className="text-amber-800">Privacy Notice:</strong> Please do not submit patient-identifiable information or confidential clinical trial data through this form.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="contact-form-row pt-2 flex sm:justify-start justify-center">
                    <Button
                      type="submit"
                      disabled={submitting}
                      size="compact"
                      variant="primary"
                    >
                      {submitting ? 'Transmitting Enquiry...' : 'Submit Enquiry'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
