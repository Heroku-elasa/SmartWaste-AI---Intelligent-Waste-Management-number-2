// Adds HTTP Range (206) support for videos — required by Safari/iOS to play MP4.
export async function onRequestGet({ request, env }) {
  const res = await env.ASSETS.fetch(new Request(new URL(request.url).toString()));
  if (!res.ok) return res;
  const type = res.headers.get('content-type') || 'video/mp4';
  const range = request.headers.get('range');
  const buf = await res.arrayBuffer();
  const size = buf.byteLength;
  const base = { 'content-type': type, 'accept-ranges': 'bytes', 'cache-control': 'public, max-age=86400' };
  const m = range && range.match(/bytes=(\d*)-(\d*)/);
  if (!m) return new Response(buf, { headers: { ...base, 'content-length': String(size) } });
  let start = m[1] ? +m[1] : size - +m[2], end = m[1] && m[2] ? +m[2] : size - 1;
  if (!m[1]) end = size - 1;
  if (start >= size || start > end) return new Response(null, { status: 416, headers: { 'content-range': `bytes */${size}` } });
  end = Math.min(end, size - 1);
  return new Response(buf.slice(start, end + 1), { status: 206, headers: { ...base, 'content-range': `bytes ${start}-${end}/${size}`, 'content-length': String(end - start + 1) } });
}
