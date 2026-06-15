import { useState } from "react";
import { api } from "../../lib/api.js";
import { SectionTitle } from "../SectionTitle/SectionTitle.jsx";

const initialForm = {
  email: "",
  full_name: "",
  phone: "",
  birth_date: "",
  region: "",
  region_id: "",
  vk: "",
  organizations: "",
  position: "",
  workplace: "",
  education: ""
};

export function JoinForm({ settings, regions, defaultRegionId }) {
  const [form, setForm] = useState(() => {
    if (defaultRegionId && regions) {
      const r = regions.find((r) => r.id === defaultRegionId);
      if (r) return { ...initialForm, region_id: r.id, region: r.name };
    }
    return initialForm;
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setIsSending(true);
    setStatus({ type: "", message: "" });
    try {
      await api("/api/applications", { method: "POST", body: form });
      setForm(initialForm);
      setStatus({ type: "success", message: "Заявка отправлена. Мы свяжемся с вами после обработки анкеты." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="join-section section-wrap" id="join">
      <div className="join-section__intro">
        <SectionTitle tone="blue">{settings.sections.joinTitle}</SectionTitle>
        <p>{settings.sections.joinLead}</p>
      </div>

      <form className="join-form" onSubmit={submit}>
        <label>
          <span>Ваша почта</span>
          <input required type="email" placeholder="mail@example.com" value={form.email} onChange={(event) => update("email", event.target.value)} />
        </label>
        <label>
          <span>Ваше ФИО</span>
          <input required placeholder="Иванов Иван Иванович" value={form.full_name} onChange={(event) => update("full_name", event.target.value)} />
        </label>
        <label>
          <span>Ваш телефон</span>
          <div className="join-form__phone">
            <strong>+7</strong>
            <input required placeholder="(000) 000-00-00" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
          </div>
        </label>
        <label>
          <span>Дата рождения</span>
          <input required placeholder="00.00.0000" value={form.birth_date} onChange={(event) => update("birth_date", event.target.value)} />
        </label>
        <label>
          <span>Ваш регион</span>
          <select required value={form.region_id} onChange={(event) => {
            const selected = regions.find((r) => r.id === event.target.value);
            update("region_id", event.target.value);
            update("region", selected ? selected.name : "");
          }}>
            <option value="">Выберите регион</option>
            {regions && regions.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Ваш VK</span>
          <input placeholder="vk.com/ваш_профиль" value={form.vk} onChange={(event) => update("vk", event.target.value)} />
        </label>
        <label>
          <span>В каких организациях состоите?</span>
          <input placeholder="Организация или «не состою»" value={form.organizations} onChange={(event) => update("organizations", event.target.value)} />
        </label>
        <label>
          <span>Какую должность занимаете?</span>
          <input placeholder="Активист, координатор, волонтёр" value={form.position} onChange={(event) => update("position", event.target.value)} />
        </label>
        <label>
          <span>Место учёбы/работы</span>
          <input required placeholder="Название учебного заведения или организации" value={form.workplace} onChange={(event) => update("workplace", event.target.value)} />
        </label>
        <label className="join-form__wide">
          <span>Какие факультет, курс, специальность</span>
          <textarea required placeholder="Например: ИСФН, 2 курс, государственное управление" value={form.education} onChange={(event) => update("education", event.target.value)} />
        </label>
        <button className="button button--orange join-form__submit" type="submit" disabled={isSending}>
          {isSending ? "Отправляем..." : "Отправить заявку"}
        </button>
        {status.message && <p className={`join-form__status join-form__status--${status.type}`}>{status.message}</p>}
      </form>
    </section>
  );
}
