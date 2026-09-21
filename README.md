# BuddyReview Email Generator

A React + Vite app for generating receipt and tax invoice request emails for BuddyReview.

## Getting Started

```sh
npm install
npm run dev
```

## Usage

1. Paste data from Excel/Sheets with these headers: `paymentName`, `campaignName`, `invoiceNo`, `email`, `invoiceUrl`, `paidDateTime`, `netAmount`.
2. Review and edit the details. Invoices are grouped by recipient name. The default deadline is the nearest Friday to today + 14 days and can be edited manually.
3. Preview the email, then use Copy Email, Copy Title, and Copy Content to paste into your email client.

Edit the email template in `src/utils/template.js` and deadline calculation in `src/utils/deadline.js`.

Run `npm run build` to build or `npm run lint` to check the code.
