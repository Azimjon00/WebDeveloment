interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

const Loading = ({ text = 'Загрузка...', fullScreen = true }: LoadingProps) => (
  <div className={`${fullScreen ? 'min-h-[60vh]' : 'py-16'} flex flex-col items-center justify-center animate-fade-in`}>
    {/* Spinner */}
    <div className="relative w-16 h-16 mb-6">
      <div className="absolute inset-0 rounded-full border-4 border-warm-200"></div>
      <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
    </div>
    <p className="text-warm-500 font-medium">{text}</p>
    <div className="flex gap-1 mt-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-primary-400 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);

export default Loading;
