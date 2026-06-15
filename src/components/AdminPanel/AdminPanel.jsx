import { useEffect, useMemo, useState } from "react";
import { api, fileToDataUrl, formatDate } from "../../lib/api.js";

const collections = {
  news: {
    title: "Новости",
    endpoint: "/api/admin/news",
    titleField: "title",
    defaults: {
      date: new Date().toISOString().slice(0, 10),
      title: "",
      excerpt: "",
      body: "",
      image: "/uploads/news-main.jpg",
      featured: 0,
      created_at: new Date().toISOString()
    },
    fields: [
      { name: "date", label: "Дата", type: "date" },
      { name: "title", label: "Заголовок" },
      { name: "excerpt", label: "Краткое описание", type: "textarea" },
      { name: "body", label: "Текст новости", type: "textarea" },
      { name: "image", label: "Изображение", type: "image" },
      { name: "featured", label: "Главная новость", type: "checkbox" }
    ]
  },
  projects: {
    title: "Проекты",
    endpoint: "/api/admin/projects",
    titleField: "title",
    defaults: { title: "", description: "", icon: "HeartHandshake", color: "orange", image: "/uploads/project-help.jpg", sort_order: 10 },
    fields: [
      { name: "title", label: "Название" },
      { name: "description", label: "Описание", type: "textarea" },
      { name: "icon", label: "Иконка Lucide" },
      { name: "color", label: "Цвет", type: "colorSelect" },
      { name: "image", label: "Изображение", type: "image" },
      { name: "sort_order", label: "Порядок", type: "number" }
    ]
  },
  team: {
    title: "Команда",
    endpoint: "/api/admin/team",
    titleField: "name",
    defaults: { name: "", role: "", commission: "Добровольчество", bio: "", photo: "/uploads/team-volunteer.jpg", sort_order: 10, display_mode: "commission" },
    fields: [
      { name: "name", label: "ФИО" },
      { name: "role", label: "Роль" },
      { name: "commission", label: "Комиссия" },
      { name: "display_mode", label: "Тип", type: "displayToggle" },
      { name: "bio", label: "Описание", type: "textarea" },
      { name: "photo", label: "Фото", type: "image" },
      { name: "sort_order", label: "Порядок", type: "number" }
    ]
  },
  values: {
    title: "Ценности",
    endpoint: "/api/admin/values",
    titleField: "title",
    defaults: { title: "", description: "", icon: "Heart", color: "blue", image: "/uploads/value-solidarity.jpg", sort_order: 10 },
    fields: [
      { name: "title", label: "Название" },
      { name: "description", label: "Описание", type: "textarea" },
      { name: "icon", label: "Иконка Lucide" },
      { name: "color", label: "Цвет", type: "colorSelect" },
      { name: "image", label: "Изображение", type: "image" },
      { name: "sort_order", label: "Порядок", type: "number" }
    ]
  },
  faqs: {
    title: "FAQ",
    endpoint: "/api/admin/faqs",
    titleField: "question",
    defaults: { question: "", answer: "", sort_order: 10 },
    fields: [
      { name: "question", label: "Вопрос", type: "textarea" },
      { name: "answer", label: "Ответ", type: "textarea" },
      { name: "sort_order", label: "Порядок", type: "number" }
    ]
  },
  regions: {
    title: "Региональные отделения",
    endpoint: "/api/admin/regions",
    titleField: "name",
    defaults: { name: "", sort_order: 10 },
    fields: [
      { name: "name", label: "Название региона" },
      { name: "sort_order", label: "Порядок", type: "number" }
    ]
  },
  regionNews: {
    title: "Новости отделения",
    endpoint: "/api/admin/region-news",
    titleField: "title",
    defaults: {
      date: new Date().toISOString().slice(0, 10),
      title: "",
      excerpt: "",
      body: "",
      image: "/uploads/news-main.jpg",
      created_at: new Date().toISOString()
    },
    fields: [
      { name: "date", label: "Дата", type: "date" },
      { name: "title", label: "Заголовок" },
      { name: "excerpt", label: "Краткое описание", type: "textarea" },
      { name: "body", label: "Текст новости", type: "textarea" },
      { name: "image", label: "Изображение", type: "image" }
    ]
  },
  regionTeam: {
    title: "Команда отделения",
    endpoint: "/api/admin/region-team",
    titleField: "name",
    defaults: { name: "", role: "", bio: "", photo: "/uploads/team-volunteer.jpg", sort_order: 10 },
    fields: [
      { name: "name", label: "ФИО" },
      { name: "role", label: "Роль" },
      { name: "bio", label: "Описание", type: "textarea" },
      { name: "photo", label: "Фото", type: "image" },
      { name: "sort_order", label: "Порядок", type: "number" }
    ]
  }
};

