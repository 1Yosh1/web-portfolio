export interface PricingTier {
  id: string;
  name: string;
  badge: string;
  price: number;
  currency: string;
  currencySymbol: string;
  billingPeriod: "one-time";
  tagline: string;
  depositPercent: number;
  deliveryTime: string;
  popular?: boolean;
  features: string[];
  idealFor: string;
  accentColor: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Sito Starter",
    badge: "Lancio Rapido",
    price: 300,
    currency: "EUR",
    currencySymbol: "€",
    billingPeriod: "one-time",
    tagline: "Un sito web pulito e moderno, pensato per valorizzare la tua attività e ricevere contatti diretti.",
    depositPercent: 30,
    deliveryTime: "5 - 7 Giorni",
    popular: false,
    accentColor: "#3b82f6",
    idealFor: "Ristoranti, stilisti, artigiani locali e professionisti",
    features: [
      "Design responsive su misura, creato appositamente per il tuo brand",
      "Caricamento ultra veloce per non perdere nessun visitatore",
      "Configurazione scheda Google Maps e Ricerca per farti trovare subito",
      "Modulo di contatto diretto collegato alla tua email o al tuo telefono",
      "Menu digitale, listino prezzi o galleria fotografica professionale",
      "14 giorni di modifiche e assistenza gratuita post-lancio",
    ],
  },
  {
    id: "business-booking",
    name: "Business & Prenotazioni",
    badge: "Il Più Scelto",
    price: 500,
    currency: "EUR",
    currencySymbol: "€",
    billingPeriod: "one-time",
    tagline: "Consenti ai clienti di prenotare appuntamenti e pagare online 24/7 senza dover telefonare.",
    depositPercent: 30,
    deliveryTime: "10 - 14 Giorni",
    popular: true,
    accentColor: "#10b981",
    idealFor: "Saloni, centri estetici, studi privati e attività su appuntamento",
    features: [
      "Tutto ciò che è incluso nel Sito Starter",
      "Calendario prenotazioni attivo 24/7 (scelta servizio, giorno e ora)",
      "Email di conferma e promemoria automatici per azzerare le assenze",
      "Incasso anticipato di caparre o saldo con carta online",
      "Sezione recensioni e testimonianze verificate dei clienti",
      "Area riservata per consultare appuntamenti e dati dei clienti",
      "30 giorni di assistenza e aggiornamenti inclusi post-lancio",
    ],
  },
  {
    id: "ecommerce-3d",
    name: "E-Commerce & Vetrina 3D",
    badge: "Pacchetto Completo",
    price: 700,
    currency: "EUR",
    currencySymbol: "€",
    billingPeriod: "one-time",
    tagline: "Un sito prestigioso con negozio online, pagamenti con carta o visualizzazioni 3D interattive.",
    depositPercent: 30,
    deliveryTime: "2 - 3 Settimane",
    popular: false,
    accentColor: "#f97316",
    idealFor: "Negozi online, marchi di moda, showroom e prodotti di fascia alta",
    features: [
      "Tutto ciò che è incluso in Business & Prenotazioni",
      "E-commerce completo con carrello, magazzino e codici promozionali",
      "Vetrina 3D interattiva (gli utenti ruotano gli articoli in tempo reale)",
      "Checkout immediato con carte, Apple Pay e Google Pay",
      "Microinterazioni grafiche di alto livello per un'esperienza memorabile",
      "Video guida pratica per aggiungere nuovi prodotti in completa autonomia",
      "60 giorni di assistenza prioritaria dedicata",
    ],
  },
];

export const MILESTONES = [
  {
    step: "01",
    phase: "Avvio & Riserva Slot",
    percent: 30,
    description: "Acconto del 30% (90 € / 150 € / 210 €) per riservare lo slot e iniziare il lavoro. Concordiamo struttura e layout iniziale.",
  },
  {
    step: "02",
    phase: "Sviluppo & Anteprima Live",
    percent: 0,
    description: "Nessun pagamento intermedio. Lavori su un link di prova privato dove testi ogni funzione e richiedi le modifiche necessarie.",
  },
  {
    step: "03",
    phase: "Saldo & Messa Online",
    percent: 70,
    description: "Saldo finale del 70% solo dopo la tua approvazione completa. Colleghiamo il tuo dominio e ti consegno codici e accessi.",
  },
];

export const CARE_PLAN = {
  id: "care-plan",
  name: "Piano Manutenzione & Supporto",
  price: 39,
  currencySymbol: "€",
  billingPeriod: "/mese",
  tagline: "Mantieni il tuo sito sempre aggiornato, protetto e performante senza doverti preoccupare della parte tecnica.",
  features: [
    "Backup periodici completi di codice e contenuti",
    "Aggiornamenti testi, prezzi, promozioni e immagini su richiesta",
    "Monitoraggio continuo sicurezza, SSL e velocità di caricamento",
    "Supporto prioritario diretto via WhatsApp o telefono",
    "Nessun vincolo di durata: puoi disdire in qualsiasi momento con un messaggio",
  ],
};

export const DOMAIN_HOSTING_DISCLOSURE = {
  title: "Costi di dominio e hosting (zero costi nascosti)",
  description:
    "Per garantirti il 100% di proprietà e indipendenza, dominio e hosting sono a carico tuo (circa 15 € – 25 € all'anno). Ti guido passo passo nella registrazione: sarai l'unico proprietario senza dover dipendere da nessuno.",
};
