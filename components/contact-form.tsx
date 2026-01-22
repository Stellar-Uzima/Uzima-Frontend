"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ContactForm() {
  const [formData, setFormData] = useState({
    userType: "",
    name: "",
    email: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ userType: "", name: "", email: "" })
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.25_0.03_250)] text-center mb-12">
          {"Let's simplify healthcare knowledge together"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Select
              value={formData.userType}
              onValueChange={(value) => setFormData({ ...formData, userType: value })}
            >
              <SelectTrigger className="w-full py-6 rounded-lg border-border">
                <SelectValue placeholder="Please select if you are a patient or professional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="professional">Healthcare Professional</SelectItem>
                <SelectItem value="organization">Organization</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input
              type="text"
              placeholder="Please enter a valid name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="py-6 rounded-lg border-border"
              required
            />
          </div>

          <div>
            <Input
              type="email"
              placeholder="Please enter a valid email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="py-6 rounded-lg border-border"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[oklch(0.65_0.15_175)] hover:bg-[oklch(0.55_0.15_175)] text-white rounded-full py-6 text-lg"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  )
}
