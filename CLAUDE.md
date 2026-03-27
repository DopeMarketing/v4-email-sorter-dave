# CLAUDE.md — V4 Email Sorter Dave

This is an intelligent email management system that automatically sorts Gmail messages, generates AI-powered responses, and sends SMS notifications for approval. Built for personal use with integrations to Gmail, HubSpot, Twilio, Slack, and OpenAI.

## Tech Stack
- Next.js 15 with App Router
- Supabase (database, auth, real-time)
- TypeScript (strict mode)
- Tailwind CSS
- Gmail API, Twilio, Slack, OpenAI, HubSpot

## Folder Structure

src/
├── app/                 # Next.js pages (server components by default)
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── emails/         # Email management pages
│   ├── responses/      # Response management
│   ├── notifications/  # Notification center
│   ├── settings/       # Configuration
│   └── api/           # API routes and webhooks
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── email/          # Email-specific components
│   └── forms/          # Form components
├── lib/                # Business logic and utilities
│   ├── email-classifier.ts
│   ├── response-generator.ts
│   ├── sms-service.ts
│   └── integrations/   # Third-party service clients
├── actions/            # Server actions (mutations only)
├── db/                 # Database queries and types
│   ├── queries/        # Data fetching functions
│   ├── mutations/      # Data modification functions
│   └── types.ts        # Database types
└── types/              # TypeScript type definitions


## Coding Conventions
- TypeScript strict mode enabled
- Server components by default (use 'use client' only when needed)
- All database access in /db directory
- Business logic in /lib and /actions only
- No API secrets in client components
- Conventional commit messages
- Export types from dedicated files

## Current State
This is a fresh scaffold with:
- ✅ Complete data model (12 tables)
- ✅ Route structure from site map
- ✅ Integration stubs for all services
- ✅ Basic UI components
- ✅ Database schema and RLS policies
- ⏳ No features implemented yet

## What to Build Next (v1 Features)
1. **Email classification system** - Auto-sort Gmail messages into priority levels and categories
2. **AI-powered draft response generator** - Create contextual email replies using OpenAI
3. **SMS notification system** - Send text alerts via Twilio with email summaries
4. **One-click approval interface** - SMS links for approving/rejecting responses
5. **Voice-to-text SMS editing** - Modify draft responses via voice messages
6. **Slack integration** - Urgent email notifications with inline approval buttons

## Never Touch
- .env files (ask for explicit instruction)
- Migration files (without explicit instruction)
- RLS policies (without review)
- Supabase config without backup

## How to Work on This Project
1. **Always read this file first** before making changes
2. **Run `npm run build`** before committing to catch errors
3. **Commit small and often** with conventional commit messages
4. **Document technical debt** explicitly when taking shortcuts
5. **Test integrations** with actual services when possible
6. **Mobile-first** - must work on mobile devices

## Key Integration Points
- Gmail API: Real-time email processing via webhooks
- Twilio: SMS notifications and voice-to-text
- OpenAI: Response generation and classification
- Slack: Team notifications and approvals
- HubSpot: Contact sync and CRM updates

## Data Flow
1. Gmail webhook receives new email
2. Email classifier determines priority/category
3. Response generator creates draft
4. SMS notification sent to user
5. User approves/rejects via SMS link
6. Approved response sent and logged
7. HubSpot contact updated