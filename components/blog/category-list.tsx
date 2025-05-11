import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  slug: string;
};

interface CategoryListProps {
  categories: Category[];
  className?: string;
}

export default function CategoryList({ categories, className }: CategoryListProps) {
  // Define icon colors for each category (this would typically be part of your data)
  const categoryColors: Record<string, string> = {
    "wellness": "bg-chart-1 text-white",
    "nutrition": "bg-chart-2 text-white",
    "mental-health": "bg-chart-3 text-white",
    "fitness": "bg-chart-4 text-white",
    "lifestyle": "bg-chart-5 text-white",
  };

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6", className)}>
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.slug}`}>
          <Card className="transition-all duration-300 hover:shadow-md hover:scale-105 h-full cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", 
                categoryColors[category.slug] || "bg-primary text-primary-foreground")}>
                {category.name.charAt(0)}
              </div>
              <h3 className="text-lg font-medium">{category.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}