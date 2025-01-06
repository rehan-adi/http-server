export function parseRequest(data: Buffer) {
  const requestString = data.toString();
  console.log(requestString);

  const lines = requestString.split("\r\n");

  // Extract request line (Method, Path)
  const [method, path] = lines[0].split(" ");

  if (!["GET"].includes(method)) {
    throw new Error(`405 Method Not Allowed: ${method}`);
  }

  // Extract headers
  const headers: any = {};
  for (let i = 1; i < lines.length; i++) {
    const [key, value] = lines[i].split(": ");
    if (key && value) {
      headers[key] = value;
    } else {
      throw new Error("400 Bad Request: Malformed Header");
    }
  }

  return { method, path, headers };
}
