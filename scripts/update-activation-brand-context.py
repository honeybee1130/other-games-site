from __future__ import annotations

from pathlib import Path

path = Path('lib/activations.ts')
text = path.read_text()

if 'brandNotes?: string[];' not in text:
    text = text.replace(
        "  context: string[];\n  gallery: string[];\n  ugc: { label: string; href: string }[];\n  services: string[];",
        "  context: string[];\n  brandNotes?: string[];\n  brandLinks?: { label: string; href: string }[];\n  gallery: string[];\n  ugc: { label: string; href: string }[];\n  services: string[];"
    )

start = text.index('export const activations: Activation[] = [')
arr_start = text.index('= [', start) + 2
arr_end = text.index('\n];', arr_start)
body = text[arr_start + 1:arr_end]

def split_objects(body: str) -> list[str]:
    objects = []
    depth = 0
    in_str = False
    quote = ''
    escaped = False
    obj_start = None
    for i, ch in enumerate(body):
        if in_str:
            if escaped:
                escaped = False
            elif ch == '\\':
                escaped = True
            elif ch == quote:
                in_str = False
            continue
        if ch in ("'", '"', '`'):
            in_str = True
            quote = ch
            continue
        if ch == '{':
            if depth == 0:
                obj_start = i
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0 and obj_start is not None:
                end = i + 1
                # include optional comma and trailing whitespace
                j = end
                while j < len(body) and body[j].isspace():
                    j += 1
                if j < len(body) and body[j] == ',':
                    j += 1
                objects.append(body[obj_start:j].strip())
                obj_start = None
    return objects

objects = split_objects(body)

def get_slug(obj: str) -> str:
    marker = "slug: '"
    i = obj.index(marker) + len(marker)
    return obj[i:obj.index("'", i)]

by_slug = {get_slug(obj): obj.rstrip(',') for obj in objects}

priority = [
    'hyperx-arena',
    'nexus-launch',
    'boximus',
    'bayc-5-year-anniversary',
    'yuga-daniel-arsham-presentation',
    'fwog',
    'moonbirds',
    'solana-gaming',
    'franky-metamask',
    'apechurch',
    'outbreak',
]
ordered_slugs = priority + [slug for slug in by_slug if slug not in priority]

