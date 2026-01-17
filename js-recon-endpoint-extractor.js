const fs = require("fs");

console.log("=========================================");
console.log("JS Recon Endpoint Extractor");
console.log("=========================================");

const url = process.argv[2];

if (!url) {
  console.log("Usage: node js_recon.js <url>");
  process.exit(1);
}

(async () => {
  let output = "";
  output += `Target: ${url}\n\n`;

  const res = await fetch(url);
  const html = await res.text();

  const jsRegex = /src="([^"]+\.js)"/g;
  let jsFiles = [];
  let match;

  while ((match = jsRegex.exec(html)) !== null) {
    jsFiles.push(match[1]);
  }

  output += "JS Files Found:\n";
  jsFiles.forEach(js => {
    output += `- ${js}\n`;
  });

  output += "\nExtracted Endpoints:\n";

  const endpointRegex = /\/api\/[a-zA-Z0-9/_-]+/g;

  for (let js of jsFiles) {
    let fullUrl = js.startsWith("http") ? js : url + js;

    try {
      let r = await fetch(fullUrl);
      let content = await r.text();

      let endpoints = content.match(endpointRegex);

      if (endpoints) {
        output += `\n[${js}]\n`;
        endpoints.forEach(e => {
          output += `  ${e}\n`;
        });
      }
    } catch (e) {
      output += `\n[Failed to fetch ${js}]\n`;
    }
  }

  fs.writeFileSync("recon_output.txt", output);

  console.log("[+] Recon complete. Output saved to recon_output.txt");
  console.log("=========================================");
  console.log("Developed by sudo_0xksh");
  console.log("=========================================");
})();
