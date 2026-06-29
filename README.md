# transfemme-tailoring

**Transfemme Tailoring** — a first-person build log for converting an inherited
masc formalwear capsule (two pairs of dress pants, two collared shirts, a few
boxy vests, two coats from three-piece suits) into a well-fitted *feminine*
wardrobe for an athletic body, with interactive alteration calculators to do the
fitting math.

This lab notebook covers machine setup + a treadle restoration log, the tool
bill-of-materials, fitting theory and measurements, and stepwise per-garment
guides for pants, shirts, vests and coats. A static SvelteKit SPA built from
[`tinyland-inc/site.scaffold`](https://github.com/tinyland-inc/site.scaffold),
published to GitHub Pages at **https://jesssullivan.github.io/transfemme-tailoring/**;
the pages carry interactive Svelte 5 alteration calculators, and **this README is
the source-of-record** for hardware, measurements, and citations.

> It's a learning notebook, not a tailoring authority. Verify against the linked
> sources and your own garment before you cut. The cardinal rule on every page:
> **baste and fit before you ever take scissors to wool.**

## Quick start

```sh
just setup     # pnpm install (inside the Nix devshell)
just dev       # vite dev server
just build     # static build into ./build  (BASE_PATH=/transfemme-tailoring)
just preview   # local production preview
```

`just` is the single entrypoint (inside `nix develop`, auto-loaded by `direnv`) —
see `just --list`.

## What's here

| Path | What |
| --- | --- |
| `src/routes/+page.svelte` | Overview / build-log landing |
| `src/routes/machine/+page.svelte` | Machine setup (6600C) + the treadle restoration log |
| `src/routes/tools/+page.svelte` | Tools & BOM — owned, mismatched, consumables, still-needed |
| `src/routes/fitting/+page.svelte` | Fitting theory, measurements, and all five calculators |
| `src/routes/pants/+page.svelte` | Dress pants — waist suppression, knee-down taper, re-hem |
| `src/routes/shirts/+page.svelte` | Dress shirts — back darts, curved sides, one-pass sleeve |
| `src/routes/vests/+page.svelte` | Vests — concave sides, front contour dart, back buckle |
| `src/routes/coats/+page.svelte` | Suit coats — advanced, in order, with the DIY-vs-pro line |
| `src/lib/components/calc/WaistTakeInDistributor.svelte` | Split total waist intake across CB / sides / darts |
| `src/lib/components/calc/DartBuilder.svelte` | Contour (fish-eye) dart width + vanish points |
| `src/lib/components/calc/TaperCalculator.svelte` | Sleeve/leg taper offsets at two heights |
| `src/lib/components/calc/HemCuffMarker.svelte` | Hem / turn-up cuff fold + cut lines |
| `src/lib/components/calc/SeamReserveCheck.svelte` | Go/no-go width + let-out reserve before cutting |
| `src/lib/calc/format.ts` | Shared cm rounding / inch echo |

## The machine — Route: `/machine`

The **working** machine is a computerized **SINGER 6600C** (zigzag, six one-step
buttonholes, machine blind hem, stretch stitches, power through stacked wool).
The **1800s treadle Singer** is a *restoration project, not yet a working
machine* — it earns its own log, not the technique frame.

Treadle essentials: a treadle head is **straight lockstitch only** (no zigzag, no
buttonholer, often no reverse). Date it by the serial stamped on the bed boss via
ISMACS; identify the model by bobbin/hook + decals (**Lotus / Red Eye** = 66;
**Sphinx** = 27/127/28/128; the 15 by its **left-faceplate** tension + removable
vertical case; full rotary = 201). Oil with proper sewing-machine oil only, one
drop per point — **oil-only, never grease** an all-metal treadle; never ammonia
on the gold decals; never soak the whole head.

**The corrected tension rule (tug-of-war):** a balanced lockstitch knots in the
*middle* of the layers. Bobbin/under-thread dragged up onto the **top** = top
tension too **tight** → *loosen* the top dial. Top thread looping on the
**underside** = top too **loose** → *tighten* the top dial.

**Per-model needle orientation:** 66/99 flat to the **right** (groove left, thread
left→right); 15 and 201 flat to the **left**. Universal rule: groove + threading
face *away* from the hook, the scarf faces *toward* it. 15/66/201 take 15×1/HA×1;
127/128 take round-shank 127×1.

## Tools & BOM — Route: `/tools`

**Owned:** the 6600C; an 8.5″ bent-shear set + detail scissors + snips; four seam
rippers; a self-healing mat + rotary cutter (straight trims only); Singer oil; and
the in-restoration treadle.

**Owned but mismatched for fine formalwear:** bonded-nylon **upholstery thread**
(too heavy/stiff; melts under a wool press — heavy repairs only; use fine
all-purpose poly for seams) and **2″ T-pins** (too thick for shirting/lining — form
and heavy-coat layers only; use fine 0.5 mm glass-head pins).

**Still needed — the priority gap is pressing** (pressing is ~half of tailoring):
a tailoring steam iron, a sturdy board/table + wool mat, a tailor's ham, a sleeve
board, a wooden clapper, a press cloth, and pinking shears / a pinking-blade rotary
(a straight rotary blade does **not** pink). Plus consumables: fine poly + silk
thread, fine pins, chalk/tracing tools, hand + machine needles, twill/stay tape,
fusible + sew-in interfacing, beeswax, binding + Fray-Check, spare bobbins, spare
buttons + thin pads.

## Fitting theory & measurements — Route: `/fitting`

A feminine fit carries more total **waist suppression** with a higher, sharper
waist; distributes it into vertical shaping lines (princess seams, darts), not just
side seams; uses a **higher, smaller, closer-cut armscye** (never a lowered one —
deepening a finished armhole is irreversible and reads boxy); and reduces ease.

**Athletic-build adjustments:** you can't narrow load-bearing shoulders, so
**maximize waist contrast**; **back-load** the suppression (CB seam + back darts);
**clear the flexed bicep and thigh** (taper sleeves elbow-to-wrist and legs
knee-to-hem only); keep or flare the hip; treat worn forms/pads as body
measurements (add/deepen a dart or let out the side seams — *not* flat-pattern
slash-and-spread on a finished garment).

**The distribution math:** total to remove = garment waist − (body waist + ease);
a default athletic split is CB ~15–25% / two side seams ~25–35% / darts ~45–60%.
A **seam removes 2× its marked offset**; a **dart removes its full pinched width**;
keep any single dart ≤ ~2.5–3 cm. The five calculators on `/fitting` do this math.

## Per-garment guides

- **Pants — Route: `/pants`** — care-label-gated preshrink; take in along the
  inseam/outseam *seam lines* (not the leg crease); taper **knee-to-hem only**;
  hand blind hem.
- **Shirts — Route: `/shirts`** — two back darts + a curved side seam (diagnose
  placket gape first — a dart adds shape, not girth); one-pass side+sleeve; **dart
  tips hand-tied, never backtacked**; shorten sleeves from the cuff.
- **Vests — Route: `/vests`** — take width at the **sides**, not by over-cinching
  the buckle; front contour dart; pinking shears / Hong-Kong bind (not a straight
  rotary); hand-worked or relocated buttons.
- **Coats — Route: `/coats`** — strict order (open lining → CB → side-back/side →
  fit → shoulders/pads → sleeves → hem → re-line); **skive pads** over full
  removal; alter the lining in parallel with the shell. The pro line: canvas/
  chest-piece, armhole re-cut, true shoulder-width reduction.

## Safety & care

- **Preshrink to the care label.** Poly / poly-blend: wash + tumble LOW. Wool,
  wool-blend, silk, or dry-clean-only: **steam only — never tumble-dry** (it felts
  and shrinks irreversibly, ruining the cloth before any sewing).
- **Press cloth always** on wool/dark/fused fabric; test heat on a hidden seam
  first (poly = LOW; wool ≈ 150 °C / 300 °F with steam), press-and-lift, set with a
  clapper.
- **Baste and fit before any irreversible trim;** sew *inside* the old seam, keep
  the full allowance, and trim only after the fit is locked. Take wool in
  conservatively, in stages — letting it back out later shows old needle holes and
  press-shine.
- On a straight-stitch machine, secure seam ends by overlap or hand-tie (no
  reverse), and finish raw edges without a serger (pink / turn-and-stitch /
  Hong-Kong / hand overcast).

## Sources

Verified links are live; where a specific link couldn't be verified this is noted
with a channel/author + an exact search query instead of a guessed URL.

**Machine restoration & ID**
- ISMACS — [Singer serial-number database](https://ismacs.net/singer_sewing_machine_company/serial-numbers/singer-sewing-machine-serial-number-database.html) and [dating by serial number](https://ismacs.net/singer_sewing_machine_company/singer_dating_by_serial_number.html) (date + identify).
- ISMACS — [free manuals list](https://ismacs.net/free-sewing-machine-manuals-list.html) and [Singer manuals](https://ismacs.net/singer_sewing_machine_company/manuals/singer-sewing-machine-manuals.html).
- TreadleOn — [cleaning & lubricating a machine head](https://www.treadleon.net/sewingmachineshop/cleaningmachines/cleaningmachines.html) (freeing seized heads; what NOT to use on decals).
- [Care for your sewing machine](https://www.vintagesingerparts.com/pages/care-for-your-sewing-machine) · Singer Featherweight Shop — [how & where to oil](https://singer-featherweight.com/blogs/schoolhouse/how-and-where-to-oil-a-singer-featherweight-221-sewing-machine).
- Mother Earth News — [how to care for a treadle sewing machine](https://www.motherearthnews.com/homesteading-and-livestock/treadle-sewing-machine-zmaz75mazgoe/) ("never grease the treadle").
- Treadle belt: [Sewing Parts Online](https://www.sewingpartsonline.com/blogs/education/how-to-replace-a-treadle-belt) · [Free Motion Project tutorial](https://freemotionproject.com/2019/08/treadle-belt-replacement-tutorial/) · video — [Leah Day, belt replacement](https://www.youtube.com/watch?v=lXEoZIBserE).
- Video — [restoring an old Singer treadle](https://www.youtube.com/watch?v=KnQov2Hd4n4) · [full restoration playlist](https://www.youtube.com/playlist?list=PLvMiSXVe23_7I5MASpwVJo1Yp6ZDv856D).
- *Search* Internet Archive for "A Manual of Family Sewing Machines" (Singer 15/66/99/201) — prior identifier didn't match the title; verify before citing.

**Threading & tension**
- Craftcore — [how to thread the Singer 66](https://www.craftcore.ca/2018-07-07-how-to-thread-the-singer-66-and-prepare-to-sew/).
- Old Singer Sewing Machine Blog — [which way the bobbin goes](https://oldsingersewingmachineblog.com/2012/02/01/which-way-round-does-the-bobbin-go-in-a-vintage-singer/) (confirms anti-clockwise feed).

**Needles & thread**
- Threads — [machine needle know-how](https://www.threadsmagazine.com/project-guides/learn-to-sew/machine-needle-know-how) · [Sewing.org needle charts (PDF)](https://www.sewing.org/files/guidelines/22_115_sewing_machine_needle_charts.pdf).

**Pressing & edge finishing**
- Seamwork — [how to use every pressing tool](https://www.seamwork.com/sewing-tutorials/how-to-use-every-pressing-tool) and [5 seam finishes without a serger](https://www.seamwork.com/sewing-tutorials/5-professional-seam-finishes-you-can-make-without-a-serger).
- Video — [pressing with a tailor's clapper (Angela Wolf)](https://www.youtube.com/watch?v=YsFy8wgHabQ).

**Pants**
- [Let's Learn to Sew — take in pant legs](https://letslearntosew.com/how-to-take-in-pant-legs-making-pants-slimmer-in-the-legs/) · [Fabrics-Store — how to take in your pants](https://blog.fabrics-store.com/2023/05/21/how-to-take-in-your-pants/) · [He Spoke Style — suit pants 101](https://hespokestyle.com/suit-pants-alterations-tailoring-guide/).
- [Pin Cut Sew — hem pants with an invisible hem stitch](https://www.pincutsewstudio.com/blog/2020/12/15/how-to-hem-dress-pants-invisible-hem-stitch-tutorial) · [Professor Pincushion — blind stitch](https://www.professorpincushion.com/professorpincushion/blind-stitch/) · [PatternReview — fitting for large quads](https://sewing.patternreview.com/SewingDiscussions/topic/80575).
- Video — [how to taper pant legs](https://www.youtube.com/watch?v=rAPKsG-1Hds).

**Shirts**
- [Melly Sews — make a shirt smaller](https://mellysews.com/make-big-shirt-smaller/) · Tapered Menswear — [darting a shirt](https://taperedmenswear.com/blogs/tapered-blog/darting-a-shirt) and [tailor a shirt](https://taperedmenswear.com/blogs/tapered-blog/how-to-tailor-a-shirt).
- [Heather Handmade — add back darts](https://www.heatherhandmade.com/how-to-add-back-darts-to-a-dress/) · [Closet Core — sew darts perfectly](https://blog.closetcorepatterns.com/bodice-fitting-5-how-to-sew-darts-perfectly-every-time/) · [Permanent Style — darts in shirts](https://www.permanentstyle.com/2008/05/how-to-put-darts-in-your-shirts.html).
- Video (URL verified, uploader unconfirmed) — [slim shirts with darts](https://www.youtube.com/watch?v=YwWF_TfSogQ) · [add darts to any dress shirt](https://www.youtube.com/watch?v=aLRaKi3hfl0) · [joining sleeves & side seams in one](https://www.youtube.com/watch?v=sXDYZDubAWo).
- *Search* "Evelyn Wood refashion men's shirt into blouse" (@Evelyn__Wood).

**Vests**
- [Sewing Is Cool — alter a vest smaller/bigger](https://sewingiscool.com/how-to-alter-a-vest-to-make-it-smaller/) — *cite for the side-seam math only*; its one-pass shell+lining method is inferior to separate passes.
- [Threads — tucks, darts & curved seams on finished garments](https://www.threadsmagazine.com/2021/01/20/apply-tucks-darts-and-curved-seams-for-a-shapely-fit-on-finished-garments).
- The Sew Show with Shae — [best way to take in a suit jacket (Ep. 10)](https://www.youtube.com/watch?v=NjQVRGpwxtE) (transfers to vests) · [suit-alterations series](https://sewshowwithshae.com/suit-alterations) · [adding Dritz vest buckles](https://www.youtube.com/watch?v=1oRoyNrm6wc).

**Coats / jackets**
- [Gentleman's Gazette — what a tailor can & can't do](https://www.gentlemansgazette.com/suit-alterations-what-a-tailor-can-do/) (the DIY-vs-pro line) · [Articles of Style — guide to suit alterations](https://articlesofstyle.com/blogs/news/a-guide-to-suit-alterations).
- [Closet Core — fit a tailored jacket](https://blog.closetcorepatterns.com/how-to-fit-a-tailored-jacket-or-blazer-fit-adjustments-for-the-jasika-blazer/) · [Tallgrass Tailor — add darts to a suit jacket](https://tallgrasstailor.com/blog/suit-tailoring-series-add-darts-to-a-suit-jacket) · [Upstyle — men's blazer → women's fitted blazer](https://www.upstyledaily.com/diy/coats-jackets/decorate-restyle-or-refashion/fitted-blazer-44327797).
- The Sew Show with Shae — [shoulders (Ep. 37)](https://www.youtube.com/watch?v=a4c_HNtQNlU) · [hem jacket sleeves (Ep. 47)](https://www.youtube.com/watch?v=2jF2oE10lKI). Take in the back seam — [tutorial](https://www.youtube.com/watch?v=XpUR8K02rYc). Lined blazer take-in — [Evelyn Wood](https://www.youtube.com/watch?v=ECQNDjKBY_A).
- Shoulder pads — [remove pads](https://www.youtube.com/watch?v=vp9FaLRBBBA) · [remove quickly / slim shoulders](https://www.youtube.com/watch?v=29T1NCWKO-A). Sleeves — [full tailor's method](https://www.youtube.com/watch?v=4OyeWHrHZr4) · [fake-buttonhole sleeves](https://www.youtube.com/watch?v=CS11zigS7XU) · [lined sleeves (Anastasia Chatzka)](https://www.youtube.com/watch?v=YX1fpuCSuKs). Hand seams — [Bernadette Banner](https://www.youtube.com/watch?v=39C_oYPgTpY).

**Fitting theory & trans-specific**
- [The Trans Sewing Project](https://transsewingproject.wordpress.com/) · [TransVitae — DIY alterations for trans women](https://www.transvitae.com/diy-clothing-alterations-for-trans-women-a-step-by-step-guide/).
- Channels — [Made to Sew](https://www.youtube.com/user/madetosew) · [Professor Pincushion](https://www.youtube.com/channel/UC2QSX1z7lvF3bWXv6sK0UXw) · [Bernadette Banner](https://www.youtube.com/channel/UCSHtaUm-FjUps090S7crO4Q).
- [Threads — taper a sleeve](https://www.threadsmagazine.com/2016/09/30/video-taper-a-sleeve-for-a-narrower-silhouette) (Insider login may be required; live title "Learn to Taper Sleeves – Long or Short!").
- *Search* "Made to Sew take in trousers waist", "Professor Pincushion blind hem stitch by hand", "trans women suit alteration feminize fit".

**Books** (no single canonical URL verified)
- Cabrera & Antoine — *Classic Tailoring Techniques* (Menswear, ISBN 9781628921700; and the Women's Wear 2nd ed.) — explains canvas/chest-piece, i.e. what *not* to cut into.
- Palmer & Alto — *Fit for Real People* (tissue-fitting, FBA, full-bicep & full-thigh adjustments).
- Winifred Aldrich — *Metric Pattern Cutting for Womenswear* · *Vogue Sewing* · Alison Smith — *The Dressmaking Book* · Singer/Creative Publishing — *Tailoring: The Classic Guide…* · Bernadette Banner — *Make, Sew and Mend*.

## License & honesty

Content is a personal build log — experimental, and I am learning; verify against
the linked sources and your own garments before cutting. Code is MIT (see
`LICENSE`).

**Repo posture (honest notes).** This is a personal static spoke spawned from
`tinyland-inc/site.scaffold` with the **full** scaffold toolchain (Bazel + Nix +
pnpm + Flywheel binding), but it deploys to **personal GitHub Pages**, not the
tinyland-inc fleet. The org-only surfaces (`tofu/`, Blahaj lane-env, pulse-ingest,
the `ci-templates` reusable workflow) are carried **documented-but-dormant** and
never wired live — see `AGENTS.md`. CI is a self-contained Nix + `just` workflow;
this intentionally diverges from the scaffold's `ci-templates` SemVer-pin
conformance item (a documented deviation, not silent drift). Bazel is the
dependency source-of-truth; the `@tummycrypt/*` npm entries are exact-pinned
compatibility edges. Phase 2 is the GloriousFlywheel cache-first remote
build/test uplift.
