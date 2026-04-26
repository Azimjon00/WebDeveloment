import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string;
}

const EmptyState = ({
  icon = '📦',
  title,
  description = 'Здесь пока ничего нет',
  actionLabel,
  actionLink,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 animate-fade-up">
    <div className="w-24 h-24 bg-warm-100 rounded-full flex items-center justify-center mb-6">
      <span className="text-5xl">{icon}</span>
    </div>
    <h3 className="text-xl font-semibold text-warm-800 mb-2">{title}</h3>
    <p className="text-warm-500 text-center max-w-sm mb-6">{description}</p>
    {actionLabel && actionLink && (
      <Link
        to={actionLink}
        className="btn-primary"
      >
        {actionLabel}
      </Link>
    )}
  </div>
);

export default EmptyState;
