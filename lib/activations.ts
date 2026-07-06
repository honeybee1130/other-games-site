export type Activation = {
  slug: string;
  title: string;
  partner: string;
  type: string;
  date: string;
  cover: string;
  video?: string;
  eyebrow: string;
  summary: string;
  quote: string;
  context: string[];
  brandNotes?: string[];
  brandLinks?: { label: string; href: string }[];
  gallery: string[];
  ugc: { label: string; href: string }[];
  services: string[];
};

export const activations: Activation[] = [
  {
    slug: 'hyperx-arena',
    title: 'HyperX Arena',
    partner: 'ApeFest Vegas / Otherside',
    type: 'IRL Gaming Experience',
    date: '2026',
    cover: '/hyperx-arena.jpg',
    eyebrow: 'IRL x digital world',
    summary:
      'An in-person Otherside gaming experience built for ApeFest energy: live, social, competitive, and camera-ready.',
    quote: 'When the room is real, the game has to feel even bigger.',
    context: [
      'At ApeFest Vegas, Other Games helped bring the Otherside experience into a physical gaming environment.',
      'The activation was designed to feel premium in the venue and legible online through clips, posts, and community reaction.',
      'It connected live event production with the kind of digital-native proof that web3 communities expect.'
    ],
    brandNotes: [
      'HyperX Arena Las Vegas is a 30,000-square-foot multi-level esports and entertainment venue inside Luxor on the Las Vegas Strip, built for competition stages, broadcast moments, and live gaming audiences.',
      'That makes this one of the strongest portfolio anchors: Other Games was not just posting a clip, it was translating Otherside into a real venue environment with IRL crowd energy and event-grade production value.',
      'Positioning note: lead with this whenever pitching live activations, brand-safe gaming spaces, or IRL-to-digital experiences.'
    ],
    brandLinks: [
      { label: 'HyperX Arena Las Vegas', href: 'https://hyperxarenalasvegas.com/' },
      { label: 'Luxor venue listing', href: 'https://luxor.mgmresorts.com/en/entertainment/hyperx-arena-las-vegas.html' },
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/hyperx-arena.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Otherside event post', href: 'https://x.com/OthersideMeta/status/1982262846340956295' }
    ],
    services: ['IRL activation support', 'Live gameplay design', 'Audience experience', 'Partner-facing showcase']
  },
  {
    slug: 'nexus-launch',
    title: 'Nexus Launch',
    partner: 'Yuga Labs / Otherside',
    type: 'Official Launch Event',
    date: '2026',
    cover: '/nexus-launch.jpg',
    eyebrow: 'Official world launch',
    summary:
      'A premium playable launch moment for Koda Nexus, built to turn a product beat into a live community ritual.',
    quote: 'From announcement energy to proof-of-play, the launch became something people could actually enter.',
    context: [
      'Other Games helped translate the Koda Nexus moment into a live, participatory experience for the Otherside audience.',
      'The goal was not just to broadcast news. It was to create a room, give players a reason to show up, and make the activation feel native to the community.',
      'The result was a branded play moment that gave Yuga and Otherside a premium event layer around the launch.'
    ],
    brandNotes: [
      'Otherside is Yuga Labs’ browser-based metaRPG world, blending MMORPG-style social play with web3 ownership and community participation.',
      'Koda Nexus is a flagship Otherside launch beat, so this case study should read like an official world-opening moment rather than a one-off community game night.',
      'Portfolio angle: this proves Other Games can carry launch energy for a major Yuga product surface and convert it into participatory gameplay.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' },
      { label: 'Yuga Labs', href: 'https://yuga.com/' },
      { label: 'Koda Nexus coverage', href: 'https://hypebeast.com/2025/10/yuga-labs-otherside-launches-koda-nexus-november-12' }
    ],
    gallery: ['/nexus-launch.jpg', '/logo-blue.png', '/logos/yuga.jpg', '/logos/otherside.jpg'],
    ugc: [
      { label: 'Other Games announcement', href: 'https://x.com/OtherGamesXYZ/status/1988673150775873629' }
    ],
    services: ['Live event design', 'Community flow', 'Gameplay format', 'Proof-of-play distribution']
  },
  {
    slug: 'boximus',
    title: 'Boximus',
    partner: 'Amazon Gaming x Otherside',
    type: 'Avatar Campaign',
    date: '2026',
    cover: '/boximus.png',
    eyebrow: 'Character-led activation',
    summary:
      'A Voyager avatar collaboration designed as a collectible cultural beat, not just a promotional drop.',
    quote: 'A brand character only works when the community can do something with it.',
    context: [
      'Boximus turned a partner collaboration into a more memorable in-world moment by giving the campaign visual identity and community utility.',
      'The activation connected Amazon Gaming, Otherside, and Other Games through a playful character-led experience.',
      'Instead of treating the asset as static creative, the campaign positioned it as something players could rally around and share.'
    ],
    brandNotes: [
      'Boximus was an Amazon Gaming / Otherside co-branded Voyager character, a limited avatar built to live inside Otherside rather than sit as flat promo creative.',
      'The weight here is Amazon: a mainstream gaming and commerce brand showing up in a web3 world through a playable character moment.',
      'Portfolio angle: strong proof that Other Games can make blue-chip brand integrations feel native to a game world.'
    ],
    brandLinks: [
      { label: 'Otherside Boximus post', href: 'https://x.com/OthersideMeta/status/1981923130281996392' },
      { label: 'Amazon Luna', href: 'https://luna.amazon.com/claims/home' },
      { label: 'Boximus coverage', href: 'https://decrypt.co/346105/bored-ape-metaverse-game-otherside-launching-amazon-nft-drop' }
    ],
    gallery: ['/boximus.png', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games campaign post', href: 'https://x.com/OtherGamesXYZ/status/2002064207723065611' }
    ],
    services: ['Campaign concepting', 'Avatar activation', 'Partner presentation', 'Social proof packaging']
  },
  {
    slug: 'bayc-5-year-anniversary',
    title: '5 Year Anniversary of BAYC',
    partner: 'Bored Ape Yacht Club / Yuga Labs',
    type: 'Anniversary Activation',
    date: 'April 2026',
    cover: '/activations/bayc-5-year.jpg',
    video: '/activations/bayc-5-year.mp4',
    eyebrow: 'BAYC anniversary moment',
    summary:
      'Bored Ape Yacht Club minted in April 2021. Five years on, we built its anniversary as a live cultural moment, not a recap reel.',
    quote: 'Anniversaries should not feel like recaps. They should feel like rooms the community can walk into.',
    context: [
      'Bored Ape Yacht Club minted on April 22-23, 2021 and sold out within hours, going on to define NFT culture as the flagship brand of Yuga Labs.',
      'For the five-year anniversary in April 2026 we framed the milestone as a live Other Games activation, giving the community a room to gather in rather than a montage to scroll.',
      'The moment doubled as celebration, archive, and partner-facing proof that five years of culture can still convene a crowd in real time.'
    ],
    brandNotes: [
      'Bored Ape Yacht Club is Yuga Labs’ flagship NFT culture brand: 10,000 Ethereum collectibles that grew into a broader entertainment, community, and IP ecosystem.',
      'A five-year anniversary is a major trust and longevity signal in web3, especially for a brand that helped define NFT culture.',
      'Portfolio angle: this should feel like a milestone cultural celebration, not just another activation card.'
    ],
    brandLinks: [
      { label: 'Bored Ape Yacht Club', href: 'https://boredapeyachtclub.com/' },
      { label: 'Yuga Labs', href: 'https://yuga.com/' },
      { label: 'Other Games anniversary post', href: 'https://x.com/OtherGamesXYZ/status/2047451585207578879?s=20' }
    ],
    gallery: ['/activations/bayc-5-year.jpg', '/logos/yuga.jpg', '/logos/apecoin.png', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games anniversary post', href: 'https://x.com/OtherGamesXYZ/status/2047451585207578879?s=20' }
    ],
    services: ['Milestone event design', 'Community celebration', 'Premium visual packaging', 'Campaign archive']
  },
  {
    slug: 'yuga-daniel-arsham-presentation',
    title: 'Yuga Labs x Daniel Arsham',
    partner: 'Yuga Labs / Daniel Arsham',
    type: 'Three-Week Presentation',
    date: 'May 2026',
    cover: '/activations/arsham.jpg',
    video: '/activations/arsham.mp4',
    eyebrow: 'Artist-led presentation',
    summary:
      'A three-week Yuga Labs x Daniel Arsham presentation culminating in 300 Voyager avatars that erode and evolve over time, dropped inside the Otherside Starfield Gallery.',
    quote: 'Arsham makes future relics. We gave them somewhere to roam.',
    context: [
      'Daniel Arsham, the contemporary artist known for fictional archaeology and collaborations with Dior, Tiffany and Co., and Pokemon, brought his work into Otherside with Yuga Labs.',
      'The collaboration ran as a sustained three-week presentation rather than a single drop, producing a 300-piece Voyager collection: interactive avatars designed to erode and evolve over time, from ruins to roam.',
      'The drop opened May 6, 2026 in the Otherside Starfield Gallery with a 48-hour claim window for eligible Yuga holders, translating MoMA-tier art credibility into something the community could actually play as.'
    ],
    brandNotes: [
      'Daniel Arsham is a New York-based contemporary artist known for “fictional archaeology” work across sculpture, architecture, drawing, and film.',
      'Yuga Labs brings the web3 culture layer; Arsham brings fine-art credibility and a collector audience that reaches beyond gaming-native communities.',
      'Portfolio angle: this belongs high because it shows Other Games can support premium culture, art, and brand presentation moments, not just tournaments.'
    ],
    brandLinks: [
      { label: 'Daniel Arsham', href: 'https://www.danielarsham.com/' },
      { label: 'Perrotin artist profile', href: 'https://www.perrotin.com/en/artists/daniel-arsham' },
      { label: 'Yuga Labs', href: 'https://yuga.com/' }
    ],
    gallery: ['/activations/arsham.jpg', '/logos/yuga.jpg', '/logos/otherside.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games presentation post', href: 'https://x.com/OtherGamesXYZ/status/2057825693904630117?s=20' }
    ],
    services: ['Presentation layer', 'Live activation support', 'Worldbuilding context', 'Social proof packaging']
  },
  {
    slug: 'fwog',
    title: 'Fwog',
    partner: 'Fwog / Otherside',
    type: 'Community Activation',
    date: '2026',
    cover: '/activations/fwog.jpg',
    video: '/activations/fwog.mp4',
    eyebrow: 'Community culture collab',
    summary:
      'A Fwog activation shaped as a character-led community beat with the visual clarity to travel beyond a single post.',
    quote: 'The strongest community moments make the asset feel alive, not displayed.',
    context: [
      'Other Games helped turn the Fwog moment into a playful activation with a clear visual hook and community-facing wrapper.',
      'The work treated the collaboration as a scene people could recognize quickly, share easily, and connect back to the wider Otherside ecosystem.',
      'The activation gave the character a live context instead of leaving it as static creative.'
    ],
    brandNotes: [
      'Fwog is a character-forward digital collectibles brand with a strong meme-native identity and community flywheel.',
      'The activation works because the asset reads instantly: a simple character, a recognizable vibe, and enough personality to travel socially.',
      'Portfolio angle: use this as proof that Other Games can take internet-native IP and make it feel alive inside an event wrapper.'
    ],
    brandLinks: [
      { label: 'Fwogs', href: 'https://www.fwogs.com/' },
      { label: 'Fwog on X', href: 'https://x.com/itsafwog' },
      { label: 'Other Games Fwog post', href: 'https://x.com/OtherGamesXYZ/status/2045158370018197528?s=20' }
    ],
    gallery: ['/activations/fwog.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games Fwog post', href: 'https://x.com/OtherGamesXYZ/status/2045158370018197528?s=20' }
    ],
    services: ['Character-led activation', 'Community programming', 'Social-first creative', 'UGC capture layer']
  },
  {
    slug: 'moonbirds',
    title: 'Moonbirds',
    partner: 'Moonbirds / Otherside',
    type: 'Community Activation',
    date: '2026',
    cover: '/activations/moonbirds.jpg',
    video: '/activations/moonbirds.mp4',
    eyebrow: 'Collection-led activation',
    summary:
      'Moonbirds is the pixel-owl blue chip that has changed hands twice, from PROOF to Yuga to Orange Cap Games. We brought that recognizable name into a live Otherside activation.',
    quote: 'Two owners, three eras, one very recognizable owl.',
    context: [
      'Moonbirds is a 10,000-piece pixel-owl PFP launched by PROOF (Kevin Rose) in 2022, known for its nesting staking mechanic.',
      'The IP has moved from PROOF to Yuga Labs to Orange Cap Games, which acquired it in 2025 and later launched a Solana-based BIRB token, making Moonbirds a genuinely cross-chain brand.',
      'We brought that name into a live Otherside activation built for community reaction and social proof.'
    ],
    brandNotes: [
      'Moonbirds is a 10,000-piece PFP collection originally tied to PROOF, built around digital and IRL community access.',
      'The IP has since moved into the Orange Cap Games ecosystem, which keeps the brand connected to gaming and collector culture.',
      'Portfolio angle: Moonbirds is a recognizable blue-chip NFT name, so it earns priority as a brand-weight signal even when the activation itself is community-led.'
    ],
    brandLinks: [
      { label: 'Moonbirds', href: 'https://moonbirds.com/' },
      { label: 'PROOF Moonbirds archive', href: 'https://www.proof.xyz/moonbirds' },
      { label: 'Other Games Moonbirds post', href: 'https://x.com/OtherGamesXYZ/status/2017297621484716205?s=20' }
    ],
    gallery: ['/activations/moonbirds.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/2017297621484716205?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'solana-gaming',
    title: 'Solana Gaming',
    partner: 'Solana Gaming / Other Games',
    type: 'Ecosystem Activation',
    date: '2026',
    cover: '/activations/solana-gaming.jpg',
    video: '/activations/solana-gaming.mp4',
    eyebrow: 'Solana gaming event',
    summary:
      'Solana Gaming was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring Solana Gaming into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'Solana is one of the largest high-throughput blockchain ecosystems, and its gaming vertical emphasizes speed, low fees, and consumer-scale asset activity.',
      'A Solana Gaming activation gives Other Games reach outside the Yuga/Otherside home base and into a broader web3 gaming ecosystem.',
      'Portfolio angle: this helps prove the studio is chain-agnostic enough to support major ecosystems, not just one community.'
    ],
    brandLinks: [
      { label: 'Solana Gaming', href: 'https://solana.com/developers/gaming' },
      { label: 'Solana games and entertainment', href: 'https://solana.com/solutions/gaming-and-entertainment' },
      { label: 'Other Games Solana post', href: 'https://x.com/OtherGamesXYZ/status/1975234548712734983?s=20' }
    ],
    gallery: ['/activations/solana-gaming.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/1975234548712734983?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'franky-metamask',
    title: 'Franky x MetaMask',
    partner: 'Franky the Frog / MetaMask',
    type: 'Brand Collaboration',
    date: '2026',
    cover: '/franky-metamask.png',
    eyebrow: 'Collab event',
    summary:
      'MetaMask brought its fox into Otherside: Rewards users at Level 2 and up earned an exclusive playable avatar on ApeChain. We built the live moment around it.',
    quote: 'A wallet loyalty program that pays out in playable avatars is a collab, not an ad.',
    context: [
      'MetaMask, the most widely used self-custody crypto wallet, ran an Otherside avatar drop through its Rewards program: participants at Level 2 and above earned an exclusive NFT avatar built around the MetaMask fox, distributed on ApeChain.',
      'We wrapped it in a live Other Games event, Franky and the Fox, so the avatar arrived as a scene the community played through rather than an announcement they scrolled past.',
      'The stream pulled 3.9K views, tying a mainstream wallet brand to the Yuga world through a moment people actually attended.'
    ],
    brandNotes: [
      'MetaMask is one of the most recognizable crypto wallets in the world, developed by Consensys and used as a primary access point for onchain apps.',
      'Franky the Frog brings character IP and community energy; MetaMask brings mainstream crypto infrastructure credibility.',
      'Portfolio angle: this is a strong collab card because it connects playful IP with an infrastructure brand almost every crypto user recognizes.'
    ],
    brandLinks: [
      { label: 'MetaMask', href: 'https://metamask.io/' },
      { label: 'Consensys', href: 'https://consensys.io/' },
      { label: 'Franky the Frog', href: 'https://frankythefrog.com/' },
      { label: 'Other Games collab post', href: 'https://x.com/OtherGamesXYZ/status/2024591118151942547?s=20' }
    ],
    gallery: ['/franky-metamask.png', '/logos/otherside.jpg', '/logo-blue.png', '/logos/apecoin.png'],
    ugc: [
      { label: 'Other Games collaboration post', href: 'https://x.com/OtherGamesXYZ/status/2024591118151942547?s=20' }
    ],
    services: ['Brand collaboration', 'In-world experience', 'Community programming', 'UGC capture layer']
  },
  {
    slug: 'apechurch',
    title: 'Ape Church',
    partner: 'Ape Church / ApeCoin',
    type: 'On-Chain Gaming Ritual',
    date: '2026',
    cover: '/activations/apechurch.jpg',
    video: '/activations/apechurch.mp4',
    eyebrow: 'Community ritual',
    summary:
      'Ape Church is an on-chain game platform on ApeChain that crossed $1M in volume and roughly 800 players in its first three days. We brought that congregation energy into Otherside as a live game night.',
    quote: 'The best web3 events feel less like content and more like a ritual people choose to attend.',
    context: [
      'Ape Church was built by BAYC community member Koko as a fully on-chain game platform on ApeChain, where every play settles as an on-chain transaction. It crossed $1M in volume and roughly 800 active players in its first three days.',
      'We brought that same congregation energy into Otherside as a live, participatory game night, native to ApeCoin culture rather than bolted onto it.',
      'It became our single highest-reach stream of the quarter at 3.6K views, and the format the community kept coming back to.'
    ],
    brandNotes: [
      'ApeCoin is the native gas token for ApeChain and a core pillar around ApeChain, Bored Ape Yacht Club, and Otherside.',
      'Ape Church lands because it feels like a ritual for the Ape ecosystem: participatory, dramatic, and native to onchain gaming culture.',
      'Portfolio angle: strong proof that Other Games understands community religion, not just event logistics.'
    ],
    brandLinks: [
      { label: 'ApeCoin', href: 'https://apecoin.com/' },
      { label: 'ApeChain', href: 'https://apechain.com/' },
      { label: 'Other Games Ape Church post', href: 'https://x.com/OtherGamesXYZ/status/2042304535008514510?s=20' }
    ],
    gallery: ['/activations/apechurch.jpg', '/logos/apecoin.png', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games Ape Church post', href: 'https://x.com/OtherGamesXYZ/status/2042304535008514510?s=20' }
    ],
    services: ['Community ritual design', 'On-chain game positioning', 'ApeCoin audience programming', 'Social proof packaging']
  },
  {
    slug: 'outbreak',
    title: 'Outbreak',
    partner: 'Outbreak / Otherside',
    type: 'Community Activation',
    date: '2026',
    cover: '/activations/outbreak.jpg',
    video: '/activations/outbreak.mp4',
    eyebrow: 'High-intensity community event',
    summary:
      'Outbreak was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring Outbreak into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'Outbreak works as a high-intensity original/community activation: the name, pacing, and visual language all point toward urgency and team participation.',
      'Compared with brand-heavy cards, this page should sell the format: Other Games can create its own event IP that feels like a campaign beat.',
      'Portfolio angle: keep it in the priority set because it demonstrates original programming and not only partner fulfillment.'
    ],
    brandLinks: [
      { label: 'Other Games Outbreak post', href: 'https://x.com/OtherGamesXYZ/status/1969165031863390707?s=20' },
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/outbreak.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/1969165031863390707?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'mimu-on-ape',
    title: 'Mimu on Ape',
    partner: 'Mimu / ApeCoin',
    type: 'Community Activation',
    date: '2026',
    cover: '/activations/mimu-on-ape.jpg',
    video: '/activations/mimu-on-ape.mp4',
    eyebrow: 'Mimu on Ape activation',
    summary:
      'Mimu on Ape was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring Mimu on Ape into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'MIMU On Ape is an Ape ecosystem character collection; OpenSea describes Monsters In My Universe as fan-fiction characters born of the Nexus.',
      'This reads best as a character/community bridge into the broader Otherside and ApeCoin audience.'
    ],
    brandLinks: [
      { label: 'MIMU on OpenSea', href: 'https://opensea.io/collection/mimuonape' },
      { label: 'Other Games post', href: 'https://x.com/OtherGamesXYZ/status/2055304517604843649?s=20' }
    ],
    gallery: ['/activations/mimu-on-ape.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/2055304517604843649?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'bathroom-blitz',
    title: 'Bathroom Blitz',
    partner: 'Bathroom Blitz / Otherside',
    type: 'Community Activation',
    date: '2026',
    cover: '/activations/bathroom-blitz.jpg',
    video: '/activations/bathroom-blitz.mp4',
    eyebrow: 'High-energy community event',
    summary:
      'Bathroom Blitz is Yuga flagship playable Otherside shooter: 8v8, third-person, and you are shrunk to scale on a giant bathroom map. We run it as a live tournament format.',
    quote: 'Two inches tall, one giant bathroom, eight players, everyone watching.',
    context: [
      'Bathroom Blitz is a first-party Otherside game built by Command Line, a Theia Interactive studio, on Yuga Otherside Development Kit and powered by ApeCoin: an 8v8 third-person deathmatch set on a single oversized bathroom map where players are shrunk to scale.',
      'It was billed as one of the first fully playable Otherside experiences of its kind, and we repackage it into live competitive nights.',
      'Our Blitz Me tournament, powered by ApeCoin, ran the format as a community event and pulled 1.3K views.'
    ],
    brandNotes: [
      'Bathroom Blitz is a first-party Otherside game (8v8 third-person shooter, players shrunk to scale on a giant bathroom map) built by Command Line, a Theia Interactive studio, on Yuga Otherside Development Kit and powered by ApeCoin.',
      'It was positioned as one of the first fully playable Otherside experiences of its kind. Other Games runs it as a live competitive tournament format, most recently the ApeCoin-powered Blitz Me night.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/bathroom-blitz.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/2034619286984257698?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'bani-the-rabbit',
    title: 'Bani the Mad Buni',
    partner: 'Bani the Mad Buni / FoxyFam',
    type: 'Character Activation',
    date: '2026',
    cover: '/activations/bani-the-rabbit.jpg',
    video: '/activations/bani-the-rabbit.mp4',
    eyebrow: 'Character-led community beat',
    summary:
      'Bani the Rabbit was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring Bani the Rabbit into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'Bani the Rabbit is included as part of the broader Other Games activation archive: a community-facing proof point for live programming, partner support, and social-first gameplay moments.',
      'This page is intentionally secondary to the headline brand cards, but it still shows repeatable activation infrastructure across the Otherside ecosystem.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/bani-the-rabbit.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/2032125499020071167?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'meebits-futbol',
    title: 'Meebits Futbol',
    partner: 'Meebits / Otherside',
    type: 'Sports Culture Activation',
    date: '2026',
    cover: '/activations/meebits-futbol.jpg',
    video: '/activations/meebits-futbol.mp4',
    eyebrow: 'Community futbol moment',
    summary:
      '20,000 voxel Meebits, one soccer pitch. We built a five-a-side futbol format in Otherside and put a Yuga collection on the field instead of on a shelf.',
    quote: 'Meebits ship as rigged 3D models. So we put them on a football pitch.',
    context: [
      'Meebits is a 20,000-piece collection of algorithmically generated 3D voxel avatars from Larva Labs, the studio behind CryptoPunks. Every Meebit ships with a full 3D model and T-pose rig, so they are built to be animated, not just displayed.',
      'We used that to run a live futbol format inside Otherside, turning a blue-chip PFP into a team of playable footballers.',
      '1.3K tuned in to watch the voxels take the pitch.'
    ],
    brandNotes: [
      'Meebits is a 20,000-piece collection of generative 3D voxel avatars originally by Larva Labs, built for virtual worlds and display.',
      'The futbol wrapper gave a recognizable NFT avatar brand a sports-culture activation hook.'
    ],
    brandLinks: [
      { label: 'Meebits', href: 'https://meebits.com/' },
      { label: 'Other Games post', href: 'https://x.com/OtherGamesXYZ/status/2029612163736948956?s=20' }
    ],
    gallery: ['/activations/meebits-futbol.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/2029612163736948956?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'typical-tigers',
    title: 'Typical Tigers',
    partner: 'Typical Tigers / Otherside',
    type: 'Community Activation',
    date: '2026',
    cover: '/activations/typical-tigers.jpg',
    video: '/activations/typical-tigers.mp4',
    eyebrow: 'Collection-led community beat',
    summary:
      'Typical Tigers was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring Typical Tigers into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'Typical Tigers is included as part of the broader Other Games activation archive: a community-facing proof point for live programming, partner support, and social-first gameplay moments.',
      'This page is intentionally secondary to the headline brand cards, but it still shows repeatable activation infrastructure across the Otherside ecosystem.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/typical-tigers.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/2027035456656040080?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'okay-bears-dead-king-society',
    title: 'Okay Bears x Dead King Society',
    partner: 'Okay Bears / Dead King Society',
    type: 'Cross-Community Activation',
    date: '2026',
    cover: '/activations/okay-bears-dead-king-society.jpg',
    video: '/activations/okay-bears-dead-king-society.mp4',
    eyebrow: 'Cross-community event',
    summary:
      'Okay Bears broke Solana launch records, then pivoted to building real basketball courts. We paired it with Dead King Society builder network for a cross-community Otherside moment.',
    quote: 'One community builds real basketball courts. We built them a game.',
    context: [
      'Okay Bears launched on Solana in April 2022, sold out in under 40 minutes, and did roughly $18M in first-day secondary sales, a Solana record at the time. It has since repositioned as We Are Okay, funding real-world basketball courts in places like Tripoli, Lebanon and Surakarta, Indonesia.',
      'Dead King Society is a Solana members network for web3 founders, traders, and artists, structured around tiered access passes.',
      'We brought the two communities together in Otherside as a cross-community activation, a Solana-native crowd stepping into the Yuga world.'
    ],
    brandNotes: [
      'Okay Bears is a Solana-originated culture brand built around community, art, apparel, and action-oriented identity.',
      'Pairing it with Dead King Society turns the page into a cross-community proof point rather than a single-collection event.'
    ],
    brandLinks: [
      { label: 'Okay Bears', href: 'https://okaybears.com/' },
      { label: 'Other Games post', href: 'https://x.com/OtherGamesXYZ/status/2014793768063361176?s=20' }
    ],
    gallery: ['/activations/okay-bears-dead-king-society.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/2014793768063361176?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'token-gators',
    title: 'Token Gators',
    partner: 'Token Gators / Otherside',
    type: 'Community Activation',
    date: '2026',
    cover: '/activations/token-gators.jpg',
    video: '/activations/token-gators.mp4',
    eyebrow: 'Collection-led activation',
    summary:
      'Token Gators was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring Token Gators into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'Token Gators is included as part of the broader Other Games activation archive: a community-facing proof point for live programming, partner support, and social-first gameplay moments.',
      'This page is intentionally secondary to the headline brand cards, but it still shows repeatable activation infrastructure across the Otherside ecosystem.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/token-gators.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/2013979232699896227?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'galactic-geckos-lucid',
    title: 'Galactic Geckos x Lucid',
    partner: 'Galactic Geckos / Lucid',
    type: 'Partner Activation',
    date: '2026',
    cover: '/activations/galactic-geckos-lucid.jpg',
    video: '/activations/galactic-geckos-lucid.mp4',
    eyebrow: 'Cross-community collaboration',
    summary:
      'Galactic Geckos x Lucid was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring Galactic Geckos x Lucid into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'Galactic Gecko Space Garage is a 10,000-piece NFT social adventure club with space-racing identity.',
      'The Lucid pairing makes this useful as a crossover/community-collab proof point.'
    ],
    brandLinks: [
      { label: 'Galactic Geckos', href: 'https://galacticgeckos.io/' },
      { label: 'Other Games post', href: 'https://x.com/OtherGamesXYZ/status/2012210279031971934?s=20' }
    ],
    gallery: ['/activations/galactic-geckos-lucid.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/2012210279031971934?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'chaos-trials',
    title: 'Chaos Trials',
    partner: 'Other Games / Otherside',
    type: 'Original Event Format',
    date: '2026',
    cover: '/activations/chaos-trials.jpg',
    video: '/activations/chaos-trials.mp4',
    eyebrow: 'Competitive community trials',
    summary:
      'Chaos Trials was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring Chaos Trials into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'Chaos Trials is included as part of the broader Other Games activation archive: a community-facing proof point for live programming, partner support, and social-first gameplay moments.',
      'This page is intentionally secondary to the headline brand cards, but it still shows repeatable activation infrastructure across the Otherside ecosystem.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/chaos-trials.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/2010698527567937793?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'og-network',
    title: 'OG: Network',
    partner: 'Other Games',
    type: 'Network Activation',
    date: '2026',
    cover: '/activations/og-network.jpg',
    video: '/activations/og-network.mp4',
    eyebrow: 'Other Games network moment',
    summary:
      'OG: Network was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring OG: Network into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'OG: Network is included as part of the broader Other Games activation archive: a community-facing proof point for live programming, partner support, and social-first gameplay moments.',
      'This page is intentionally secondary to the headline brand cards, but it still shows repeatable activation infrastructure across the Otherside ecosystem.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/og-network.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/2009652046073569299?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'other-awards',
    title: 'Other Awards',
    partner: 'Other Games',
    type: 'Awards Show Activation',
    date: '2026',
    cover: '/activations/other-awards.jpg',
    video: '/activations/other-awards.mp4',
    eyebrow: 'Community awards format',
    summary:
      'Other Awards was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring Other Awards into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'Other Awards is included as part of the broader Other Games activation archive: a community-facing proof point for live programming, partner support, and social-first gameplay moments.',
      'This page is intentionally secondary to the headline brand cards, but it still shows repeatable activation infrastructure across the Otherside ecosystem.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/other-awards.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/2004654566655299745?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'nightglyder',
    title: 'NightGlyder',
    partner: 'NightGlyder / Otherside',
    type: 'Community Activation',
    date: '2026',
    cover: '/activations/nightglyder.jpg',
    video: '/activations/nightglyder.mp4',
    eyebrow: 'Collection-led activation',
    summary:
      'NightGlyder was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring NightGlyder into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'NightGlyder is included as part of the broader Other Games activation archive: a community-facing proof point for live programming, partner support, and social-first gameplay moments.',
      'This page is intentionally secondary to the headline brand cards, but it still shows repeatable activation infrastructure across the Otherside ecosystem.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/nightglyder.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/1999133002748563947?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'cool-cats',
    title: 'Cool Cats',
    partner: 'Cool Cats / Otherside',
    type: 'Community Activation',
    date: '2026',
    cover: '/activations/cool-cats.jpg',
    video: '/activations/cool-cats.mp4',
    eyebrow: 'Collection-led activation',
    summary:
      'Cool Cats Blue Cat predates the NFT boom by eight years. Today it is an animation and gaming brand with Animoca backing. We ran it live in Otherside.',
    quote: 'Blue Cat was drawn in 2013. He has been patient.',
    context: [
      'Cool Cats is a 9,999-piece Ethereum collection launched in July 2021, built around Blue Cat, a character its founding artist Clon first drew back in 2013.',
      'It has since grown into an animation and gaming brand, with the Milk Chug animated series and the Cooltopia mini-game hub, and Animoca Brands took a majority stake in 2025.',
      'We brought that character heritage into a live Otherside activation for the community.'
    ],
    brandNotes: [
      'Cool Cats is a long-running NFT character brand centered on Blue Cat, animation, merch, and community worldbuilding.',
      'This works as another recognizable blue-chip community activation lower in the grid.'
    ],
    brandLinks: [
      { label: 'Cool Cats', href: 'https://coolcats.com/' },
      { label: 'Other Games post', href: 'https://x.com/OtherGamesXYZ/status/1996618986134679627?s=20' }
    ],
    gallery: ['/activations/cool-cats.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/1996618986134679627?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'flingers',
    title: 'Flingers',
    partner: 'Flingers / Otherside',
    type: 'Community Activation',
    date: '2026',
    cover: '/activations/flingers.jpg',
    video: '/activations/flingers.mp4',
    eyebrow: 'Collection-led activation',
    summary:
      'Flingers was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring Flingers into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'Flingers is included as part of the broader Other Games activation archive: a community-facing proof point for live programming, partner support, and social-first gameplay moments.',
      'This page is intentionally secondary to the headline brand cards, but it still shows repeatable activation infrastructure across the Otherside ecosystem.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/flingers.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/1994425881524162677?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'dawn-of-the-ducks',
    title: 'Dawn of the Ducks',
    partner: 'Dawn of the Ducks / Otherside',
    type: 'Community Activation',
    date: '2026',
    cover: '/activations/dawn-of-the-ducks.jpg',
    video: '/activations/dawn-of-the-ducks.mp4',
    eyebrow: 'Collection-led activation',
    summary:
      'Dawn of the Ducks was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring Dawn of the Ducks into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'Dawn of the Ducks is included as part of the broader Other Games activation archive: a community-facing proof point for live programming, partner support, and social-first gameplay moments.',
      'This page is intentionally secondary to the headline brand cards, but it still shows repeatable activation infrastructure across the Otherside ecosystem.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/dawn-of-the-ducks.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/1991647222254170400?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'arbinauts-arbitrum',
    title: 'Arbinauts by Arbitrum',
    partner: 'Arbitrum / Arbinauts',
    type: 'Partner Activation',
    date: '2026',
    cover: '/activations/arbinauts-arbitrum.jpg',
    video: '/activations/arbinauts-arbitrum.mp4',
    eyebrow: 'Arbitrum community activation',
    summary:
      'Arbinauts by Arbitrum was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring Arbinauts by Arbitrum into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'Arbitrum is a major Ethereum Layer 2 ecosystem focused on speed, low costs, and scalable onchain applications.',
      'The Arbinauts activation adds ecosystem breadth beyond NFT collections and into chain/community programming.'
    ],
    brandLinks: [
      { label: 'Arbitrum', href: 'https://arbitrum.io/' },
      { label: 'Arbitrum Foundation', href: 'https://arbitrum.foundation/' },
      { label: 'Other Games post', href: 'https://x.com/OtherGamesXYZ/status/1987930647369814390?s=20' }
    ],
    gallery: ['/activations/arbinauts-arbitrum.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/1987930647369814390?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'geez-on-ape-1-year-anniversary',
    title: 'Geez on Ape 1 Year Anniversary',
    partner: 'Geez / ApeCoin',
    type: 'Anniversary Activation',
    date: '2026',
    cover: '/activations/geez-on-ape-1-year-anniversary.jpg',
    video: '/activations/geez-on-ape-1-year-anniversary.mp4',
    eyebrow: 'One-year anniversary event',
    summary:
      'Geez on Ape is reportedly the first ApeChain collection made fully playable across Otherside. We marked its one-year anniversary with a live celebration in the world its avatars already live in.',
    quote: 'Most PFPs sit in a wallet. All 5,555 Geez walk around Otherside.',
    context: [
      'Geez on Ape is a 5,555-piece collection of 3D gorillas on ApeChain with its own in-house animation studio, one of the chain highest-volume collections by lifetime trading.',
      'It is also reportedly the first ApeChain collection to become fully playable across Otherside, rigged and roaming through Bathroom Blitz, the Swamp, and Bubble Spaces.',
      'For its one-year anniversary we built a live Other Games celebration inside the world its holders already play in, native to ApeChain culture end to end.'
    ],
    brandNotes: [
      'Geez on Ape is a 5,555-piece 3D gorilla collection on ApeChain with its own in-house animation studio, and one of the chain highest-volume collections (a Hulk-inspired Geez reportedly sold for a record ~49,000 APE).',
      'It is reportedly the first ApeChain NFT collection made fully playable across Otherside, spanning Bathroom Blitz, the Swamp, and Bubble Spaces, and it is listed as the first Other Games partner. Treat it as an anchor case, not a footnote.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/geez-on-ape-1-year-anniversary.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/1986582083213430880?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'og-x',
    title: 'OG: X',
    partner: 'Other Games',
    type: 'Flagship Activation',
    date: '2026',
    cover: '/activations/og-x.jpg',
    video: '/activations/og-x.mp4',
    eyebrow: 'Other Games flagship format',
    summary:
      'OG: X was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring OG: X into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'OG: X is included as part of the broader Other Games activation archive: a community-facing proof point for live programming, partner support, and social-first gameplay moments.',
      'This page is intentionally secondary to the headline brand cards, but it still shows repeatable activation infrastructure across the Otherside ecosystem.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/og-x.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/1971396918581281014?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  },
  {
    slug: 'foxyfam',
    title: 'FoxyFam',
    partner: 'FoxyFam / Otherside',
    type: 'Community Activation',
    date: '2026',
    cover: '/activations/foxyfam.jpg',
    video: '/activations/foxyfam.mp4',
    eyebrow: 'Collection-led activation',
    summary:
      'FoxyFam was shaped as a premium Other Games activation: live, social-first, and built to turn community energy into a clear proof-of-play moment.',
    quote: 'The strongest activations make a community feel seen, then give them something worth sharing.',
    context: [
      'Other Games helped bring FoxyFam into a live activation format with a clear visual hook and community-facing wrapper.',
      'The work treated the moment as more than a post: it became a scene, a participation cue, and a piece of social proof for the wider ecosystem.',
      'The result gave the partner and community a polished archive asset that can travel across X, deck materials, and future partner conversations.'
    ],
    brandNotes: [
      'FoxyFam is included as part of the broader Other Games activation archive: a community-facing proof point for live programming, partner support, and social-first gameplay moments.',
      'This page is intentionally secondary to the headline brand cards, but it still shows repeatable activation infrastructure across the Otherside ecosystem.'
    ],
    brandLinks: [
      { label: 'Otherside', href: 'https://otherside.xyz/' }
    ],
    gallery: ['/activations/foxyfam.jpg', '/logos/otherside.jpg', '/logos/yuga.jpg', '/logo-blue.png'],
    ugc: [
      { label: 'Other Games activation post', href: 'https://x.com/OtherGamesXYZ/status/1966181448198795614?s=20' }
    ],
    services: ['Live activation design', 'Community programming', 'Social-first creative', 'Proof-of-play packaging']
  }

];

export const partners = [
  { name: 'Geez', logo: '/logos/geez.png' },
  { name: 'Otherside', logo: '/logos/otherside.jpg' },
  { name: 'ApeCoin', logo: '/logos/apecoin.png' },
  { name: 'Yuga Labs', logo: '/logos/yuga.jpg' },
  { name: 'Solana', logo: '/logos/solana.jpg' },
  { name: 'Arbitrum', logo: '/logos/arbitrum.jpg' },
  { name: 'BNB Chain', logo: '/logos/bnb.png' },
  { name: 'OpenPage', logo: '/logos/openpage.jpg' }
];

export const capabilities = [
  'Live game activations',
  'Tokenized tournaments',
  'Community game nights',
  'Partner launch moments',
  'Proof-of-play campaigns',
  'In-world brand experiences'
];
