import { useState, useRef, useCallback } from "react";

const LOGO = "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";

const SYSTEM_PROMPT = `You are a senior AVL systems integrator at Sweetwater Integration.
Analyze the proposal and output ONLY a valid JSON object — no markdown, no explanation, no code fences.

The JSON must follow this exact structure:
{
  "zones": [
    {
      "id": "SHORT-ID",
      "zone": "Zone Category",
      "name": "Full location name",
      "refSheet": "T-AV1.1",
      "conduits": [
        {
          "id": "C-01",
          "from": "SOURCE",
          "to": "DESTINATION",
          "size": "1-1/4\\"c",
          "grp": "A",
          "signals": [
            {"type": "audio", "label": "GRP A – XLR MIC (10-xx)"}
          ],
          "note": "Brief EC coordination note"
        }
      ],
      "boxes": [
        {
          "sym": "FP1-01",
          "qty": "3",
          "desc": "Stage Floor Pocket",
          "bb": "ACE Backstage ISO1048BBX",
          "instBy": "EC",
          "suppBy": "SWI",
          "height": "FLUSH STAGE DECK",
          "note": "Upstage pockets"
        }
      ],
      "power": {
        "circuits": "CKT 103–108 — (6)×20A/120V IG",
        "load": "~1,500W per pocket",
        "sequenced": "YES",
        "note": "2-wire + IG. No shared neutrals."
      },
      "gcNote": "Key coordination note for GC/architect."
    }
  ]
}

Rules:
- Signal type values: audio, video, data, power, dmx, fiber
- Conduit groups: A=mic/line audio, B=intercom, C=speaker level, D=video/data/DMX/network, F=fiber, PWR=power conduit (separate EC run)
- Use SWI naming conventions: C-01, FP1, FP2, ER1, ER2, TV2, WP2, CAM1, BJB1, EJB1, SUB, FF, DMX1, ANT1
- instBy is always "EC". suppBy is "EC" for standard boxes, "SWI" for custom panels/floor pockets/specialty items
- Generate 4–7 zones based on the project scope
- Be specific and technical — this goes directly to GCs and architects`;

const SIG_STYLES = {
  audio: { bg: "#dde8f4", color: "#1a4a7a", border: "#a8c4e0" },
  video: { bg: "#ddf4f4", color: "#1a5a5a", border: "#a8dada" },
  data:  { bg: "#ddf4e8", color: "#1a5a2a", border: "#a8dab8" },
  power: { bg: "#f4dedd", color: "#7a1a1a", border: "#daa8a8" },
  dmx:   { bg: "#ede8f4", color: "#5a1a7a", border: "#c4a8e0" },
  fiber: { bg: "#f4ede0", color: "#7a4a1a", border: "#dac4a8" },
};

