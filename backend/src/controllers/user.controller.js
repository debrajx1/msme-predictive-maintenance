export async function ping(req, res) {
  res.json({ ok: true, service: "backend" });
}
