"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/admin/video").then(r => { if (r.ok) setLoggedIn(true); });
  }, []);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true); setStatus("");
    const response = await fetch("/api/admin/login", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password })
    });
    const data = await response.json().catch(() => ({}));
    setBusy(false);
    if (!response.ok) return setStatus(data.error || "Login failed.");
    setLoggedIn(true); setPassword(""); setStatus("");
  }

  function choose(next: File | null) {
    if (preview) URL.revokeObjectURL(preview);
    setFile(next);
    setPreview(next ? URL.createObjectURL(next) : "");
    setStatus("");
  }

  async function publish(event: React.FormEvent) {
    event.preventDefault();
    if (!file) return setStatus("Choose an MP4 video first.");
    if (file.type !== "video/mp4") return setStatus("Only MP4 videos are supported.");
    if (file.size > 50 * 1024 * 1024) return setStatus("Video must be 50 MB or smaller.");
    setBusy(true); setStatus("Publishing video…");
    const form = new FormData(); form.append("video", file);
    const response = await fetch("/api/admin/video", { method: "POST", body: form });
    const data = await response.json().catch(() => ({}));
    setBusy(false);
    setStatus(response.ok ? data.message : (data.error || "Publish failed."));
    if (response.ok) setFile(null);
  }

  if (!loggedIn) return (
    <main style={styles.shell}><section style={styles.card}>
      <div style={styles.eyebrow}>THE AFRICA PLUG · ADMIN</div>
      <h1 style={styles.title}>Homepage video</h1>
      <p style={styles.muted}>Sign in to replace the welcome video shown on the homepage.</p>
      <form onSubmit={login} style={styles.form}>
        <label style={styles.label}>Admin password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={styles.input} autoComplete="current-password" required />
        <button style={styles.button} disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        {status && <p style={styles.error}>{status}</p>}
      </form>
    </section></main>
  );

  return (
    <main style={styles.shell}><section style={styles.card}>
      <div style={styles.eyebrow}>THE AFRICA PLUG · ADMIN</div>
      <h1 style={styles.title}>Homepage video</h1>
      <p style={styles.muted}>Upload a new MP4 and publish it. The existing homepage design stays unchanged.</p>
      <form onSubmit={publish} style={styles.form}>
        <label style={styles.drop}>
          <input type="file" accept="video/mp4" onChange={e => choose(e.target.files?.[0] || null)} style={{display:"none"}} />
          <strong>{file ? file.name : "Choose an MP4 video"}</strong>
          <span>{file ? (file.size / 1024 / 1024).toFixed(1) + " MB" : "Maximum 50 MB"}</span>
        </label>
        {preview && <video src={preview} controls muted playsInline style={styles.video} />}
        <button style={styles.button} disabled={busy || !file}>{busy ? "Publishing…" : "Publish / Replace Video"}</button>
        {status && <p style={status.startsWith("Video published") ? styles.success : styles.error}>{status}</p>}
      </form>
      <a href="/" style={styles.back}>← Back to homepage</a>
    </section></main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell:{minHeight:"100vh",display:"grid",placeItems:"center",padding:"24px",background:"#0b0b0b",color:"#fff"},
  card:{width:"min(680px,100%)",padding:"clamp(24px,5vw,52px)",border:"1px solid #292929",borderRadius:24,background:"#121212",boxShadow:"0 24px 80px rgba(0,0,0,.35)"},
  eyebrow:{fontSize:12,letterSpacing:2,fontWeight:700,opacity:.65,marginBottom:14},
  title:{fontSize:"clamp(32px,6vw,56px)",lineHeight:1,margin:"0 0 14px"},
  muted:{color:"#aaa",lineHeight:1.6,margin:"0 0 28px"},
  form:{display:"grid",gap:14},
  label:{fontSize:13,fontWeight:700},
  input:{width:"100%",boxSizing:"border-box",padding:"14px 16px",borderRadius:12,border:"1px solid #333",background:"#090909",color:"#fff",fontSize:16},
  button:{border:0,borderRadius:999,padding:"14px 20px",fontWeight:800,fontSize:15,cursor:"pointer",background:"#f4d35e",color:"#111"},
  drop:{display:"grid",gap:7,padding:"28px 20px",border:"1px dashed #555",borderRadius:16,cursor:"pointer",textAlign:"center"},
  video:{width:"100%",maxHeight:360,borderRadius:14,background:"#000"},
  error:{margin:0,color:"#ff9d9d",fontSize:14,lineHeight:1.5},
  success:{margin:0,color:"#a8f0b1",fontSize:14,lineHeight:1.5},
  back:{display:"inline-block",marginTop:24,color:"#fff",opacity:.7,textDecoration:"none"}
};
