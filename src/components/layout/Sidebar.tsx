import { LayoutDashboard, FolderKanban, BarChart3, Calendar, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'scrum_master', 'employee'] },
  { name: 'Projects', href: '/projects', icon: FolderKanban, roles: ['admin', 'scrum_master'] },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['admin', 'scrum_master'] },
  { name: 'Calendar', href: '/calendar', icon: Calendar, roles: ['admin', 'scrum_master', 'employee'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] },
];

export const Sidebar = () => {
  const { user } = useAuth();

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar px-6 pb-4 pt-20">
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-2">
            {filteredNavigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'group flex gap-x-3 rounded-md p-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )
                  }
                >
                  <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
