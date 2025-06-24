import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="max-w-xl space-y-10">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Profile Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Business Name</label>
            <Input placeholder="Café Delight" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">Logo (optional)</label>
            <Input type="file" />
          </div>
          <Button className="mt-2">Update Profile</Button>
        </div>
      </div>

      <Separator />

      {/* Password Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">New Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm New Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button className="mt-2">Change Password</Button>
        </div>
      </div>

      <Separator />

      {/* Danger Zone */}
      <div>
        <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-600 mb-2">
          Deleting your account is permanent and cannot be undone.
        </p>
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  );
}