brand_data = {
    'hyperx-arena': {
        'notes': [
            'HyperX Arena Las Vegas is a 30,000-square-foot multi-level esports and entertainment venue inside Luxor on the Las Vegas Strip, built for competition stages, broadcast moments, and live gaming audiences.',
            'That makes this one of the strongest portfolio anchors: Other Games was not just posting a clip, it was translating Otherside into a real venue environment with IRL crowd energy and event-grade production value.',
            'Positioning note: lead with this whenever pitching live activations, brand-safe gaming spaces, or IRL-to-digital experiences.'
        ],
        'links': [('HyperX Arena Las Vegas', 'https://hyperxarenalasvegas.com/'), ('Luxor venue listing', 'https://luxor.mgmresorts.com/en/entertainment/hyperx-arena-las-vegas.html'), ('Otherside', 'https://otherside.xyz/')]
    },
    'nexus-launch': {
        'notes': [
            'Otherside is Yuga Labs’ browser-based metaRPG world, blending MMORPG-style social play with web3 ownership and community participation.',
            'Koda Nexus is a flagship Otherside launch beat, so this case study should read like an official world-opening moment rather than a one-off community game night.',
            'Portfolio angle: this proves Other Games can carry launch energy for a major Yuga product surface and convert it into participatory gameplay.'
        ],
        'links': [('Otherside', 'https://otherside.xyz/'), ('Yuga Labs', 'https://yuga.com/'), ('Koda Nexus coverage', 'https://hypebeast.com/2025/10/yuga-labs-otherside-launches-koda-nexus-november-12')]
    },
    'boximus': {
        'notes': [
            'Boximus was an Amazon Gaming / Otherside co-branded Voyager character, a limited avatar built to live inside Otherside rather than sit as flat promo creative.',
            'The weight here is Amazon: a mainstream gaming and commerce brand showing up in a web3 world through a playable character moment.',
            'Portfolio angle: strong proof that Other Games can make blue-chip brand integrations feel native to a game world.'
        ],
        'links': [('Otherside Boximus post', 'https://x.com/OthersideMeta/status/1981923130281996392'), ('Amazon Luna', 'https://luna.amazon.com/claims/home'), ('Boximus coverage', 'https://decrypt.co/346105/bored-ape-metaverse-game-otherside-launching-amazon-nft-drop')]
    },
    'bayc-5-year-anniversary': {
        'notes': [
            'Bored Ape Yacht Club is Yuga Labs’ flagship NFT culture brand: 10,000 Ethereum collectibles that grew into a broader entertainment, community, and IP ecosystem.',
            'A five-year anniversary is a major trust and longevity signal in web3, especially for a brand that helped define NFT culture.',
            'Portfolio angle: this should feel like a milestone cultural celebration, not just another activation card.'
        ],
        'links': [('Bored Ape Yacht Club', 'https://boredapeyachtclub.com/'), ('Yuga Labs', 'https://yuga.com/'), ('Other Games anniversary post', 'https://x.com/OtherGamesXYZ/status/2047451585207578879?s=20')]
    },
    'yuga-daniel-arsham-presentation': {
        'notes': [
            'Daniel Arsham is a New York-based contemporary artist known for “fictional archaeology” work across sculpture, architecture, drawing, and film.',
            'Yuga Labs brings the web3 culture layer; Arsham brings fine-art credibility and a collector audience that reaches beyond gaming-native communities.',
            'Portfolio angle: this belongs high because it shows Other Games can support premium culture, art, and brand presentation moments, not just tournaments.'
        ],
        'links': [('Daniel Arsham', 'https://www.danielarsham.com/'), ('Perrotin artist profile', 'https://www.perrotin.com/en/artists/daniel-arsham'), ('Yuga Labs', 'https://yuga.com/')]
    },
    'fwog': {
        'notes': [
            'Fwog is a character-forward digital collectibles brand with a strong meme-native identity and community flywheel.',
            'The activation works because the asset reads instantly: a simple character, a recognizable vibe, and enough personality to travel socially.',
            'Portfolio angle: use this as proof that Other Games can take internet-native IP and make it feel alive inside an event wrapper.'
        ],
        'links': [('Fwogs', 'https://www.fwogs.com/'), ('Fwog on X', 'https://x.com/itsafwog'), ('Other Games Fwog post', 'https://x.com/OtherGamesXYZ/status/2045158370018197528?s=20')]
    },
    'moonbirds': {
        'notes': [
            'Moonbirds is a 10,000-piece PFP collection originally tied to PROOF, built around digital and IRL community access.',
            'The IP has since moved into the Orange Cap Games ecosystem, which keeps the brand connected to gaming and collector culture.',
            'Portfolio angle: Moonbirds is a recognizable blue-chip NFT name, so it earns priority as a brand-weight signal even when the activation itself is community-led.'
        ],
        'links': [('Moonbirds', 'https://moonbirds.com/'), ('PROOF Moonbirds archive', 'https://www.proof.xyz/moonbirds'), ('Other Games Moonbirds post', 'https://x.com/OtherGamesXYZ/status/2017297621484716205?s=20')]
    },
    'solana-gaming': {
        'notes': [
            'Solana is one of the largest high-throughput blockchain ecosystems, and its gaming vertical emphasizes speed, low fees, and consumer-scale asset activity.',
            'A Solana Gaming activation gives Other Games reach outside the Yuga/Otherside home base and into a broader web3 gaming ecosystem.',
            'Portfolio angle: this helps prove the studio is chain-agnostic enough to support major ecosystems, not just one community.'
        ],
        'links': [('Solana Gaming', 'https://solana.com/developers/gaming'), ('Solana games and entertainment', 'https://solana.com/solutions/gaming-and-entertainment'), ('Other Games Solana post', 'https://x.com/OtherGamesXYZ/status/1975234548712734983?s=20')]
    },
    'franky-metamask': {
        'notes': [
            'MetaMask is one of the most recognizable crypto wallets in the world, developed by Consensys and used as a primary access point for onchain apps.',
            'Franky the Frog brings character IP and community energy; MetaMask brings mainstream crypto infrastructure credibility.',
            'Portfolio angle: this is a strong collab card because it connects playful IP with an infrastructure brand almost every crypto user recognizes.'
        ],
        'links': [('MetaMask', 'https://metamask.io/'), ('Consensys', 'https://consensys.io/'), ('Franky the Frog', 'https://frankythefrog.com/'), ('Other Games collab post', 'https://x.com/OtherGamesXYZ/status/2024591118151942547?s=20')]
    },
    'apechurch': {
        'notes': [
            'ApeCoin is the native gas token for ApeChain and a core pillar around ApeChain, Bored Ape Yacht Club, and Otherside.',
            'Ape Church lands because it feels like a ritual for the Ape ecosystem: participatory, dramatic, and native to onchain gaming culture.',
            'Portfolio angle: strong proof that Other Games understands community religion, not just event logistics.'
        ],
        'links': [('ApeCoin', 'https://apecoin.com/'), ('ApeChain', 'https://apechain.com/'), ('Other Games Ape Church post', 'https://x.com/OtherGamesXYZ/status/2042304535008514510?s=20')]
    },
    'outbreak': {
        'notes': [
            'Outbreak works as a high-intensity original/community activation: the name, pacing, and visual language all point toward urgency and team participation.',
            'Compared with brand-heavy cards, this page should sell the format: Other Games can create its own event IP that feels like a campaign beat.',
            'Portfolio angle: keep it in the priority set because it demonstrates original programming and not only partner fulfillment.'
        ],
        'links': [('Other Games Outbreak post', 'https://x.com/OtherGamesXYZ/status/1969165031863390707?s=20'), ('Otherside', 'https://otherside.xyz/')]
    },
    'meebits-futbol': {
        'notes': ['Meebits is a 20,000-piece collection of generative 3D voxel avatars originally by Larva Labs, built for virtual worlds and display.', 'The futbol wrapper gave a recognizable NFT avatar brand a sports-culture activation hook.'],
        'links': [('Meebits', 'https://meebits.com/'), ('Other Games post', 'https://x.com/OtherGamesXYZ/status/2029612163736948956?s=20')]
    },
    'okay-bears-dead-king-society': {
        'notes': ['Okay Bears is a Solana-originated culture brand built around community, art, apparel, and action-oriented identity.', 'Pairing it with Dead King Society turns the page into a cross-community proof point rather than a single-collection event.'],
        'links': [('Okay Bears', 'https://okaybears.com/'), ('Other Games post', 'https://x.com/OtherGamesXYZ/status/2014793768063361176?s=20')]
    },
    'galactic-geckos-lucid': {
        'notes': ['Galactic Gecko Space Garage is a 10,000-piece NFT social adventure club with space-racing identity.', 'The Lucid pairing makes this useful as a crossover/community-collab proof point.'],
        'links': [('Galactic Geckos', 'https://galacticgeckos.io/'), ('Other Games post', 'https://x.com/OtherGamesXYZ/status/2012210279031971934?s=20')]
    },
    'arbinauts-arbitrum': {
        'notes': ['Arbitrum is a major Ethereum Layer 2 ecosystem focused on speed, low costs, and scalable onchain applications.', 'The Arbinauts activation adds ecosystem breadth beyond NFT collections and into chain/community programming.'],
        'links': [('Arbitrum', 'https://arbitrum.io/'), ('Arbitrum Foundation', 'https://arbitrum.foundation/'), ('Other Games post', 'https://x.com/OtherGamesXYZ/status/1987930647369814390?s=20')]
    },
    'cool-cats': {
        'notes': ['Cool Cats is a long-running NFT character brand centered on Blue Cat, animation, merch, and community worldbuilding.', 'This works as another recognizable blue-chip community activation lower in the grid.'],
        'links': [('Cool Cats', 'https://coolcats.com/'), ('Other Games post', 'https://x.com/OtherGamesXYZ/status/1996618986134679627?s=20')]
    },
    'mimu-on-ape': {
        'notes': ['MIMU On Ape is an Ape ecosystem character collection; OpenSea describes Monsters In My Universe as fan-fiction characters born of the Nexus.', 'This reads best as a character/community bridge into the broader Otherside and ApeCoin audience.'],
        'links': [('MIMU on OpenSea', 'https://opensea.io/collection/mimuonape'), ('Other Games post', 'https://x.com/OtherGamesXYZ/status/2055304517604843649?s=20')]
    },
}

