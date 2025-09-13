/**
 * @file A component to display a single club activity in a card format.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

interface ActivityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  isNext: boolean;
}

/**
 * A presentational component for a single activity card in the stacked carousel.
 * @param {ActivityCardProps} props - The props for the component.
 * @returns The rendered ActivityCard component.
 */
export function ActivityCard({
  title,
  description,
  icon,
  isActive,
  isNext,
}: ActivityCardProps) {
  return (
    <div
      className={`absolute inset-0 p-8 rounded-2xl bg-brand-blue/20 backdrop-blur-lg border border-brand-dark-blue/20 shadow-lg transition-all duration-500 ease-in-out hover:border-brand-dark-blue/40
        ${isActive
          ? "z-20 opacity-100 transform-none"
          : isNext
            ? "z-10 opacity-100 transform scale-85 translate-y-9"
            : "z-0 opacity-0 transform scale-80 translate-y-12"
        }
      `}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 text-white">{icon}</div>
        <div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="mt-2 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
