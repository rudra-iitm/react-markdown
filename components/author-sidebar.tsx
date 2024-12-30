'use client';
import { Mail, MapPin, Github } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface AuthorSidebarProps {
  author: {
    name: string
    role: string
    location: string
    image: string
    email: string
    github: string
  }
}

export function AuthorSidebar({ author }: AuthorSidebarProps) {
  return (
    <div className="sticky top-8 w-full max-w-[240px] space-y-4">
      <Card className="border-none bg-black/40 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage src={author.image} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-semibold text-white">{author.name}</h2>
            <p className="text-sm text-gray-400">{author.role}</p>
            <div className="mt-4 flex items-center text-sm text-gray-400">
              <MapPin className="mr-2 h-4 w-4" />
              {author.location}
            </div>
            <div className="mt-6 flex w-full flex-col gap-2">
              <Button 
                variant="outline" 
                className="w-full bg-black/40 border-gray-800 hover:bg-gray-800"
                onClick={() => window.location.href = `mailto:${author.email}`}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button 
                variant="outline"
                className="w-full bg-black/40 border-gray-800 hover:bg-gray-800"
                onClick={() => window.open(author.github, '_blank')}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
