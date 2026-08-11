export type Mag = {
  slug: string;
  volume: string;
  theme: string;
  tagline: string;
  cover: string;
  href: string;
  date: string;
  accent: string;
};

export const mags: Mag[] = [
  {
    slug: 'vol-01-luck',
    volume: 'VOL. 01',
    theme: 'LUCK',
    tagline: 'the official field manual of the rapture. 14 raptured. 86 dead. pure luck only.',
    cover: '/mag/vol01-cover.jpg',
    href: 'https://honeyb-ogmag.vercel.app',
    date: 'AUG 2026',
    accent: '#a3e635'
  }
];
