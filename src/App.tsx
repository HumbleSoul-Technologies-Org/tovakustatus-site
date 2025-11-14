import { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initializeStorage, isAuthenticated } from "@/lib/localStorage";
import Layout from "@/components/Layout";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Talents from "@/pages/Talents";
import TalentDetail from "@/pages/TalentDetail";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import Media from "@/pages/Media";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import GetInvolved from "@/pages/GetInvolved";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import DashboardOverview from "@/pages/dashboard/Overview";
import ManageTalents from "@/pages/dashboard/ManageTalents";
import ManageProjects from "@/pages/dashboard/ManageProjects";
import ManageEvents from "@/pages/dashboard/ManageEvents";
import ManageBlog from "@/pages/dashboard/ManageBlog";
import ManageMedia from "@/pages/dashboard/ManageMedia";
import ManageNewsletter from "@/pages/dashboard/ManageNewsletter";
import ManageNotifications from "@/pages/dashboard/ManageNotifications";
import ManageMessages from "@/pages/dashboard/ManageMessages";
import Analysis from "@/pages/dashboard/Analysis";
import Settings from "@/pages/dashboard/Settings";
import NotFound from "@/pages/not-found";
import { VisitorProvider } from "./hooks/visitorContext";

function Router() {
  const [location] = useLocation();
  const isDashboard = location.startsWith("/dashboard");
  const isLoginPage = location === "/login";

  // For dashboard routes
  if (isDashboard) {
    return (
      <Switch>
        <Route path="/dashboard" component={ProtectedDashboard} />
        <Route path="/dashboard/:path*" component={ProtectedDashboard} />
      </Switch>
    );
  }

  // For login page
  if (isLoginPage) {
    return <Login />;
  }

  // For all other routes, wrap with Layout
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/talents" component={Talents} />
        <Route path="/talents/:_id" component={TalentDetail} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:id" component={ProjectDetail} />
        <Route path="/events" component={Events} />
        <Route path="/events/:_id" component={EventDetail} />
        <Route path="/media" component={Media} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:id" component={BlogDetail} />
        <Route path="/get-involved" component={GetInvolved} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function ProtectedDashboard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      setLocation("/login");
    }
  }, [setLocation]);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <DashboardLayout>
      <DashboardRouter />
    </DashboardLayout>
  );
}

function DashboardRouter() {
  const [location] = useLocation();

  if (location === "/dashboard") {
    return <ManageTalents />;
  }

  return (
    <Switch>
      <Route path="/dashboard/talents" component={ManageTalents} />
      <Route path="/dashboard/projects" component={ManageProjects} />
      <Route path="/dashboard/events" component={ManageEvents} />
      <Route path="/dashboard/blog" component={ManageBlog} />
      <Route path="/dashboard/media" component={ManageMedia} />
      <Route path="/dashboard/newsletter" component={ManageNewsletter} />
      <Route path="/dashboard/messages" component={ManageMessages} />
      <Route path="/dashboard/notifications" component={ManageNotifications} />
      <Route path="/dashboard/analysis" component={Analysis} />
      <Route path="/dashboard/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <VisitorProvider>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </VisitorProvider>
    </QueryClientProvider>
  );
}

export default App;
