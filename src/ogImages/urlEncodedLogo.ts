import fs from "fs";

const LOGO_FILE = "./src/assets/logo.png";

// Read the logo file as a binary buffer
const pngBuffer = fs.readFileSync(LOGO_FILE);
// Convert the binary buffer to a base64 string
const encodedPNG = "data:image/png;base64," + pngBuffer.toString("base64");

export default encodedPNG;
