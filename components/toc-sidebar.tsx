import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TocItem {
  title: string
  href: string
  current?: boolean
}

interface TocSidebarProps {
  items: TocItem[]
}

export function TocSidebar({ items }: TocSidebarProps) {
  return (
    <div className="sticky top-8 w-full max-w-[280px]">
      <Card className="border-none bg-black/40 backdrop-blur-sm">
        <CardHeader className="bg-blue-500 rounded-t-lg">
          <CardTitle className="text-white text-lg">On this page</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <nav className="flex flex-col space-y-2">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors py-1 px-2 rounded hover:bg-white/5"
              >
                {item.title}
              </a>
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}
