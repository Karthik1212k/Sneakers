import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangeLanguage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("en");

  const onSave = () => {
    alert(`Language changed to: ${lang.toUpperCase()}`);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Change Language</h1>

      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="w-full rounded-md border px-3 py-2 mb-4"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी (Hindi)</option>
        <option value="ta">தமிழ் (Tamil)</option>
        <option value="te">తెలుగు (Telugu)</option>
        <option value="ml">മലയാളം (Malayalam)</option>
      </select>

      <button
        onClick={onSave}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Save Language
      </button>

      <button
        onClick={() => navigate(-1)}
        className="ml-3 rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
      >
        Back
      </button>
    </div>
  );
}
