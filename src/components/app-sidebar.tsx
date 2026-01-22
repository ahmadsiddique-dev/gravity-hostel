"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconCalendarCheck,
  IconCreditCard,
  IconBell,
  IconMessageDots,
  IconMessageChatbot,
  IconBuilding,
  IconUserPlus
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import ClientOnly from "./client-only"
import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"
// import { CalendarCheck } from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMainStudent: [
    {
      title: "Dashboard",
      url: "/dashboard/s",
      icon: IconDashboard,
    },
    {
      title: "Attendence",
      url: "/dashboard/s/attendence",
      icon: IconCalendarCheck,
    },
    {
      title: "Fees",
      url: "/dashboard/s/fees",
      icon: IconCreditCard,
    },
    {
      title: "Notifications",
      url: "/dashboard/s/notifications",
      icon: IconBell,
    },
    {
      title: "Complaints",
      url: "/dashboard/s/complaints",
      icon: IconMessageDots,
    },
    {
      title: "Ask me?",
      url: "/dashboard/s/askme",
      icon: IconMessageChatbot,
    }
  ],
  navMainAdmin : [
  {
    title: "Dashboard",
    url: "/dashboard/a",
    icon: IconDashboard, // already exists, unchanged
  },
  {
    title: "Students",
    url: "/dashboard/a/students",
    icon: IconUsers,
  },
  {
    title: "Rooms",
    url: "/dashboard/a/rooms",
    icon: IconBuilding,
  },
  {
    title: "Register Student",
    url: "/dashboard/a/register-student",
    icon: IconUserPlus,
  },
  {
    title: "Attendence",
    url: "/dashboard/a/attendence",
    icon: IconCalendarCheck, // unchanged spelling & icon
  },
  {
    title: "Notifications",
    url: "/dashboard/a/notification",
    icon: IconBell, // unchanged
  },
  {
    title: "Complaints",
    url: "/dashboard/a/complaints",
    icon: IconMessageDots, // unchanged
  },
]
  // navClouds: [
  //   {
  //     title: "Capture",
  //     icon: IconCamera,
  //     isActive: true,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Proposal",
  //     icon: IconFileDescription,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Prompts",
  //     icon: IconFileAi,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     items: [],
  //     icon: IconSettings,
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: IconHelp,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: IconSearch,
  //   },
  // ],
  // documents: [
  //   {
  //     name: "Data Library",
  //     url: "#",
  //     icon: IconDatabase,
  //   },
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: IconReport,
  //   },
  //   {
  //     name: "Word Assistant",
  //     url: "#",
  //     icon: IconFileWord,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // 1. Initialize with empty array to ensure server and client match initially
  const [nav, setNav] = React.useState<any>([])

  React.useEffect(() => {
    // 2. This runs ONLY in the browser, fixing the hydration error
    const whichToShow = localStorage.getItem("data")

    if (whichToShow) {
      try {
        const decision = JSON.parse(whichToShow)
        // 3. Update state based on parsed data
        if (decision?.isAdmin) {
          setNav(data.navMainAdmin)
        } else {
          setNav(data.navMainStudent)
        }
      } catch (error) {
        console.error("Error parsing localStorage 'data':", error)
        // Optional: fallback to student if JSON is corrupt
        setNav(data.navMainStudent) 
      }
    }
  }, [])

  return (
    <ClientOnly>
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:p-1.5!"
              >
                <span>
                  <IconInnerShadowTop className="size-5!" />
                  <span className="text-base font-semibold">Gravity</span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {/* nav will be empty on first render, then populate. This is safe. */}
          <NavMain items={nav} />
          {/* <NavDocuments items={data.documents} /> */}
          {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
        </SidebarContent>
        <SidebarFooter>
          {/* <NavUser user={data.user} /> */}
          <Button className="bg-transparent hover:bg-white/5 text-red-500"> {/* <Spinner />*/} Logout</Button>
        </SidebarFooter>
      </Sidebar>
    </ClientOnly>
  )
}