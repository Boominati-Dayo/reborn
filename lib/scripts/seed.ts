/**
 * Seed script for initial database setup
 * Run with: npx tsx lib/scripts/seed.ts
 * Or add to package.json scripts
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

import connectDB from "@/lib/db/mongodb";
import Product from "@/lib/models/Product";
import AdminUser from "@/lib/models/AdminUser";
import ContentBlock from "@/lib/models/ContentBlock";

async function seed() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Seed Products
    const products = [
      {
        name: "Ella - Realistic Newborn",
        slug: "ella-realistic-newborn",
        price: 1200,
        description:
          "Meet Ella, a beautifully crafted reborn silicone baby designed with intricate details to mimic a real newborn.",
        detailedDescription:
          "Ella is a full-body silicone baby, meticulously sculpted and painted by hand. She features rooted mohair, realistic skin tones, subtle veining, and delicate fingernails.",
        materialsAndCare:
          "Crafted from platinum cure silicone, known for its durability and realistic feel.",
        shippingInfo:
          "All reborn babies are shipped securely in custom packaging to ensure their safe arrival.",
        images: [],
        attributes: {
          hairColor: "Blonde",
          eyeColor: "Blue",
          size: "19 inches",
          gender: "Female",
        },
        rating: 4.9,
        reviewCount: 120,
        status: "active" as const,
        featured: true,
      },
      {
        name: "Liam - Peaceful Sleeper",
        slug: "liam-peaceful-sleeper",
        price: 1350,
        description: "A peaceful sleeping baby with realistic features.",
        images: [],
        attributes: {
          hairColor: "Brown",
          eyeColor: "Green",
          size: "20 inches",
          gender: "Male",
        },
        status: "active" as const,
        featured: true,
      },
    ];

    for (const productData of products) {
      const existing = await Product.findOne({ slug: productData.slug });
      if (!existing) {
        await Product.create(productData);
        console.log(`Created product: ${productData.name}`);
      } else {
        console.log(`Product already exists: ${productData.name}`);
      }
    }

    // Seed Admin User (change password after first login!)
    const adminEmail = process.env.ADMIN_EMAIL || "babybloomdoll@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";

    const existingAdmin = await AdminUser.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await AdminUser.create({
        email: adminEmail,
        password: adminPassword, // Will be hashed by pre-save hook
        name: "Admin User",
        role: "super_admin",
      });
      console.log(`Created admin user: ${adminEmail}`);
      console.log(`⚠️  IMPORTANT: Change the default password!`);
    } else {
      console.log(`Admin user already exists: ${adminEmail}`);
    }

    // Seed Content Blocks
    const contentBlocks = [
      {
        key: "homepage_hero_title",
        type: "text" as const,
        title: "Hero Title",
        content: "Discover Our Lifelike Reborn Baby Collection",
        active: true,
        order: 1,
      },
      {
        key: "homepage_about_title",
        type: "text" as const,
        title: "About Section Title",
        content: "Crafting Dreams, One Baby at a Time",
        active: true,
        order: 2,
      },
    ];

    for (const blockData of contentBlocks) {
      const existing = await ContentBlock.findOne({ key: blockData.key });
      if (!existing) {
        await ContentBlock.create(blockData);
        console.log(`Created content block: ${blockData.key}`);
      }
    }

    console.log("✅ Seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();

