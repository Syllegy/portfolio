import Link from "next/link";
import { Mail, Code2 } from "lucide-react";
import { GitHubIcon } from "./icons";
import { personal } from "@/data/personal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-base mb-3">
              <Code2 className="w-5 h-5 text-primary" />
              {personal.name}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {personal.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-xs uppercase tracking-wider text-muted-foreground">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/skills", label: "Skills" },
                { href: "/projects", label: "Professional Work" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-xs uppercase tracking-wider text-muted-foreground">
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} {personal.name}. All rights reserved.</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
