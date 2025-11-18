"use client";

import { useState, useEffect } from "react";
import { updateUser, getUser, SafeUser } from "@/app/actions/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
  userId: string | null;
}

export default function EditUserModal({
  isOpen,
  onClose,
  onUserUpdated,
  userId,
}: EditUserModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<SafeUser | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER" as "USER" | "ADMIN",
  });

  useEffect(() => {
    if (isOpen && userId) {
      const fetchUser = async () => {
        try {
          const userData = await getUser(userId);
          setUser(userData);
          setFormData({
            name: userData.name || "",
            email: userData.email,
            password: "",
            role: userData.role,
          });
        } catch {
          setError("Failed to load user data");
        }
      };
      fetchUser();
    }
  }, [isOpen, userId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !formData.name || !formData.email) {
      setError("Name and email are required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("role", formData.role);
      if (formData.password) {
        data.append("password", formData.password);
      }

      await updateUser(userId, data);
      onUserUpdated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information. Leave password blank to keep current
            password.
          </DialogDescription>
        </DialogHeader>

        {user ? (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email Address</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-password">New Password</Label>
                <Input
                  id="edit-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Leave blank to keep current password"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: "USER" | "ADMIN") =>
                    handleInputChange("role", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update User"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-8 text-center">
            <div className="text-muted-foreground">Loading user data...</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
