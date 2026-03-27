# V4 Email Sorter Dave

Intelligent email management system that sorts your emails, generates responses, and sends approval notifications via SMS.

## What this project does

V4 Email Sorter Dave is a personal email management assistant that automatically sorts incoming Gmail messages by priority and category, generates AI-powered draft responses, and sends SMS notifications for approval. Built for individuals who need to stay on top of their email workflow while maintaining quality communication.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Real-time)
- **Integrations**: Gmail API, HubSpot, Twilio, Slack, OpenAI GPT
- **Automation**: Zapier, Make.com
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm
- Supabase CLI
- Gmail account with API access
- Twilio account for SMS
- OpenAI API key

## Local Development Setup

bash
# Clone the repository
git clone <repository-url>
cd v4-email-sorter-dave

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start Supabase locally
npx supabase start

# Run development server
npm run dev


Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `GMAIL_CLIENT_ID` | Gmail API client ID | Yes |
| `GMAIL_CLIENT_SECRET` | Gmail API client secret | Yes |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | Yes |
| `TWILIO_AUTH_TOKEN` | Twilio authentication token | Yes |
| `TWILIO_PHONE_NUMBER` | Twilio phone number for SMS | Yes |
| `OPENAI_API_KEY` | OpenAI API key for GPT responses | Yes |
| `HUBSPOT_API_KEY` | HubSpot API key | Optional |
| `SLACK_BOT_TOKEN` | Slack bot token | Optional |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |

## Database Setup

The database schema is automatically applied when you start Supabase locally. For production:

bash
# Apply migrations to production
npx supabase db push


## Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Project Structure


src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── lib/                # Business logic and utilities
├── actions/            # Server actions
├── db/                 # Database queries and types
├── types/              # TypeScript type definitions
supabase/
├── migrations/         # Database migrations
└── config.toml        # Supabase configuration
