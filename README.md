# LURK POS update

## Included changes
- Dark premium styling with green accents retained and adapted for desktop widths.
- Responsive table/product grids for desktop, tablet, and mobile.
- Product search in the order screen.
- Independent save debounce timers for each Supabase data key, preventing one state update from cancelling another key's pending save.
- Local Turkish calendar date calculation for daily/monthly views.
- Discount value clamped to the order subtotal and zero minimum.
- Consistent LURK branding in the page title, PWA manifest, and service-worker cache version.

## Apply safely
1. Make a backup or commit the current working GitHub version first.
2. Replace the matching files in the repository with the files in this folder.
3. Do not change the Supabase project or the `app_storage` table. This update continues to use the existing `lurk_t`, `lurk_o`, `lurk_l`, `lurk_m`, and `lurk_d` keys.
4. Install dependencies and run `npm run build` locally before deploying.
5. Deploy and test with the existing data before using it during service.

The current `HISTORY` seed list and the existing Supabase data format were intentionally left unchanged.
