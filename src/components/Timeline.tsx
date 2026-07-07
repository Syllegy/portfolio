import type { ReactNode } from "react";
import { timeline, type TimelineItem } from "@/data/timeline";
import { AnimateIn } from "./AnimateIn";

function Kw({ children }: { children: ReactNode }) {
  return <span className="text-[#ff7b72]">{children}</span>;
}
function Type({ children }: { children: ReactNode }) {
  return <span className="text-[#ffa657]">{children}</span>;
}
function Ident({ children }: { children: ReactNode }) {
  return <span className="text-[#79c0ff]">{children}</span>;
}
function Str({ children }: { children: ReactNode }) {
  return <span className="text-[#a5d6ff]">{children}</span>;
}
function Punct({ children }: { children: ReactNode }) {
  return <span className="text-[#8b949e]">{children}</span>;
}
function Comment({ children }: { children: ReactNode }) {
  return <span className="text-[#8b949e] italic">{children}</span>;
}

function buildRows(items: TimelineItem[], truncated: boolean): ReactNode[] {
  const rows: ReactNode[] = [];

  rows.push(
    <>
      <Kw>const</Kw> <Ident>experience</Ident>
      <Punct>: </Punct>
      <Type>Role[]</Type> <Punct>= [</Punct>
    </>,
  );

  items.forEach((item) => {
    rows.push(<Punct>{"  {"}</Punct>);

    rows.push(
      <>
        {"    "}
        <Ident>title</Ident>
        <Punct>: </Punct>
        <Str>&quot;{item.title}&quot;</Str>
        <Punct>,</Punct>
      </>,
    );

    if (item.company) {
      rows.push(
        <>
          {"    "}
          <Ident>company</Ident>
          <Punct>: </Punct>
          <Str>&quot;{item.company}&quot;</Str>
          <Punct>,</Punct>
        </>,
      );
    }

    rows.push(
      <>
        {"    "}
        <Ident>period</Ident>
        <Punct>: </Punct>
        <Str>&quot;{item.year}&quot;</Str>
        <Punct>,</Punct>
      </>,
    );

    if (item.tags && item.tags.length > 0) {
      const tags = item.tags;
      rows.push(
        <>
          {"    "}
          <Ident>stack</Ident>
          <Punct>: [</Punct>
          {tags.map((tag, i) => (
            <span key={tag}>
              <Str>&quot;{tag}&quot;</Str>
              {i < tags.length - 1 && <Punct>, </Punct>}
            </span>
          ))}
          <Punct>],</Punct>
        </>,
      );
    }

    rows.push(
      <>
        {"    "}
        <Ident>focus</Ident>
        <Punct>: </Punct>
        <Str>&quot;{item.description}&quot;</Str>
        <Punct>,</Punct>
      </>,
    );

    rows.push(<Punct>{"  },"}</Punct>);
  });

  rows.push(<Punct>];</Punct>);

  if (truncated) {
    rows.push(<Comment>{"// ...and more — see the full list on /about"}</Comment>);
  }

  return rows;
}

interface TimelineProps {
  preview?: boolean;
}

/** The "experience" section rendered as a syntax-highlighted code file inside a mock editor window, instead of the generic icon-and-card timeline every AI-templated portfolio ships with. */
export function Timeline({ preview = false }: TimelineProps) {
  const items = preview ? timeline.slice(0, 2) : timeline;
  const rows = buildRows(items, preview && items.length < timeline.length);

  return (
    <AnimateIn>
      <div className="rounded-lg overflow-hidden bg-[#0d1117] ring-1 ring-white/10 shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-white/5">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="ml-2 flex items-center gap-1.5 px-2.5 py-1 rounded-t-sm bg-[#0d1117] border-t border-x border-white/5 text-xs font-mono text-foreground/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
            experience.ts
          </div>
        </div>

        <div className="p-5 font-mono text-[12px] sm:text-[13px] leading-relaxed overflow-x-auto">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-3 sm:gap-4">
              <span className="select-none text-white/25 text-right w-5 shrink-0">{i + 1}</span>
              <span className="flex-1 min-w-0">{row}</span>
            </div>
          ))}
          <div className="flex gap-3 sm:gap-4">
            <span className="select-none text-white/25 text-right w-5 shrink-0" />
            <span className="inline-block w-[7px] h-[14px] bg-white/60 animate-pulse translate-y-[2px]" />
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}
