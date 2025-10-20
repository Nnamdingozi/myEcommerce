
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Heart, ShieldCheck, Truck, Users } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="bg-background text-foreground">
      {/* --- Hero Section --- */}
      <div className="relative h-80">
        <Image
          src="/images/ngoo.jpg" // Assuming this is a team or storefront image
          alt="Our Team at Family Shop"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">About FamilyShop</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Your one-stop destination for a seamless online shopping experience, tailored for every member of the family.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* --- Our Mission Section --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Mission</div>
            <h2 className="text-3xl font-bold tracking-tight">Making Shopping Convenient & Enjoyable</h2>
            <p className="text-muted-foreground text-lg">
              At FamilyShop, our mission is to make online shopping accessible and delightful for everyone. We strive to create a platform where every visitor feels valued and finds exactly what they need at competitive prices, all from the comfort of their home.
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden">
             <Image
                src="/images/img-2.jpg" // Use a relevant, vibrant image
                alt="Happy family shopping online"
                layout="fill"
                objectFit="cover"
             />
          </div>
        </div>

        <Separator className="my-16" />

        {/* --- Why Choose Us Section (Feature Cards) --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Us?</h2>
          <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
            We're committed to providing an unparalleled shopping experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Heart className="h-8 w-8 text-primary" />}
            title="Wide Product Range"
            description="A thoughtfully curated collection of products to suit all tastes and preferences."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-8 w-8 text-primary" />}
            title="Secure Shopping"
            description="Robust security measures to protect your personal data and transaction information."
          />
          <FeatureCard
            icon={<Truck className="h-8 w-8 text-primary" />}
            title="Fast Delivery"
            description="Ensuring your purchases reach your doorstep quickly and efficiently, wherever you are."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-primary" />}
            title="Outstanding Support"
            description="Our friendly and knowledgeable team is always ready to assist with any of your queries."
          />
        </div>

        <Separator className="my-16" />

        {/* --- Our Vision & Closing --- */}
        <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-4">Our Vision</div>
            <h2 className="text-3xl font-bold tracking-tight">The Go-To Platform for Families</h2>
            <p className="mt-4 text-lg text-muted-foreground">
                We aim to become the most trusted e-commerce platform for families, combining exceptional product quality with outstanding service. We believe in fostering trust and building lasting relationships with our customers.
            </p>
            <p className="mt-6 text-lg text-muted-foreground">
                Thank you for choosing FamilyShop. For any inquiries, feel free to{' '}
                <Link href="/contact" className="text-primary font-semibold hover:underline">
                    Contact Us
                </Link>
                .
            </p>
        </div>
      </div>
    </div>
  );
};

// A reusable component for the feature cards
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <Card className="text-center items-center p-6">
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
};

export default AboutUsPage;