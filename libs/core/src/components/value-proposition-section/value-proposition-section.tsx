import {
  ChatAlt2Icon,
  ClipboardCheckIcon,
  LockClosedIcon,
  RefreshIcon,
} from '@heroicons/react/outline';

const features = [
  {
    name: 'Reproducible',
    description:
      'Development environments become reproducible and disposable - they are now quick to create, can be thrown away at will, and can be easily re-created when needed.',
    icon: RefreshIcon,
  },
  {
    name: 'Consistent',
    description:
      'Mechanism for teams to share configurations across projects, and provide a single source of truth throughout the application lifecycle.',
    icon: ClipboardCheckIcon,
  },
  {
    name: 'Secure',
    description:
      'Central location management so updates can be applied once and be properly aligned across development teams.',
    icon: LockClosedIcon,
  },
  {
    name: 'Community',
    description:
      "Share expertise from other developers and communities into your team's development environment.",
    icon: ChatAlt2Icon,
  },
];

export function ValuePropositionSection(): JSX.Element {
  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-600">
          Develop Faster
        </h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Take control of your development environment
        </p>
        <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
          Devfiles defines best practices for your application lifecycle.
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-3 shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValuePropositionSection;
