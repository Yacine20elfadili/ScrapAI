# ScrapAI - Website Content Scraper & AI Analyzer

A Node.js application that scrapes website content and uses Google's Gemini AI to generate intelligent summaries and analyses.

## Setup Your PC

---

### Step 1: Do you have Node.js?

Press `Win + R`, type `cmd` and enter, then run:

```bash
node -v
```

If you have `v18.x.x` then you are good to go to step 2. If not, install Node.js from [Node.js](https://nodejs.org/en/download) %% watch YouTube video tutorial about [how to set it up](https://www.youtube.com/results?search_query=how+to+setup+node+js+on+windows) %%

---

### Step 2 (last): Do you have git?

Press `Win + R`, type `cmd` and enter, then run:

```bash
git --version
```

If you have `git version 2.x.x` then you are good to go. If not, install Git from [Git](https://git-scm.com/downloads) %% watch YouTube video tutorial about [how to set it up](https://www.youtube.com/results?search_query=how+to+setup+git+on+windows) %%

---

## Setup Files

---

Press `Win + R`, type `cmd` and enter, then run:

```bash
cd desktop
```

```bash
git clone https://github.com/Yacine20elfadili/ScrapAI.git
```

Now on Desktop, you should see a new folder called 'ScrapAI'.

---

## Setup Keys and Configuration

Go to 'ScrapAI', enter it. Select **address bar** (or **path bar**) and type `cmd` and enter - a cmd window will appear, keep it through the following steps:

---

### Step 1:

Look for a website you want to scrape > go to main page > copy link then run in the cmd:

```bash
echo WEBSITE_URL="https://example.com/" > .env
```

%% replace (https://example.com/) with the link you copied %%

---

### Step 2 (last):

To get Gemini API key you need to go here [GeminiAPI](https://aistudio.google.com/apikey). Click on `Create API key` button. Select `Gemini API` and click `Create API key in existing project` then copy the key and save it in a safe place, do not share it with others!!! Then run in the cmd:

```bash
echo API_KEY="ABCDEFGHIJKLMNOPQRSTUVWXYZ" >> .env
```

%% replace (ABCDEFGHIJKLMNOPQRSTUVWXYZ) with the Key you copied %%

---

## Setup Library

In the cmd that you still have, run:

```bash
npm install puppeteer-real-browser @google/genai dotenv
```

If you do not have a file called `package.json` then run:

```bash
npm init -y
```

Add this line:

```bash
"type": "module",
```

after the `"main":"xxxxx",`

%% keep the cmd open for the next step %%

---

## Run a Test

In the same cmd that you have still open, run:

```bash
node ScrapAI.js
```

And watch the magic!!!! If you have some error ask ChatGPT not me ^-^

After it finishes, close the cmd window and check your home directory for the generated files:
- `DD-MM-YYYY_content.txt` - Raw scraped content
- `DD-MM-YYYY_resume.txt` - AI-generated summary

## What This Does

- **Web Scraping**: Extracts complete text content from any website
- **AI Analysis**: Uses Google Gemini 2.5 Pro to analyze and summarize website content
- **Real Browser**: Uses Puppeteer with real browser fingerprinting to avoid detection
- **File Output**: Saves both raw content and AI-generated summaries to your home directory

## License

MIT License

## Author

Mohamed Yacine Elfadili

---

**Note**: This tool is for educational and legitimate research purposes. Please respect website terms of service.
