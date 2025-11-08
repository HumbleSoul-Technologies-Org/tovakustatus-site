import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SiteSettings {
  features: {
    enableBlog: boolean;
    enableEvents: boolean;
    enableProjects: boolean;
    enableTalents: boolean;
    enableNewsletter: boolean;
    enableMediaGallery: boolean;
    enableContactForm: boolean;
  };
  appearance: {
    theme: "light" | "dark" | "system";
    accentColor: string;
    showSocialLinks: boolean;
  };
  content: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    postsPerPage: number;
  };
  notifications: {
    enableEmailNotifications: boolean;
    enablePushNotifications: boolean;
    notifyOnNewContact: boolean;
    notifyOnNewSubscriber: boolean;
  };
}

// Retrieve settings from localStorage or use defaults
const getInitialSettings = (): SiteSettings => {
  const savedSettings = localStorage.getItem("site_settings");
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }

  return {
    features: {
      enableBlog: true,
      enableEvents: true,
      enableProjects: true,
      enableTalents: true,
      enableNewsletter: true,
      enableMediaGallery: true,
      enableContactForm: true,
    },
    appearance: {
      theme: "system",
      accentColor: "blue",
      showSocialLinks: true,
    },
    content: {
      siteName: "Tova ku Status",
      siteDescription: "Empowering young talents in our community",
      contactEmail: "contact@tovakustatus.org",
      postsPerPage: 10,
    },
    notifications: {
      enableEmailNotifications: true,
      enablePushNotifications: false,
      notifyOnNewContact: true,
      notifyOnNewSubscriber: true,
    },
  };
};

export default function Settings() {
  const [settings, setSettings] = useState<SiteSettings>(getInitialSettings);
  const [isDirty, setIsDirty] = useState(false);

  // Save settings when they change
  useEffect(() => {
    if (isDirty) {
      localStorage.setItem("site_settings", JSON.stringify(settings));
      setIsDirty(false);
      toast.success("Your settings have been saved successfully.");
    }
  }, [settings, isDirty]);

  type SettingsPath = Array<
    | keyof SiteSettings
    | keyof SiteSettings["features"]
    | keyof SiteSettings["appearance"]
    | keyof SiteSettings["content"]
    | keyof SiteSettings["notifications"]
  >;

  const updateSettings = (path: SettingsPath, value: unknown) => {
    setSettings((prev) => {
      const newSettings = { ...prev };
      let current: any = newSettings;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newSettings;
    });
    setIsDirty(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your site settings and preferences
        </p>
      </div>

      <Tabs defaultValue="features" className="space-y-4">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Toggles</CardTitle>
              <CardDescription>Enable or disable site features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableBlog">Blog</Label>
                  <Switch
                    id="enableBlog"
                    checked={settings.features.enableBlog}
                    onCheckedChange={(checked) =>
                      updateSettings(["features", "enableBlog"], checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableEvents">Events</Label>
                  <Switch
                    id="enableEvents"
                    checked={settings.features.enableEvents}
                    onCheckedChange={(checked) =>
                      updateSettings(["features", "enableEvents"], checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableProjects">Projects</Label>
                  <Switch
                    id="enableProjects"
                    checked={settings.features.enableProjects}
                    onCheckedChange={(checked) =>
                      updateSettings(["features", "enableProjects"], checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableTalents">Talents</Label>
                  <Switch
                    id="enableTalents"
                    checked={settings.features.enableTalents}
                    onCheckedChange={(checked) =>
                      updateSettings(["features", "enableTalents"], checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableNewsletter">Newsletter</Label>
                  <Switch
                    id="enableNewsletter"
                    checked={settings.features.enableNewsletter}
                    onCheckedChange={(checked) =>
                      updateSettings(["features", "enableNewsletter"], checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableMediaGallery">Media Gallery</Label>
                  <Switch
                    id="enableMediaGallery"
                    checked={settings.features.enableMediaGallery}
                    onCheckedChange={(checked) =>
                      updateSettings(
                        ["features", "enableMediaGallery"],
                        checked
                      )
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableContactForm">Contact Form</Label>
                  <Switch
                    id="enableContactForm"
                    checked={settings.features.enableContactForm}
                    onCheckedChange={(checked) =>
                      updateSettings(["features", "enableContactForm"], checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how your site looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={settings.appearance.theme}
                    onValueChange={(value) =>
                      updateSettings(["appearance", "theme"], value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <Select
                    value={settings.appearance.accentColor}
                    onValueChange={(value) =>
                      updateSettings(["appearance", "accentColor"], value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select accent color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showSocialLinks">Show Social Links</Label>
                  <Switch
                    id="showSocialLinks"
                    checked={settings.appearance.showSocialLinks}
                    onCheckedChange={(checked) =>
                      updateSettings(["appearance", "showSocialLinks"], checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Configure your site content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.content.siteName}
                    onChange={(e) =>
                      updateSettings(["content", "siteName"], e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input
                    id="siteDescription"
                    value={settings.content.siteDescription}
                    onChange={(e) =>
                      updateSettings(
                        ["content", "siteDescription"],
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.content.contactEmail}
                    onChange={(e) =>
                      updateSettings(
                        ["content", "contactEmail"],
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postsPerPage">Posts Per Page</Label>
                  <Input
                    id="postsPerPage"
                    type="number"
                    min="1"
                    max="50"
                    value={settings.content.postsPerPage}
                    onChange={(e) =>
                      updateSettings(
                        ["content", "postsPerPage"],
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableEmailNotifications">
                    Email Notifications
                  </Label>
                  <Switch
                    id="enableEmailNotifications"
                    checked={settings.notifications.enableEmailNotifications}
                    onCheckedChange={(checked) =>
                      updateSettings(
                        ["notifications", "enableEmailNotifications"],
                        checked
                      )
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="enablePushNotifications">
                    Push Notifications
                  </Label>
                  <Switch
                    id="enablePushNotifications"
                    checked={settings.notifications.enablePushNotifications}
                    onCheckedChange={(checked) =>
                      updateSettings(
                        ["notifications", "enablePushNotifications"],
                        checked
                      )
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifyOnNewContact">
                    Notify on New Contact
                  </Label>
                  <Switch
                    id="notifyOnNewContact"
                    checked={settings.notifications.notifyOnNewContact}
                    onCheckedChange={(checked) =>
                      updateSettings(
                        ["notifications", "notifyOnNewContact"],
                        checked
                      )
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifyOnNewSubscriber">
                    Notify on New Subscriber
                  </Label>
                  <Switch
                    id="notifyOnNewSubscriber"
                    checked={settings.notifications.notifyOnNewSubscriber}
                    onCheckedChange={(checked) =>
                      updateSettings(
                        ["notifications", "notifyOnNewSubscriber"],
                        checked
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
