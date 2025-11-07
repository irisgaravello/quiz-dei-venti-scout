
import React, { useState } from 'react';

type WindKey = 'tramontana'|'grecale'|'levante'|'scirocco'|'ostro'|'libeccio'|'ponente'|'maestrale';

interface Wind {
  name: string;
  emoji: string;
  description: string;
  slug: string;
}

const WINDS: Record<WindKey, Wind> = {
  tramontana: { name: 'Tramontana (N)', emoji: '🧭', description: 'Severo e freddo: disciplinato, forte e onesto. Cura gli altri con chiarezza e la distanza giusta; aiuta a vedere meglio e a preservare.', slug: 'tramontana' },
  grecale:   { name: 'Grecale (NE)', emoji: '🌩️', description: 'Deciso e a volte imprevedibile: determinato e relativamente intenso. Azione fredda e lucida ma affettuosa; osserva in silenzio e aiuta a prevedere le tempeste.', slug: 'grecale' },
  levante:   { name: 'Levante (E)', emoji: '🌅', description: 'Porta la luce del risveglio: calma, paziente e delicata. Cura con perseveranza e semplicità; consola senza mai alzare la voce.', slug: 'levante' },
  scirocco:  { name: 'Scirocco (SE)', emoji: '🔥', description: 'Ama il cambiamento: passionale e intensa, a volte opprimente. Non lascia mai solo; dona calore, fisicità e generosità emotiva.', slug: 'scirocco' },
  ostro:     { name: 'Ostro (S)', emoji: '🌸', description: 'Caldo e dolce: morbido e paziente. Si prende cura ascoltando, senza giudicare; fa germogliare il bello negli altri.', slug: 'ostro' },
  libeccio:  { name: 'Libeccio (SW)', emoji: '⚡', description: 'Tempestoso e vivace: rapido e instabile. Scuote gli altri e li difende con sincerità e protezione; odia la noia e le ingiustizie.', slug: 'libeccio' },
  ponente:   { name: 'Ponente (W)', emoji: '🌙', description: 'Mite e moderato: amichevole e confortante. Amico leale e portatore di calma; la sua leggerezza fa bene al cuore.', slug: 'ponente' },
  maestrale: { name: 'Maestrale (NW)', emoji: '🗻', description: 'Potente e orgoglioso: burrascoso e autoritario, ma rialza senza consolare. Dona forza e ricorda la potenza che hanno dentro.', slug: 'maestrale' },
};

interface Option { id: string; text: string; wind: WindKey; }
interface Question { id: string; text: string; options: Option[]; }

const QUESTIONS: Question[] = [
  { id: 'q1', text: 'Quando qualcuno è in difficoltà, come reagisci?', options: [
    { id:'a', text: 'Prendo il controllo e sistemo la situazione con ordine.', wind:'tramontana' },
    { id:'b', text: 'Offro supporto caldo e rassicurante, stando vicino.', wind:'ostro' },
    { id:'c', text: 'Mi metto in movimento, a volte con energia forte per proteggere.', wind:'libeccio' },
    { id:'d', text: 'Ascolto in silenzio e aiuto con calma costante.', wind:'levante' },
  ]},
  { id: 'q2', text: 'Ti trovi a dover prendere una decisione difficile: cosa fai?', options: [
    { id:'a', text: 'Valuto freddamente e decido con precisione.', wind:'grecale' },
    { id:'b', text: 'Scelgo il cambiamento e seguo la passione.', wind:'scirocco' },
    { id:'c', text: 'Cerco la via di mezzo per non turbare gli altri.', wind:'ponente' },
    { id:'d', text: 'Imposto regole e disciplina per avere chiarezza.', wind:'tramontana' },
  ]},
  { id: 'q3', text: 'Ti piace provare cose nuove e avventure?', options: [
    { id:'a', text: 'Sì, cerco il brivido e l’azione rapida.', wind:'libeccio' },
    { id:'b', text: 'Sì, ma con attenzione e calcolo.', wind:'grecale' },
    { id:'c', text: 'Preferisco piccoli cambiamenti dolci.', wind:'ostro' },
    { id:'d', text: 'No: preferisco la routine e l’ordine.', wind:'tramontana' },
  ]},
  { id: 'q4', text: 'Come mostri affetto agli altri?', options: [
    { id:'a', text: 'Con gesti calorosi e fisicità.', wind:'scirocco' },
    { id:'b', text: 'Con ascolto paziente e parole dolci.', wind:'ostro' },
    { id:'c', text: 'Con consigli diretti e pratici.', wind:'tramontana' },
    { id:'d', text: 'Con presenza discreta e leggerezza.', wind:'ponente' },
  ]},
  { id: 'q5', text: 'Quando senti che qualcosa non va nel gruppo, tu…', options: [
    { id:'a', text: 'Prendo la leadership per sistemare le cose.', wind:'maestrale' },
    { id:'b', text: 'Osservo e avverto prima che peggiori.', wind:'grecale' },
    { id:'c', text: 'Cerco di alleviare le tensioni con dolcezza.', wind:'ostro' },
    { id:'d', text: 'Propongo un cambiamento per scuotere le cose.', wind:'libeccio' },
  ]},
  { id: 'q6', text: 'Quale frase ti descrive meglio?', options: [
    { id:'a', text: 'Calma e costante.', wind:'levante' },
    { id:'b', text: 'Forte e autorevole.', wind:'maestrale' },
    { id:'c', text: 'Appassionato e caloroso.', wind:'scirocco' },
    { id:'d', text: 'Sincero e protettivo.', wind:'libeccio' },
  ]},
  { id: 'q7', text: 'Come ti rapporti con chi ha idee molto diverse dalle tue?', options: [
    { id:'a', text: 'Cerco dialogo pacato e comprensione.', wind:'ponente' },
    { id:'b', text: 'Spesso imposto i miei limiti con chiarezza.', wind:'tramontana' },
    { id:'c', text: 'Mi adatto e trovo punti in comune.', wind:'ostro' },
    { id:'d', text: 'Sfido le idee per scuotere lo status quo.', wind:'libeccio' },
  ]},
  { id: 'q8', text: 'Credi di poter ferire gli altri col tuo comportamento, anche se involontariamente?', options: [
    { id:'a', text: 'Sì, ma cerco sempre di rimediare con sincerità.', wind:'libeccio' },
    { id:'b', text: 'Sì, perché a volte la mia forza può sembrare durezza.', wind:'maestrale' },
    { id:'c', text: 'Forse, ma cerco di imparare e migliorare con calma.', wind:'levante' },
    { id:'d', text: 'No, sto molto attento alle parole e ai gesti.', wind:'ostro' },
  ]},
  { id: 'q9', text: 'Quanto conta per te la disciplina e la chiarezza?', options: [
    { id:'a', text: 'Molto: sono regole che salvano il gruppo.', wind:'tramontana' },
    { id:'b', text: 'Abbastanza, ma non a scapito delle persone.', wind:'maestrale' },
    { id:'c', text: 'Poco: preferisco flessibilità e calore.', wind:'ostro' },
    { id:'d', text: 'Dipende: la uso quando serve cambiamento.', wind:'libeccio' },
  ]},
  { id: 'q10', text: 'In caso di necessità, ti viene spontaneo aiutare gli altri?', options: [
    { id:'a', text: 'Sì, è la mia prima reazione: mi muovo subito.', wind:'libeccio' },
    { id:'b', text: 'Sì, ma lo faccio con calma e attenzione.', wind:'ostro' },
    { id:'c', text: 'Solo se so di poter davvero essere utile.', wind:'grecale' },
    { id:'d', text: 'Dipende: a volte preferisco dare forza a distanza.', wind:'tramontana' },
  ]},
];

