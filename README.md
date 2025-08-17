# Personal Profile Builder

A Next.js 14 full-stack web application that allows users to create personal online profile pages with drag-and-drop editing capabilities.

## Features

### User Authentication
- Email/password authentication with Supabase Auth
- Sign-up, login, and forgot password functionality

### Onboarding Wizard
A 4-step onboarding process to set up user profiles:
1. Profile type selection (model, salesperson, freelancer, etc.)
2. Branding details (name, tagline, bio, logo/profile image)
3. Color palette and theme preferences
4. Content priority selection (bio, gallery, contact form, product list)

### Profile Page Generation
- Automatic creation of default profile pages from predefined templates
- Template selection based on onboarding answers

### Drag-and-Drop Page Editor
- Client-side drag-and-drop editor using GrapesJS
- Rearrange sections (About, Gallery, Services, Contact)
- Add/remove sections from a component library
- Edit text, images, colors, and fonts
- Live preview functionality

### Publishing
- Preview changes before publishing
- Published profiles hosted at `username.myapp.com` (subdomain)

### Database
- All user profile data and layout structure stored in Supabase Postgres

### Payments
- PayFast recurring subscription at R2000/year
- Automatic disabling of public access if payment fails

### Dashboard
- Profile editing capabilities
- Analytics tracking (page views, clicks)
- Subscription management

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS
- **Backend**: Supabase (Authentication, Storage, Database)
- **Editor**: GrapesJS
- **Deployment**: Vercel

## Database Schema

### Profiles
Stores user profile information including:
- Profile type
- Name, tagline, and bio
- Color preferences
- Content priorities

### Profiles Layouts
Stores layout data for user profiles:
- HTML, CSS, and JavaScript content
- Published status
- Versioning

### Subscriptions
Manages user subscriptions:
- Status (pending, active, cancelled, expired)
- Payment information
- Start and end dates

### Analytics
Tracks profile performance:
- Page views
- Click counts
- Date-based tracking

## API Routes

- `/api/analytics/page-view` - Track page views
- `/api/analytics/click` - Track clicks
- `/api/payfast/notify` - Handle PayFast payment notifications

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
PAYFAST_MERCHANT_ID=your_merchant_id
PAYFAST_MERCHANT_KEY=your_merchant_key
PAYFAST_PASSPHRASE=your_passphrase
PAYFAST_ENVIRONMENT=sandbox_or_live
```

## Deployment

1. Set up a Supabase project
2. Configure environment variables
3. Run database migrations
4. Deploy to Vercel

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Testing

The application includes comprehensive testing for all functionality including:
- Authentication flows
- Onboarding wizard
- Profile editing
- Payment processing
- Analytics tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.