function Field({ field, value, onChange }) {
  if (field.type === "textarea") {
    return (
      <label className="admin-field">
        <span>{field.label}</span>
        <textarea value={value || ""} onChange={(event) => onChange(field.name, event.target.value)} />
      </label>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="admin-field admin-field--checkbox">
        <input type="checkbox" checked={Boolean(Number(value))} onChange={(event) => onChange(field.name, event.target.checked ? 1 : 0)} />
        <span>{field.label}</span>
      </label>
    );
  }

  if (field.type === "colorSelect") {
    return (
      <label className="admin-field">
        <span>{field.label}</span>
        <select value={value || "orange"} onChange={(event) => onChange(field.name, event.target.value)}>
          <option value="orange">Оранжевый</option>
          <option value="red">Красный</option>
          <option value="blue">Синий</option>
          <option value="green">Зелёный</option>
        </select>
      </label>
    );
  }

  if (field.type === "displayToggle") {
    return (
      <div className="admin-field admin-toggle-group">
        <span>{field.label}</span>
        <label className={value === "person" ? "is-active" : ""}>
          <input type="radio" name={field.name} value="person" checked={value === "person"} onChange={() => onChange(field.name, "person")} />
          Человек
        </label>
        <label className={value === "commission" ? "is-active" : ""}>
          <input type="radio" name={field.name} value="commission" checked={value === "commission"} onChange={() => onChange(field.name, "commission")} />
          Комиссия
        </label>
      </div>
    );
  }

  if (field.type === "image") {
    return <ImageField field={field} value={value} onChange={onChange} />;
  }

  return (
    <label className="admin-field">
      <span>{field.label}</span>
      <input
        type={field.type || "text"}
        value={value || ""}
        onChange={(event) => onChange(field.name, field.type === "number" ? Number(event.target.value) : event.target.value)}
      />
    </label>
  );
}

function ImageField({ field, value, onChange, accept = "image/png,image/jpeg,image/webp,image/svg+xml" }) {
  const [isUploading, setIsUploading] = useState(false);

  async function upload(file) {
    if (!file) return;
    setIsUploading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      const result = await api("/api/uploads", { method: "POST", body: { dataUrl, fileName: file.name } });
      onChange(field.name, result.url);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <label className="admin-field">
      <span>{field.label}</span>
      <div className="admin-upload">
        {value && <img src={value} alt="" />}
        <input value={value || ""} onChange={(event) => onChange(field.name, event.target.value)} />
        <input type="file" accept={accept} onChange={(event) => upload(event.target.files?.[0])} />
      </div>
      {isUploading && <small>Загружаем файл...</small>}
    </label>
  );
}

