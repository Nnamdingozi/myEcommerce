
// app/ui/footer.tsx

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { lusitana } from '@/app/ui/font';
import { Visa, Mastercard, Amex } from 'react-payment-icons';

export const Footer = () => {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* --- Column 1: Brand & Newsletter --- */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingCart className="h-7 w-7 text-primary" />
              <span className={`${lusitana.className} text-2xl font-bold`}>FamilyShop</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your one-stop shop for quality products for the whole family.
            </p>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Stay Updated</h3>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Enter your email" />
                <Button type="submit">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* --- Column 2: Customer Service --- */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold mb-2 text-lg">Customer Service</h3>
            <Link href="/contacts" className="text-muted-foreground hover:text-primary text-sm">Contact Us</Link>
            <Link href="/faq" className="text-muted-foreground hover:text-primary text-sm">FAQ</Link>
            <Link href="/shipping-policy" className="text-muted-foreground hover:text-primary text-sm">Shipping Policy</Link>
            <Link href="/returns" className="text-muted-foreground hover:text-primary text-sm">Returns & Exchanges</Link>
          </div>

          {/* --- Column 3: About Us --- */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold mb-2 text-lg">Our Company</h3>
            <Link href="/aboutUs" className="text-muted-foreground hover:text-primary text-sm">About Us</Link>
            <Link href="/careers" className="text-muted-foreground hover:text-primary text-sm">Careers</Link>
            <Link href="/press" className="text-muted-foreground hover:text-primary text-sm">Press Center</Link>
            <Link href="/affiliates" className="text-muted-foreground hover:text-primary text-sm">Affiliate Program</Link>
          </div>

          {/* --- Column 4: Social & Legal --- */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold mb-2 text-lg">Follow Us</h3>
            <div className="flex items-center gap-4">
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            </div>
            <div className="mt-4 flex flex-col gap-2">
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary text-sm">Terms of Service</Link>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary text-sm">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FamilyShop, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* You can add payment method icons here */}
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Paystack</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;