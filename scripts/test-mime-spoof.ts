import fs from "fs";

async function main() {
  const file = fs.readFileSync(
    "mime-spoof-test.pdf",
  );

  const form = new FormData();

  form.append(
    "file",
    new Blob([file], {
      type: "text/plain",
    }),
    "mime-spoof-test.pdf",
  );

  const response = await fetch(
    "http://localhost:3000/chat/cmsr3cmqy0001i2b4iq9twelb",
    {
      method: "POST",
      body: form,
    },
  );

  console.log("Status:", response.status);
  console.log(
    "Response:",
    await response.text(),
  );
}

main().catch(console.error);