function CollectionEditor({ config, onSiteChange }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(config.defaults);
  const [message, setMessage] = useState("");

  async function load() {
    setItems(await api(config.endpoint));
  }

  useEffect(() => {
    load();
    setForm(config.defaults);
  }, [config.endpoint]);

  function update(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function save(event) {
    event.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `${config.endpoint}/${form.id}` : config.endpoint;
    await api(url, { method, body: form });
    setMessage("Сохранено");
    setForm(config.defaults);
    await load();
    await onSiteChange();
  }

  async function remove(id) {
    await api(`${config.endpoint}/${id}`, { method: "DELETE" });
    setMessage("Удалено");
    setForm(config.defaults);
    await load();
    await onSiteChange();
  }

  return (
    <div className="admin-workspace">
      <div className="admin-list">
        <button className="button button--orange" type="button" onClick={() => setForm(config.defaults)}>
          Добавить
        </button>
        {items.map((item) => (
          <button key={item.id} type="button" className={item.id === form.id ? "is-active" : ""} onClick={() => setForm(item)}>
            <strong>{item[config.titleField]}</strong>
            {"date" in item && <span>{formatDate(item.date)}</span>}
          </button>
        ))}
      </div>

      <form className="admin-form" onSubmit={save}>
        <h2>{form.id ? "Редактирование" : `Новый раздел: ${config.title}`}</h2>
        <div className="admin-form__grid">
          {config.fields.map((field) => (
            <Field key={field.name} field={field} value={form[field.name]} onChange={update} />
          ))}
        </div>
        <div className="admin-form__actions">
          <button className="button button--blue" type="submit">
            Сохранить
          </button>
          {form.id && (
            <button className="button button--ghost" type="button" onClick={() => remove(form.id)}>
              Удалить
            </button>
          )}
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
}

function SettingsEditor({ site, onSiteChange }) {
  const [settings, setSettings] = useState(site.settings);
  const [message, setMessage] = useState("");

  useEffect(() => setSettings(site.settings), [site.settings]);

  function setNested(path, value) {
    setSettings((current) => {
      const next = structuredClone(current);
      const keys = path.split(".");
      let target = next;
      keys.slice(0, -1).forEach((key) => {
        target[key] = target[key] ?? {};
        target = target[key];
      });
      target[keys.at(-1)] = value;
      return next;
    });
  }

  function updateStat(index, key, value) {
    setSettings((current) => {
      const next = structuredClone(current);
      next.stats[index][key] = value;
      return next;
    });
  }

  async function save(event) {
    event.preventDefault();
    await api("/api/settings", { method: "PUT", body: settings });
    setMessage("Настройки сохранены");
    await onSiteChange();
  }

  const sectionFields = [
    ["sections.newsTitle", "Заголовок новостей"],
    ["sections.aboutTitle", "Заголовок «О союзе»"],
    ["sections.aboutText", "Текст «О союзе»", "textarea"],
    ["sections.valuesTitle", "Заголовок ценностей"],
    ["sections.teamTitle", "Заголовок команды"],
    ["sections.projectsTitle", "Заголовок проектов"],
    ["sections.faqTitle", "Заголовок FAQ"],
    ["sections.joinTitle", "Заголовок заявки"],
    ["sections.joinLead", "Описание заявки", "textarea"],
    ["sections.quote", "Цитата Рушана Бахтеева", "textarea"],
    ["sections.quoteAuthor", "Автор цитаты"],
    ["sections.quoteRole", "Должность автора"],
    ["sections.footerCtaTitle", "Заголовок CTA в футере", "textarea"],
    ["sections.footerEmail", "Почта"],
    ["sections.footerPhone", "Телефон"]
  ];

  return (
    <form className="admin-form admin-form--settings" onSubmit={save}>
      <h2>Настройки блоков и хедера</h2>
      <div className="admin-form__grid">
        <ImageField field={{ name: "header.logoUrl", label: "Логотип (десктоп)" }} value={settings.header.logoUrl} onChange={setNested} accept="image/svg+xml,image/png,image/jpeg,image/webp" />
        <ImageField field={{ name: "header.logoShortUrl", label: "Логотип короткий (мобильный)" }} value={settings.header.logoShortUrl} onChange={setNested} accept="image/svg+xml,image/png,image/jpeg,image/webp" />
        <ImageField field={{ name: "header.logoBigUrl", label: "Логотип большой (меню)" }} value={settings.header.logoBigUrl} onChange={setNested} accept="image/svg+xml,image/png,image/jpeg,image/webp" />
        <label className="admin-field">
          <span>Кнопка в хедере</span>
          <input value={settings.header.ctaText} onChange={(event) => setNested("header.ctaText", event.target.value)} />
        </label>
        <label className="admin-field">
          <span>VK</span>
          <input value={settings.header.socials.vk || ""} onChange={(event) => setNested("header.socials.vk", event.target.value)} />
        </label>
        <label className="admin-field">
          <span>Telegram</span>
          <input value={settings.header.socials.telegram || ""} onChange={(event) => setNested("header.socials.telegram", event.target.value)} />
        </label>
        <label className="admin-field">
          <span>Max</span>
          <input value={settings.header.socials.max || ""} onChange={(event) => setNested("header.socials.max", event.target.value)} />
        </label>
        {["vk", "telegram", "max"].map((platform) => (
          <ImageField
            key={platform}
            field={{ name: `header.socialIcons.${platform}`, label: `Иконка ${platform === "vk" ? "VK" : platform === "telegram" ? "Telegram" : "Max"}` }}
            value={settings.header.socialIcons?.[platform] || ""}
            onChange={setNested}
            accept="image/png,image/jpeg,image/webp"
          />
        ))}
        {sectionFields.map(([path, label, type]) => {
          const [group, key] = path.split(".");
          const value = settings[group][key];
          return (
            <label className="admin-field" key={path}>
              <span>{label}</span>
              {type === "textarea" ? (
                <textarea value={value} onChange={(event) => setNested(path, event.target.value)} />
              ) : (
                <input value={value} onChange={(event) => setNested(path, event.target.value)} />
              )}
            </label>
          );
        })}
      </div>

      <h3>Статистика</h3>
      <div className="admin-stats-editor">
        {settings.stats.map((stat, index) => (
          <div key={index}>
            <input value={stat.value} onChange={(event) => updateStat(index, "value", event.target.value)} />
            <input value={stat.label} onChange={(event) => updateStat(index, "label", event.target.value)} />
          </div>
        ))}
      </div>

      <div className="admin-form__actions">
        <button className="button button--blue" type="submit">
          Сохранить настройки
        </button>
        {message && <p>{message}</p>}
      </div>
    </form>
  );
}

function Applications({ onSiteChange }) {
  const [applications, setApplications] = useState([]);

  async function load() {
    setApplications(await api("/api/applications"));
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id, status) {
    await api(`/api/applications/${id}`, { method: "PATCH", body: { status } });
    await load();
    await onSiteChange();
  }

  async function remove(id) {
    await api(`/api/applications/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="admin-table-wrap">
      <h2>Заявки на вступление</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>ФИО</th>
            <th>Контакты</th>
            <th>VK</th>
            <th>Регион</th>
            <th>Опыт</th>
            <th>Учёба/работа</th>
            <th>Статус</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {applications.map((item) => (
            <tr key={item.id}>
              <td>{new Date(item.created_at).toLocaleDateString("ru-RU")}</td>
              <td>
                <strong>{item.full_name}</strong>
                <span>{item.birth_date}</span>
              </td>
              <td>
                <a href={`mailto:${item.email}`}>{item.email}</a>
                <span>+7 {item.phone}</span>
              </td>
              <td>{item.vk ? <a href={item.vk.startsWith("http") ? item.vk : `https://vk.com/${item.vk}`} target="_blank" rel="noopener noreferrer">{item.vk}</a> : "—"}</td>
              <td>{item.region}</td>
              <td>
                <span>{item.organizations || "Не указано"}</span>
                <span>{item.position || "Без должности"}</span>
              </td>
              <td>
                <span>{item.workplace}</span>
                <span>{item.education}</span>
              </td>
              <td>
                <select value={item.status} onChange={(event) => setStatus(item.id, event.target.value)}>
                  <option value="new">Новая</option>
                  <option value="contacted">Связались</option>
                  <option value="accepted">Принята</option>
                  <option value="archived">Архив</option>
                </select>
              </td>
              <td>
                <button type="button" onClick={() => remove(item.id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!applications.length && <p className="admin-empty">Заявок пока нет.</p>}
    </div>
  );
}

function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    api("/api/subscribers").then(setSubscribers);
  }, []);

  return (
    <div className="admin-table-wrap">
      <h2>Подписки на новости</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((item) => (
            <tr key={item.id}>
              <td>{new Date(item.created_at).toLocaleDateString("ru-RU")}</td>
              <td>
                <a href={`mailto:${item.email}`}>{item.email}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!subscribers.length && <p className="admin-empty">Подписок пока нет.</p>}
    </div>
  );
}

function AdminUsers({ initialSite }) {
  const [admins, setAdmins] = useState([]);
  const [regions, setRegions] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", region_id: "" });
  const [message, setMessage] = useState("");

  async function load() {
    setAdmins(await api("/api/admin/admin-users"));
    setRegions(await api("/api/admin/regions"));
  }

  useEffect(() => { load(); }, []);

  async function save(event) {
    event.preventDefault();
    setMessage("");
    try {
      await api("/api/admin/admin-users", { method: "POST", body: form });
      setMessage("Администратор создан");
      setForm({ username: "", password: "", region_id: "" });
      await load();
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function remove(id) {
    if (!confirm("Удалить этого администратора?")) return;
    await api(`/api/admin/admin-users/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="admin-workspace">
      <div className="admin-list">
        <h3>Существующие администраторы</h3>
        {admins.map((admin) => (
          <div key={admin.id} className="admin-list__item">
            <strong>{admin.username}</strong>
            <span>{admin.role === "super" ? "Главный" : `Региональный — ${admin.region_name || "без региона"}`}</span>
            {admin.role !== "super" && (
              <button type="button" className="button button--ghost button--small" onClick={() => remove(admin.id)}>Удалить</button>
            )}
          </div>
        ))}
      </div>
      <form className="admin-form" onSubmit={save}>
        <h2>Создать регионального администратора</h2>
        <p>При создании регионального администратора укажите его логин, пароль и регион.</p>
        <div className="admin-form__grid">
          <label className="admin-field">
            <span>Логин</span>
            <input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          </label>
          <label className="admin-field">
            <span>Пароль</span>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </label>
          <label className="admin-field">
            <span>Регион</span>
            <select value={form.region_id} onChange={(e) => setForm({ ...form, region_id: e.target.value })} required>
              <option value="">Выберите регион</option>
              {regions.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </label>
        </div>
        <div className="admin-form__actions">
          <button className="button button--blue" type="submit">Создать</button>
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
}

function RegionSocialsEditor({ onSiteChange }) {
  const [socials, setSocials] = useState({ vk: "", telegram: "", max: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api("/api/admin/region-socials").then((data) => {
      setSocials({ vk: data.vk || "", telegram: data.telegram || "", max: data.max || "" });
    });
  }, []);

  function update(platform, value) {
    setSocials((prev) => ({ ...prev, [platform]: value }));
  }

  async function save(event) {
    event.preventDefault();
    await api("/api/admin/region-socials", { method: "PUT", body: { socials } });
    setMessage("Сохранено");
    await onSiteChange();
  }

  return (
    <form className="admin-form" onSubmit={save}>
      <h2>Социальные сети отделения</h2>
      <p>Укажите ссылки на соцсети вашего отделения. Будут показаны только заполненные.</p>
      <div className="admin-form__grid">
        {Object.keys(socials).map((platform) => (
          <label className="admin-field" key={platform}>
            <span>{platform === "vk" ? "VK" : platform === "telegram" ? "Telegram" : "Max"}</span>
            <input value={socials[platform] || ""} onChange={(e) => update(platform, e.target.value)} placeholder={`https://${platform === "vk" ? "vk.com" : platform === "telegram" ? "t.me" : ""}`} />
          </label>
        ))}
      </div>
      <div className="admin-form__actions">
        <button className="button button--blue" type="submit">Сохранить</button>
        {message && <p>{message}</p>}
      </div>
    </form>
  );
}

function BannerEditor({ onSiteChange }) {
  const [bannerUrl, setBannerUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    api("/api/admin/region-banner").then((data) => {
      setBannerUrl(data.banner_url || "");
    });
  }, []);

  async function upload(file) {
    if (!file) return;
    setIsUploading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      const result = await api("/api/uploads", { method: "POST", body: { dataUrl, fileName: file.name } });
      setBannerUrl(result.url);
    } finally {
      setIsUploading(false);
    }
  }

  async function save(event) {
    event.preventDefault();
    await api("/api/admin/region-banner", { method: "PUT", body: { banner_url: bannerUrl } });
    setMessage("Баннер сохранён");
    await onSiteChange();
  }

  return (
    <form className="admin-form" onSubmit={save}>
      <h2>Баннер отделения</h2>
      <p>Загрузите баннер для страницы вашего регионального отделения.</p>
      <div className="admin-form__grid">
        <label className="admin-field">
          <span>Баннер</span>
          <div className="admin-upload">
            {bannerUrl && <img src={bannerUrl} alt="" style={{ width: "100%", height: "auto", maxHeight: 200 }} />}
            <input value={bannerUrl || ""} onChange={(e) => setBannerUrl(e.target.value)} />
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => upload(e.target.files?.[0])} />
          </div>
          {isUploading && <small>Загружаем файл...</small>}
        </label>
      </div>
      <div className="admin-form__actions">
        <button className="button button--blue" type="submit">Сохранить баннер</button>
        {message && <p>{message}</p>}
      </div>
    </form>
  );
}

