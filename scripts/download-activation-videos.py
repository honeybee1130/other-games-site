#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'activations'
TMP = ROOT / '.tmp' / 'activation-downloads'
OUT.mkdir(parents=True, exist_ok=True)
TMP.mkdir(parents=True, exist_ok=True)

items = [
    ('mimu-on-ape', 'https://x.com/OtherGamesXYZ/status/2055304517604843649?s=20'),
    ('bathroom-blitz', 'https://x.com/OtherGamesXYZ/status/2034619286984257698?s=20'),
    ('bani-the-rabbit', 'https://x.com/OtherGamesXYZ/status/2032125499020071167?s=20'),
    ('meebits-futbol', 'https://x.com/OtherGamesXYZ/status/2029612163736948956?s=20'),
    ('typical-tigers', 'https://x.com/OtherGamesXYZ/status/2027035456656040080?s=20'),
    ('moonbirds', 'https://x.com/OtherGamesXYZ/status/2017297621484716205?s=20'),
    ('okay-bears-dead-king-society', 'https://x.com/OtherGamesXYZ/status/2014793768063361176?s=20'),
    ('token-gators', 'https://x.com/OtherGamesXYZ/status/2013979232699896227?s=20'),
    ('galactic-geckos-lucid', 'https://x.com/OtherGamesXYZ/status/2012210279031971934?s=20'),
    ('chaos-trials', 'https://x.com/OtherGamesXYZ/status/2010698527567937793?s=20'),
    ('og-network', 'https://x.com/OtherGamesXYZ/status/2009652046073569299?s=20'),
    ('other-awards', 'https://x.com/OtherGamesXYZ/status/2004654566655299745?s=20'),
    ('nightglyder', 'https://x.com/OtherGamesXYZ/status/1999133002748563947?s=20'),
    ('cool-cats', 'https://x.com/OtherGamesXYZ/status/1996618986134679627?s=20'),
    ('flingers', 'https://x.com/OtherGamesXYZ/status/1994425881524162677?s=20'),
    ('dawn-of-the-ducks', 'https://x.com/OtherGamesXYZ/status/1991647222254170400?s=20'),
    ('arbinauts-arbitrum', 'https://x.com/OtherGamesXYZ/status/1987930647369814390?s=20'),
    ('geez-on-ape-1-year-anniversary', 'https://x.com/OtherGamesXYZ/status/1986582083213430880?s=20'),
    ('solana-gaming', 'https://x.com/OtherGamesXYZ/status/1975234548712734983?s=20'),
    ('og-x', 'https://x.com/OtherGamesXYZ/status/1971396918581281014?s=20'),
    ('outbreak', 'https://x.com/OtherGamesXYZ/status/1969165031863390707?s=20'),
    ('foxyfam', 'https://x.com/OtherGamesXYZ/status/1966181448198795614?s=20'),
]


def run(cmd: list[str], **kw) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, cwd=ROOT, text=True, capture_output=True, **kw)

results = []
for slug, url in items:
    final = OUT / f'{slug}.mp4'
    poster = OUT / f'{slug}.jpg'
    if final.exists() and poster.exists():
        results.append({'slug': slug, 'status': 'exists', 'bytes': final.stat().st_size})
        print(json.dumps(results[-1]), flush=True)
        continue

    raw_template = str(TMP / f'{slug}.%(ext)s')
    # Download a 720p-or-lower source to keep portfolio bundle reasonable.
    dl = run([
        'yt-dlp', '--no-playlist', '--quiet', '--no-warnings',
        '-f', 'bestvideo[height<=720]+bestaudio/best[height<=720]/best',
        '--merge-output-format', 'mp4', '-o', raw_template, url
    ], timeout=240)
    if dl.returncode != 0:
        # Retry once, X guest tokens are flaky.
        dl = run([
            'yt-dlp', '--no-playlist', '--quiet', '--no-warnings',
            '-f', 'bestvideo[height<=720]+bestaudio/best[height<=720]/best',
            '--merge-output-format', 'mp4', '-o', raw_template, url
        ], timeout=240)
    raws = sorted(TMP.glob(f'{slug}.*'), key=lambda p: p.stat().st_mtime, reverse=True)
    if dl.returncode != 0 or not raws:
        results.append({'slug': slug, 'status': 'download_failed', 'stderr': dl.stderr[-500:]})
        print(json.dumps(results[-1]), flush=True)
        continue
    raw = raws[0]

    # Silent, web-optimized H.264 MP4. Autoplay cards are muted; stripping audio saves a lot.
    enc = run([
        'ffmpeg', '-y', '-i', str(raw),
        '-vf', "scale='min(1280,iw)':-2",
        '-an', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '27',
        '-movflags', '+faststart', '-pix_fmt', 'yuv420p', str(final)
    ], timeout=240)
    if enc.returncode != 0:
        results.append({'slug': slug, 'status': 'encode_failed', 'stderr': enc.stderr[-500:]})
        print(json.dumps(results[-1]), flush=True)
        continue
    shot = run(['ffmpeg', '-y', '-ss', '1', '-i', str(final), '-frames:v', '1', '-q:v', '3', str(poster)], timeout=60)
    results.append({'slug': slug, 'status': 'ok', 'bytes': final.stat().st_size, 'poster': poster.exists()})
    print(json.dumps(results[-1]), flush=True)

print('SUMMARY ' + json.dumps(results, indent=2))
