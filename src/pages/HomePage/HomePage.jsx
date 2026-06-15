import { Header } from "../../components/Header/Header.jsx";
import { NewsSpotlight } from "../../components/NewsSpotlight/NewsSpotlight.jsx";
import { AboutSection } from "../../components/AboutSection/AboutSection.jsx";
import { ValuesSection } from "../../components/ValuesSection/ValuesSection.jsx";
import { QuoteBlock } from "../../components/QuoteBlock/QuoteBlock.jsx";
import { RegionsStrip } from "../../components/RegionsStrip/RegionsStrip.jsx";
import { TeamSection } from "../../components/TeamSection/TeamSection.jsx";
import { ProjectsSection } from "../../components/ProjectsSection/ProjectsSection.jsx";
import { FAQSection } from "../../components/FAQSection/FAQSection.jsx";
import { JoinForm } from "../../components/JoinForm/JoinForm.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";

export function HomePage({ site }) {
  const { settings, news, values, team, projects, faqs } = site;
  return (
    <>
      <Header settings={settings} />
      <main>
        <NewsSpotlight title={settings.sections.newsTitle} news={news} />
        <AboutSection settings={settings} />
        <ValuesSection title={settings.sections.valuesTitle} values={values} />
        <QuoteBlock settings={settings} />
        <RegionsStrip regions={site.regions} />
        <TeamSection title={settings.sections.teamTitle} team={team} />
        <ProjectsSection title={settings.sections.projectsTitle} projects={projects} />
        <FAQSection title={settings.sections.faqTitle} faqs={faqs} />
        <section className="region-finder-banner section-wrap">
          <div className="region-finder-banner__inner">
            <h2>Давай найдем твое рег. отделение</h2>
            <a className="button button--orange" href="/regions">Посмотреть отделения</a>
          </div>
        </section>
        <JoinForm settings={settings} regions={site.regions} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
