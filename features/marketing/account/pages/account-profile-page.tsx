import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AccountProfilePage() {
  const user = {
    name: "Code Green",
    email: "codegreen@example.com",
    phone: "+880 1234-567890",
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>

        <p className="text-muted-foreground text-sm">
          Manage your personal information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>

          <CardDescription>Update your profile details here.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem label="Full Name" value={user.name} />
            <InfoItem label="Email Address" value={user.email} />
            <InfoItem label="Phone Number" value={user.phone} />
          </div>

          <Button>Edit Profile</Button>
        </CardContent>
      </Card>
    </section>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 rounded-lg border p-4">
      <p className="text-muted-foreground text-sm">{label}</p>

      <p className="font-medium">{value}</p>
    </div>
  );
}