export default function QuizVenti(): JSX.Element {
  const [answers, setAnswers] = useState<Record<string, WindKey>>({});
  const [showResult, setShowResult] = useState(false);
  const [scores, setScores] = useState<Record<WindKey, number> | null>(null);

  const choose = (qid: string, wind: WindKey) => {
    setAnswers(prev => ({ ...prev, [qid]: wind }));
  };

  const submit = () => {
    // tally
    const tally: Record<WindKey, number> = {
      tramontana:0, grecale:0, levante:0, scirocco:0, ostro:0, libeccio:0, ponente:0, maestrale:0
    };
    Object.values(answers).forEach(w => {
      tally[w] = (tally[w] || 0) + 1;
    });
    setScores(tally);
    setShowResult(true);
  };

  const topWind = (tally: Record<WindKey, number>) => {
    const entries = Object.entries(tally) as [WindKey, number][];
    entries.sort((a,b) => b[1]-a[1]);
    return entries[0][0];
  };

  const handleShare = (windKey: WindKey) => {
    const wind = WINDS[windKey];
    const url = `https://quizdeiventi.it/?risultato=${wind.slug}`;
    const text = `Il mio vento è il ${wind.name} ${wind.emoji} — ${wind.description} Scopri anche tu quale vento ti rappresenta: ${url}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Testo copiato negli appunti! Puoi incollarlo dove vuoi.');
    }).catch(()=>alert('Impossibile copiare automaticamente: seleziona il testo e copia manualmente.'));
  };

  if (showResult && scores) {
    const winner = topWind(scores);
    const wind = WINDS[winner];
    return (
      <div className="card result" role="region" aria-live="polite">
        <div className="result-emoji">{wind.emoji}</div>
        <div className="result-name">{wind.name}</div>
        <div className="result-desc">{wind.description}</div>
        <div className="share">
          <button className="btn" onClick={() => handleShare(winner)}>Condividi il risultato</button>
          <button className="btn" onClick={() => { setShowResult(false); setAnswers({}); setScores(null); }}>Rifai il quiz</button>
        </div>
        <div className="small" style={{marginTop:10}}>Link condiviso: https://quizdeiventi.it/?risultato={wind.slug}</div>
      </div>
    );
  }

  return (
    <div className="card" role="main">
      <header className="header">
        <h1 className="title">🌬️ Quale vento ti rappresenta?</h1>
        <p className="subtitle">Rispondi a 10 domande su personalità, empatia e cura. Scopri il tuo vento.</p>
      </header>

      {QUESTIONS.map(q => (
        <section className="question" key={q.id}>
          <div className="qtext">{q.text}</div>
          <div className="options">
            {q.options.map(opt => {
              const selected = answers[q.id] === opt.wind;
              return (
                <button
                  key={opt.id}
                  className={`opt ${selected ? 'selected' : ''}`}
                  onClick={() => choose(q.id, opt.wind)}
                  aria-pressed={selected}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <div className="footer">
        <div className="counters">Hai risposto a {Object.keys(answers).length} / {QUESTIONS.length}</div>
        <div>
          <button className="btn" onClick={submit} disabled={Object.keys(answers).length < QUESTIONS.length}>Scopri il tuo vento</button>
        </div>
      </div>
    </div>
  );
}
