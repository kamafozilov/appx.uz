import { cn } from '@/lib/cn'
import yourAppImg from '@/assets/img/generated-3.webp'
import { AppleLogo, GooglePlayLogo } from './BrandIcons'

/** All app icons in src/assets/apps, keyed by file name (without extension). */
const APP_ICONS: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('../../../assets/apps/*.webp', { eager: true, import: 'default' }),
  ).map(([path, url]) => [path.split('/').pop()!.replace('.webp', ''), url]),
)

/* ------------------------------------------------------------------ */
/* Grid data — the design is a 1200×560 canvas with a 106px tile grid */
/* ------------------------------------------------------------------ */

const COL_X = (c: number) => -36 + c * 106
const ROW_Y = [150, 256, 362, 468]

/** `-` = empty tile, `*` = cell covered by the centre "your app" tile, otherwise an icon name. */
const GRID: string[][] = [
  ['-', 'discord', '-', 'tiktok', 'chatgpt', '-', '-', 'spotify', 'youtube', '-', 'pinterest', '-'],
  [
    'uber',
    '-',
    'telegram-messenger',
    'app-store',
    '-',
    '*',
    '*',
    '-',
    'google-play',
    'netflix',
    '-',
    'airbnb',
  ],
  [
    '-',
    'gmail',
    '-',
    'duolingo',
    'instagram',
    '*',
    '*',
    'whatsapp-messenger',
    '-',
    'notion',
    'google-maps',
    '-',
  ],
  [
    '-',
    '-',
    'snapchat',
    '-',
    'x',
    '-',
    'canva-ai-photo-video-editor',
    '-',
    'slack',
    '-',
    'messenger',
    '-',
  ],
]

const LABELS: Record<string, string> = {
  'telegram-messenger': 'Telegram',
  'app-store': 'App Store',
  'google-play': 'Google Play',
  'whatsapp-messenger': 'WhatsApp',
  'google-maps': 'Google Maps',
  'canva-ai-photo-video-editor': 'Canva',
  x: 'X',
  chatgpt: 'ChatGPT',
  tiktok: 'TikTok',
  youtube: 'YouTube',
}
const label = (name: string) => LABELS[name] ?? name[0].toUpperCase() + name.slice(1)

type Tile = { x: number; y: number; icon?: string }
const TILES: Tile[] = GRID.flatMap((row, r) =>
  row.flatMap((cell, c): Tile[] =>
    cell === '*' ? [] : [{ x: COL_X(c), y: ROW_Y[r], icon: cell === '-' ? undefined : cell }],
  ),
)

const STORES = [
  { name: 'App Store', logo: <AppleLogo className="size-[14px] text-white" /> },
  { name: 'Google Play', logo: <GooglePlayLogo className="size-[14px]" /> },
]

/* ------------------------------------------------------------------ */

/** Float timing per tile: varied duration + negative delay so tiles never move in sync. */
const floatTiming = (index: number) => ({
  animationDuration: `${5 + (index % 5) * 0.6}s`,
  animationDelay: `-${((index * 0.37) % 3) + (index % 4) * 1.1}s`,
})

function AppTile({ tile, index }: { tile: Tile; index: number }) {
  const { icon } = tile

  return (
    <div
      className={cn(
        'absolute flex size-24 items-center justify-center rounded-[20px] ring-1 ring-white/5 ring-inset',
        icon ? 'animate-float bg-[#1E1E22] will-change-transform' : 'bg-[#18181B]',
      )}
      style={{ left: tile.x, top: tile.y, ...(icon ? floatTiming(index) : undefined) }}
    >
      {icon &&
        (icon === 'google-play' ? (
          <span className="flex size-[60px] items-center justify-center rounded-[14px] bg-white shadow-[0_4px_10px_#00000040]">
            <img
              src={APP_ICONS[icon]}
              alt={label(icon)}
              loading="lazy"
              decoding="async"
              className="size-8"
            />
          </span>
        ) : (
          <span className="relative size-[60px] overflow-hidden rounded-[14px] shadow-[0_4px_10px_#00000040] after:absolute after:inset-0 after:rounded-[14px] after:ring-1 after:ring-white/8 after:ring-inset">
            <img
              src={APP_ICONS[icon]}
              alt={label(icon)}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </span>
        ))}
    </div>
  )
}

/**
 * The highlighted centre tile. Its resting glow is a static box-shadow; the
 * "breathing" is a separate pre-rendered glow layer whose opacity/scale loop
 * in CSS (compositor-only, no per-frame box-shadow repaint).
 */
