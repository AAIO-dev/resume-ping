import { FileSearch, GraduationCap, Code2, Briefcase } from "lucide-react";
import { Language, translations } from "../locales/translations";

export default function CrossPromotion({ language }: { language: Language }) {
  const apps = [
    { 
      name: "PaperPing", 
      desc: translations[language].paperPingDesc, 
      icon: FileSearch, 
      url: "https://paperping.dollarfix.net", 
      color: "text-[oklch(0.58_0.21_254)]", 
      bgHover: "hover:bg-[oklch(0.58_0.21_254)]/10 hover:border-[oklch(0.58_0.21_254)]/30" 
    },
    { 
      name: "BandPing", 
      desc: translations[language].bandPingDesc, 
      icon: GraduationCap, 
      url: "https://bandping.dollarfix.net", 
      color: "text-[oklch(0.45_0.18_25)]", 
      bgHover: "hover:bg-[oklch(0.45_0.18_25)]/10 hover:border-[oklch(0.45_0.18_25)]/30" 
    },
    { 
      name: "CodePing", 
      desc: translations[language].codePingDesc, 
      icon: Code2, 
      url: "https://codeping.dollarfix.net", 
      color: "text-[oklch(0.60_0.16_285)]", 
      bgHover: "hover:bg-[oklch(0.60_0.16_285)]/10 hover:border-[oklch(0.60_0.16_285)]/30" 
    },
    { 
      name: "PitchPing", 
      desc: translations[language].pitchPingDesc, 
      icon: Briefcase, 
      url: "https://pitchping.dollarfix.net", 
      color: "text-[oklch(0.70_0.17_45)]", 
      bgHover: "hover:bg-[oklch(0.70_0.17_45)]/10 hover:border-[oklch(0.70_0.17_45)]/30" 
    },
  ];

  return (
    <section className="border-t border-border bg-background px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center sm:text-left">
          {translations[language].moreFromEcosystem}
        </p>
        <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar snap-x">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex shrink-0 snap-start items-center gap-3 rounded-full border border-border/50 bg-surface px-4 py-2 transition-all ${app.bgHover}`}
            >
              <div className={`${app.color} transition-transform group-hover:scale-110`}>
                <app.icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground leading-none">{app.name}</span>
                <span className="text-[10px] text-muted-foreground mt-1 leading-none">{app.desc}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}