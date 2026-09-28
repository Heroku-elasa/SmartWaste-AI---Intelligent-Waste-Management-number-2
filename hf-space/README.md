---
title: GreenPars RAG Assistant
emoji: ♻️
colorFrom: green
colorTo: blue
sdk: gradio
sdk_version: 5.49.1
app_file: app.py
pinned: false
license: mit
short_description: RAG advisor for plastic recycling & waste-to-energy (FA/EN/TR)
---
# GreenPars RAG Assistant
Trilingual (Persian / English / Turkish) RAG chatbot over the GreenPars business-plan reports (plastic waste → recycled granule, waste-to-energy/RDF, funding, sanctions, Turkish partners).
Retrieval: IDF keyword retriever over 130 chunks (`chunks.json`) · LLM: Qwen2.5-72B-Instruct via HF Inference Providers.
Dashboard: https://github.com/SBZ-EDU/GreenPars-SmartWaste
