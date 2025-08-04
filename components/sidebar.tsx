"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Map, MapPin, FileText, History, Settings, ChevronRight, Shield, Users, Activity } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"
import { isAdmin } from "@/lib/access-control"

interface SidebarNavProps {
  className?: string
}

export function SidebarNav({ className }: SidebarNavProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  const routes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Properties",
      href: "/properties",
      icon: MapPin,
    },
    {
      name: "Map",
      href: "/map",
      icon: Map,
    },
    {
      name: "Documents",
      href: "/documents",
      icon: FileText,
    },
    {
      name: "History",
      href: "/history",
      icon: History,
    },
  ]

  const adminRoutes = [
    {
      name: "Admin Panel",
      href: "/admin",
      icon: Shield,
    },
  ]

  const settingsRoutes = [
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  const allRoutes = [
    ...routes,
    ...(isAdmin(user) ? adminRoutes : []),
    ...settingsRoutes
  ]

  return (
    <Sidebar className={className}>
      <SidebarHeader className="py-4">
        <Link href="/dashboard" className="flex items-center px-2">
          <span className="text-xl font-bold">ArdhiX</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {allRoutes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.name}>
                <Link href={route.href} className="flex items-center">
                  <route.icon className="mr-2 h-5 w-5" />
                  <span>{route.name}</span>
                  {pathname === route.href && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
