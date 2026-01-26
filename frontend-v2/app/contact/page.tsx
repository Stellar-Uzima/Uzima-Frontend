"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Twitter, Linkedin, Send, MessageSquare, Info, CheckCircle2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

// UI Components
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// --- Validation Schema ---
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
})

type FormValues = z.infer<typeof schema>
const STORAGE_KEY = 'contact_form_draft_v1'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false) // Prevents saving blank data on mount

  // Initialize Form
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const { handleSubmit, formState, reset, watch, setValue, control } = methods
  const { isValid } = formState

  // --- 1. Load Data on Mount ---
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY)
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft)
        // Only restore if fields exist in parsed object
        if (parsed.name) setValue('name', parsed.name)
        if (parsed.email) setValue('email', parsed.email)
        if (parsed.subject) setValue('subject', parsed.subject)
        if (parsed.message) setValue('message', parsed.message)
      } catch (error) {
        console.error('Failed to load draft', error)
      }
    }
    setIsLoaded(true) // Mark as ready so the "Save" effect can run
  }, [setValue])

 // --- 2. Save Data (Debounced) ---
  useEffect(() => {
    if (!isLoaded) return // Guard: Don't start watching until loaded

    // We define the timer variable here so the callback below can "see" it
    let timeoutId: NodeJS.Timeout

    const subscription = watch((value) => {
      const hasData = Object.values(value).some((val) => val && val.trim() !== "")
      
      if (hasData) {
        // Clear the previous timer (this creates the true "debounce")
        clearTimeout(timeoutId)
        
        // Set the new timer
        timeoutId = setTimeout(() => {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
        }, 500)
      }
    })

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeoutId) // Cleanup on unmount
    }
  }, [watch, isLoaded])

  // --- Submit Handler ---
  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    
    try {
      // Mock network request
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      toast.success('Message sent successfully!', {
        description: "We'll get back to you within 24-72 hours.",
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
      })
      
      reset()
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50/50 p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Page Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question about the Stellar Uzima platform? We'd love to hear from you. 
            Fill out the form below and our team will respond shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* LEFT COLUMN: Contact Form */}
          <section className="lg:col-span-7">
            <Card className="border-muted shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Send a Message
                </CardTitle>
                <CardDescription>
                  All fields are required. We usually respond in 1-3 business days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)} role="form" aria-label="Contact form" className="space-y-5">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Zion Elisha" aria-label="Name" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600 text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="elisha@example.com" aria-label="Email" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600 text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help?" aria-label="Subject" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-600 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us more about your inquiry..." 
                              className="min-h-[150px] resize-y" 
                              aria-label="Message" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 text-xs" />
                        </FormItem>
                      )}
                    />

                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        size="lg"
                        className="w-full md:w-auto"
                        disabled={!isValid || loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </section>

          {/* RIGHT COLUMN: Info & FAQ */}
          <aside className="lg:col-span-5 space-y-6">
            
            {/* Contact Info Card */}
            <Card className="bg-muted/30 border-muted">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="w-4 h-4" /> Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-background rounded-md border text-sm">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <a href="mailto:hello@stellaruzima.com" className="text-muted-foreground hover:text-primary transition-colors">
                      hello@stellaruzima.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-background rounded-md border text-sm">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Twitter className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Twitter / X</p>
                    <a href="https://twitter.com/stellaruzima" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      @stellaruzima
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-background rounded-md border text-sm">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Linkedin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <a href="https://linkedin.com/company/stellar-uzima" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      Stellar Uzima
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {[
                    { q: "How long before I get a reply?", a: "We typically reply within 24-72 hours depending on volume." },
                    { q: "Can I request data removal?", a: "Yes, contact us with your request and we will process it promptly." },
                    { q: "Is my data secure?", a: "We follow best practices to secure user data and never sell personal information." },
                    { q: "How do I become a verified professional?", a: "Visit the verification page and follow the verification steps to submit credentials." },
                    { q: "How are XLM rewards calculated?", a: "Rewards depend on contribution quality and community feedback; see our docs for details." },
                  ].map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="px-6 border-b-0 last:border-b-0">
                      <AccordionTrigger className="hover:no-underline hover:text-primary text-sm font-medium text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

          </aside>
        </div>
      </div>
    </main>
  )
}