def ts_array(values: list[str], indent: str = '    ') -> str:
    return '[\n' + ',\n'.join(f"{indent}  '{v}'" for v in values) + f'\n{indent}]'

def ts_links(values: list[tuple[str, str]], indent: str = '    ') -> str:
    return '[\n' + ',\n'.join(f"{indent}  {{ label: '{label}', href: '{href}' }}" for label, href in values) + f'\n{indent}]'

def strip_existing(obj: str) -> str:
    # Remove existing brandNotes / brandLinks blocks if rerun.
    for key in ['brandNotes', 'brandLinks']:
        marker = f"    {key}: ["
        while marker in obj:
            start = obj.index(marker)
            i = obj.index('[', start)
            depth = 0
            in_str = False
            quote = ''
            escaped = False
            end = None
            for j in range(i, len(obj)):
                ch = obj[j]
                if in_str:
                    if escaped: escaped = False
                    elif ch == '\\': escaped = True
                    elif ch == quote: in_str = False
                    continue
                if ch in ("'", '"', '`'):
                    in_str = True; quote = ch; continue
                if ch == '[': depth += 1
                elif ch == ']':
                    depth -= 1
                    if depth == 0:
                        end = j + 1
                        if end < len(obj) and obj[end] == ',': end += 1
                        if end < len(obj) and obj[end] == '\n': end += 1
                        break
            obj = obj[:start] + obj[end:]
    return obj

