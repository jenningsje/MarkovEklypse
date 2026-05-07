document.getElementById('runLightdock').addEventListener('click', async function (event) {
  event.preventDefault();

  const payload = { query: "sent response" };
  const statusEl = document.getElementById("status"); // optional UI element

  async function sendRequest(url, backendName, timeoutMs = 60000) { // 60s timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
  
      const text = await response.text();
      clearTimeout(timeout);
  
      let data;
      try { data = JSON.parse(text); } catch { data = null; }
  
      if (!response.ok) {
        console.error(`❌ ${backendName} responded with HTTP ${response.status}`);
        throw new Error(`${backendName} HTTP error ${response.status}`);
      }
  
      if (data && data.error) {
        console.error(`❌ ${backendName} reported an error:`, data.error);
        throw new Error(`${backendName} error: ${data.error}`);
      }
  
      console.log(`✅ ${backendName} handled query:`, data || text);
      return data || text;
  
    } catch (err) {
      clearTimeout(timeout);
      console.error(`❌ ${backendName} request failed:`, err);
      if (statusEl) statusEl.innerText = `❌ ${backendName} request failed: ${err.message}`;
      throw err;
    }
  }
  
  try {
    await sendRequest("https://localhost/server_one/html/simulate", "Node server");
    await sendRequest("https://localhost/receive_signal/html/simulate", "Flask server");

    if (statusEl) statusEl.innerText = "✅ Lightdock run completed successfully!";
  } catch (err) {
    // Already logged inside sendRequest
    if (statusEl) statusEl.innerText = `❌ Lightdock run failed: ${err.message}`;
  }
});
