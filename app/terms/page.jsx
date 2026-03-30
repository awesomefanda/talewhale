import Link from "next/link";

export default function Terms() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0c0520",
      padding: "40px 24px",
      fontFamily: "'Literata', Georgia, serif",
      color: "rgba(255,255,255,0.7)",
      maxWidth: "600px",
      margin: "0 auto",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Literata:opsz,wght@7..72,400&display=swap');`}</style>
      <Link href="/" style={{
        fontFamily: "'Bangers', cursive",
        color: "#ffd93d", fontSize: "14px", letterSpacing: "1px",
        textDecoration: "none", display: "inline-block", marginBottom: "24px",
      }}>← BACK</Link>
      <h1 style={{
        fontFamily: "'Bangers', cursive", fontSize: "32px",
        color: "#ffd93d", letterSpacing: "2px", margin: "0 0 8px",
      }}>TERMS OF USE</h1>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "28px" }}>Last updated: 2026</p>

      <h2 style={{ color: "#fff", fontFamily: "'Bangers', cursive", letterSpacing: "1px", fontSize: "18px" }}>1. What TaleWhale Does</h2>
      <p style={{ lineHeight: 1.7, marginBottom: "20px" }}>
        TaleWhale is an interactive comic story app for kids. It offers pre-written stories and, for parents, an AI story generation feature powered by third-party language models.
      </p>

      <h2 style={{ color: "#fff", fontFamily: "'Bangers', cursive", letterSpacing: "1px", fontSize: "18px" }}>2. AI-Generated Content</h2>
      <p style={{ lineHeight: 1.7, marginBottom: "20px" }}>
        The "Make My Own Story" feature sends your prompt to an AI model to generate story content. We do not store your prompts. AI output may occasionally be unexpected — parent supervision is recommended for AI-generated stories.
      </p>

      <h2 style={{ color: "#fff", fontFamily: "'Bangers', cursive", letterSpacing: "1px", fontSize: "18px" }}>3. Privacy</h2>
      <p style={{ lineHeight: 1.7, marginBottom: "20px" }}>
        We do not collect personal data. No accounts are required. The app runs entirely in your browser for pre-generated stories.
      </p>

      <h2 style={{ color: "#fff", fontFamily: "'Bangers', cursive", letterSpacing: "1px", fontSize: "18px" }}>4. No Warranties</h2>
      <p style={{ lineHeight: 1.7, marginBottom: "20px" }}>
        TaleWhale is provided "as is" without warranty of any kind. We are not responsible for AI-generated content.
      </p>

      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", marginTop: "40px" }}>
        Questions? Open an issue on our GitHub repository.
      </p>
    </div>
  );
}
