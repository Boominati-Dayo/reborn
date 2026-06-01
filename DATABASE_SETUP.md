# Database Setup Guide

## MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Choose a free tier (M0)
   - Select your preferred region
   - Wait for cluster to be created

3. **Create Database User**
   - Go to Database Access
   - Add a new database user
   - Set username and password (save these!)
   - Set privileges to "Atlas admin" or "Read and write to any database"

4. **Whitelist IP Address**
   - Go to Network Access
   - Add IP Address: `0.0.0.0/0` (for development) or your specific IP
   - For production, use specific IPs only

5. **Get Connection String**
   - Go to Database → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `reborn_babies`)

## Environment Variables

Create a `.env.local` file in the `webapp` directory with:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reborn_babies?retryWrites=true&w=majority

# EmailJS Configuration (for development)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ORDER_CONFIRMATION=your_template_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN_ALERT=your_template_id

# NextAuth Configuration (for admin portal)
NEXTAUTH_SECRET=generate_a_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# App Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Admin User (for seeding)
ADMIN_EMAIL=babybloomdoll@gmail.com
ADMIN_PASSWORD=changeme123
```

## Database Models

### Product
- Stores product information (name, price, images, attributes)
- Status: active, inactive, sold_out
- Featured products for homepage

### Order
- Stores order information
- Status flow: new → awaiting_deposit → paid → in_progress → shipped → completed
- Includes customer info, shipping, payment details
- Status history tracking

### Customer
- Stores customer information
- Links to orders

### GalleryItem
- Stores gallery images with tags and metadata

### AdminUser
- Stores admin users for admin portal
- Passwords are hashed with bcrypt

### ContentBlock
- Stores editable content (homepage text, FAQs, testimonials)
- Managed through admin portal

## Seeding Database

Run the seed script to create initial data:

```bash
npm run seed
```

Or manually:

```bash
npx tsx lib/scripts/seed.ts
```

This will create:
- Sample products
- Default admin user (change password after first login!)
- Initial content blocks

## Database Helpers

Use the helper functions in `lib/utils/db-helpers.ts`:

```typescript
import { getProducts, getProductBySlug, createOrder } from "@/lib/utils/db-helpers";

// Get all active products
const products = await getProducts({ status: "active" });

// Get product by slug
const product = await getProductBySlug("ella-realistic-newborn");

// Create an order
const order = await createOrder(orderData);
```

## Next Steps

1. Set up MongoDB Atlas
2. Add connection string to `.env.local`
3. Run seed script
4. Update product pages to use real data
5. Build order form to save to database

