# Bilder i T & J Dejter

Bilderna är tematiska inspirationsbilder. Utflyktsbilderna utger sig inte för att visa den namngivna platsen. Alla bilder ligger i `public/images/`, serveras från appens egen basväg och cachas av PWA:n.

## Genererade bilder

Skapade med det inbyggda `image_gen`-verktyget, därefter konverterade till JPEG för appen. Ingen API-/CLI-fallback användes.

### `public/images/cover.jpg`

Slutlig prompt:

> Use case: photorealistic lifestyle editorial. Asset type: wide cover photograph for a private Swedish couples adventure app, not a UI mockup. Primary request: beautiful authentic cinematic Nordic mountain landscape with a winding hiking trail leading toward a calm lake and rounded Scandinavian mountain peaks, soft birch trees and green moss in foreground, two tiny adult hikers walking side by side seen from far behind in the middle distance. Style: premium travel magazine documentary photography, fine natural texture, understated colors, not fantasy. Composition: landscape wide image, big open scenic area, hikers very small, no identifiable faces, no text or lettering. Lighting: warm late-afternoon natural sunlight, subtle haze, fresh and inviting. Palette: olive green, muted pine, warm ivory sunlight, blue-grey lake. Avoid logos, watermarks, oversaturated colors, text, collages, UI, dramatic alpine spikes. This is illustrative inspiration, no need to represent a specific actual location.

### `public/images/heritage.jpg`

Slutlig prompt:

> Use case: photorealistic lifestyle editorial. Asset type: photographic card cover for historic outings in a Swedish couples travel app. Create one premium documentary style photograph of a small Scandinavian country manor: cream-colored 18th century stucco facade, symmetrical windows, modest stone entrance steps, surrounded by old leafy trees, a gravel path and a wild lawn with a few flowers, warm early autumn afternoon, inviting and serene. An imaginary place, not any actual named manor. Landscape composition, building in middle distance seen through the foliage, wide breathing room, subtle muted moss green, cream and warm grey colors. Photorealistic, natural fine texture, not illustration, not grandiose palace, no mountains, no text, no logos, no collage, no UI.

### `public/images/food.jpg`

Slutlig prompt:

> Use case: photorealistic lifestyle editorial. Asset type: landscape food photograph for activity cards in a Swedish couples app. Create a premium, inviting magazine food photograph of a simple LCHF / low-carbohydrate high-protein dinner for two. Two matte cream ceramic plates on a warm oak table: grilled salmon fillets, roasted broccoli, sauteed mushrooms, a few avocado slices and leafy greens, small separate bowls of herb sauce. Natural linen napkins, two plain water glasses. Warm evening window light, understated sage and warm ivory palette, delicious natural textures, relaxed Scandinavian home dinner atmosphere. Landscape composition, close view with plates arranged diagonally and nothing cut off awkwardly, photograph not illustration. Strict exclusions: NO bread, rice, potatoes, pasta, noodles, couscous, chickpeas, beans, grains, sugary desserts, fruit juice, text, letters, logos, watermarks, collages, or UI. No people or hands. This is an illustrative thematic image, not a calculated recipe.

## Fotografier

Övriga JPG-filer kommer från Unsplash. Ursprungliga bildadresser finns i `public/images/credits.json`. Se [Unsplashs licens](https://unsplash.com/license). Ingen extern bildtjänst anropas när appen används.
