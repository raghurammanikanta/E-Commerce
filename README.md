# EStore - Modern eCommerce Application

A complete, production-ready eCommerce application built with React, TypeScript, and modern web technologies.

## Features

### Core Functionality
- **Product Catalog**: Browse and search through products with advanced filtering
- **User Authentication**: Secure sign-up and sign-in with Supabase Auth
- **Shopping Cart**: Add, remove, and manage items with persistent state
- **Product Details**: Comprehensive product pages with images and specifications
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Experience
- **Modern UI**: Clean, professional design with smooth animations
- **Real-time Updates**: Instant feedback for user actions
- **Search & Filters**: Advanced product discovery capabilities
- **Mobile-First**: Responsive design that works on all devices

### Technical Features
- **Type Safety**: Full TypeScript implementation
- **State Management**: Redux Toolkit for predictable state updates
- **Performance**: Optimized bundle size and loading times
- **Authentication**: Secure user management with Supabase
- **Scalable Architecture**: Modular, maintainable codebase

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase credentials in the `.env` file.

4. Start the development server:
   ```bash
   npm run dev
   ```

### Supabase Setup

1. Create a new Supabase project
2. Copy your project URL and anon key to the `.env` file
3. The application will handle user authentication automatically

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI elements (Button, Input, Modal)
│   ├── layout/         # Layout components (Header, Footer)
│   └── product/        # Product-specific components
├── pages/              # Application pages/routes
├── store/              # Redux store and slices
├── hooks/              # Custom React hooks
├── lib/                # External service configurations
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Key Components

### Authentication
- Secure user authentication with Supabase
- Protected routes and user session management
- Form validation and error handling

### Product Management
- Product catalog with search and filtering
- Detailed product pages with image galleries
- Category-based navigation

### Shopping Cart
- Persistent cart state across sessions
- Quantity management and price calculations
- Seamless checkout flow

### State Management
- Redux Toolkit for global state
- Separate slices for different concerns
- Type-safe actions and selectors

## Development Features

### Code Quality
- ESLint configuration for code consistency
- TypeScript for type safety
- Modular component architecture

### Performance
- Lazy loading for images
- Optimized bundle splitting
- Efficient state updates

### User Experience
- Loading states and error handling
- Responsive design patterns
- Accessibility considerations

## Deployment

The application can be deployed to any static hosting service:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

### Recommended Hosting
- **Vercel**: Optimal for React applications
- **Netlify**: Great for static sites with serverless functions
- **Cloudflare Pages**: Fast global CDN

## Payment Integration

To add payment processing:

1. Sign up for a Stripe account
2. Install Stripe SDK: `npm install @stripe/stripe-js`
3. Implement checkout flow with Stripe Elements
4. Set up webhook endpoints for payment confirmation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.