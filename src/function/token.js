function token(req, res) {
  if (req.method === "POST") {
    req.on("data", (data) => {
      data.chunk();
    });
  }
}