function YourAppTile() {
  return (
    <div className="absolute top-[256px] left-[494px] z-[1] flex size-[202px] flex-col items-center justify-center gap-3 rounded-[28px] bg-[#222226] shadow-[0_0_60px_#F2A15A40,0_20px_40px_#00000080] ring-[1.5px] ring-[#D9B97A80] ring-inset">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 animate-glow rounded-[28px] shadow-[0_0_90px_#F2A15A40] will-change-[opacity,transform]"
      />
      <span className="relative size-24 overflow-hidden rounded-[24px] after:absolute after:inset-0 after:rounded-[24px] after:ring-1 after:ring-white/15 after:ring-inset">
        <img
          src={yourAppImg}
          alt="Your app icon"
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </span>
      <span className="flex flex-col items-center gap-1.5">
        <span className="text-[14px] font-semibold text-white">Your app</span>
        <span className="flex items-center gap-[5px] rounded-full bg-[#D9B97A26] px-[9px] py-[3px] text-[11px] font-semibold text-[#E8CF9C]">
          <span className="size-1.5 rounded-full bg-[#D9B97A]" aria-hidden="true" />
          Ready for review
        </span>
      </span>
    </div>
  )
}

/**
 * The 1200×560 icon field, authored at design size.
 * <lg: unscaled, fills the 670px-tall mobile stage; the canvas sits 80px down
 *      and is centred on the "your app" tile (centre x = 595 in canvas space).
 * ≥lg: scaled via `--s` and centred, as on the desktop design.
 * Edge fades live on the full-width wrapper (never inside the scaled canvas),
 * so they always reach the stage edges with no seams at any width.
 */
function IconField() {
  return (
    <div className="absolute inset-0 [--s:1] min-[1440px]:[--s:1] lg:relative lg:inset-auto lg:h-[calc(560px*var(--s))] lg:[--s:0.78] xl:[--s:0.87]">
      <div className="absolute top-20 left-[calc(50%-595px)] h-[560px] w-[1200px] lg:top-0 lg:left-1/2 lg:origin-top lg:-translate-x-1/2 lg:scale-(--s)">
        {TILES.map((tile, i) => (
          <AppTile key={`${tile.x}-${tile.y}`} tile={tile} index={i} />
        ))}
        <YourAppTile />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]">
        <div className="absolute inset-y-0 left-0 w-14 bg-linear-to-r from-[#141416] to-[#14141600] lg:w-[calc(220px*var(--s))]" />
        <div className="absolute inset-y-0 right-0 w-14 bg-linear-to-l from-[#141416] to-[#14141600] lg:w-[calc(220px*var(--s))]" />
        <div className="absolute inset-x-0 top-0 h-[300px] bg-linear-to-b from-[#141416] from-25% to-[#14141600] lg:h-[calc(240px*var(--s))]" />
        <div className="absolute inset-x-0 bottom-0 h-[90px] bg-linear-to-b from-[#14141600] to-[#141416] lg:h-[calc(90px*var(--s))]" />
      </div>
    </div>
  )
}

/** Dark stage: headline + store badges over a field of familiar app icons. */
export function StoreStage() {
  return (
    <figure className="relative h-[670px] w-full overflow-hidden rounded-[24px] bg-[#141416] lg:h-auto lg:rounded-[32px]">
      <figcaption className="absolute inset-x-5 top-6 z-10 flex flex-col gap-2 lg:top-9 lg:right-auto lg:left-10 lg:w-[520px]">
        <p className="text-[18px] leading-[23px] font-medium text-[#F4F4F5] lg:text-[20px] lg:leading-normal">
          Your app, next to the ones people use every day
        </p>
        <p className="text-[14px] leading-[21px] text-[#8E8E96] lg:text-[15px] lg:leading-[23px]">
          We sign it, prepare the store listing with you, and submit it to both stores.
        </p>
      </figcaption>
      <ul className="absolute top-[166px] left-5 z-10 flex gap-2 md:top-[118px] lg:top-10 lg:right-10 lg:left-auto">
        {STORES.map((store) => (
          <li
            key={store.name}
            className="flex items-center gap-[7px] rounded-full bg-white/6 px-3 py-2 text-[13px] font-medium text-[#F4F4F5] ring-1 ring-white/10 ring-inset"
          >
            {store.logo}
            {store.name}
          </li>
        ))}
      </ul>
      <IconField />
    </figure>
  )
}
