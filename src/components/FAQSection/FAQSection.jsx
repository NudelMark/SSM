import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionTitle } from "../SectionTitle/SectionTitle.jsx";

export function FAQSection({ title, faqs }) {
  const [openId, setOpenId] = useState(faqs[0]?.id);

  return (
    <section className="faq-section section-wrap" id="faq">
      <SectionTitle>{title}</SectionTitle>
      <div className="faq-list">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={faq.id}>
              <button type="button" onClick={() => setOpenId(isOpen ? "" : faq.id)}>
                <span>{faq.question}</span>
                <ChevronDown size={28} strokeWidth={2} />
              </button>
              <p>{faq.answer}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
