export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  project: string;
  avatar: string;
  rating: number;
  quote: string;
  highlight: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "medo",
    clientName: "Elena Moretti",
    role: "Direttrice Generale",
    company: "Medo Spa Sanctuary",
    project: "Medo Spa Luxury Portal",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    quote:
      "Studio Strada ha trasformato l'esperienza dei nostri ospiti. Entro due mesi dal lancio del portale, le telefonate per fissare appuntamenti sono calate del 65% e le prenotazioni sono raddoppiate.",
    highlight: "+215% prenotazioni registrate",
  },
  {
    id: "yoz",
    clientName: "Marcus Vance",
    role: "Fondatore & Direttore Creativo",
    company: "The Yoz Shop",
    project: "3D Skate Customizer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    quote:
      "Nessun altro è riuscito a sviluppare un vero configuratore 3D fluido a 60 FPS su iPhone senza blocchi. La fisica interattiva e la velocità hanno sbalordito la nostra community.",
    highlight: "60 FPS 3D su smartphone",
  },
  {
    id: "essenza",
    clientName: "Marco Barbera",
    role: "Master Stylist & Titolare",
    company: "Essenza Moda Capelli",
    project: "Haute Coiffure Salon Flagship",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    quote:
      "La cura estetica e la rapidità istantanea del sito riflettono gli standard d'eccellenza che i nostri clienti VIP si aspettano a Milano. Il lookbook è il nostro canale più redditizio.",
    highlight: "Punteggio Lighthouse 98/100",
  },
  {
    id: "locanda",
    clientName: "Salvatore Di Pietro",
    role: "Executive Chef & Patron",
    company: "La Locanda Dei Mori",
    project: "Taormina QR Menu & Web Hub",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    quote:
      "A Taormina la concorrenza con i turisti è serrata. Il menu QR ultra veloce e il posizionamento su Google portano centinaia di nuovi clienti nel nostro cortile ogni settimana.",
    highlight: "Oltre 4.200 scansioni menu/mese",
  },
];
