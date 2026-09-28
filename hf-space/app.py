import os, json, math, re
import gradio as gr
from huggingface_hub import InferenceClient

CHUNKS = json.load(open("chunks.json", encoding="utf-8"))
MODEL = os.getenv("AI_MODEL", "Qwen/Qwen2.5-72B-Instruct")
client = InferenceClient(token=os.getenv("HF_TOKEN"))

def norm(s):
    s = s.lower().translate(str.maketrans("۰۱۲۳۴۵۶۷۸۹يك", "0123456789یک")).replace("\u200c", " ")
    return [w for w in re.split(r"[^\w]+", s) if len(w) > 1]

DOCS = [set(norm(c["title"] + " " + c["text"])) for c in CHUNKS]
DF = {}
for d in DOCS:
    for w in d: DF[w] = DF.get(w, 0) + 1
N = len(DOCS)

def detect(q):
    if re.search(r"[\u0600-\u06FF]", q): return "fa"
    if re.search(r"[çğışöüÇĞİŞÖÜ]", q): return "tr"
    return "en"

def retrieve(q, k=4):
    lang, qs = detect(q), set(norm(q))
    scored = []
    for c, d in zip(CHUNKS, DOCS):
        s = sum(math.log(1 + N / DF[w]) for w in qs if w in d)
        if c["lang"] == lang: s *= 1.3
        if s > 0: scored.append((s, c))
    return [c for _, c in sorted(scored, key=lambda x: -x[0])[:k]]

SYSTEM = """You are "GreenPars Assistant", advisor for GreenPars (Pars Granule Sabz): plastic-waste-to-recycled-granule plants in Iran plus a waste-to-energy/RDF extension.
Answer in the user's language (Persian, English or Turkish), concise and honest about risks. Show money in Toman AND USD (1 USD = 235,000 Toman, 28 Sep 2026).
Core facts: pilot 400 kg/h by Pendar Polymer, capex 31 bn Toman (~$132k); payback base 5.3 yrs, target 2.1, pessimistic never. Funding: founders 31%, Pendar 21%, Environment Fund 32%, crowdfunding 16%. 10 cities: 715 bn Toman ($3.0M). WtE tariff 55,500 rial/kWh (~$0.024): stand-alone plant not bankable; two SPVs + feedstock contract, sponsor 15-25% non-controlling, RDF for cement first.
Use CONTEXT excerpts and cite them like [report]. Never invent contacts or guarantees."""

def chat(message, history):
    hits = retrieve(message)
    ctx = "\n---\n".join(f"[{h['title']}] {h['text']}" for h in hits)[:5000]
    msgs = [{"role": "system", "content": SYSTEM + "\n\nCONTEXT:\n" + ctx}]
    for m in history[-8:]:
        msgs.append({"role": m["role"], "content": m["content"]})
    msgs.append({"role": "user", "content": message})
    out = ""
    for part in client.chat_completion(msgs, model=MODEL, max_tokens=700, temperature=0.3, stream=True):
        if part.choices and part.choices[0].delta.content:
            out += part.choices[0].delta.content
            yield out
    if hits:
        yield out + "\n\n📚 " + " · ".join(dict.fromkeys(h["title"] for h in hits))

demo = gr.ChatInterface(
    chat, type="messages",
    title="♻️ GreenPars AI — پارس گرانول سبز",
    description="دستیار RAG طرح بازیافت پلاستیک به گرانول و پسماند به انرژی · Plastic recycling & WtE advisor · Geri dönüşüm danışmanı (FA/EN/TR)",
    examples=["دوره بازگشت سرمایه پایلوت چقدر است؟", "Is sponsoring a waste-to-energy plant a good deal?", "Türk yatırımcı için yaptırım riskleri nelerdir?", "ترکیب تأمین مالی ۳۱ میلیاردی چیست؟"],
)
if __name__ == "__main__":
    demo.launch()
