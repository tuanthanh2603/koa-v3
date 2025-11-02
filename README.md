# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Email Configuration

To enable email notifications for contact form submissions, update the email configuration in `server/api/contact.post.ts`:

```typescript
const smtpHost = 'smtp.gmail.com'
const smtpPort = 587
const smtpUser = 'your-email@gmail.com' // Thay bằng email của bạn
const smtpPass = 'your-app-password' // Thay bằng app password
const toEmail = 'recipient@example.com' // Email nhận thông báo
```

### Gmail Setup

If using Gmail:
1. Enable 2-Step Verification on your Google account
2. Go to Google Account Settings > Security > App passwords
3. Generate an app-specific password
4. Use this password as `smtpPass`

### Other Email Providers

For other SMTP providers (Outlook, Yahoo, SendGrid, etc.), update `smtpHost` and `smtpPort` accordingly.
