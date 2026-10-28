/** Click motions for the plant summary cards. Each one follows that card's material. */

export type PlantCardFx =
  | 'feed'
  | 'gas'
  | 'compress'
  | 'dispatch'
  | 'fertilizer'
  | 'offtake'
  | 'power'
  | 'safe'
  | 'alert';

type Frames = Keyframe[];
type Timing = number | KeyframeAnimationOptions;

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function spawn(style: Partial<CSSStyleDeclaration>, frames: Frames, timing: Timing) {
  const node = document.createElement('span');
  node.setAttribute('aria-hidden', 'true');
  Object.assign(node.style, {
    position: 'fixed',
    zIndex: '80',
    pointerEvents: 'none',
    ...style,
  });
  document.body.appendChild(node);
  node.animate(frames, timing).finished.finally(() => node.remove());
  return node;
}

function press(el: HTMLElement) {
  el.classList.remove('plant-card-press');
  void el.offsetWidth;
  el.classList.add('plant-card-press');
  window.setTimeout(() => el.classList.remove('plant-card-press'), 480);
}

function veil(rect: DOMRect, color: string) {
  spawn(
    {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      borderRadius: '18px',
      boxShadow: `inset 0 0 0 1.5px ${color}`,
    },
    [
      { backgroundColor: 'transparent', opacity: 0 },
      { backgroundColor: `${color}22`, opacity: 1, offset: 0.28 },
      { backgroundColor: 'transparent', opacity: 0 },
    ],
    { duration: 520, easing: 'ease-out' },
  );
}

function feedFx(rect: DOMRect, color: string) {
  const tones = [color, '#62A93B', '#c4b5fd'];
  for (let i = 0; i < 9; i += 1) {
    const size = 7 + (i % 3) * 2;
    const x = rect.left + 18 + ((i * 37) % Math.max(24, rect.width - 36));
    spawn(
      {
        left: `${x}px`,
        top: `${rect.top + 6}px`,
        width: `${size}px`,
        height: `${size * 0.72}px`,
        borderRadius: '45% 55% 48% 52%',
        background: tones[i % tones.length],
      },
      [
        { transform: 'translateY(-8px) rotate(0deg)', opacity: 0 },
        { transform: 'translateY(10px) rotate(18deg)', opacity: 1, offset: 0.18 },
        { transform: `translateY(${rect.height - 26}px) rotate(${70 + i * 12}deg)`, opacity: 0.15 },
      ],
      { duration: 680 + i * 35, delay: i * 32, easing: 'cubic-bezier(.2,.7,.2,1)' },
    );
  }
}

function gasFx(rect: DOMRect, color: string) {
  for (let i = 0; i < 7; i += 1) {
    const size = 8 + (i % 4) * 4;
    const x = rect.left + 22 + ((i * 41) % Math.max(20, rect.width - 48));
    spawn(
      {
        left: `${x}px`,
        top: `${rect.bottom - 22}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.72)',
        border: `1.5px solid ${color}`,
        boxShadow: `inset -2px -2px 0 ${color}33`,
      },
      [
        { transform: 'translateY(6px) scale(0.35)', opacity: 0 },
        { transform: 'translateY(-16px) scale(1)', opacity: 0.95, offset: 0.22 },
        { transform: `translate(${(i % 2 ? 10 : -8)}px, -${rect.height * 0.72}px) scale(1.2)`, opacity: 0 },
      ],
      { duration: 880 + i * 40, delay: i * 70, easing: 'ease-out' },
    );
  }
}

function compressFx(rect: DOMRect, color: string) {
  const cx = rect.left + rect.width / 2 - 26;
  const cy = rect.top + rect.height / 2 - 26;
  for (let i = 0; i < 2; i += 1) {
    spawn(
      {
        left: `${cx}px`,
        top: `${cy}px`,
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        border: `2px solid ${color}`,
      },
      [
        { transform: 'scale(1.7)', opacity: 0.15 },
        { transform: 'scale(0.62)', opacity: 0.9, offset: 0.55 },
        { transform: 'scale(0.35)', opacity: 0 },
      ],
      { duration: 620, delay: i * 90, easing: 'cubic-bezier(.4,0,.2,1)' },
    );
  }
  spawn(
    {
      left: `${rect.left + 16}px`,
      top: `${rect.bottom - 16}px`,
      width: '0px',
      height: '4px',
      borderRadius: '4px',
      background: color,
    },
    [
      { width: '0px', opacity: 0.4 },
      { width: `${Math.max(24, rect.width - 32)}px`, opacity: 1, offset: 0.7 },
      { width: `${Math.max(24, rect.width - 32)}px`, opacity: 0 },
    ],
    { duration: 760, delay: 120, easing: 'cubic-bezier(.2,.8,.2,1)' },
  );
}

function dispatchFx(rect: DOMRect, color: string) {
  for (let i = 0; i < 6; i += 1) {
    spawn(
      {
        left: `${rect.left + rect.width * 0.22}px`,
        top: `${rect.top + rect.height * 0.58 + (i % 2 ? 8 : -4)}px`,
        width: '11px',
        height: '13px',
        borderRadius: '3px 3px 4px 4px',
        background: color,
        boxShadow: `0 4px 8px -4px ${color}`,
      },
      [
        { transform: 'translateX(0) scale(0.55)', opacity: 0 },
        { transform: 'translateX(14px) scale(1)', opacity: 1, offset: 0.16 },
        { transform: `translateX(${rect.width * 0.62}px) scale(0.85)`, opacity: 0 },
      ],
      { duration: 700, delay: i * 55, easing: 'cubic-bezier(.2,.7,.3,1)' },
    );
  }
}

function fertilizerFx(rect: DOMRect, color: string) {
  for (let i = 0; i < 8; i += 1) {
    const size = 5 + (i % 3);
    const x = rect.left + 20 + ((i * 33) % Math.max(20, rect.width - 40));
    spawn(
      {
        left: `${x}px`,
        top: `${rect.top + 18}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: i % 2 ? '#7dc244' : color,
      },
      [
        { transform: 'translateY(0) scale(0.5)', opacity: 0 },
        { transform: 'translateY(12px) scale(1)', opacity: 1, offset: 0.2 },
        { transform: `translateY(${rect.height - 36}px) scale(0.9)`, opacity: 0 },
      ],
      { duration: 820, delay: i * 40, easing: 'ease-in' },
    );
  }
}

