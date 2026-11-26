import { MessageCircle, Phone } from "lucide-react";

import { directContactLines } from "@/lib/contact-lines";

/**
 * The office, WhatsApp and CEO lines, each labelled with the channel it is
 * for. A number only becomes a link when lib/contact-lines.ts gives it an
 * href; otherwise it is shown as plain text.
 */
export function DirectContactLines({
  headingLevel = "h3",
}: {
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {directContactLines.map((line) => {
        const Icon = line.channel === "whatsapp" ? MessageCircle : Phone;
        return (
          <li
            key={line.id}
            className="rounded-sm border border-border bg-card p-6"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center bg-accent">
              <Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <Heading className="font-heading mb-1 text-lg font-bold uppercase">
              {line.label}
            </Heading>
            <p className="mb-3 text-sm text-muted-foreground">{line.note}</p>
            {line.href ? (
              <a
                href={line.href}
                className="text-base font-semibold tracking-wide transition-colors hover:text-accent"
                aria-label={`${line.label}, ${line.note}: ${line.display}`}
              >
                {line.display}
              </a>
            ) : (
              <p className="text-base font-semibold tracking-wide">
                {line.display}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
