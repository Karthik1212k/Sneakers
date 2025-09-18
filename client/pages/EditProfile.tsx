import { useState } from "react";
import { useAuth } from "@/store/auth";
import { useToast } from "@/hooks/use-toast";

export default function EditProfile() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name, image });
    toast({ title: "Profile updated", description: "Your details were saved." });
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
      <form className="grid gap-4" onSubmit={onSave}>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-md border px-3 focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Profile Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="h-11 rounded-md border px-3 focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="mt-4 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
 