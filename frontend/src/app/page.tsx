"use client";

import { useState } from "react";
import styles from "./page.module.css";

function formatDateLabel(date: Date) {
  const formatter = new Intl.DateTimeFormat("pt-BR");
  const formattedDate = formatter.format(date);
  const formattedToday = formatter.format(new Date());

  return formattedDate === formattedToday
    ? `hoje, ${formattedDate}`
    : `na data ${formattedDate}`;
}

export default function Home() {
  const [selectedDate] = useState<Date | null>(null);
  const [clanTag, setClanTag] = useState("");
  
  const dateLabel = selectedDate
    ? formatDateLabel(selectedDate)
    : "hoje";
  
  async function handleClanSearch(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.brand}>
            <div className={styles.crownBadge} aria-hidden="true">
              ♛
            </div>

            <div>
              <p className={styles.eyebrow}>
                Game Clash Royale • Projeto Independente
              </p>

              <h1>Guerra de Clãs ⚔️</h1>

              <p className={styles.subtitle}>
                Pesquise o jogador que não fez as batalhas na GC ⚔️
              </p>
            </div>
          </div>

          <label className={styles.language}>
            <span>Idioma</span>

            <select defaultValue="pt-BR">
              <option value="pt-BR">Português</option>
              <option value="en-US">English</option>
              <option value="es-ES">Español</option>
              <option value="zh-CN">中文</option>
              <option value="ja-JP">日本語</option>
              <option value="ru-RU">Русский</option>
              <option value="ir-IR">فارسی</option>
              <option value="arabic">العربية</option>
              <option value="it-IT">Italiano</option>
            </select>
          </label>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <section
            className={styles.searchCard}
            aria-labelledby="clan-search-title"
          >
            <div className={styles.cardHeading}>
              <p>Aqui é feita a consulta da Guerra de Clãs ⚔️</p>
              <h2 id="clan-search-title">Encontre aqui o seu Clã</h2>

              <span>
                Digite a tag do seu clã para ver todos os jogadores que participaram da Guerra de Clãs, {dateLabel} ⚔️
              </span>
            </div>

            <form className={styles.searchForm} onSubmit={handleClanSearch}>
              <label htmlFor="clan-tag">Tag do Clã</label>

              <div className={styles.searchRow}>
                <input
                  id="clan-tag"
                  name="clantag"
                  type="text"
                  autoComplete="off"
                  spellCheck="false"
                  value={clanTag}
                  onChange={(e) => setClanTag(e.target.value)}
                />

                <button type="submit">
                  <span aria-hidden="true">🔍</span>
                  Buscar Clã
                </button>
              </div>

              <p className={styles.hint}>
                A tag começa com # e você encontra no perfil do Clã
              </p>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
