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
    phase: "Avvio & Approvazione Design",
    percent: 30,
    description: "Caparra del 30% (90 € / 150 € / 210 €) per riservare lo sprint. Progettiamo l'aspetto visivo del sito e lo revisioniamo insieme.",
  },
  {
    step: "02",
    phase: "Sviluppo & Anteprima Privata",
    percent: 40,
    description: "Sviluppiamo il sito su un link di prova privato dove potrai testare pulsanti, moduli e visualizzazione su smartphone.",
  },
  {
    step: "03",
    phase: "Messa Online & Consegna Completa",
    percent: 30,
    description: "Colleghiamo il tuo dominio, pubblichiamo il sito online e ti trasferiamo la piena proprietà al 100%.",
  },
];
