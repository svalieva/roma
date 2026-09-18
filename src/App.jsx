import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, VolumeX, ChevronDown, MapPin, ArrowRight } from "lucide-react";
import "./style.css";

const wedding = {
  bride: { ru: "Дилсорабону", uz: "Dilsorabonu" },
  groom: { ru: "Ромизхон", uz: "Romizxon" },
  finalGroomName: { ru: "Ахроровых", uz: "Ahrorovlar" },
  finalBrideName: { ru: "Насриддиновых", uz: "Nasriddinovlar" },
  date: "2026-10-24T18:00:00",
  displayDate: "24 • 10 • 2026",
  venue: "The Garden House",
  ceremony: "18:00",
  dinner: "19:00",
  gatherTime: "17:30",
  eveningTime: "20:00",
  dressCode: { ru: "Элегантный стиль • Сад", uz: "Nafis uslub • Bogʻ" },
  rsvpDeadline: { ru: "1 сентября", uz: "1 sentabr" },
  address: { ru: "Ташкент, Узбекистан", uz: "Toshkent, Oʻzbekiston" },
  introBg: { ru: "/images/fon_7.jpg", uz: "/images/fon_11.jpg" },
  timelineBg: { ru: "/images/fon_10.jpg", uz: "/images/fon_12.jpg" },
  locationBg: { ru: "/images/address_rus.jpg", uz: "/images/address_uz.jpg" },
  dressBg: { ru: "/images/fon_15.jpg", uz: "/images/dress_code.jpg" },
  secondPhotoBg: { ru: "/images/foto_rus.jpg", uz: "/images/foto_uz.jpg" },
  mapUrl: "https://yandex.ru/maps/-/CTxmb-9h",
};

const RU_MONTHS_GEN = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const RU_MONTHS_UPPER = ["ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ"];
const RU_WEEKDAYS = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const RU_WEEKDAYS_UPPER = ["ВОСКРЕСЕНЬЕ", "ПОНЕДЕЛЬНИК", "ВТОРНИК", "СРЕДА", "ЧЕТВЕРГ", "ПЯТНИЦА", "СУББОТА"];

const UZ_MONTHS = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
const UZ_MONTHS_UPPER = UZ_MONTHS.map((m) => m.toUpperCase());
const UZ_WEEKDAYS = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
const UZ_WEEKDAYS_UPPER = UZ_WEEKDAYS.map((w) => w.toUpperCase());

const translations = {
  ru: {
    langLabel: "RU",
    switchLangAria: "Переключить язык",
    openInvitation: "Открыть приглашение",
    tapSeal: "Нажмите на печать",
    musicOn: "Музыка играет",
    musicOff: "Без музыки",
    musicOnAria: "Выключить музыку",
    musicOffAria: "Включить музыку",
    scroll: "листайте вниз",
    saveTheDate: "СОХРАНИТЕ ДАТУ",
    countdownLabels: ["дней", "часов", "минут", "секунд"],
    openMap: "Открыть карту",
    canWait: "С НЕТЕРПЕНИЕМ ЖДЁМ ВСТРЕЧИ СЕМЬИ",
    formatDate: (day, month, year) => `${day} ${RU_MONTHS_GEN[month]} ${year} года`,
    monthUpper: (m) => RU_MONTHS_UPPER[m],
    weekday: (d) => RU_WEEKDAYS[d],
    weekdayUpper: (d) => RU_WEEKDAYS_UPPER[d],
  },
  uz: {
    langLabel: "UZ",
    switchLangAria: "Tilni almashtirish",
    openInvitation: "Taklifnomani ochish",
    tapSeal: "Muhrga bosing",
    musicOn: "Musiqa yoqilgan",
    musicOff: "Musiqasiz",
    musicOnAria: "Musiqani oʻchirish",
    musicOffAria: "Musiqani yoqish",
    scroll: "pastga aylantiring",
    saveTheDate: "SANANI ESLAB QOLING",
    countdownLabels: ["kun", "soat", "daqiqa", "soniya"],
    openMap: "Xaritani ochish",
    canWait: "SIZ BILAN UCHRASHISHNI KUTAMIZ",
    formatDate: (day, month, year) => `${day}-${UZ_MONTHS[month]}, ${year}-yil`,
    monthUpper: (m) => UZ_MONTHS_UPPER[m],
    weekday: (d) => UZ_WEEKDAYS[d],
    weekdayUpper: (d) => UZ_WEEKDAYS_UPPER[d],
  },
};

const musicFile = "/music.mp3";

function pad(n) {
  return String(n).padStart(2, "0");
}

