import { useState, useRef } from 'react';
import Button from './Button';

interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    number: '01',
    question: 'What services does kRa Life Sciences provide?',
    answer:
      'kRa Life Sciences provides end-to-end clinical trial consulting and clinical development support, including global trial management, study planning, patient recruitment, site strategy, regulatory coordination, and operational excellence.',
  },
  {
    id: 'faq-2',
    number: '02',
    question: 'Which therapeutic areas does kRa Life Sciences support?',
    answer:
      'We support clinical research across a broad range of therapeutic areas, including oncology, cardiology, neurology, immunology, metabolic disorders, and other clinical research specialties, depending on study requirements.',
  },
  {
    id: 'faq-3',
    number: '03',
    question: 'Can kRa Life Sciences support clinical trials across multiple countries?',
    answer:
      'Yes. We help coordinate cross-geography clinical trial activities, align stakeholders, support site management, and streamline communication to maintain consistency and operational efficiency across regions.',
  },
  {
    id: 'faq-4',
    number: '04',
    question: 'How does kRa Life Sciences help improve clinical trial efficiency?',
    answer:
      'We focus on proactive planning, risk-based oversight, effective site coordination, patient recruitment strategies, and streamlined processes to help reduce operational bottlenecks and keep clinical trials progressing efficiently.',
  },
  {
    id: 'faq-5',
    number: '05',
    question: 'How can I engage kRa Life Sciences for my clinical development programme?',
    answer:
      'You can contact our team through the programme enquiry form on this website. Share your study objectives, therapeutic area, development stage, and support requirements, and our team can discuss a suitable approach.',
  },
];

interface FAQProps {
  onOpenContactModal?: () => void;
}

export default function FAQ({ onOpenContactModal }: FAQProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <section
      id="faq"
      className={`relative w-full overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F6FA] to-[#E9F2F8] border-t border-slate-200/80 transition-all duration-300 font-sans ${
        isOpen ? 'py-10 sm:py-12' : 'py-6 sm:py-8'
      }`}
    >
      {/* ── Ambient Radial Glows ── */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ── Left-Aligned Button with Button.tsx Design ── */}
        <div className="flex justify-start">
          <Button
            id="toggle-faq-btn"
            onClick={toggleOpen}
            variant="primary"
            size="compact"
            icon={
              <svg
                className={`w-3.5 h-3.5 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            }
          >
            {isOpen ? 'Hide Frequently Asked Questions' : 'Frequently Asked Questions (FAQ)'}
          </Button>
        </div>

        {/* ── Expandable Accordion Container ── */}
        {isOpen && (
          <div
            ref={contentRef}
            className="transition-all duration-500 ease-out space-y-3 sm:space-y-3.5 pt-6 sm:pt-8 max-w-5xl"
          >
            {FAQ_DATA.map((item, index) => {
              const isItemActive = activeAccordion === index;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                    isItemActive
                      ? 'bg-white shadow-[0_8px_30px_rgba(0,43,73,0.08)] border-sky-300/80 ring-1 ring-sky-200/60'
                      : 'bg-white/85 hover:bg-white shadow-[0_2px_10px_rgba(0,43,73,0.04)] border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  {/* Accordion Header / Question Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between text-left p-4 sm:p-5 gap-3.5 sm:gap-4 cursor-pointer group"
                    aria-expanded={isItemActive}
                  >
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                      {/* Number Badge */}
                      <span
                        className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center shrink-0 text-[11px] sm:text-xs font-semibold font-sans transition-colors ${
                          isItemActive
                            ? 'bg-gradient-to-br from-[#0070BA] to-[#004D80] text-white shadow-sm'
                            : 'bg-sky-50 text-[#0070BA] border border-sky-100 group-hover:bg-sky-100'
                        }`}
                      >
                        {item.number}
                      </span>

                      {/* Question Heading */}
                      <h3
                        className={`text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] font-semibold font-sans leading-snug tracking-tight transition-colors ${
                          isItemActive ? 'text-[#002B49]' : 'text-slate-800 group-hover:text-[#002B49]'
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    {/* Chevron Circle */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isItemActive
                          ? 'bg-[#EAF5FC] text-[#0070BA] rotate-180'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Answer Content */}
                  {isItemActive && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                      <div className="pl-10 sm:pl-11.5 pr-2 pt-2 border-t border-slate-100">
                        <p className="text-slate-600 text-xs sm:text-[14px] leading-relaxed font-sans text-justify tracking-tight">
                          {item.answer}
                        </p>

                        {/* Special CTA action on item 5 */}
                        {item.id === 'faq-5' && (
                          <div className="mt-3.5 pt-2.5 flex flex-wrap items-center gap-3">
                            <a
                              href="#contact"
                              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#0070BA] hover:text-[#005599] transition-colors"
                            >
                              <span>Go to Programme Enquiry Form</span>
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                              </svg>
                            </a>
                            {onOpenContactModal && (
                              <button
                                type="button"
                                onClick={onOpenContactModal}
                                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
                              >
                                <span>• Open Popup Form</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* ── Bottom Section Close Bar ── */}
            <div className="pt-4 flex justify-start">
              <button
                type="button"
                onClick={toggleOpen}
                className="text-xs sm:text-[13px] font-medium text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Collapse FAQ Section</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
