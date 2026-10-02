import React from "react";
import {
  FastForward,
  HeartHandshake,
  MonitorSmartphone,
  TrendingUp,
  Users,
} from "lucide-react";

interface StatsProps {
  className?: string;
}

export function Stats({ className = "" }: StatsProps) {
  return (
    <section className={`mx-auto max-w-5xl px-6 py-20 ${className}`}>
      {/* Studio Strada Cold Precision Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#2545FF]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2545FF]" />
          Impatto Misurabile
        </span>
        <h2 className="text-balance text-center font-semibold text-3xl sm:text-4xl tracking-tight text-[#0A0D12]">
          I numeri che contano
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-center text-[#5A6472] text-base sm:text-lg">
          Dati reali generati dai siti web dei nostri clienti dal giorno del lancio sul mercato.
        </p>
      </div>

      {/* Stats Bento Grid styled for Studio Strada Cold Precision */}
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Metric 1: Essenza Lighthouse */}
        <div className="rounded-xl border border-[#E6E8EC] bg-white p-6 py-7 hover:border-[#2545FF]/40 hover:shadow-[0_12px_36px_rgba(37,69,255,0.06)] transition-all">
          <MonitorSmartphone className="mb-7 h-10 w-10 stroke-[1.75px] text-[#2545FF]" />
          <span className="font-semibold text-5xl tracking-tight text-[#0A0D12]">98/100</span>
          <p className="mt-4 text-[#5A6472] text-base font-medium">
            Punteggio Lighthouse medio
          </p>
          <p className="mt-1 text-xs text-[#8B93A1]">
            Caricamento in meno di un secondo e 60 FPS su mobile.
          </p>
        </div>

        {/* Metric 2: Medo Spa Online Bookings */}
        <div className="rounded-xl border border-[#E6E8EC] bg-white p-6 py-7 hover:border-[#2545FF]/40 hover:shadow-[0_12px_36px_rgba(37,69,255,0.06)] transition-all">
          <TrendingUp className="mb-7 h-10 w-10 stroke-[1.75px] text-[#2545FF]" />
          <span className="font-semibold text-5xl tracking-tight text-[#0A0D12]">+215%</span>
          <p className="mt-4 text-[#5A6472] text-base font-medium">
            Prenotazioni online registrate
          </p>
          <p className="mt-1 text-xs text-[#8B93A1]">
            I clienti prenotano giorno e notte in autonomia.
          </p>
        </div>

        {/* Metric 3: Client Satisfaction & Real Project Image */}
        <div className="row-span-2 flex flex-col overflow-hidden rounded-xl border border-[#E6E8EC] bg-white p-6 py-7 pb-0 hover:border-[#2545FF]/40 hover:shadow-[0_12px_36px_rgba(37,69,255,0.06)] transition-all">
          <HeartHandshake className="mb-7 h-10 w-10 stroke-[1.75px] text-[#2545FF]" />
          <span className="font-semibold text-5xl tracking-tight text-[#0A0D12]">100%</span>
          <p className="mt-4 mb-2 text-[#5A6472] text-base font-medium">
            Soddisfazione clienti (5/5 stelle)
          </p>
          <p className="text-xs text-[#8B93A1] mb-6">
            Tutti i progetti recensiti al massimo punteggio.
          </p>
          <div className="mt-auto -mx-6 overflow-hidden border-t border-[#E6E8EC]">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
              alt="Cliente soddisfatto Studio Strada"
              loading="lazy"
              className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Metric 4: Reduction in wasted calls */}
        <div className="rounded-xl border border-[#E6E8EC] bg-white p-6 py-7 hover:border-[#2545FF]/40 hover:shadow-[0_12px_36px_rgba(37,69,255,0.06)] transition-all">
          <FastForward className="mb-7 h-10 w-10 stroke-[1.75px] text-[#2545FF]" />
          <span className="font-semibold text-5xl tracking-tight text-[#0A0D12]">-65%</span>
          <p className="mt-4 text-[#5A6472] text-base font-medium">
            Chiamate per informazioni di base
          </p>
          <p className="mt-1 text-xs text-[#8B93A1]">
            Listini, orari e FAQ rispondono prima al cliente.
          </p>
        </div>

        {/* Metric 5: La Locanda Google views */}
        <div className="rounded-xl border border-[#E6E8EC] bg-white p-6 py-7 hover:border-[#2545FF]/40 hover:shadow-[0_12px_36px_rgba(37,69,255,0.06)] transition-all">
          <Users className="mb-7 h-10 w-10 stroke-[1.75px] text-[#2545FF]" />
          <span className="font-semibold text-5xl tracking-tight text-[#0A0D12]">4.200+</span>
          <p className="mt-4 text-[#5A6472] text-base font-medium">
            Scansioni menu mensili da Google
          </p>
          <p className="mt-1 text-xs text-[#8B93A1]">
            Posizionamento sulle ricerche locali di Google Maps.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Stats;
