// Import required modules
import { connect } from "puppeteer-real-browser";
import fs from "fs";
import path from "path";
// for Gemini
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// load environment variables
dotenv.config({ path: ".env" });


const website_url = process.env.WEBSITE_URL;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, });

// Configuration constants
const OUTPUT_DIR = path.join(process.env.USERPROFILE || process.env.HOME);


function generateDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0") + "-";
  const month = String(today.getMonth() + 1).padStart(2, "0") + "-";
  const year = today.getFullYear();
  return `${day}${month}${year}`;
  
}

async function generateContentWithRetry(ai , content , retries = 0) {
  try {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: `waht is this website is about? [${content}]  `,
});
    return response.text;
  } catch (error) {
    if (error.message.includes("503") && retries < MAX_RETRIES) {
      console.log(`Attempt ${retries + 1} failed. Retrying in ${RETRY_DELAY/1000} seconds...`);
      await delay(RETRY_DELAY);
      return generateContentWithRetry(ai , content , retries + 1);
    }
    throw error;
  }
}

async function main() {
  try {
    const theURL = website_url ;

    // Initialize browser
    console.log("Connecting to browser...");
    const { browser, page } = await connect({
      headless: true,
      fingerprint: true,
      turnstile: true,
      tf: true,
    });
    
    await page.goto(theURL, { waitUntil: "networkidle2", timeout: 90000 }); // 1 min and 30 sec

    const content = await page.evaluate(() => document.body.innerText);
    console.log("Whole page content extracted successfully!");

    const ContentPath =  OUTPUT_DIR + '/' + generateDate() + '_' + "content.txt";
    const resumePath =  OUTPUT_DIR + '/' + generateDate() + '_' + "resume.txt";

    try {
      fs.writeFileSync(ContentPath, content, "utf-8");

      const resumeContent = await generateContentWithRetry(ai , content);

      fs.writeFileSync(resumePath, resumeContent, "utf-8");

      console.log("Resume generated successfully!");


    } catch (error) {
      console.error("Failed to generate resume :", error.message);
      process.exit(1);
    }
    
    // Clean up
    await page.close();
    await browser.close();
    console.log("Browser closed. Script completed successfully.");
    
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

main();