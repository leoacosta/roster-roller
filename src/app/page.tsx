'use client';

import { useState } from 'react';
import type { Sport, Vibe } from '@/lib/names';

const SPORTS: { id: Sport; label: string; icon: string }[] = [
  { id: 'soccer', label: 'Soccer', icon: '⚽' },
  { id: 'netball', label: 'Netball', icon: '🏀' },
];

const VIBES: { id: Vibe; label: string; descriptor: string }[] = [
  { id: 'punny', label: 'Punny', descriptor: 'groan-worthy wordplay' },
  { id: 'fierce', label: 'Fierce', descriptor: 'intimidate the opposition' },
  { id: 'funny', label: 'Funny', descriptor: 'nobody takes seriously' },
  { id: 'random', label: 'Random', descriptor: 'surprise us' },
];

export default function Home() {
  const [sport, setSport] = useState<Sport>('soccer');
  const [vibe, setVibe] = useState<Vibe>('random');
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [rollCount, setRollCount] = useState(0);

  const roll = async () => {
    if (loading) return;
    setLoading(true);
    setNames([]);

    const [res] = await Promise.all([
      fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sport, vibe }),
      }),
      new Promise((r) => setTimeout(r, 800)),
    ]);
    const data = await (res as Response).json();
    setNames(data.names);
    setLoading(false);
    setRollCount((n) => n + 1);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        position: 'relative',
      }}
    >
      {/* Noise texture */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '180px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Header */}
      <header
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '28px 40px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <h1
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 36,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              color: 'var(--text)',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            Roster
          </h1>
          <h1
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 36,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              color: 'var(--accent)',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            Roller
          </h1>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
            color: 'var(--text-muted)',
          }}
        >
          Legendary names for your rec league squad
        </span>
      </header>

      {/* Main two-column layout */}
      <main
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '420px 1fr',
          minHeight: 0,
        }}
      >
        {/* Left: Controls */}
        <aside
          style={{
            borderRight: '1px solid var(--border)',
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          {/* Sport */}
          <div>
            <Label>Sport</Label>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              {SPORTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSport(s.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '11px 20px',
                    border: `1px solid ${sport === s.id ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 4,
                    background:
                      sport === s.id ? 'var(--accent-dim)' : 'transparent',
                    color:
                      sport === s.id ? 'var(--accent)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-barlow)',
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vibe */}
          <div>
            <Label>Vibe</Label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                marginTop: 10,
              }}
            >
              {VIBES.map((v) => {
                const active = vibe === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setVibe(v.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 6,
                      padding: '16px 18px',
                      border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius: 4,
                      background: active
                        ? 'var(--accent-dim)'
                        : 'var(--surface)',
                      color: 'var(--text)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-anton)',
                        fontSize: 18,
                        letterSpacing: '0.04em',
                        color: active ? 'var(--accent)' : 'var(--text)',
                        lineHeight: 1,
                      }}
                    >
                      {v.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-barlow)',
                        fontSize: 12,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: active
                          ? 'rgba(200,255,0,0.6)'
                          : 'var(--text-muted)',
                        fontWeight: 600,
                      }}
                    >
                      {v.descriptor}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Roll button — pushed to bottom */}
          <div style={{ marginTop: 'auto' }}>
            <button
              onClick={roll}
              disabled={loading}
              style={{
                width: '100%',
                padding: '18px 24px',
                background: loading ? 'var(--surface-2)' : 'var(--accent)',
                color: loading ? 'var(--text-muted)' : '#000',
                border: 'none',
                borderRadius: 4,
                fontFamily: 'var(--font-anton)',
                fontSize: 18,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                transition: 'background 0.15s ease, color 0.15s ease',
                animation:
                  !loading && names.length === 0
                    ? 'pulse-accent 1.5s ease-in-out infinite'
                    : 'none',
              }}
            >
              <DiceIcon rolling={loading} />
              {loading
                ? 'Rolling...'
                : rollCount === 0
                  ? 'Roll the Roster'
                  : 'Roll Again'}
            </button>
          </div>
        </aside>

        {/* Right: Results */}
        <section
          style={{
            padding: '36px 40px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {names.length === 0 && !loading ? (
            <EmptyState />
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 24,
                }}
              >
                <Label>
                  {loading ? 'Generating...' : `${names.length} names`}
                </Label>
                {!loading && names.length > 0 && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {vibe} · {sport}
                  </span>
                )}
              </div>

              <div style={{ borderTop: '1px solid var(--border)' }}>
                {names.map((name, i) => (
                  <div
                    key={`${rollCount}-${name}`}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 20,
                      padding: '16px 0',
                      borderBottom: '1px solid var(--border)',
                      animation:
                        'roll-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
                      animationDelay: `${i * 55}ms`,
                      opacity: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        color: 'var(--text-muted)',
                        letterSpacing: '0.05em',
                        minWidth: 20,
                        userSelect: 'none',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-anton)',
                        fontSize: 'clamp(18px, 2.2vw, 26px)',
                        letterSpacing: '0.02em',
                        color: 'var(--text)',
                        lineHeight: 1.1,
                      }}
                    >
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <>
      <style>{`
        @keyframes dice-idle {
          0%, 20%       { transform: rotate(0deg);   }
          30%           { transform: rotate(-20deg); }
          42%           { transform: rotate(16deg);  }
          52%           { transform: rotate(-14deg); }
          62%           { transform: rotate(10deg);  }
          70%           { transform: rotate(-6deg);  }
          78%           { transform: rotate(3deg);   }
          85%, 100%     { transform: rotate(0deg);   }
        }
      `}</style>
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        opacity: 0.35,
      }}
    >
      <span style={{ display: 'inline-flex', animation: 'dice-idle 3s ease-in-out infinite' }}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="3" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16" cy="8" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="8" cy="16" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <p
        style={{
          fontFamily: 'var(--font-barlow)',
          fontSize: 13,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          margin: 0,
          fontWeight: 600,
        }}
      >
        Pick a vibe and roll
      </p>
    </div>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'block',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}
    >
      {children}
    </span>
  );
}

function DiceIcon({ rolling = false }: { rolling?: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-flex',
        ...(rolling && { animation: 'dice-roll 1.2s linear infinite' }),
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="16" cy="8" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="8" cy="16" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}
