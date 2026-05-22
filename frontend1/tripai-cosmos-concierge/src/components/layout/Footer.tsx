import { Plane, Twitter, Linkedin, Github, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="relative"
      style={{ background: "#030710", borderTop: "1px solid rgba(99,179,237,0.08)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="grid h-8 w-8 place-items-center rounded-lg"
              style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)" }}
            >
              <Plane size={16} className="text-white" />
            </span>
            <span className="font-display text-xl font-bold">
              <span className="text-white">Trip</span>
              <span className="text-gradient">AI</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-[#94A3B8]">
            AI-powered one-stop travel platform for modern explorers.
          </p>
        </div>

        <FooterCol
          title="Product"
          links={["Features", "How It Works", "Pricing", "Changelog"]}
        />
        <FooterCol
          title="Company"
          links={["About", "Blog", "Careers", "Contact"]}
        />

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Social
          </h4>
          <ul className="mt-4 flex gap-4">
            {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
              <li key={i}>
                <a
                  href="#"
                  aria-label="social"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/5 bg-white/[0.02] text-[#94A3B8] transition hover:border-white/20 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="border-t border-white/5 px-6 py-6"
        style={{ borderColor: "rgba(99,179,237,0.06)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-[#475569] md:flex-row">
          <p>© {new Date().getFullYear()} TripAI. All rights reserved.</p>
          <p>Built with ❤ for travelers</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h4>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-[#94A3B8] transition hover:text-white">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
