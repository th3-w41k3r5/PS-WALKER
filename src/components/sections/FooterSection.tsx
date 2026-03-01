import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";

const socials = [
  { icon: Instagram, href: "https://instagram.com/w47k3r.77992", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/w47k3r77992", label: "Twitter/X" },
  { icon: Youtube, href: "https://youtube.com/@PSW47K3R", label: "YouTube" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

export default function FooterSection() {
  return (
    <footer className="px-6 md:px-12 lg:px-20 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-display text-foreground tracking-[0.2em] text-sm uppercase mb-1">
            PS WALKER
          </div>
          <div className="label-tag opacity-60"> Walker #77992</div>
        </div>

        <div className="flex items-center gap-5">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>

        <p className="text-muted-foreground text-xs font-body tracking-wider opacity-50">
          © 2026 PS WALKER. Not affiliated with EDM Awards Miami.
        </p>
      </div>
    </footer>
  );
}
