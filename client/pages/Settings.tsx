import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const options = [
    { label: "Help Centre", path: "/settings/help" },
    { label: "Bank & UPI", path: "/settings/bank" },
    { label: "Change Language", path: "/settings/language" },
  ];

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="space-y-4">
        {options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => navigate(opt.path)}
            className="w-full flex justify-between items-center rounded-md border px-4 py-3 text-left hover:bg-muted"
          >
            {opt.label}
            <span className="text-gray-500">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
