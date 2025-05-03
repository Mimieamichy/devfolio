import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  // Removed Blog link
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* Optional: Add a logo SVG or text */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m12 3 4 4-4 4-4-4Z"/><path d="M12 3v18"/><path d="m16 7 4 4-4 4"/><path d="m8 7-4 4 4 4"/></svg> */}
            <span className="hidden font-bold sm:inline-block text-primary">
              DevFolio
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground/80 text-foreground/60'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Mobile Menu */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:hidden">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="flex items-center mb-6">
                <span className="font-bold text-primary">DevFolio</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                   <SheetTrigger key={item.label} asChild>
                     <Link
                      href={item.href}
                      className={cn(
                        'transition-colors hover:text-foreground/80 text-foreground/60 px-4 py-2 rounded-md text-lg'
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetTrigger>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="md:hidden">
            <span className="font-bold text-primary">DevFolio</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
