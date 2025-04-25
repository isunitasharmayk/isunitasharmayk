import { useState } from 'react';
import './App.css';

function App() {
  const [caption, setCaption] = useState("");
  const [accounts, setAccounts] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", window.Telegram.WebApp.initDataUnsafe.user?.id);
    formData.append("caption", caption);
    formData.append("accounts", accounts);
    formData.append("media", file);

    const res = await fetch("http://localhost:5001/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    alert(result.message);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4">
      <h1 className="text-xl font-bold mb-4">Instagram Uploader</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <input className="bg-zinc-800 p-2 rounded" type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
        <input className="bg-zinc-800 p-2 rounded" type="text" placeholder="Accounts (comma-separated)" value={accounts} onChange={(e) => setAccounts(e.target.value)} />
        <button type="submit" className="bg-green-600 hover:bg-green-700 p-2 rounded">Upload</button>
      </form>
    </div>
  );
}

export default App;
