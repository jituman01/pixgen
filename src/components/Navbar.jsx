'use client';
import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // pathname janar jonno

const Navbar = () => {
  const pathname = usePathname(); // bortoman route check korbe
  const userData = authClient.useSession();
  const user = userData.data?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Photos', href: '/all-photos' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <div className="border-b px-2 bg-white sticky top-0 z-50 bg-white/40 backdrop-blur-md 
                      border border-white/20 rounded-2xl 
                      shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] 
                      flex justify-between items-center transition-al">
      <nav className="flex justify-between items-center py-3 max-w-7xl mx-auto w-full">
        {/* Logo Section */}
        <div className="flex gap-2 items-center">
          <Image
            src={'/logo.png'}
            alt="logo"
            loading="eager"
            width={30}
            height={30}
            className="object-cover h-auto w-auto"
          />
          <h3 className="font-black text-lg">pixgen.</h3>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6 text-sm h-full">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="relative flex items-center">
                <Link
                  href={link.href}
                  className={`transition-colors duration-200 pb-1 ${
                    isActive
                      ? 'text-blue-600 font-bold'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
                {/* Active Underline */}
                {isActive && (
                  <div className="absolute -bottom-[19px] left-0 w-full h-[2px]  rounded-full" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Auth Section */}
        <div className="flex gap-4">
          {!user && (
            <ul className="flex items-center text-sm gap-5 font-medium">
              <li>
                <Link href={'/signup'} className="hover:text-blue-600">
                  SignUp
                </Link>
              </li>
              <li>
                <Link href={'/signin'} className="hover:text-blue-600">
                  SignIn
                </Link>
              </li>
            </ul>
          )}

          {user && (
            <div className="flex gap-3 items-center">
              <Avatar
                size="sm"
                src={user?.image}
                name={user?.name?.charAt(0)}
                isBordered
                color="primary"
              />

              <Button
                onClick={handleSignOut}
                size="sm"
                color="danger"
                variant="flat"
                className="font-semibold"
              >
                SignOut
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
