import { omit } from '@reatom/framework';
import { observer } from 'mobx-react-lite';
import { Link } from 'wouter';

import { useHistoryState, usePathname } from '@/shared/lib/router/hooks';
import { cn } from '@/shared/lib/shadcn/utils';

type Props<T extends { id: number; name: string }> = {
  className?: string;
  title: string;
  items: T[];
  historyStateProperty: string;
};

export const FilterBar = observer(
  <T extends { id: number; name: string }>({
    className,
    title,
    items,
    historyStateProperty,
  }: Props<T>) => {
    const historyState = useHistoryState() || {};
    const pathname = usePathname();

    return (
      <div className={cn('flex flex-col', className)}>
        <div className="text-lg font-medium px-1">{title}</div>
        {items.map((item) => {
          const isActive = historyState[historyStateProperty] === item.id;

          const nextState = isActive
            ? omit(historyState, [historyStateProperty])
            : { ...historyState, [historyStateProperty]: item.id };

          return (
            <Link
              className={cn(
                'text-left px-2 py-1 text-muted-foreground hover:text-foreground hover:underline',
                {
                  'text-foreground font-semibold': isActive,
                },
              )}
              to={pathname}
              state={nextState}
              key={item.id}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    );
  },
);
