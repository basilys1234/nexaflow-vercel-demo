import React, { useState, useRef, useEffect } from "react";

export default function NexaFlowClinicChatbotDemo() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Γεια σας! Είμαι ο NexaFlow βοηθός της κλινικής. Μπορώ να σας βοηθήσω με ώρες λειτουργίας, κόστος υπηρεσιών ή να κλείσουμε ραντεβού." },
  ]);
  const [input, setInput] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [booking, setBooking] = useState({ name: "", phone: "", service: "Γενική επίσκεψη", date: "", time: "", notes: "" });
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, showBooking]);

  const quickReplies = [
    { label: "Ώρες λειτουργίας", value: "Τι ώρες λειτουργείτε;" },
    { label: "Κόστος", value: "Πόσο κοστίζει η επίσκεψη;" },
    { label: "Τοποθεσία", value: "Πού βρίσκεστε;" },
    { label: "Κλείσιμο ραντεβού", value: "Θέλω να κλείσω ραντεβού" },
  ];

  function addBot(text){ setMessages(m=>[...m,{role:"bot",text}]); }
  function addUser(text){ setMessages(m=>[...m,{role:"user",text}]); }

  function handleUserMessage(text){
    if(!text.trim()) return;
    addUser(text); setBusy(true);
    setTimeout(()=>{
      const t = text.toLowerCase();
      if (t.includes("ωρ") || t.includes("λειτουργ") || t.includes("ανοιχτ")) {
        addBot("Λειτουργούμε Δευτέρα–Παρασκευή 08:30–20:00 και Σάββατο 09:00–14:00. Για επείγοντα, καλέστε στο 210 000 0000.");
      } else if (t.includes("κοσ") || t.includes("τιμη") || t.includes("πόσο") || t.includes("ποσο")) {
        addBot("Ενδεικτικές τιμές: Γενική επίσκεψη 50€, Αιματολογικός έλεγχος 35€, Δερματολογική αξιολόγηση 70€. Ζητήστε προσφορά για εξειδικευμένες υπηρεσίες.");
      } else if (t.includes("που") || t.includes("ποῦ") || t.includes("που βρισ") || t.includes("τοποθ")) {
        addBot("Βρισκόμαστε στην Αθήνα, Κεντρική Οδός 12, 4ος όροφος. Δίπλα στο μετρό \"Σύνταγμα\". Να σας στείλω χάρτη;");
      } else if (t.includes("ραντεβ")) {
        setShowBooking(true); addBot("Υπέροχα! Ας κλείσουμε ραντεβού σε 1′. Συμπληρώστε τα στοιχεία σας.");
      } else if (t.includes("email") || t.includes("επικοιν")) {
        addBot("Μπορείτε να επικοινωνήσετε στο info@clinic-demo.gr ή στο 210 000 0000. Χαρά μας να βοηθήσουμε!");
      } else {
        addBot("Μπορώ να βοηθήσω με ώρες λειτουργίας, κόστος, τοποθεσία ή να κλείσουμε ραντεβού. Τι θα προτιμούσατε;");
      }
      setBusy(false);
    }, 600);
  }

  function handleSubmit(e){ e.preventDefault(); handleUserMessage(input); setInput(""); }

  function submitBooking(e){
    e.preventDefault(); setBusy(true);
    setTimeout(()=>{
      setShowBooking(false);
      addBot(`Λάβαμε το αίτημά σας για ραντεβού: ${booking.service} στις ${booking.date} ${booking.time}. Θα σας καλέσουμε στο ${booking.phone} για επιβεβαίωση. Ευχαριστούμε!`);
      setBusy(false);
      setBooking({ name: "", phone: "", service: "Γενική επίσκεψη", date: "", time: "", notes: "" });
    }, 900);
  }

  const styles = {
    wrap:{minHeight:"100vh",display:"flex",justifyContent:"center",padding:"24px",background:"#f3f4f6"},
    card:{width:"100%",maxWidth:420,background:"#fff",border:"1px solid #e5e7eb",borderRadius:16,boxShadow:"0 10px 30px rgba(2,6,23,.08)",display:"flex",flexDirection:"column",height:"70vh",overflow:"hidden"},
    header:{display:"flex",alignItems:"center",gap:12,marginBottom:12},
    logo:{height:40,width:40,borderRadius:12,background:"#1e3a8a",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700},
    bar:{padding:"10px 14px",borderBottom:"1px solid #e5e7eb",background:"linear-gradient(90deg,#eff6ff,#dbeafe)",fontSize:14,color:"#374151"},
    msgs:{flex:1,overflow:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:10},
    msg:{maxWidth:"85%",padding:"10px 14px",borderRadius:16,fontSize:14,lineHeight:1.35},
    bot:{background:"#f3f4f6",color:"#0f172a",alignSelf:"flex-start"},
    user:{background:"#1e3a8a",color:"#fff",alignSelf:"flex-end",maxWidth:"80%"},
    quick:{display:"flex",flexWrap:"wrap",gap:8,padding:"0 14px 10px"},
    qbtn:{fontSize:12,padding:"8px 10px",borderRadius:999,border:"1px solid #c7d2fe",background:"#eef2ff",color:"#1e3a8a",cursor:"pointer"},
    input:{display:"flex",gap:8,padding:12,borderTop:"1px solid #e5e7eb"},
    text:{flex:1,border:"1px solid #e5e7eb",borderRadius:12,padding:"10px 12px",fontSize:14},
    send:{background:"#1e3a8a",color:"#fff",border:"none",borderRadius:12,padding:"10px 14px",fontSize:14,cursor:"pointer"},
    sheet:{position:"fixed",inset:0,background:"rgba(0,0,0,.35)",display:"flex",alignItems:"flex-end",justifyContent:"center"},
    panel:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:"16px 16px 0 0",maxWidth:420,width:"100%",padding:16},
    row:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},
    field:{width:"100%",border:"1px solid #e5e7eb",borderRadius:10,padding:10}
  };

  return (
    <div style={styles.wrap}>
      <div style={{width:"100%",maxWidth:520}}>
        <div style={styles.header}>
          <div style={styles.logo}>N</div>
          <div>
            <div style={{fontWeight:700}}>NexaFlow – Clinic Chatbot Demo</div>
            <div style={{fontSize:12,color:"#6b7280"}}>Ενδεικτική επίδειξη στα ελληνικά • Mobile-friendly</div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.bar}>Δοκιμάστε γρήγορες επιλογές ή γράψτε την ερώτησή σας. Ιδανικό για κλινικές & ιατρεία στην Αθήνα.</div>
          <div style={styles.msgs}>
            {messages.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                <div style={{...styles.msg,...(m.role==="user"?styles.user:styles.bot)}}>{m.text}</div>
              </div>
            ))}
            {busy && <div style={{...styles.msg,...styles.bot}}>Ο βοηθός πληκτρολογεί…</div>}
            <div ref={bottomRef} />
          </div>

          <div style={styles.quick}>
            {quickReplies.map(q=>(<button key={q.value} style={styles.qbtn} onClick={()=>handleUserMessage(q.value)}>{q.label}</button>))}
          </div>

          <form style={styles.input} onSubmit={handleSubmit}>
            <input style={styles.text} placeholder="Γράψτε εδώ… π.χ. Θέλω να κλείσω ραντεβού" value={input} onChange={e=>setInput(e.target.value)} />
            <button type="submit" style={styles.send}>Αποστολή</button>
          </form>
        </div>

        {showBooking && (
          <div style={styles.sheet}>
            <div style={styles.panel}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{fontWeight:600,fontSize:18}}>Κλείσιμο ραντεβού</div>
                <button onClick={()=>setShowBooking(false)} aria-label="Close" style={{background:"transparent",border:"none",fontSize:18,cursor:"pointer"}}>✕</button>
              </div>
              <form onSubmit={submitBooking}>
                <div style={styles.row}>
                  <div>
                    <div style={{fontSize:12,marginBottom:4}}>Ονοματεπώνυμο</div>
                    <input required style={styles.field} value={booking.name} onChange={e=>setBooking({...booking,name:e.target.value})} />
                  </div>
                  <div>
                    <div style={{fontSize:12,marginBottom:4}}>Τηλέφωνο</div>
                    <input required style={styles.field} value={booking.phone} onChange={e=>setBooking({...booking,phone:e.target.value})} />
                  </div>
                </div>
                <div>
                  <div style={{fontSize:12,marginBottom:4}}>Υπηρεσία</div>
                  <select style={styles.field} value={booking.service} onChange={e=>setBooking({...booking,service:e.target.value})}>
                    <option>Γενική επίσκεψη</option>
                    <option>Δερματολογικός έλεγχος</option>
                    <option>Οδοντιατρικός καθαρισμός</option>
                    <option>Γυναικολογική εξέταση</option>
                    <option>Καρδιολογικός έλεγχος</option>
                  </select>
                </div>
                <div style={styles.row}>
                  <div>
                    <div style={{fontSize:12,marginBottom:4}}>Ημερομηνία</div>
                    <input type="date" required style={styles.field} value={booking.date} onChange={e=>setBooking({...booking,date:e.target.value})} />
                  </div>
                  <div>
                    <div style={{fontSize:12,marginBottom:4}}>Ώρα</div>
                    <input type="time" required style={styles.field} value={booking.time} onChange={e=>setBooking({...booking,time:e.target.value})} />
                  </div>
                </div>
                <div>
                  <div style={{fontSize:12,marginBottom:4}}>Σημειώσεις (προαιρετικό)</div>
                  <textarea rows="3" style={styles.field} value={booking.notes} onChange={e=>setBooking({...booking,notes:e.target.value})}></textarea>
                </div>
                <button type="submit" style={{...styles.send, width:"100%",marginTop:8}}>Υποβολή αιτήματος</button>
                <div style={{fontSize:12,color:"#64748b",marginTop:6}}>* Demo: τα στοιχεία δεν αποθηκεύονται – στην κανονική υλοποίηση συνδέεται με ημερολόγιο/CRM.</div>
              </form>
            </div>
          </div>
        )}

        <div style={{marginTop:10,textAlign:"center",fontSize:12,color:"#64748b"}}>© {new Date().getFullYear()} NexaFlow • Demo παρουσίαση</div>
      </div>
    </div>
  );
}
