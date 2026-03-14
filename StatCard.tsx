import {
  Building2,
  Ambulance,
  Stethoscope,
  MapPin,
  Shield,
  LogOut,
  Activity,
  CalendarDays,
  User,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';

const navItems = [
  { title: 'Command Center', url: '/command', icon: Activity, module: 'command' },
  { title: 'SOS Emergency', url: '/sos', icon: Shield, module: 'sos' },
  { title: 'Hospital', url: '/hospital', icon: Building2, module: 'hospital' },
  { title: 'Ambulance', url: '/ambulance', icon: Ambulance, module: 'ambulance' },
  { title: 'Paramedic', url: '/paramedic', icon: Stethoscope, module: 'paramedic' },
  { title: 'Tracking', url: '/tracking/active', icon: MapPin, module: 'tracking' },
  { title: 'Appointments', url: '/appointments', icon: CalendarDays, module: 'appointments' },
  { title: 'Health Profile', url: '/profile', icon: User, module: 'health-profile' },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="gradient-navy">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted px-3 mb-2">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-sidebar-primary" />
                <span className="font-bold text-sidebar-foreground text-base">MedLink</span>
              </div>
            )}
            {collapsed && <Shield className="h-5 w-5 text-sidebar-primary mx-auto" />}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/command'}
                      className="text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-150"
                      activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="gradient-navy border-t border-sidebar-border">
        {!collapsed && (
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-xs text-sidebar-muted capitalize">{user.role}</p>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} className="text-sidebar-muted hover:text-emergency hover:bg-emergency/10 transition-colors duration-150">
              <LogOut className="h-4 w-4 mr-2" />
              {!collapsed && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
