'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { Phone, Mail, Github, Linkedin, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 pt-24 md:pt-32">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get In Touch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We&apos;d love to hear from you! Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* --- Left Column: Contact Information --- */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <div className="space-y-6">
            <ContactInfoItem
              icon={<Phone className="h-5 w-5 text-primary" />}
              title="Phone Number"
              content="08101408378"
              href="tel:08101408378"
            />
            <ContactInfoItem
              icon={<Mail className="h-5 w-5 text-primary" />}
              title="Email Address"
              content="ngozika1105@gmail.com"
              href="mailto:ngozika1105@gmail.com"
            />
            <ContactInfoItem
              icon={<MapPin className="h-5 w-5 text-primary" />}
              title="Our Location"
              content="123 Commerce Street, Lagos, Nigeria"
            />
          </div>
          
          <div className="pt-4">
             <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
             <div className="flex items-center gap-4">
                <Link href="https://github.com/Nnamdingozi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Button variant="outline" size="icon"><Github className="h-5 w-5" /></Button>
                </Link>
                 <Link href="https://www.linkedin.com/in/geraldine-nnamdi-b58a25220" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Button variant="outline" size="icon"><Linkedin className="h-5 w-5" /></Button>
                </Link>
                {/* Add other social links here */}
             </div>
          </div>
        </div>

        {/* --- Right Column: Contact Form --- */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we&apos;ll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// A reusable component for the contact info items to keep the main component clean
const ContactInfoItem = ({ icon, title, content, href }: { icon: React.ReactNode, title: string, content: string, href?: string }) => {
  const contentElement = <p className="text-muted-foreground">{content}</p>;
  
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        {href ? (
          <a href={href} className="text-muted-foreground hover:text-primary hover:underline">
            {content}
          </a>
        ) : (
          contentElement
        )}
      </div>
    </div>
  );
};

export default ContactPage;