new_objects = []
for slug in ordered_slugs:
    obj = strip_existing(by_slug[slug])
    data = brand_data.get(slug)
    if data:
        insert = f"    brandNotes: {ts_array(data['notes'])},\n    brandLinks: {ts_links(data['links'])},\n"
    else:
        title_marker = "title: '"
        ti = obj.index(title_marker) + len(title_marker)
        title = obj[ti:obj.index("'", ti)]
        insert = (
            "    brandNotes: [\n"
            f"      '{title} is included as part of the broader Other Games activation archive: a community-facing proof point for live programming, partner support, and social-first gameplay moments.',\n"
            "      'This page is intentionally secondary to the headline brand cards, but it still shows repeatable activation infrastructure across the Otherside ecosystem.'\n"
            "    ],\n"
            "    brandLinks: [\n"
            "      { label: 'Otherside', href: 'https://otherside.xyz/' }\n"
            "    ],\n"
        )
    if '    gallery:' not in obj:
        raise RuntimeError(f'no gallery marker for {slug}')
    obj = obj.replace('    gallery:', insert + '    gallery:', 1)
    new_objects.append(obj)

new_body = '\n  ' + ',\n  '.join(new_objects) + '\n'
text = text[:arr_start + 1] + new_body + text[arr_end:]
path.write_text(text)
print(f'updated {len(new_objects)} activations')
print('priority order:', ', '.join(ordered_slugs[:11]))
