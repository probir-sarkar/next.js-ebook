import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SubscribeForm } from "@/components/subscribe-form";
import Features from "@/components/features";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-emerald-500" />
          <span className="font-bold text-xl">NextJS Guide</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="hover:text-emerald-400 transition-colors">
            Features
          </Link>
          <Link href="#testimonials" className="hover:text-emerald-400 transition-colors">
            Testimonials
          </Link>
          <Link href="#faq" className="hover:text-emerald-400 transition-colors">
            FAQ
          </Link>
        </nav>
        <Button variant="outline" className="hidden sm:flex border-emerald-500 text-emerald-500 hover:bg-emerald-950 ">
          <Link href="#subscribe">Get Free E-Book</Link>
        </Button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-16 px-4 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-900 text-emerald-400 text-sm font-medium">
              FREE E-BOOK
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ">
              Crack Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                Next.js
              </span>{" "}
              Interview
            </h1>

            <p className="text-xl md:text-2xl font-medium text-muted-foreground ">100+ Essential Questions & Answers</p>
            <p className="text-lg text-gray-300">
              Master Next.js concepts and ace your technical interviews with our comprehensive guide covering SSR, SSG,
              App Router, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="#subscribe" className="flex items-center gap-2">
                  Download Free E-Book <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-950">
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span>No credit card required</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg blur opacity-75"></div>
            <div className="relative bg-black rounded-lg p-6">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Next.js Interview Guide E-Book Cover"
                width={500}
                height={600}
                className="rounded-lg shadow-2xl mx-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />
      

      {/* Preview Questions Section */}
      <section className="container mx-auto py-16 px-4 md:py-24 border-t border-gray-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Preview Questions</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Here's a sneak peek at some of the questions and answers you'll find in the e-book
          </p>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-3 text-emerald-400">
                What is the difference between getStaticProps and getServerSideProps?
              </h3>
              <div className="bg-black rounded-lg p-4 border border-gray-800 text-gray-300">
                <p className="mb-4">getStaticProps and getServerSideProps are two data fetching methods in Next.js:</p>

                <div className="mb-4">
                  <p className="font-semibold mb-2">getStaticProps:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Runs at build time and generates static HTML and JSON files</li>
                    <li>Data is cached and reused for each request</li>
                    <li>Great for performance and SEO</li>
                    <li>Use when data doesn't change frequently</li>
                    <li>Can be combined with ISR for periodic updates</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2">getServerSideProps:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Runs on every request</li>
                    <li>Generates HTML and data on each request</li>
                    <li>Use when data changes frequently or is user-specific</li>
                    <li>Slower than getStaticProps but provides fresh data</li>
                    <li>Good for dashboards or personalized content</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">Code Examples:</p>
                  <pre className="bg-gray-900 p-3 rounded-md overflow-x-auto text-sm">
                    <code>{`// getStaticProps example
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  
  return {
    props: { data },
    revalidate: 60 // Optional: regenerate page every 60 seconds (ISR)
  }
}

// getServerSideProps example
export async function getServerSideProps(context) {
  const { req, params } = context
  const res = await fetch(\`https://api.example.com/data/\${params.id}\`)
  const data = await res.json()
  
  return {
    props: { data }
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-3 text-emerald-400">
                How does the App Router differ from the Pages Router?
              </h3>
              <div className="bg-black rounded-lg p-4 border border-gray-800 text-gray-300">
                <p className="mb-4">
                  The App Router is a newer routing system introduced in Next.js 13+ that offers several advantages over
                  the Pages Router:
                </p>

                <p className="font-semibold mb-2">Key Differences:</p>
                <ol className="list-decimal pl-5 space-y-3 mb-4">
                  <li>
                    <p className="font-medium">File Structure:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-medium">App Router:</span> Uses a folder-based system with special files
                        like page.js, layout.js, loading.js
                      </li>
                      <li>
                        <span className="font-medium">Pages Router:</span> Uses a file-based system where each file
                        becomes a route
                      </li>
                    </ul>
                  </li>

                  <li>
                    <p className="font-medium">Component Model:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-medium">App Router:</span> Uses React Server Components by default
                      </li>
                      <li>
                        <span className="font-medium">Pages Router:</span> Uses Client Components only
                      </li>
                    </ul>
                  </li>

                  <li>
                    <p className="font-medium">Data Fetching:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-medium">App Router:</span> Allows component-level data fetching with
                        async/await
                      </li>
                      <li>
                        <span className="font-medium">Pages Router:</span> Uses getStaticProps, getServerSideProps at
                        the page level
                      </li>
                    </ul>
                  </li>

                  <li>
                    <p className="font-medium">Layouts:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-medium">App Router:</span> Nested layouts with shared UI that preserves
                        state
                      </li>
                      <li>
                        <span className="font-medium">Pages Router:</span> Requires manual implementation with _app.js
                        and wrappers
                      </li>
                    </ul>
                  </li>

                  <li>
                    <p className="font-medium">Loading States:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-medium">App Router:</span> Built-in loading.js for Suspense-based loading
                        states
                      </li>
                      <li>
                        <span className="font-medium">Pages Router:</span> Requires manual implementation
                      </li>
                    </ul>
                  </li>
                </ol>

                <div>
                  <p className="font-semibold mb-2">Example:</p>
                  <pre className="bg-gray-900 p-3 rounded-md overflow-x-auto text-sm">
                    <code>{`// App Router example
// app/dashboard/page.js
export default async function DashboardPage() {
  const data = await fetch('https://api.example.com/dashboard')
  const dashboard = await data.json()
  
  return <Dashboard data={dashboard} />
}`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-3 text-emerald-400">
                What are React Server Components and how do they work in Next.js?
              </h3>
              <div className="bg-black rounded-lg p-4 border border-gray-800 text-gray-300">
                <p className="mb-4">
                  React Server Components (RSC) are a new paradigm that allows components to render on the server only.
                </p>

                <div className="mb-4">
                  <p className="font-semibold mb-2">Key Characteristics:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Server-only rendering: Never sent to the client as JavaScript</li>
                    <li>Direct backend access: Can directly access databases, file systems, etc.</li>
                    <li>Reduced bundle size: Server components aren't included in the JS bundle</li>
                    <li>Automatic code splitting: Client components are automatically code-split</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2">In Next.js App Router:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>All components are Server Components by default</li>
                    <li>Use 'use client' directive to mark a component as a Client Component</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2">When to use each:</p>

                  <p className="font-medium mt-3 mb-1">Server Components for:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Fetching data</li>
                    <li>Accessing backend resources</li>
                    <li>Keeping sensitive information on server</li>
                    <li>Large dependencies that shouldn't be sent to client</li>
                  </ul>

                  <p className="font-medium mt-3 mb-1">Client Components for:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Interactivity and event listeners</li>
                    <li>Using hooks (useState, useEffect, etc.)</li>
                    <li>Browser-only APIs</li>
                    <li>Custom event handlers</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">Examples:</p>
                  <pre className="bg-gray-900 p-3 rounded-md overflow-x-auto text-sm">
                    <code>{`// Server Component (default in App Router)
// No 'use client' directive needed
export default async function ProductList() {
  // Can directly access database or API without exposing secrets
  const products = await db.query('SELECT * FROM products');
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Client Component
'use client'

import { useState } from 'react';

export function AddToCart({ productId }) {
  const [isAdded, setIsAdded] = useState(false);
  
  return (
    <button onClick={() => setIsAdded(true)}>
      {isAdded ? 'Added to Cart' : 'Add to Cart'}
    </button>
  );
}`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto max-w-4xl bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Get Your Free E-Book Now</h2>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter and receive the complete "Crack Your Next.js Interview" e-book for free.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>100+ interview questions and answers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>Real-world examples and code snippets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>Latest Next.js 15 features covered</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>Regular updates with new content</span>
                </li>
              </ul>
            </div>
            <div className="bg-black p-6 rounded-xl border border-gray-800">
              <SubscribeForm />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto py-16 px-4 md:py-24 border-t border-gray-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Developers Are Saying</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear from developers who have used our guide to ace their interviews
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "This guide was instrumental in helping me prepare for my interview at a major tech company. The
                questions were spot on and the explanations were clear and concise."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center">
                  <span className="font-bold text-emerald-500">JS</span>
                </div>
                <div>
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-gray-400">Senior Frontend Developer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "The section on App Router was particularly helpful as it's a newer feature that many resources don't
                cover well. This guide is comprehensive and up-to-date."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center">
                  <span className="font-bold text-emerald-500">AD</span>
                </div>
                <div>
                  <p className="font-medium">Alex Davis</p>
                  <p className="text-sm text-gray-400">React Developer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "I've been working with Next.js for years, but this guide still taught me new concepts and best
                practices. It's valuable for both beginners and experienced developers."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center">
                  <span className="font-bold text-emerald-500">SP</span>
                </div>
                <div>
                  <p className="font-medium">Sarah Parker</p>
                  <p className="text-sm text-gray-400">Lead Developer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto py-16 px-4 md:py-24 border-t border-gray-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Everything you need to know about the e-book</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-gray-900 rounded-lg border border-gray-800 px-6">
              <AccordionTrigger className="text-left">Is this e-book really free?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Yes, the e-book is completely free. We only ask for your email address so we can send you the download
                link and occasional updates when we add new content.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-gray-900 rounded-lg border border-gray-800 px-6">
              <AccordionTrigger className="text-left">
                Is the content up-to-date with the latest Next.js version?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Our e-book covers all the latest features of Next.js 15, including the App Router, React Server
                Components, and other modern features. We regularly update the content to keep it current.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-gray-900 rounded-lg border border-gray-800 px-6">
              <AccordionTrigger className="text-left">What format is the e-book available in?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                The e-book is available in PDF format, making it easy to read on any device. You can download it and
                read it offline at your convenience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-gray-900 rounded-lg border border-gray-800 px-6">
              <AccordionTrigger className="text-left">Is this suitable for beginners?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                While the e-book covers advanced topics, it explains concepts in a way that's accessible to developers
                with basic React knowledge. If you're familiar with React, you'll be able to follow along and learn
                Next.js effectively.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-gray-900 rounded-lg border border-gray-800 px-6">
              <AccordionTrigger className="text-left">How often is the content updated?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                We update the e-book whenever significant changes are made to Next.js. Subscribers will automatically
                receive notifications when new versions are available.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master Next.js?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Download your free copy of "Crack Your Next.js Interview: 100+ Essential Questions and Answers" today and
            take your development skills to the next level.
          </p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Link href="#subscribe" className="flex items-center gap-2">
              Get Your Free E-Book Now <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <BookOpen className="h-6 w-6 text-emerald-500" />
              <span className="font-bold text-xl">NextJS Guide</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
              <Link href="#" className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