export function AdminPanel({ initialSite, onSiteChange, user }) {
  const [activeTab, setActiveTab] = useState(user.role === "regional" ? "regionNews" : "settings");
  const isSuper = user.role === "super";

  const superTabs = [
    { id: "settings", label: "Блоки сайта" },
    { id: "news", label: "Новости" },
    { id: "projects", label: "Проекты" },
    { id: "team", label: "Команда" },
    { id: "values", label: "Ценности" },
    { id: "faqs", label: "FAQ" },
    { id: "regions", label: "Регионы" },
    { id: "applications", label: "Заявки" },
    { id: "subscribers", label: "Подписки" },
    { id: "admin-users", label: "Администраторы" }
  ];

  const regionalTabs = [
    { id: "regionNews", label: "Новости отделения" },
    { id: "regionTeam", label: "Команда отделения" },
    { id: "regionSocials", label: "Соцсети отделения" },
    { id: "regionBanner", label: "Баннер отделения" },
    { id: "applications", label: "Заявки" }
  ];

  const tabs = isSuper ? superTabs : regionalTabs;
  const activeCollection = useMemo(() => collections[activeTab], [activeTab]);

  function logout() {
    localStorage.removeItem("ssm_auth");
    window.location.reload();
  }

  return (
    <main className="admin-panel">
      <aside className="admin-panel__sidebar">
        <h1>Админ-панель ССМ</h1>
        <p>{isSuper ? "Главный администратор" : `Региональный администратор`}</p>
        <p className="admin-panel__user">{user.username}</p>
        <nav>
          {tabs.map((tab) => (
            <button key={tab.id} type="button" className={activeTab === tab.id ? "is-active" : ""} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </nav>
        <button type="button" className="admin-panel__logout" onClick={logout}>
          Выйти
        </button>
      </aside>

      <section className="admin-panel__content">
        {activeTab === "settings" && isSuper && <SettingsEditor site={initialSite} onSiteChange={onSiteChange} />}
        {activeCollection && activeTab !== "settings" && activeTab !== "admin-users" && activeTab !== "regionBanner" && activeTab !== "regionSocials" && <CollectionEditor config={activeCollection} onSiteChange={onSiteChange} />}
        {activeTab === "applications" && <Applications onSiteChange={onSiteChange} />}
        {activeTab === "subscribers" && isSuper && <Subscribers />}
        {activeTab === "admin-users" && isSuper && <AdminUsers initialSite={initialSite} />}
        {activeTab === "regionSocials" && <RegionSocialsEditor onSiteChange={onSiteChange} />}
        {activeTab === "regionBanner" && <BannerEditor onSiteChange={onSiteChange} />}
      </section>
    </main>
  );
}
