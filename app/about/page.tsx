import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock team data
const teamMembers = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    role: "Chief Medical Editor",
    bio: "Board-certified physician with 10+ years of experience in sleep medicine and wellness.",
    image: "https://images.pexels.com/photos/5324857/pexels-photo-5324857.jpeg",
  },
  {
    id: "2",
    name: "Marco Oliveira",
    role: "Registered Dietitian",
    bio: "Nutrition expert specialized in sustainable eating habits and balanced diets.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
  },
  {
    id: "3",
    name: "Leila Patel",
    role: "Mindfulness Coach",
    bio: "Certified meditation instructor and mental health advocate with 8+ years of teaching experience.",
    image: "https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg",
  },
  {
    id: "4",
    name: "Alex Johnson",
    role: "Fitness Director",
    bio: "Certified personal trainer specialized in functional training and inclusive fitness approaches.",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
              <p className="text-xl text-muted-foreground mb-6">
                We believe that wellness is not a destination, but a journey. Our mission is to provide evidence-based content that empowers you to make informed decisions about your health and well-being.
              </p>
              <p className="text-muted-foreground mb-8">
                Founded in 2025, WellnessBlog brings together experts from various health disciplines to deliver comprehensive, trustworthy information on nutrition, fitness, mental health, and holistic wellness practices.
              </p>
              <Button asChild>
                <Link href="/blog">Explore Our Content</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg"
                  alt="Team working together"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-chart-1/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-chart-1">E</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Evidence-Based</h3>
                <p className="text-muted-foreground">
                  We rely on scientific research and expert knowledge to provide accurate information.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-chart-2/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-chart-2">I</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Inclusive</h3>
                <p className="text-muted-foreground">
                  We believe wellness is for everyone, regardless of age, ability, or background.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-chart-3/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-chart-3">H</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Holistic</h3>
                <p className="text-muted-foreground">
                  We address all aspects of wellness: physical, mental, emotional, and social.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-chart-4/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-chart-4">P</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Practical</h3>
                <p className="text-muted-foreground">
                  We provide actionable advice that can be integrated into your daily life.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Team Section */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-center">Meet Our Team</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Our team of experts brings decades of experience in their respective fields to provide you with the most reliable wellness content.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                <div className="aspect-[1/1] relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}