function offtakeFx(rect: DOMRect, color: string) {
  for (let i = 0; i < 7; i += 1) {
    const size = 6 + (i % 2);
    spawn(
      {
        left: `${rect.left + 24}px`,
        top: `${rect.bottom - 28 - (i % 3) * 6}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: color,
      },
      [
        { transform: 'translateX(0)', opacity: 0 },
        { transform: 'translateX(20px)', opacity: 1, offset: 0.15 },
        { transform: `translateX(${rect.width - 36}px)`, opacity: 0 },
      ],
      { duration: 780, delay: i * 48, easing: 'linear' },
    );
  }
}

function powerFx(rect: DOMRect, color: string) {
  spawn(
    {
      left: `${rect.left + 14}px`,
      top: `${rect.bottom - 18}px`,
      width: '22px',
      height: '4px',
      borderRadius: '4px',
      background: `linear-gradient(90deg, transparent, ${color}, #fff)`,
    },
    [
      { transform: 'translateX(0)', opacity: 0 },
      { transform: 'translateX(12px)', opacity: 1, offset: 0.12 },
      { transform: `translateX(${Math.max(20, rect.width - 50)}px)`, opacity: 0 },
    ],
    { duration: 560, easing: 'ease-in' },
  );
  for (let i = 0; i < 3; i += 1) {
    spawn(
      {
        left: `${rect.left + rect.width * (0.3 + i * 0.18)}px`,
        top: `${rect.top + 36}px`,
        width: '3px',
        height: '14px',
        borderRadius: '2px',
        background: color,
      },
      [
        { transform: 'scaleY(0.2)', opacity: 0 },
        { transform: 'scaleY(1)', opacity: 1, offset: 0.4 },
        { transform: 'scaleY(0.3)', opacity: 0 },
      ],
      { duration: 420, delay: 80 + i * 90, easing: 'ease-out' },
    );
  }
}

function ringFx(rect: DOMRect, color: string, count: number) {
  const size = 64;
  for (let i = 0; i < count; i += 1) {
    spawn(
      {
        left: `${rect.left + rect.width / 2 - size / 2}px`,
        top: `${rect.top + rect.height / 2 - size / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: `2px solid ${color}`,
      },
      [
        { transform: 'scale(0.45)', opacity: 0.85 },
        { transform: 'scale(2.1)', opacity: 0 },
      ],
      { duration: count > 1 ? 700 : 860, delay: i * 140, easing: 'ease-out' },
    );
  }
}

const RUNNERS: Record<PlantCardFx, (rect: DOMRect, color: string) => void> = {
  feed: feedFx,
  gas: gasFx,
  compress: compressFx,
  dispatch: dispatchFx,
  fertilizer: fertilizerFx,
  offtake: offtakeFx,
  power: powerFx,
  safe: (rect, color) => ringFx(rect, color, 1),
  alert: (rect, color) => ringFx(rect, color, 2),
};

export function playPlantCardFx(kind: PlantCardFx, el: HTMLElement | null, color: string) {
  if (!el || reducedMotion()) return;
  press(el);
  const rect = el.getBoundingClientRect();
  veil(rect, color);
  RUNNERS[kind](rect, color);
}
