interface FeatureStepProps {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function FeatureStep({ step, title, description, icon }: FeatureStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-500 mb-4">
        {icon}
      </div>
      <span className="font-body text-xs font-medium text-primary-500 uppercase tracking-wider mb-2">
        Passo {step}
      </span>
      <h3 className="font-heading text-lg font-semibold text-neutral-800">{title}</h3>
      <p className="font-body text-sm text-neutral-500 mt-2 max-w-xs">{description}</p>
    </div>
  );
}
