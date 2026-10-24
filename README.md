# LURK POS update

## Included changes
- Dark premium styling with green accents retained and adapted for desktop widths.
- Responsive table/product grids for desktop, tablet, and mobile.
- Product search in the order screen.
- Independent save debounce timers for each Supabase data key, preventing one state update from cancelling another key's pending save.
- Local Turkish calendar date calculation for daily/monthly views.
- Discount value clamped to the order subtotal and zero minimum.
- Customer directory with search, saved-customer order links, purchase totals, and loyalty points based on collected payments.
- Credit ledger with order-on-credit, additional debt entries, partial cash/card collections, and outstanding-balance checks.
- Monthly sales report CSV export and a JSON backup download in Settings.
- Service-worker cache version bump so installed clients refresh updated app assets.
- Consistent LURK branding in the page title, PWA manifest, and service-worker cache version.

## Apply safely
1. Make a backup or commit the current working GitHub version first.
2. Replace the matching files in the repository with the files in this folder.
3. Do not change the Supabase project or the `app_storage` table. This update continues to use the existing `lurk_t`, `lurk_o`, `lurk_l`, `lurk_m`, and `lurk_d` keys.
4. Install dependencies and run `npm run build` locally before deploying.
5. Deploy and test with the existing data before using it during service.

## Data backup
Use **Ayarlar → Veri yedeği → Yedek İndir** to download a JSON backup of current tables, orders, reports, customers, credit ledger, menu, and day state. Store the file securely because it may contain customer and sales information. The backup action does not modify Supabase data.

In **Raporlar**, select a month and use **CSV** to export that month's order-level sales for spreadsheet analysis. The CSV includes subtotal, discount, total, cash/card amounts, credit sales, customer/table, and item lines.

The current `HISTORY` seed list and the existing Supabase data format were intentionally left unchanged.
