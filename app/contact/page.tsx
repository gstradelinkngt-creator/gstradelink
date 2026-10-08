import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { HoursTable } from "@/components/site/HoursTable";
import { SITE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact GSTradeLink for product enquiries, weighing machine service, and spare parts support in Chitwan.",
};

const WA_TEMPLATES = [
  {
    label: "Find the right scale",
    sub: "Tell us what you weigh and we'll suggest a model",
    msg: "Hello GSTradeLink! I'm looking for a weighing scale. Could you help me find the right one?",
  },
  {
    label: "Book a repair or calibration",
    sub: "Send a photo of the problem",
    msg: "Hello GSTradeLink! My weighing scale needs repair/calibration. Can you help me?",
  },
  {
    label: "Get a price quote",
    sub: "Single unit or bulk order",
    msg: "Hello GSTradeLink! I'd like a price quote for weighing equipment. Please share the details.",
  },
  {
    label: "Order a spare part",
    sub: "Batteries, adaptors, load cells and more",
    msg: "Hello GSTradeLink! I need a spare part for my weighing scale. Can you help?",
  },
];

const CHANNELS = [
  { icon: Phone, label: "Call", value: SITE.phoneDisplay, href: SITE.phoneHref },
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: "Shop", value: SITE.address, href: SITE.mapsUrl, external: true },
];

export default function ContactPage() {
  return (
    <div className="pb-20">
      <section className="container-site pb-14 pt-10 md:pt-16">
        <p className="eyebrow flex items-center gap-2">
          <span className="h-px w-6 bg-signal" /> Contact
        </p>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
          Talk to someone who knows scales.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          WhatsApp is fastest — we usually reply within a few hours during shop hours. Or call, email, or walk in.
        </p>
      </section>

      <section className="container-site grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        {/* WhatsApp templates */}
        <div className="self-start rounded-[1.75rem] border border-line bg-surface p-3 sm:p-4">
          <div className="flex items-center gap-4 px-3 pb-4 pt-3 sm:px-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-wa text-white">
              <MessageCircle size={21} />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight text-ink">Start a WhatsApp chat</h2>
              <p className="text-sm text-ink-soft">Pick a topic — the message is written for you.</p>
            </div>
          </div>
          <ul className="space-y-1.5">
            {WA_TEMPLATES.map(({ label, sub, msg }) => (
              <li key={label}>
                <a
                  href={waLink(msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl bg-paper px-4 py-4 transition-colors hover:bg-wa/10 sm:px-5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink">{label}</p>
                    <p className="mt-0.5 text-sm text-ink-soft">{sub}</p>
                  </div>
                  <ArrowUpRight size={18} className="shrink-0 text-ink-mute transition-[transform,color] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wa-deep" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Channels + hours */}
        <div className="flex flex-col gap-6">
          <ul className="divide-y divide-line rounded-[1.75rem] border border-line bg-surface px-6">
            {CHANNELS.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 py-5"
                >
                  <Icon size={19} className="shrink-0 text-signal-deep" />
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow">{label}</p>
                    <p className="mt-1 break-words font-semibold text-ink">{value}</p>
                  </div>
                  <ArrowUpRight size={17} className="shrink-0 text-ink-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>

          <div className="rounded-[1.75rem] border border-line bg-surface p-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-xl font-semibold tracking-tight text-ink">Shop hours</h2>
              <span className="font-mono text-xs text-ink-mute">Nepal time</span>
            </div>
            <HoursTable className="mt-4" />
          </div>
        </div>
      </section>

      {/* Map link block */}
      <section className="container-site mt-6">
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex min-h-56 flex-col justify-end overflow-hidden rounded-[1.75rem] bg-ink p-7 text-white sm:p-10"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <span className="absolute right-8 top-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-signal text-ink shadow-float transition-transform group-hover:-translate-y-1 sm:right-12 sm:top-10">
            <MapPin size={26} />
          </span>
          <p className="relative eyebrow !text-white/50">Find us</p>
          <p className="relative mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{SITE.address}</p>
          <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
            Open in Google Maps <ArrowUpRight size={16} />
          </span>
        </a>
      </section>
    </div>
  );
}
