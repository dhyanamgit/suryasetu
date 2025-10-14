import { Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2 text-foreground", className)}>
      <div className="bg-primary p-2 rounded-md">
        <Sun className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="font-bold text-xl font-headline">SuryaSetu</span>
    </div>
  );
};

export default Logo;
