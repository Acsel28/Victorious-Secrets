"use client"

import { useState, useEffect } from "react"
import {
  ChevronRight,
  Edit,
  CheckCircle,
  FileText,
  Star,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </div>
  )
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        scrolled ? "bg-white shadow-md" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold text-[#333333]">ResumeAI</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-[#333333] hover:text-[#009B3D] transition-colors">
            Home
          </Link>
          <Link href="#features" className="text-[#333333] hover:text-[#009B3D] transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-[#333333] hover:text-[#009B3D] transition-colors">
            Pricing
          </Link>
          <Link href="/login" className="text-[#333333] hover:text-[#009B3D] transition-colors">
            Login
          </Link>
          <Link href="/signup" className="text-[#333333] hover:text-[#009B3D] transition-colors">
            Sign Up
          </Link>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#333333] mb-6">Build Your Dream Resume with AI</h1>
        <p className="text-xl md:text-2xl text-[#555555] mb-10 max-w-3xl mx-auto">
          Create professional, ATS-friendly resumes in minutes with our intelligent resume builder
        </p>
        <Button className="bg-[#00B74D] hover:bg-[#009B3D] text-white px-8 py-6 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const [demoText, setDemoText] = useState("I am a hardworking professional with 5 years of experience.")
  const [suggestedText, setSuggestedText] = useState("")
  const [atsScore, setAtsScore] = useState(65)
  const [coverLetterName, setCoverLetterName] = useState("")
  const [coverLetterPreview, setCoverLetterPreview] = useState("")

  useEffect(() => {
    if (demoText) {
      setSuggestedText(
        "I am a dedicated professional with 5+ years of experience, consistently delivering results through innovative problem-solving and strategic thinking.",
      )
    }
  }, [demoText])

  useEffect(() => {
    if (coverLetterName) {
      setCoverLetterPreview(
        `Dear Hiring Manager,\n\nI am writing to express my interest in the position at ${coverLetterName}. With my background and skills, I believe I would be a valuable addition to your team...\n\nSincerely,\nYour Name`,
      )
    } else {
      setCoverLetterPreview("")
    }
  }, [coverLetterName])

  return (
    <section id="features" className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#333333] mb-16">What We Offer</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* AI-Driven Content Polishing */}
          <Card className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                <div className="bg-[#E6F7EF] p-4 rounded-full">
                  <Edit className="h-8 w-8 text-[#00B74D]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">AI-Driven Content Polishing</h3>
              <p className="text-[#555555] text-center mb-6">
                Enhance your resume with tailored suggestions that highlight your strengths.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Try it out:</p>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#00B74D]"
                  rows={3}
                  value={demoText}
                  onChange={(e) => setDemoText(e.target.value)}
                  placeholder="Enter some text about your experience..."
                />

                {suggestedText && (
                  <div className="bg-[#E6F7EF] p-3 rounded-md border border-[#00B74D] text-sm">
                    <p className="font-medium mb-1">AI Suggestion:</p>
                    <p>{suggestedText}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ATS Compatibility Scoring */}
          <Card className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                <div className="bg-[#E6F7EF] p-4 rounded-full">
                  <CheckCircle className="h-8 w-8 text-[#00B74D]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">ATS Compatibility Scoring</h3>
              <p className="text-[#555555] text-center mb-6">
                Ensure your resume passes through applicant tracking systems with our scoring system.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">ATS Score</span>
                  <span
                    className={`text-sm font-bold ${atsScore >= 80 ? "text-green-600" : atsScore >= 60 ? "text-yellow-600" : "text-red-600"}`}
                  >
                    {atsScore}/100
                  </span>
                </div>
                <Progress value={atsScore} className="h-2 mb-4" />

                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => setAtsScore(Math.max(0, atsScore - 10))}>
                    Decrease
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setAtsScore(Math.min(100, atsScore + 10))}>
                    Increase
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personalized Cover Letter Generation */}
          <Card className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                <div className="bg-[#E6F7EF] p-4 rounded-full">
                  <FileText className="h-8 w-8 text-[#00B74D]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Personalized Cover Letter</h3>
              <p className="text-[#555555] text-center mb-6">
                Create cover letters that stand out with our AI-powered generator.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Company name:</p>
                <Input
                  className="mb-4 focus:outline-none focus:ring-2 focus:ring-[#00B74D]"
                  placeholder="Enter company name..."
                  value={coverLetterName}
                  onChange={(e) => setCoverLetterName(e.target.value)}
                />

                {coverLetterPreview && (
                  <div className="bg-white p-3 rounded-md border border-gray-300 text-sm h-32 overflow-y-auto">
                    <p className="whitespace-pre-line">{coverLetterPreview}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content:
        "The AI suggestions helped me highlight my achievements in a way I never would have thought of. I received multiple interview requests within a week!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Developer",
      content:
        "The ATS scoring feature was a game-changer. I optimized my resume based on the suggestions and landed my dream job at a tech giant.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Financial Analyst",
      content:
        "The cover letter generator saved me hours of work. It created personalized letters that perfectly complemented my resume for each application.",
      rating: 4,
    },
  ]

  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <section className="py-20 px-6 md:px-12 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#333333] mb-16">What Our Users Say</h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <Card className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 p-8 max-w-3xl mx-auto">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-6">
                        <div className="bg-[#E6F7EF] h-12 w-12 rounded-full flex items-center justify-center mr-4">
                          <span className="text-[#00B74D] font-bold">{testimonial.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>

                      <p className="text-[#555555] mb-6 italic">"{testimonial.content}"</p>

                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-colors ${
                  activeTestimonial === index ? "bg-[#00B74D]" : "bg-gray-300"
                }`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const plans = [
    {
      name: "Monthly",
      price: "$12",
      period: "per month",
      features: [
        { name: "Basic AI Resume Builder", included: true },
        { name: "ATS Compatibility Check", included: true },
        { name: "5 Resume Templates", included: true },
        { name: "Cover Letter Generator", included: false },
        { name: "Priority Support", included: false },
      ],
    },
    {
      name: "Yearly",
      price: "$99",
      period: "per year",
      popular: true,
      features: [
        { name: "Advanced AI Resume Builder", included: true },
        { name: "ATS Compatibility Check", included: true },
        { name: "20 Resume Templates", included: true },
        { name: "Cover Letter Generator", included: true },
        { name: "Priority Support", included: false },
      ],
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "per year",
      features: [
        { name: "Premium AI Resume Builder", included: true },
        { name: "ATS Compatibility Check", included: true },
        { name: "Unlimited Resume Templates", included: true },
        { name: "Cover Letter Generator", included: true },
        { name: "Priority Support", included: true },
      ],
    },
  ]

  const tooltips = {
    "Basic AI Resume Builder": "AI-powered suggestions for improving your resume content",
    "Advanced AI Resume Builder": "Enhanced AI suggestions with industry-specific recommendations",
    "Premium AI Resume Builder": "Top-tier AI with personalized coaching and feedback",
    "ATS Compatibility Check": "Ensures your resume passes through applicant tracking systems",
    "Cover Letter Generator": "AI-powered tool to create personalized cover letters",
    "Priority Support": "Get help from our team within 24 hours",
  }

  return (
    <section id="pricing" className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#333333] mb-16">Choose Your Plan</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300",
                plan.popular ? "border-[#00B74D] shadow-md" : "border-gray-200",
              )}
            >
              <CardContent className="p-8">
                {plan.popular && (
                  <div className="bg-[#00B74D] text-white text-xs font-bold uppercase py-1 px-3 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-[#00B74D] mr-2 flex-shrink-0 mt-0.5" />
                      ) : (
                        <div className="h-5 w-5 border border-gray-300 rounded-full mr-2 flex-shrink-0 mt-0.5" />
                      )}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className={feature.included ? "text-[#333333]" : "text-gray-400"}>
                              {feature.name}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{tooltips[feature.name as keyof typeof tooltips]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full py-6 rounded-lg text-white transition-all duration-300 transform hover:scale-105",
                    plan.popular ? "bg-[#00B74D] hover:bg-[#009B3D]" : "bg-[#A0C4FF] hover:bg-[#8AB0EB]",
                  )}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#333333] text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ResumeAI</h3>
            <p className="text-gray-300">Building professional resumes with the power of artificial intelligence.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors transform hover:scale-110">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors transform hover:scale-110">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors transform hover:scale-110">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
