import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { DevfileLogo } from '../devfile-logo/devfile-logo';

const navigation = [
  { name: 'Viewer', href: '/', external: true },
  { name: 'Docs', href: '/' },
  { name: 'Get Started', href: '/' },
  { name: 'Github', href: '/', image: '/images/github.svg', external: true },
  { name: 'Slack', href: '/', image: '/images/slack.svg', external: true },
];

export function Header(): JSX.Element {
  return (
    <Popover className="relative border-b border-gray-300 bg-white">
      <div className="flex items-center justify-between px-4 py-6 md:justify-start md:space-x-10">
        <div className="ml-8">
          <DevfileLogo />
        </div>
        <div className="-my-2 -mr-2 md:hidden">
          <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:pr-8">
          <Popover.Group as="nav" className="flex items-center space-x-10">
            {navigation.map((item) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  {item.image ? (
                    <img className="h-6 w-auto" src={item.image} alt={item.name} />
                  ) : (
                    item.name
                  )}
                </a>
              ) : (
                <Link key={item.name} href={item.href}>
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                    {item.image ? (
                      <img className="h-6 w-auto" src={item.image} alt={item.name} />
                    ) : (
                      item.name
                    )}
                  </a>
                </Link>
              ),
            )}
          </Popover.Group>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div className="ml-4">
                  <DevfileLogo />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                {navigation.map((item) =>
                  item.external ? (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link key={item.name} href={item.href}>
                      <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                        {item.name}
                      </a>
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Header;
