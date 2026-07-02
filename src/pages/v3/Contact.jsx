import Reveal from '../../components/v3/Reveal.jsx'
import RcNav from '../../components/v3/RcNav.jsx'
import RcFooter from '../../components/v3/RcFooter.jsx'
import LeadForm from '../../components/v3/LeadForm.jsx'
import { CALENDAR_URL, waLink } from '../../lib/contact.js'
import { WhatsAppIcon, CalendarIcon, WaFloat } from '../../components/v3/Cta.jsx'
import '../../styles/v3/base.css'
import '../../styles/v3/contact.css'

// Contacto (v3) — misma voz que la home. El form (LeadForm) envía a Netlify
// Forms con anti-spam; origen="contacto".
const WA_TEXT = 'Hola Tinge 👋 Quiero hablar sobre mi marca.'

export default function ContactV3() {
  return (
    <div className="rc">
      <RcNav base="/" />

      <section className="rc-contact">
        <Reveal className="rc-contact-intro">
          <span className="rc-eyebrow">Contacto</span>
          <h1 className="rc-contact-title rc-poster">Hablemos.</h1>
          <p className="rc-contact-text">
            Cuéntanos en qué está tu marca y te respondemos en menos de 48 horas.
          </p>
          <div className="rc-contact-quick">
            <a href={waLink(WA_TEXT)} target="_blank" rel="noreferrer" className="rc-btn-wa">
              <WhatsAppIcon /> Escríbenos por WhatsApp
            </a>
            <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="rc-btn-cal">
              <CalendarIcon /> Agendar una reunión
            </a>
          </div>
          <div className="rc-contact-meta">
            <a href="mailto:team@tingestudio.co">team@tingestudio.co</a>
            <a href="tel:+573167224507">+57 316 722 4507</a>
            <span>Colombia</span>
          </div>
        </Reveal>

        <Reveal className="rc-contact-formwrap" delay={0.1}>
          <LeadForm origen="contacto" />
        </Reveal>
      </section>

      <RcFooter base="/" />

      <WaFloat text={WA_TEXT} />
    </div>
  )
}
