import { Switch } from "@/components/ui/switch";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AccountSettingsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>

        <p className="text-muted-foreground text-sm">
          Manage your account preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>

          <CardDescription>
            Update your account settings and notifications.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <SettingItem
            title="Email Notifications"
            description="Receive updates about orders and activity."
          />

          <SettingItem
            title="Marketing Emails"
            description="Receive offers and promotional emails."
          />

          <SettingItem
            title="Dark Mode"
            description="Enable dark appearance for the dashboard."
          />
        </CardContent>
      </Card>
    </section>
  );
}

function SettingItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-1">
        <p className="font-medium">{title}</p>

        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <Switch />
    </div>
  );
}
