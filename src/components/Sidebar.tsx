'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaUser, FaClipboardList, FaLightbulb } from 'react-icons/fa';

const navLinks = [
  { name: 'Dashboard', href: '/', icon: FaTachometerAlt },
  { name: 'Profile', href: '/profile', icon: FaUser },
  { name: 'Assessment', href: '/assessment', icon: FaClipboardList },
  { name: 'Recommendations', href: '/recommendations', icon: FaLightbulb },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        Byte Busters
      </div>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name} style={{ marginBottom: '0.5rem' }}>
                <Link href={link.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <link.icon className="nav-icon" />
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}