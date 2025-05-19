"use client"
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Features from "@/components/features";
import PreviewQuestions from "@/components/preview-questions";
import SubscribeForm from "@/components/subscribe-form";


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
      <PreviewQuestions />


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
           
              <SubscribeForm />
            
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
