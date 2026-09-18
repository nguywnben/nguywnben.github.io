"""Render the approved banner composition directly at 4x, without screenshot compression."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, PngImagePlugin
import argparse, json

SOCIAL = Path(__file__).resolve().parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--language', choices=['en','vi'], required=True)
parser.add_argument('--fonts', type=Path, required=True, help='Directory containing GoogleSans-{400,500,600,700}.ttf')
parser.add_argument('--logos', type=Path, required=True, help='Directory containing openai-4x.png, anthropic-4x.png, google-4x.png (at least 100px)')
parser.add_argument('--output', type=Path, default=SOCIAL/'exports')
args = parser.parse_args()
args.output.mkdir(parents=True, exist_ok=True)
copy = json.loads((SOCIAL/'copy.json').read_text(encoding='utf-8'))[args.language]
ROOT = args.output
SCALE = 4
image = Image.new('RGB', (1200 * SCALE, 630 * SCALE), 'white')
draw = ImageDraw.Draw(image)

def box(x, y, width, height, fill='white', border=None, radius=0):
    rect = tuple(round(v * SCALE) for v in (x, y, x + width, y + height))
    draw.rounded_rectangle(rect, round(radius * SCALE), fill=fill, outline=border, width=SCALE)

def line(points, fill='#c9c9c9', width=1):
    draw.line([(round(x * SCALE), round(y * SCALE)) for x, y in points], fill=fill, width=round(width * SCALE))

def text(value, x, y, size, weight=400, fill='#111111', tracking=0):
    font = ImageFont.truetype(str(args.fonts / f'GoogleSans-{weight}.ttf'), round(size * SCALE))
    # Use an ascender anchor so accented letters share a stable baseline.
    if tracking:
        for i, char in enumerate(value):
            offset = font.getlength(value[:i]) + tracking * SCALE * i
            draw.text((round(x * SCALE + offset), round(y * SCALE)), char, font=font, fill=fill, anchor='la')
    else:
        draw.text((round(x * SCALE), round(y * SCALE)), value, font=font, fill=fill, anchor='la')
    return font.getlength(value) / SCALE + tracking * max(0, len(value) - 1)

def asset(path, x, y, size):
    with Image.open(path) as source:
        raster = source.convert('RGBA').resize((size * SCALE, size * SCALE), Image.Resampling.LANCZOS)
        image.paste(raster, (round(x * SCALE), round(y * SCALE)), raster)

def dot(x, y, size, color):
    draw.ellipse((round(x*SCALE),round(y*SCALE),round((x+size)*SCALE),round((y+size)*SCALE)), fill=color)

logo = SOCIAL.parent / 'assets' / 'logo.png'
asset(logo, 48, 44, 38)
text('Polaris', 97, 41, 32, 600, tracking=-1.28)
box(210,50,55,29,'white','#dedede',6)
text('1.0.0',220,55,14,500,'#666666')
text(copy['byline'], 929, 53, 12, 500, '#666666', 1.5)

text(copy['headline'][0], 48, 171, 61, 500, tracking=-2.44)
text(copy['headline'][1], 48, 242, 61, 500, '#666666', -2.44)
text(copy['intro'][0], 48, 340, 21, 400, '#666666')
text(copy['intro'][1], 48, 373, 21, 400, '#666666')
dot(48, 438, 5, '#137333')
text(copy['features'][0], 61, 428, 14, 400, '#444444')
dot(228, 438, 5, '#137333')
text(copy['features'][1], 241, 428, 14, 400, '#444444')

box(718, 148, 434, 329, '#fafafa', '#dedede', 12)
for offset, color in [(0, '#ff5f57'), (12, '#febc2e'), (24, '#28c840')]:
    dot(742 + offset, 169, 7, color)
text(copy['caption'], 969, 163, 9, 400, '#6b6b6b', .65)

line([(816,303),(859,303)], width=1.5)
line([(959,303),(990,303)], width=1.5)
line([(990,233),(990,373)], width=1.5)
for y in (233,303,373):
    line([(990,y),(1014,y)], width=1.5)
box(742,262,74,82,'white','#dddddd',7)
text('>_',766,276,24)
text(copy['tools'],751,313,11)
box(859,240,100,126,'white','#dddddd',10)
asset(logo,885,263,47)
text('Polaris',878,320,19,500,tracking=-.4)
for name, label, top in [('openai','OpenAI',209),('anthropic','Anthropic',279),('google','Google',349)]:
    box(1014,top,114,48,'white','#dddddd',7)
    asset(args.logos / f'{name}-4x.png',1023,top+11,25)
    text(label,1055,top+15,12)
line([(742,430),(1128,430)],'#e6e6e6')
dot(742,449,5,'#137333')
text(copy['note'],754,441,11,400,'#666666')

line([(48,540),(1152,540)],'#e7e7e7')
text('23',48,566,19,500)
text(copy['providers'],76,571,15,400,'#666666')
text('15',208,566,19,500)
text(copy['languages'],236,571,15,400,'#666666')
text('nguywnben.github.io/polaris',889,565,17,500)
line([(1135,587),(1149,573)],'#111111',1.5)
line([(1141,573),(1149,573),(1149,581)],'#111111',1.5)

metadata = PngImagePlugin.PngInfo()
metadata.add_text('Description', f'Polaris 1.0.0 social banner ({args.language}); rendered directly from Google Sans, source logos and vector geometry at 4x. Copy: polaris/social/copy.json. No generative imagery.')
metadata.add_text('Source', 'https://github.com/nguywnben/polaris/tree/v1.0.0; provider logo attribution in polaris/social/README.md')
image.save(ROOT / f'polaris-1.0.0-{args.language}-4800x2520.png', optimize=True, pnginfo=metadata)
image.resize((2400,1260),Image.Resampling.LANCZOS).save(ROOT / f'polaris-1.0.0-{args.language}-2400x1260.png', optimize=True, pnginfo=metadata)
image.resize((1200,630),Image.Resampling.LANCZOS).save(ROOT / f'polaris-1.0.0-{args.language}-preview.png', optimize=True, pnginfo=metadata)
print('Rendered from fonts, paths and original logos at 4800 x 2520.')
