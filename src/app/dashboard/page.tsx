/**
 * Dashboard page - User's learning dashboard
 */

import { Metadata } from "next";
import { UserDashboard } from "@/components/dashboard/user-dashboard";

export const metadata: Metadata = {
   title: "Dashboard - Learn To Code",
   description: "Track your learning progress and manage your courses",
};

export default function DashboardPage() {
   return <UserDashboard />;
}