const GRP_STYLES = {
  A:   { bg: "#dde8f4", color: "#1a4a7a" },
  B:   { bg: "#ede8f4", color: "#5a1a7a" },
  C:   { bg: "#ddf4e8", color: "#1a5a2a" },
  D:   { bg: "#f4ede0", color: "#7a4a1a" },
  F:   { bg: "#f0f0ea", color: "#4a4a3a" },
  PWR: { bg: "#f4dedd", color: "#7a1a1a" },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Source Sans 3', sans-serif; background: #c8c8c0; }
  .app { display: grid; grid-template-columns: 260px 1fr; grid-template-rows: 48px 1fr; height: 100vh; overflow: hidden; }
  .topbar { grid-column:1/-1; background:#2c3540; display:flex; align-items:center; justify-content:space-between; padding:0 16px; border-bottom:2px solid #1a1f26; }
  .topbar img { height:20px; filter:brightness(0) invert(1); opacity:.85; }
  .topbar-title { font-family:'Source Code Pro',monospace; font-size:10px; color:#8a9ab0; letter-spacing:.12em; text-transform:uppercase; }
  .badge { font-family:'Source Code Pro',monospace; font-size:9px; font-weight:600; padding:2px 8px; border-radius:2px; letter-spacing:.06em; border:1px solid; }
  .badge-blue { color:#4a8cbe; border-color:rgba(74,140,190,.4); background:rgba(74,140,190,.1); }
  .badge-green { color:#4aad6e; border-color:rgba(74,173,110,.4); background:rgba(74,173,110,.1); }
  .badge-amber { color:#c89a2a; border-color:rgba(200,154,42,.4); background:rgba(200,154,42,.1); }
  .sidebar { background:#f0f0ec; border-right:2px solid #ccc; display:flex; flex-direction:column; overflow:hidden; }
  .sb-block { padding:12px 14px; border-bottom:1px solid #ccc; }
  .sb-head { font-family:'Source Code Pro',monospace; font-size:8.5px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:#888; margin-bottom:8px; padding-bottom:4px; border-bottom:1px solid #ddd; }
  .upload-btn { display:flex; align-items:center; gap:8px; width:100%; padding:10px 12px; background:#fff; border:1.5px solid #bbb; border-radius:3px; cursor:pointer; font-family:'Source Sans 3',sans-serif; font-size:12px; font-weight:500; color:#333; transition:border-color .15s,background .15s; text-align:left; }
  .upload-btn:hover { border-color:#4a8cbe; background:#f0f6fc; }
  .upload-status { margin-top:6px; font-family:'Source Code Pro',monospace; font-size:10px; min-height:14px; padding-left:2px; }
  .upload-hint { margin-top:4px; font-size:10px; color:#999; padding-left:2px; }
  .field { margin-bottom:7px; }
  .field label { display:block; font-family:'Source Code Pro',monospace; font-size:9px; font-weight:500; color:#777; letter-spacing:.06em; text-transform:uppercase; margin-bottom:3px; }
  .field input { width:100%; background:#fff; border:1px solid #bbb; color:#111; padding:5px 8px; border-radius:2px; font-family:'Source Sans 3',sans-serif; font-size:12px; outline:none; transition:border-color .15s; }
  .field input:focus { border-color:#4a8cbe; box-shadow:0 0 0 2px rgba(74,140,190,.15); }
  .sb-nav { flex:1; overflow-y:auto; background:#f8f8f5; }
  .nav-item { display:flex; align-items:center; gap:7px; padding:7px 14px; cursor:pointer; border-left:3px solid transparent; border-bottom:1px solid #eee; transition:all .1s; font-size:11px; color:#444; }
  .nav-item:hover { background:#eef0eb; color:#111; }
  .nav-sym { font-family:'Source Code Pro',monospace; font-size:9px; font-weight:600; padding:1px 5px; border-radius:2px; background:#e0e0da; color:#555; margin-left:auto; white-space:nowrap; }
  .sb-foot { padding:10px 14px; border-top:2px solid #ccc; display:flex; flex-direction:column; gap:6px; background:#f0f0ec; }
  .draw-btn { width:100%; padding:8px 12px; border-radius:2px; font-family:'Source Sans 3',sans-serif; font-size:12px; font-weight:600; cursor:pointer; border:1.5px solid; transition:all .15s; text-align:center; }
  .btn-gen { background:#2c3540; color:#fff; border-color:#2c3540; }
  .btn-gen:hover { background:#1a1f26; }
  .btn-gen:disabled { opacity:.5; cursor:not-allowed; }
  .btn-ghost { background:transparent; color:#444; border-color:#bbb; }
  .btn-ghost:hover { border-color:#444; color:#111; }
  .main { background:#c8c8c0; display:flex; flex-direction:column; overflow:hidden; }
  .sheet-tabs { background:#e0e0d8; border-bottom:1px solid #aaa; display:flex; align-items:flex-end; padding:0 16px; gap:2px; height:36px; flex-shrink:0; }
  .tab { padding:5px 14px; font-family:'Source Code Pro',monospace; font-size:9.5px; font-weight:600; letter-spacing:.06em; cursor:pointer; border:1px solid #bbb; border-bottom:none; background:#d0d0c8; color:#666; border-radius:3px 3px 0 0; transition:all .1s; text-transform:uppercase; }
  .tab:hover { background:#e8e8e0; color:#333; }
  .tab.active { background:#fff; color:#111; border-color:#aaa; font-weight:700; }
  .sheet-area { flex:1; overflow-y:auto; padding:20px; display:flex; justify-content:center; align-items:flex-start; }
  .sheet { background:#fff; border:2px solid #333; width:100%; max-width:1060px; min-height:600px; position:relative; box-shadow:4px 4px 16px rgba(0,0,0,.25); }
  .title-block { position:absolute; top:0; right:0; bottom:0; width:155px; border-left:2px solid #333; display:flex; flex-direction:column; background:#fff; }
  .tb-logo-area { border-bottom:1px solid #333; padding:10px 8px; display:flex; align-items:center; justify-content:center; min-height:60px; }
  .tb-logo { width:100%; max-width:115px; }
  .tb-sec { border-bottom:1px solid #333; padding:5px 8px; }
  .tb-lbl { font-family:'Source Code Pro',monospace; font-size:7px; font-weight:600; color:#888; text-transform:uppercase; letter-spacing:.08em; margin-bottom:2px; }
  .tb-val { font-family:'Source Code Pro',monospace; font-size:9px; font-weight:600; color:#111; }
  .tb-sheetnum { margin-top:auto; border-top:2px solid #333; padding:8px; text-align:center; background:#2c3540; color:#fff; font-family:'Source Code Pro',monospace; font-size:16px; font-weight:700; letter-spacing:.04em; }
  .sheet-content { margin-right:159px; padding:14px 16px; min-height:600px; }
  .draw-title { border-bottom:2px solid #333; padding-bottom:7px; margin-bottom:12px; display:flex; align-items:baseline; justify-content:space-between; }
  .draw-title h2 { font-size:14px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; }
  .draw-title-sub { font-family:'Source Code Pro',monospace; font-size:9px; color:#666; }
  .notes-box { border:1px solid #333; margin-bottom:12px; }
  .notes-title { background:#2c3540; color:#fff; padding:4px 10px; font-family:'Source Code Pro',monospace; font-size:9.5px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; }
  .notes-body { padding:7px 10px; }
  .note-item { font-size:10.5px; color:#333; padding:2px 0 2px 16px; position:relative; line-height:1.5; }
  .note-item::before { content:attr(data-n)'.'; position:absolute; left:0; font-weight:700; font-family:'Source Code Pro',monospace; font-size:9px; }
  .legend { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px; padding:5px 8px; border:1px solid #ccc; background:#fafaf8; }
  .legend-item { display:flex; align-items:center; gap:4px; font-size:10px; }
  .legend-sw { width:14px; height:10px; border-radius:1px; border:1px solid rgba(0,0,0,.15); }
  .zone-sec { border:1px solid #333; margin-bottom:12px; }
  .zone-hdr { background:#2c3540; color:#fff; padding:5px 10px; display:flex; align-items:center; gap:9px; cursor:pointer; user-select:none; }
  .zone-hdr:hover { background:#3a4550; }
  .zone-id { font-family:'Source Code Pro',monospace; font-size:9px; font-weight:700; background:rgba(255,255,255,.15); padding:1px 6px; border-radius:2px; letter-spacing:.06em; }
  .zone-name { font-size:12px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; flex:1; }
  .zone-ref { font-family:'Source Code Pro',monospace; font-size:9px; color:rgba(255,255,255,.5); }
  .sched-lbl { background:#e8e8e2; border-bottom:1px solid #bbb; padding:4px 10px; font-family:'Source Code Pro',monospace; font-size:8.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#444; }
  table { width:100%; border-collapse:collapse; }
  th { background:#f0f0ea; border:1px solid #ccc; padding:4px 8px; font-family:'Source Code Pro',monospace; font-size:8px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#555; text-align:left; white-space:nowrap; }
  td { border:1px solid #ccc; padding:5px 8px; font-size:11px; vertical-align:top; }
  tr:nth-child(even) td { background:#fafaf8; }
  tr:hover td { background:#f0f4f8; }
  .cell-id { font-family:'Source Code Pro',monospace; font-size:10px; font-weight:700; color:#1a4a7a; white-space:nowrap; }
  .cell-sz { font-family:'Source Code Pro',monospace; font-size:10.5px; font-weight:700; white-space:nowrap; }
  .grp-tag { font-family:'Source Code Pro',monospace; font-size:9px; font-weight:700; padding:1px 5px; border-radius:2px; display:inline-block; }
  .sig-row { display:flex; flex-wrap:wrap; gap:2px; }
  .sig { font-family:'Source Code Pro',monospace; font-size:8px; font-weight:600; padding:1px 5px; border-radius:2px; white-space:nowrap; border:1px solid; }
  .cell-note { font-size:9.5px; color:#555; line-height:1.45; }
  .bb-sym { font-family:'Source Code Pro',monospace; font-size:10px; font-weight:700; color:#1a4a7a; }
  .flag { font-family:'Source Code Pro',monospace; font-size:8px; font-weight:700; padding:1px 5px; border-radius:2px; border:1px solid; margin-left:4px; }
  .flag-ec { background:#f0f0ea; color:#555; border-color:#bbb; }
  .flag-swi { background:#dde8f4; color:#1a4a7a; border-color:#a8c4e0; }
  .bb-ht { font-family:'Source Code Pro',monospace; font-size:9.5px; font-weight:600; }
  .pwr-sec { border-top:1px solid #ccc; background:#f8f8f5; padding:8px 10px; }
  .pwr-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:6px; margin-top:6px; }
  .pwr-card { background:#fff; border:1px solid #ccc; border-radius:2px; padding:7px 10px; }
  .pwr-lbl { font-family:'Source Code Pro',monospace; font-size:8px; font-weight:700; color:#888; text-transform:uppercase; letter-spacing:.08em; margin-bottom:3px; }
  .pwr-val { font-family:'Source Code Pro',monospace; font-size:10px; font-weight:600; color:#111; line-height:1.4; white-space:pre-line; }
  .gc-note-row { background:#fffbeb; border:1px solid #e8d5a0; border-top:none; padding:6px 10px; }
  .gc-lbl { font-family:'Source Code Pro',monospace; font-size:8px; font-weight:700; color:#9a7a1a; text-transform:uppercase; letter-spacing:.08em; margin-bottom:2px; }
  .gc-text { font-size:10.5px; color:#5a4a1a; line-height:1.5; }
  .sig-block { border:1px solid #ccc; border-top:2px solid #333; margin-top:12px; }
  .sig-row2 { display:grid; grid-template-columns:repeat(4,1fr); }
  .sig-cell { border-right:1px solid #ccc; padding:6px 8px; }
  .sig-cell:last-child { border-right:none; }
  .sig-cell-lbl { font-family:'Source Code Pro',monospace; font-size:8px; color:#888; text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; }
  .sig-line { border-bottom:1px solid #aaa; height:16px; }
  .empty-state { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:400px; gap:14px; color:#888; text-align:center; }
  .empty-state h3 { font-size:15px; font-weight:600; color:#555; }
  .empty-state p { font-size:12px; color:#999; max-width:340px; line-height:1.6; }
  .loading-wrap { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:400px; gap:18px; }
  .loading-ring { width:36px; height:36px; border:3px solid #ddd; border-top-color:#2c3540; border-radius:50%; animation:spin .7s linear infinite; }
  @keyframes spin { to { transform:rotate(360deg); } }
  .ld-step { font-family:'Source Code Pro',monospace; font-size:10px; color:#aaa; }
  .ld-step.cur { color:#2c3540; font-weight:600; }
  .pwr-table td { border:1px solid #ccc; padding:4px 8px; font-size:11px; vertical-align:top; }
  .ckt-num { font-family:'Source Code Pro',monospace; font-size:10px; font-weight:700; color:#1a4a7a; }
  .seq-y { font-family:'Source Code Pro',monospace; font-size:9px; font-weight:700; color:#7a4a1a; }
  .seq-n { font-family:'Source Code Pro',monospace; font-size:9px; color:#888; }
  .ck-in { background:#fff; border:1px solid #ccc; border-radius:1px; padding:2px 6px; font-family:'Source Code Pro',monospace; font-size:10px; color:#111; outline:none; }
`;

export default function App() {
  const [project, setProject] = useState({ name: "", num: "", addr: "", by: "" });
  const [zones, setZones] = useState([]);
  const [tab, setTab] = useState("flow");
  const [status, setStatus] = useState({ badge: "No Project", cls: "badge-blue", file: "No File", fileCls: "badge-blue" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState({});
  const [pdfBase64, setPdfBase64] = useState(null);
  const [textContent, setTextContent] = useState("");
  const fileRef = useRef();

  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const todayShort = new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });

  // ── FILE HANDLING ──
  const handleFile = useCallback((file) => {
    if (!file) return;
    const isPDF = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    setStatus(s => ({ ...s, file: "Reading…", fileCls: "badge-amber" }));

    const reader = new FileReader();
    if (isPDF) {
      reader.onload = (e) => {
        const b64 = e.target.result.split(",")[1];
        setPdfBase64(b64);
        setTextContent("");
        setStatus(s => ({ ...s, file: file.name + " ✓", fileCls: "badge-green" }));
      };
      reader.onerror = () => setStatus(s => ({ ...s, file: "Read error", fileCls: "badge-amber" }));
      reader.readAsDataURL(file);
    } else {
      reader.onload = (e) => {
        setTextContent(e.target.result || "");
        setPdfBase64(null);
        setStatus(s => ({ ...s, file: file.name + " ✓", fileCls: "badge-green" }));
      };
      reader.onerror = () => setStatus(s => ({ ...s, file: "Read error", fileCls: "badge-amber" }));
      reader.readAsText(file);
    }
  }, []);

  // ── GENERATE ──
  const generate = useCallback(async () => {
    if (!project.name && !pdfBase64 && !textContent) {
      alert("Please upload a proposal or enter a project name first.");
      return;
    }
    setLoading(true);
    setError("");

    let userMessage;
    if (pdfBase64) {
      userMessage = [
        { type: "document", source: { type: "base64", media_type: "application/pdf", data: pdfBase64 } },
        { type: "text", text: `Project: "${project.name || "AVL Project"}". Address: "${project.addr}". Analyze this proposal PDF and generate the infrastructure JSON.` }
      ];
    } else if (textContent) {
      userMessage = `Project: ${project.name || "AVL Project"}\nAddress: ${project.addr}\n\nProposal:\n${textContent.substring(0, 9000)}`;
    } else {
      userMessage = `Project: ${project.name}\nAddress: ${project.addr}\n\nTypical worship center AVL new build: main PA, stage floor pockets, FOH, equipment racks, LED wall, distributed audio/video, cameras. Generate appropriate zones.`;
    }

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-beta": "pdfs-2024-09-25"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 5000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }]
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(`API ${res.status}: ${data?.error?.message || res.statusText}`);
      let text = data.content.map(b => b.text || "").join("");
      text = text.replace(/```json|```/g, "").trim();
      const s = text.indexOf("{"), e = text.lastIndexOf("}");
      const parsed = JSON.parse(s >= 0 ? text.substring(s, e + 1) : text);
      setZones(parsed.zones || []);
      setCollapsed({});
      setStatus(s => ({ ...s, badge: project.name || "Generated", cls: "badge-green" }));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, [project, pdfBase64, textContent]);

  const toggleZone = (id) => setCollapsed(c => ({ ...c, [id]: !c[id] }));

  // ── RENDER SIGNAL ──
  const renderSig = (sig, i) => {
    const st = SIG_STYLES[sig.type] || SIG_STYLES.data;
    return <span key={i} className="sig" style={{ background: st.bg, color: st.color, borderColor: st.border }}>{sig.label}</span>;
  };

  // ── FLOW VIEW ──
  const renderFlow = () => {
    if (loading) return (
      <div className="loading-wrap">
        <div className="loading-ring" />
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {["Reading proposal document","Identifying AVL locations & zones","Building conduit groups A/B/C/D/F","Generating box & power schedules","Formatting for GC/EC coordination"].map((s, i) => (
            <div key={i} className={`ld-step${i === 1 ? " cur" : ""}`}>{s}</div>
          ))}
        </div>
      </div>
    );
    if (error) return (
      <div className="empty-state">
        <h3>Generation Error</h3>
        <p style={{ color: "#c84a4a" }}>{error}</p>
        <p>Check that you've filled in the project name and try again.</p>
      </div>
    );
    if (!zones.length) return (
      <div className="empty-state">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        <h3>No Project Loaded</h3>
        <p>Upload a proposal PDF or text file, fill in the project details, then click Generate Infrastructure Guide.</p>
      </div>
    );

    return (<>
      <div className="draw-title">
        <h2>AVL Conduit and Signal Flow — Coordination Guide</h2>
        <div className="draw-title-sub">{project.name || "—"} &nbsp;|&nbsp; JOB #{project.num || "—"} &nbsp;|&nbsp; {today}</div>
      </div>

      <div className="notes-box">
        <div className="notes-title">General Notes for EC</div>
        <div className="notes-body">
          {["CONDUIT SHOWN IS FOR LOW VOLTAGE CONTROL WIRING ONLY. EC TO PROVIDE POWER CONDUIT AS REQUIRED IN ACCORDANCE WITH NEC AND OTHER APPLICABLE CODES.","ALL AVL LOW VOLTAGE CABLE TO BE SUPPLIED, PULLED, AND TERMINATED BY SWI.","ALL CONDUIT SHALL BE EMT (PERFORMANCE GRADE). MAX 3 × 90° BENDS BETWEEN PULL BOXES. PROVIDE PULL CORD IN ALL EMPTY CONDUITS.","ALL BACK BOXES INCLUDING BOXES FOR LOW-VOLTAGE DEVICES MUST BE GROUNDED. MOUNTING HEIGHTS ARE TO CENTER OF DEVICE UNLESS OTHERWISE NOTED.","ALL STAGE, HOUSE LIGHT, AND OTHER AVL CIRCUITS MUST BE TWO-WIRE PLUS ISOLATED GROUND. NO SHARED NEUTRALS WILL BE ALLOWED.","FLOOR POCKETS, CUSTOM PLATES, AND CONNECTOR PANELS SHALL BE PROVIDED BY SWI TO EC FOR INSTALLATION. ALL OTHER BACK BOXES FURNISHED AND INSTALLED BY EC.","REFER TO SWI LOCATION DRAWINGS FOR EXACT BOX SIZES AND MOUNTING HEIGHTS. VERIFY ALL DEVICE PLATE FINISHES WITH ARCHITECT/OWNER."].map((n, i) => (
            <div key={i} className="note-item" data-n={i + 1}>{n}</div>
          ))}
        </div>
      </div>

      <div className="legend">
        {Object.entries(GRP_STYLES).map(([g, s]) => (
          <div key={g} className="legend-item">
            <div className="legend-sw" style={{ background: s.bg, borderColor: s.color }}/>
            <span>GRP {g}{g === "A" ? " — Mic/Line Audio" : g === "B" ? " — Intercom" : g === "C" ? " — Speaker Level" : g === "D" ? " — Video/Data/DMX/Net" : g === "F" ? " — Fiber" : " — Power (separate EC conduit)"}</span>
          </div>
        ))}
      </div>

      {zones.map(z => {
        const isOpen = !collapsed[z.id];
        return (
          <div key={z.id} className="zone-sec">
            <div className="zone-hdr" onClick={() => toggleZone(z.id)}>
              <div className="zone-id">{z.id}</div>
              <div className="zone-name">{z.name}</div>
              <div className="zone-ref">{z.zone} &nbsp;|&nbsp; {z.refSheet || ""}</div>
              <span style={{ color: "rgba(255,255,255,.5)", fontSize: 11, transition: "transform .2s", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "" }}>▾</span>
            </div>
            {isOpen && (<>
              <div className="sched-lbl">Conduit Schedule — Signal Flow</div>
              <table>
                <thead><tr><th style={{width:52}}>ID</th><th style={{width:100}}>Size / GRP</th><th style={{width:120}}>From</th><th style={{width:120}}>To</th><th>Signal Types</th><th>EC Note</th></tr></thead>
                <tbody>{(z.conduits || []).map(c => {
                  const gs = GRP_STYLES[c.grp] || GRP_STYLES.D;
                  return (<tr key={c.id}>
                    <td><span className="cell-id">{c.id}</span></td>
                    <td><span className="cell-sz">{c.size}</span> <span className="grp-tag" style={{ background: gs.bg, color: gs.color }}>GRP {c.grp}</span></td>
                    <td style={{fontSize:11}}>{c.from}</td>
                    <td style={{fontSize:11}}>{c.to}</td>
                    <td><div className="sig-row">{(c.signals || []).map((s, i) => renderSig(s, i))}</div></td>
                    <td><span className="cell-note">{c.note}</span></td>
                  </tr>);
                })}</tbody>
              </table>

              <div className="sched-lbl">Box Schedule — Scale: NO SCALE</div>
              <table>
                <thead><tr><th style={{width:90}}>Symbol</th><th style={{width:30}}>Qty</th><th>Description</th><th>Back Box / Supplied By</th><th style={{width:28}}>Inst.</th><th style={{width:160}}>Mount Height</th><th>Note</th></tr></thead>
                <tbody>{(z.boxes || []).map((b, i) => (
                  <tr key={i}>
                    <td><span className="bb-sym">{b.sym}</span></td>
                    <td style={{textAlign:"center"}}>{b.qty}</td>
                    <td>{b.desc}</td>
                    <td>{b.bb} <span className={`flag ${b.suppBy === "SWI" ? "flag-swi" : "flag-ec"}`}>{b.suppBy === "SWI" ? "SWI" : "EC"}</span></td>
                    <td><span className="flag flag-ec">EC</span></td>
                    <td><span className="bb-ht">{b.height}</span></td>
                    <td><span className="cell-note">{b.note}</span></td>
                  </tr>
                ))}</tbody>
              </table>

              <div className="pwr-sec">
                <div style={{fontFamily:"'Source Code Pro',monospace",fontSize:9,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:".09em"}}>Power Requirements</div>
                <div className="pwr-grid">
                  <div className="pwr-card"><div className="pwr-lbl">Circuits</div><div className="pwr-val">{z.power?.circuits}</div></div>
                  <div className="pwr-card"><div className="pwr-lbl">Est. Load</div><div className="pwr-val">{z.power?.load}</div></div>
                  <div className="pwr-card"><div className="pwr-lbl">Sequenced</div><div className="pwr-val">{z.power?.sequenced}</div></div>
                  <div className="pwr-card"><div className="pwr-lbl">EC Notes</div><div className="pwr-val" style={{fontWeight:400,fontSize:10}}>{z.power?.note}</div></div>
                </div>
              </div>

              <div className="gc-note-row">
                <div className="gc-lbl">GC / Architect Coordination Note</div>
                <div className="gc-text">{z.gcNote}</div>
              </div>
            </>)}
          </div>
        );
      })}

      <div className="sig-block">
        <div className="sig-row2">
          {["Prepared By (SWI)","Reviewed By (SWI)","EC / GC Acknowledged","Date"].map(l => (
            <div key={l} className="sig-cell"><div className="sig-cell-lbl">{l}</div><div className="sig-line"/></div>
          ))}
        </div>
      </div>

      <div style={{textAlign:"center",fontFamily:"'Source Code Pro',monospace",fontSize:10,color:"#999",padding:"14px 0",borderTop:"1px solid #ccc",marginTop:12}}>
        Sweetwater Integration &nbsp;·&nbsp; sweetwaterintegration.com &nbsp;·&nbsp; 806 Beverly Pkwy, Pensacola FL 32505 &nbsp;·&nbsp; Job #{project.num || "—"} &nbsp;·&nbsp; {today}
      </div>
    </>);
  };

  const renderPower = () => {
    if (!zones.length) return <div className="empty-state"><p>Generate a guide first.</p></div>;
    return (<>
      <div className="draw-title"><h2>Power Schedule — AVL Systems</h2><div className="draw-title-sub">{project.name} &nbsp;|&nbsp; JOB #{project.num}</div></div>
      <div className="notes-box"><div className="notes-title">Electrical Power & Grounding — Notes for EC</div><div className="notes-body">
        {["ALL AVL CIRCUITS: 2-WIRE PLUS ISOLATED GROUND. NO SHARED NEUTRALS PER NEC AND SWI STANDARDS.","BRANCH WIRING FROM CTP PANEL BOARDS MUST BE 12 AWG MINIMUM.","EC TO PROVIDE ISOLATED GROUND RECEPTACLES AND BUS BAR IN EACH EQUIPMENT RACK PER SWI RACK DETAIL DRAWINGS.","EC PROVIDES CIRCUIT PIGTAILS INTO EACH EQUIPMENT RACK FOR TERMINATION TO SWI RACK POWER DISTRIBUTION.","SEQUENCED CIRCUITS CONTROLLED BY SWI VIA LYNTEC PANEL OR Q-SYS DRY CONTACT GPI."].map((n, i) => (
          <div key={i} className="note-item" data-n={i + 1}>{n}</div>
        ))}
      </div></div>
      <div className="zone-sec">
        <div className="zone-hdr" style={{cursor:"default"}}><div className="zone-name">POWER COORDINATION SCHEDULE</div><div className="zone-ref">Scale: NTS</div></div>
        <table className="pwr-table">
          <thead><tr><th style={{width:90}}>Zone</th><th>Circuits (per Schedule T0.6)</th><th style={{width:100}}>Est. Load</th><th style={{width:80}}>Sequenced</th><th>EC Notes</th></tr></thead>
          <tbody>{zones.map(z => (
            <tr key={z.id}>
              <td><span className="ckt-num">{z.id}</span><br/><span style={{fontSize:"9.5px",color:"#666"}}>{z.name}</span></td>
              <td style={{fontFamily:"'Source Code Pro',monospace",fontSize:"9.5px",whiteSpace:"pre-line"}}>{z.power?.circuits}</td>
              <td style={{fontSize:11}}>{z.power?.load}</td>
              <td><span className={z.power?.sequenced?.toUpperCase().startsWith("YES") ? "seq-y" : "seq-n"}>{z.power?.sequenced}</span></td>
              <td><span className="cell-note">{z.power?.note}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </>);
  };

  const renderChecklist = () => {
    if (!zones.length) return <div className="empty-state"><p>Generate a guide first.</p></div>;
    let n = 0;
    const rows = zones.flatMap(z => [
      ...( z.conduits || []).map(c => ({ zone: z.id, type: "CONDUIT", task: `Install ${c.size} EMT — ${c.id} — ${c.from} → ${c.to}` })),
      ...(z.boxes || []).map(b => ({ zone: z.id, type: `BB${b.suppBy === "SWI" ? " (SWI)" : ""}`, task: `${b.sym} ×${b.qty} — ${b.desc} — ${b.height}` })),
      { zone: z.id, type: "POWER", task: `EC provides: ${z.power?.circuits?.split("\n")[0] || ""}` }
    ]);
    return (<>
      <div className="draw-title"><h2>GC / EC Pre-Construction Checklist</h2><div className="draw-title-sub">{project.name} &nbsp;|&nbsp; JOB #{project.num} &nbsp;|&nbsp; All items must be complete before SWI mobilization</div></div>
      <div className="notes-box"><div className="notes-title">Instructions</div><div className="notes-body">
        {["CHECK OFF EACH ITEM AS COMPLETED. ENTER INITIALS AND DATE IN COLUMNS PROVIDED.","SWI TO CONDUCT ROUGH-IN INSPECTION BEFORE PULLING ANY AVL CABLE.","ITEMS MARKED BB (SWI) = BACK BOX SUPPLIED BY SWI, INSTALLED BY EC. ALL OTHERS BY EC."].map((m, i) => (
          <div key={i} className="note-item" data-n={i + 1}>{m}</div>
        ))}
      </div></div>
      <div className="zone-sec">
        <div className="zone-hdr" style={{cursor:"default"}}><div className="zone-name">Pre-Construction Task List</div></div>
        <table>
          <thead><tr><th style={{width:28}}>✓</th><th style={{width:28}}>#</th><th style={{width:60}}>Zone</th><th style={{width:80}}>Type</th><th>Task</th><th style={{width:60}}>By</th><th style={{width:80}}>Date</th></tr></thead>
          <tbody>{rows.map((it, i) => (
            <tr key={i}>
              <td><input type="checkbox" style={{cursor:"pointer"}}/></td>
              <td style={{fontFamily:"'Source Code Pro',monospace",fontSize:9,color:"#999"}}>{i + 1}</td>
              <td><span className="grp-tag" style={{background:"#e8eae5",color:"#2c3540"}}>{it.zone}</span></td>
              <td><span className="grp-tag" style={{background:"#f0f0ea",color:"#555",border:"1px solid #ccc"}}>{it.type}</span></td>
              <td style={{fontSize:11}}>{it.task}</td>
              <td><input className="ck-in" type="text" placeholder="by" style={{width:48}}/></td>
              <td><input className="ck-in" type="text" placeholder="date" style={{width:72}}/></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="sig-block">
        <div className="sig-row2">
          {["GC Representative","EC Representative","SWI Project Manager","Date of Inspection"].map(l => (
            <div key={l} className="sig-cell"><div className="sig-cell-lbl">{l}</div><div className="sig-line"/></div>
          ))}
        </div>
      </div>
    </>);
  };

  const tabNums = { flow: "T-AV1", power: "T-AV2", checklist: "GC-01" };

  return (<>
    <style>{css}</style>
    <div className="app">
      {/* TOPBAR */}
      <div className="topbar">
        <img src={`data:image/png;base64,${LOGO}`} alt="SWI"/>
        <div className="topbar-title">AVL Infrastructure Guide Generator</div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span className={`badge ${status.cls}`}>{status.badge}</span>
          <span className={`badge ${status.fileCls}`}>{status.file}</span>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sb-block">
          <div className="sb-head">Upload Proposal</div>
          <label className="upload-btn" style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{opacity:.5,flexShrink:0}}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/></svg>
            <span>Choose PDF or Text file…</span>
            <input ref={fileRef} type="file" accept=".pdf,.txt,.md" style={{display:"none"}} onChange={e => handleFile(e.target.files[0])}/>
          </label>
          <div className="upload-hint">Click to browse or drag & drop</div>
          <div
            style={{marginTop:6,padding:"6px 8px",border:"1px dashed #ccc",borderRadius:2,fontSize:10,color:"#aaa",textAlign:"center"}}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          >drag PDF here</div>
        </div>

        <div className="sb-block">
          <div className="sb-head">Project Info</div>
          {[["name","Project / Venue","Calvary Chapel FourteenSix"],["num","Job #","2404"],["addr","Address","City, State"],["by","Prepared By","Joseph Milne"]].map(([k, label, ph]) => (
            <div key={k} className="field">
              <label>{label}</label>
              <input type="text" placeholder={ph} value={project[k]} onChange={e => setProject(p => ({ ...p, [k]: e.target.value }))}/>
            </div>
          ))}
        </div>

        <div className="sb-block" style={{flex:1,overflowY:"auto",padding:0}}>
          <div className="sb-head" style={{padding:"8px 14px 4px",borderBottom:"1px solid #ddd"}}>Zones</div>
          <div className="sb-nav">
            {zones.length === 0 && <div style={{padding:"10px 14px",fontSize:11,color:"#aaa"}}>Generate a guide to see zones here.</div>}
            {zones.map(z => (
              <div key={z.id} className="nav-item" onClick={() => {
                setTab("flow");
                setTimeout(() => document.getElementById("zone-" + z.id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
              }}>
                <span style={{flex:1}}>{z.name}</span>
                <span className="nav-sym">{z.id}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sb-foot">
          <button className="draw-btn btn-gen" onClick={generate} disabled={loading}>
            {loading ? "Generating…" : "Generate Infrastructure Guide"}
          </button>
          <button className="draw-btn btn-ghost" onClick={() => window.print()}>Print / Export PDF</button>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">
        <div className="sheet-tabs">
          {[["flow","T-AV  Signal Flow"],["power","T-AV  Power Schedule"],["checklist","GC Checklist"]].map(([id, label]) => (
            <div key={id} className={`tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>{label}</div>
          ))}
        </div>
        <div className="sheet-area">
          <div className="sheet">
            {/* TITLE BLOCK */}
            <div className="title-block">
              <div className="tb-logo-area">
                <img src={`data:image/png;base64,${LOGO}`} className="tb-logo" alt="SWI"/>
              </div>
              <div className="tb-sec"><div className="tb-lbl">Address</div><div className="tb-val" style={{fontSize:8}}>806 Beverly Pkwy<br/>Pensacola, FL 32505</div></div>
              <div className="tb-sec"><div className="tb-lbl">Project</div><div className="tb-val" style={{fontSize:8}}>{project.name || "—"}</div></div>
              <div className="tb-sec"><div className="tb-lbl">Prepared By</div><div className="tb-val" style={{fontSize:8}}>{project.by || "—"}</div></div>
              <div className="tb-sec"><div className="tb-lbl">Job #</div><div className="tb-val" style={{fontSize:8}}>#{project.num || "—"}</div></div>
              <div className="tb-sec"><div className="tb-lbl">Date</div><div className="tb-val" style={{fontSize:8}}>{todayShort}</div></div>
              <div className="tb-sec" style={{flex:1}}><div className="tb-lbl">Issued For</div><div className="tb-val" style={{fontSize:8}}>SCHEMATIC DESIGN<br/>GC/EC COORDINATION</div></div>
              <div className="tb-sheetnum">{tabNums[tab]}</div>
            </div>

            {/* CONTENT */}
            <div className="sheet-content">
              {tab === "flow" && renderFlow()}
              {tab === "power" && renderPower()}
              {tab === "checklist" && renderChecklist()}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}