function useCountdown(target) {
  const [left, setLeft] = useState(() => Math.max(0, new Date(target) - Date.now()));

  useEffect(() => {
    const timer = setInterval(() => {
      setLeft(Math.max(0, new Date(target) - Date.now()));
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  const total = Math.floor(left / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function Section({ children, className = "", style }) {
  return (
    <section className={`section ${className}`} style={style}>
      {children}
    </section>
  );
}

function App() {
  const [lang, setLang] = useState("ru");
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const countdown = useCountdown(wedding.date);
  const t = translations[lang];
  const weddingDate = useMemo(() => new Date(wedding.date), []);
  const dayOfWeek = weddingDate.getDay();
  const monthIndex = weddingDate.getMonth();
  const dayOfMonth = weddingDate.getDate();
  const year = weddingDate.getFullYear();

  const formattedDate = t.formatDate(dayOfMonth, monthIndex, year);

  const toggleLang = () => setLang((l) => (l === "ru" ? "uz" : "ru"));

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch {
      setPlaying(false);
    }
  };

  const openInvitation = async () => {
    setOpened(true);
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {}
    }
  };

  return (
    <div className="site">
      <audio ref={audioRef} src={musicFile} loop preload="auto" />

      <button className="lang-switcher" onClick={toggleLang} aria-label={t.switchLangAria}>
        {t.langLabel}
      </button>

      <AnimatePresence>
        {!opened && (
          <motion.div
            className="envelope-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <motion.div
              className="envelope-half envelope-half-left"
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            >
              <motion.button
                className="open-button"
                onClick={openInvitation}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                aria-label={t.openInvitation}
              />
            </motion.div>
            <motion.div
              className="envelope-half envelope-half-right"
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.div
              className="seal-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
              >
                {t.tapSeal}
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {opened && (
        <motion.button
          className="music-button"
          onClick={toggleMusic}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
          aria-label={playing ? t.musicOnAria : t.musicOffAria}
        >
          {playing ? <Music2 size={18} /> : <VolumeX size={18} />}
          <span>{playing ? t.musicOn : t.musicOff}</span>
        </motion.button>
      )}

      <main className={opened ? "main visible" : "main"}>
        <Section className="hero">
          <h1>
            <span>{wedding.groom[lang]}</span>
            <em>&amp;</em>
            <span>{wedding.bride[lang]}</span>
          </h1>
          <div className="hero-line" />
          <p className="date-large">{wedding.displayDate}</p>
          <p className="weekday">{t.weekday(dayOfWeek)}</p>

          <div className="botanical botanical-left">❧</div>
          <div className="botanical botanical-right">❧</div>

          <motion.div
            className="scroll-hint"
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          >
            <span>{t.scroll}</span>
            <ChevronDown size={16} />
          </motion.div>
        </Section>

        <Section className="intro" style={{ backgroundImage: `url(${wedding.introBg[lang]})` }} />

        <Section
          className="photo-section-alt"
          style={{ backgroundImage: `url(${wedding.secondPhotoBg[lang]})` }}
        />

        <Section className="date-section">
          <p className="eyebrow">{t.saveTheDate}</p>
          <div className="calendar-card">
            <div className="calendar-month">{t.monthUpper(monthIndex)}</div>
            <div className="calendar-day">{pad(dayOfMonth)}</div>
            <div className="calendar-meta">{t.weekdayUpper(dayOfWeek)} • {year}</div>
          </div>

          <div className="countdown">
            {[countdown.days, countdown.hours, countdown.minutes, countdown.seconds].map((value, i) => (
              <div className="count-box" key={t.countdownLabels[i]}>
                <strong>{pad(value)}</strong>
                <span>{t.countdownLabels[i]}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section className="photo-section">
          <div className="photo-frame">
            <img className="photo-image" src="/images/fon_9.jpg" alt="" />
            <div className="photo-caption">{wedding.groom[lang]} &amp; {wedding.bride[lang]}</div>
          </div>
        </Section>

        <Section className="timeline-section" style={{ backgroundImage: `url(${wedding.timelineBg[lang]})` }} />

        <Section
          className="location-section"
          style={{ backgroundImage: `linear-gradient(rgba(247,240,234,.20), rgba(247,240,234,.20)), url(${wedding.locationBg[lang]})` }}
        >
          <a
            className="map-button"
            href={wedding.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={18} />
            <span>{t.openMap}</span>
            <ArrowRight size={18} />
          </a>
        </Section>

        <div className="section-divider" />

        <Section
          className="dress-section"
          style={{ backgroundImage: `linear-gradient(rgba(247,240,234,.30), rgba(247,240,234,.30)), url(${wedding.dressBg[lang]})` }}
        />

        <div className="section-divider section-divider-lg" />

        <Section className="final-section">
          <p className="eyebrow">{t.canWait}</p>
          <h2>{wedding.finalGroomName[lang]} <span>&amp;</span> {wedding.finalBrideName[lang]}</h2>
          <p>{formattedDate}</p>
        </Section>
      </main>
    </div>
  );
}

export default App;
