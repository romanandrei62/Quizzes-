import React from 'react';
/**
 * Centralized Font Awesome icon component.
 *
 * Usage:
 *   import { FaIcon } from '../ui/FaIcon'
 *   <FaIcon name="multiple-choice" className="w-4 h-4" />
 *
 * All SVG paths sourced from Font Awesome (https://fontawesome.com).
 * Add new icons by adding entries to FA_ICONS below.
 */
interface FaIconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}
interface IconDef {
  viewBox: string;
  path: string;
}
// ─── Icon Registry ───────────────────────────────────────────────
// Each entry: viewBox + single <path d="..."> from Font Awesome SVGs.
// To add a new icon: copy the viewBox and d attribute from the FA SVG.
const FA_ICONS: Record<string, IconDef> = {
  // ── Question Types ──────────────────────────────────────────────
  'all-types': {
    viewBox: '0 0 512 512',
    path: 'M80 64c-8.8 0-16 7.2-16 16l0 96c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16l0-96c0-8.8-7.2-16-16-16L80 64zM32 80c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zM80 320c-8.8 0-16 7.2-16 16l0 96c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16l0-96c0-8.8-7.2-16-16-16l-96 0zM32 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zM432 64l-96 0c-8.8 0-16 7.2-16 16l0 96c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16l0-96c0-8.8-7.2-16-16-16zM336 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm0 288c-8.8 0-16 7.2-16 16l0 96c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16l0-96c0-8.8-7.2-16-16-16l-96 0zm-48 16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96z'
  },
  'multiple-choice': {
    viewBox: '0 0 512 512',
    path: 'M32 96a32 32 0 1 1 64 0A32 32 0 1 1 32 96zm96 0A64 64 0 1 0 0 96a64 64 0 1 0 128 0zm64 0c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L208 80c-8.8 0-16 7.2-16 16zm0 160c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-288 0c-8.8 0-16 7.2-16 16zm0 160c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-288 0c-8.8 0-16 7.2-16 16zM64 288a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0-96a64 64 0 1 0 0 128 64 64 0 1 0 0-128zM80 96A16 16 0 1 0 48 96a16 16 0 1 0 32 0zM32 416a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm96 0A64 64 0 1 0 0 416a64 64 0 1 0 128 0z'
  },
  'open-answer': {
    viewBox: '0 0 640 512',
    path: 'M582.8 45.5l11.9 11.9c12.5 12.5 12.5 32.8 0 45.2L568 129.4l-57-57 26.4-26.8c12.5-12.6 32.8-12.7 45.4-.1zM346.2 239.2L488.5 95.1 545.4 152 402.3 295.2c-4.4 4.4-10 7.4-16.1 8.7l-61.5 12.9 12.9-61.7c1.3-6 4.2-11.5 8.6-15.9zM514.7 23.1L323.4 216.7c-8.6 8.7-14.6 19.8-17.1 31.8l-18 85.7c-1.1 5.3 .5 10.8 4.3 14.6s9.3 5.5 14.6 4.3l85.5-17.9c12.2-2.6 23.3-8.6 32.1-17.4L617.4 125.3c25-25 25-65.5 0-90.5L605.5 22.8c-25.1-25.1-65.8-25-90.8 .3zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-176c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 176c0 17.7-14.3 32-32 32L64 480c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l240 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L64 128zm64 216a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm120-24a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z'
  },
  'true-false': {
    viewBox: '0 0 640 512',
    path: 'M205.2 496c-12.4 0-24.4-4.6-33.7-12.8L49.3 374.6C38.3 364.8 32 350.7 32 336s6.3-28.8 17.3-38.6L171.5 188.8c9.3-8.3 21.3-12.8 33.7-12.8c28 0 50.8 22.7 50.8 50.8V240H400c8.8 0 16 7.2 16 16v29.2c0 10.4 8.4 18.8 18.8 18.8c4.6 0 9-1.7 12.5-4.7L569.4 190.7c4.2-3.7 6.6-9.1 6.6-14.7s-2.4-10.9-6.6-14.7L447.3 52.7c-3.4-3.1-7.9-4.7-12.5-4.7C424.4 48 416 56.4 416 66.8V96c0 8.8-7.2 16-16 16H288c-8.8 0-16-7.2-16-16s7.2-16 16-16h96V66.8c0-28 22.7-50.8 50.8-50.8c12.4 0 24.4 4.6 33.7 12.8L590.7 137.4c11 9.8 17.3 23.8 17.3 38.6s-6.3 28.8-17.3 38.6L468.5 323.2c-9.3 8.3-21.3 12.8-33.7 12.8c-28 0-50.8-22.7-50.8-50.8V272H240c-8.8 0-16-7.2-16-16V226.8c0-10.4-8.4-18.8-18.8-18.8c-4.6 0-9 1.7-12.5 4.7L70.6 321.3c-4.2 3.7-6.6 9.1-6.6 14.7s2.4 10.9 6.6 14.7L192.7 459.3c3.4 3.1 7.9 4.7 12.5 4.7c10.4 0 18.8-8.4 18.8-18.8V416c0-8.8 7.2-16 16-16H352c8.8 0 16 7.2 16 16s-7.2 16-16 16H256v13.2c0 28-22.7 50.8-50.8 50.8z'
  },
  matching: {
    viewBox: '0 0 576 512',
    path: 'M272 64c8.8 0 16 7.2 16 16l0 128c0 8.8-7.2 16-16 16L48 224c-8.8 0-16-7.2-16-16L32 80c0-8.8 7.2-16 16-16l224 0zM48 32C21.5 32 0 53.5 0 80L0 208c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-128c0-26.5-21.5-48-48-48L48 32zM528 64c8.8 0 16 7.2 16 16l0 256c0 8.8-7.2 16-16 16l-96 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l96 0zM432 32c-26.5 0-48 21.5-48 48l0 256c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-256c0-26.5-21.5-48-48-48l-96 0zM112 336l176 0c8.8 0 16 7.2 16 16l0 80c0 8.8-7.2 16-16 16l-176 0c-8.8 0-16-7.2-16-16l0-80c0-8.8 7.2-16 16-16zM64 352l0 80c0 26.5 21.5 48 48 48l176 0c26.5 0 48-21.5 48-48l0-80c0-26.5-21.5-48-48-48l-176 0c-26.5 0-48 21.5-48 48z'
  }
  // ── Add more FA icons below as needed ──────────────────────────
  // Example:
  // 'chevron-right': {
  //   viewBox: '0 0 320 512',
  //   path: 'M310.6 233.4c12.5 12.5 ...',
  // },
};
export function FaIcon({
  name,
  className = 'w-4 h-4',
  style,
  title
}: FaIconProps) {
  const icon = FA_ICONS[name];
  if (!icon) {
    // Fallback: render a placeholder square for unknown icons
    if (process.env.NODE_ENV === 'development') {
      console.warn(`FaIcon: unknown icon "${name}"`);
    }
    return (
      <svg
        className={className}
        style={style}
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true">

        <rect x="1" y="1" width="14" height="14" rx="2" opacity="0.3" />
      </svg>);

  }
  return (
    <svg
      className={className}
      style={style}
      focusable="false"
      aria-hidden={!title}
      role={title ? 'img' : undefined}
      viewBox={icon.viewBox}
      fill="currentColor">

      {title && <title>{title}</title>}
      <path d={icon.path} />
    </svg>);

}
// Re-export the icon names for type safety / autocomplete
export type FaIconName = keyof typeof FA_ICONS;
// Helper: get all registered icon names
export function getFaIconNames(): string[] {
  return Object.keys(FA_ICONS);
}