interface AdminEmptyStateProps {
  emoji?: string;
  title: string;
  description?: string;
}

export default function AdminEmptyState({ emoji = "📭", title, description }: AdminEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-4xl mb-3">{emoji}</div>
      <div className="font-bold text-gray-700 mb-1">{title}</div>
      {description && <p className="text-sm text-gray-400 max-w-xs">{description}</p>}
    </div>
  );
}
