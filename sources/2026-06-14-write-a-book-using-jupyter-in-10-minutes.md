---
title: "Write a book using Jupyter in 10 minutes"
source: "https://levelup.gitconnected.com/write-a-book-using-jupyter-in-10-minutes-6da6fe916d77"
author:
  - "[[Prakhar Rathi]]"
published: 2026-06-08
created: 2026-06-14
description: "Write a Book Using Jupyter in 10 minutes From .ipynb to the internet — no web dev required If you’re stuck behind a paywall, use my friend link to access this article. Data scientists don’t …"
tags:
  - "clippings"
---
![A book with a coffee next to it and glasses above it.](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*fUIvjUqyc8hA9Zbm)

Photo by Sincerely Media on Unsplash

## From.ipynb to the internet — no web dev required

*If you’re stuck behind a paywall, use my* [*friend link*](https://levelup.gitconnected.com/write-a-book-using-jupyter-in-10-minutes-6da6fe916d77?sk=3854d7fa8eb50b8e3c5eb8fd35323ef5) *to access this article.*

Data scientists don’t like writing documentation. I’ll say it. We’ll spend three days tuning hyperparameters but won’t spend three minutes writing down what the model actually does. I was no different — my notebooks lived and died on my local machine, seen by no one.  
But what if your notebook was the documentation? What if you could take the.ipynb files you’re already writing, mix them with some Markdown, and publish a proper online book *(with live outputs, a sidebar, chapters, everything )* without touching a single web framework?

That’s Quarto. And it takes under 10 minutes to set up. Start your stopwatches!

## What is Quarto?

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*u3MsCuC-RKoNAolp.jpeg)

Quarto from Quarto.org

Quarto is an open-source publishing system built by Posit (the folks behind RStudio) that lets you create books, websites, reports, and documentation from `.ipynb` notebooks and Markdown files. Unlike Jupyter Book, which requires both Python and Node.js, Quarto is a single self-contained install — and GitHub Pages deployment is first-class and well-documented.

The output is a fully static HTML website that can be deployed to GitHub Pages, Netlify, or any static hosting provider without any server. Think of it as a bridge between the exploratory, notebook-first world of data science and the structured, readable world of books, websites, and documentation.

> C **aveat:** Quarto is a build tool that takes your existing notebooks as input and renders them into a navigable, styled website. You write in your usual environment; the book is the published output.

If you want to see an example site, you can review [the one I built](https://prakharrathi25.github.io/wise-case-study/) using Quarto.

Okay, so on to the interesting bit!

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*WACX4Tq9DS3uqm69)

Photo by Stanislav on Unsplash

## Set Up a Book in Under 10 Minutes

Install the prerequisites, prepare a project, and you have a working book immediately:

### 1\. Prerequisites

Unlike Jupyter Book, Quarto is a single install — no Node.js, no separate build toolchain. You need:

- **Quarto CLI** — the core tool that does all the rendering. Download the latest installer for your OS from [quarto.org/docs/get-started](https://quarto.org/docs/get-started/)
- **Python + Jupyter** — since we’re working with `.ipynb` files, Quarto needs Jupyter to execute or read the notebooks
```c
# Linux / macOS / Windows
pip install jupyter
```

Verify that everything is in order:

```c
# Built in jupyter check in Quarto
quarto check jupyter
```

You should see green checkmarks next to Python and Jupyter. If anything is missing, Quarto will tell you exactly what to fix.

Optionally, install the [**Quarto VS Code extension**](https://marketplace.visualstudio.com/items?itemName=quarto.quarto) which gives you a live preview panel so you can see your rendered output as you write. It can be pretty useful too!

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*Ti19Ltylo54gixXg.png)

VSCode Extension Preview for Quarto from visualstudio.com

### 2\. Project Structure

Create a folder for your book and set up the following structure *(example)*:

```c
my-book/
├── _quarto.yml       ← config, metadata, and table of contents
├── index.qmd         ← landing page (required, must be named index)
└── chapters/
    ├── 01_intro.ipynb
    ├── 02_data_cleaning.ipynb
    ├── 03_visualisation.ipynb
    └── 04_modelling.ipynb
```

***Chapters*** can be `.ipynb` notebooks, `.qmd` files (Quarto's own Markdown format), or plain `.md` files — you can mix and match freely.

### 3\. Important Files for Quarto

There are certain key files that you need to ensure are included in a quarto

**a. The** `**_quarto.yml**` **Config File**

This single file controls everything — metadata, the table of contents, and the output format. Here’s a starter config:

```c
project:
  type: book
  output-dir: _book

book:
  title: "Practical Data Science with Python"
  author: "Your Name"
  date: today
  chapters:
    - index.qmd
    - part: "Data Wrangling"
      chapters:
        - chapters/01_intro.ipynb
        - chapters/02_data_cleaning.ipynb
    - part: "Visualisation & Modelling"
      chapters:
        - chapters/03_visualisation.ipynb
        - chapters/04_modelling.ipynb

format:
  html:
    theme: cosmo
    toc: true
    toc-depth: 2
    number-sections: false
```

A few things worth noting here:

- `type: book` tells Quarto to treat this as a multi-chapter book rather than a standalone document or website
- `output-dir: _book` is where the rendered HTML lands — this is what gets deployed
- `theme: cosmo` is one of several built-in Bootstrap themes. Others worth trying: `flatly`, `journal`, `lumen`, `sandstone`. You can preview them at [bootswatch.com](https://bootswatch.com/)
- `date: today` automatically stamps the current build date on the book

**b. The Landing Page**

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*W29o2wOkNDZ_CiJd)

Photo by Pascal Meier on Unsplash

The `index.qmd` is the first thing readers see. You can add the first page of your book here for the viewers to see once they land on the page. You can add a title, author-name etc. here:

```c
---
title: "Welcome"
---

Write your introduction here. This is a regular Markdown file -
you can use **bold**, _italics_, links, images, and so on.
```

**4\. Preview Locally**

Before deploying anything, preview the book in your browser to see if it looks exactly how you planned it to be:

```c
# Linux / macOS / Windows
quarto preview
```

Quarto will render all your notebooks and open the book at `http://localhost:4200` with live reload *(save any file and the browser updates automatically)*. This is the step where you'll catch any notebook execution errors or formatting issues before they go live.

## Deploying to GitHub Pages

Once you’re ready with the first version of the book, you can deploy it using GitHub Pages for the world to see and it’s completely free! Here’s how you can do it:

### 1\. Create a GitHub repo

Create a new repository on GitHub and push your book folder to it:

```c
git init
git add .
git commit -m "Initial book setup"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 2\. Tell Quarto to publish to GitHub Pages

Run this once from your project folder:

```c
# Linux / macOS / Windows
quarto publish gh-pages
```

Quarto handles everything from here — it renders the book, creates a `gh-pages` branch, pushes the built HTML to it, and prints the live URL when it's done. You don't need to configure anything in GitHub settings manually.

### 3\. All future updates

Every time you update your notebooks and want to republish, just use the same command again

```c
quarto publish gh-pages
```

That’s it! One command and the site is updated and the link is ready to go. It’s super simple and neat.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*zKzlbBWZ4XNK-BK-wh03Cg.png)

Here’s an example of the site I have published — see here

This concludes the walkthrough section and you’re ready to build your own book now. The following sections are some optional insights on:

- Automatic Deployment using GitHub Actions
- Advantages and Disadvantages
- Some Use-Case Examples

You can end here or stay on for some additional insights!

## Automating with GitHub Actions

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*fM7YuEfDpOSD_6uZ)

Photo by Rubaitul Azad on Unsplash

One thing you might find annoying after a while is the requirement to publish the site after each major change. If you’d rather not run `quarto publish` manually each time and want the site to rebuild automatically on every push to `main`, add this workflow file:

```c
# .github/workflows/publish.yml
name: Publish Book
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: pip install jupyter nbformat
      - name: Install Quarto
        uses: quarto-dev/quarto-actions/setup@v2
      - name: Publish to GitHub Pages
        run: quarto publish gh-pages --no-browser --no-prompt
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Push this file to your repo and GitHub Actions takes over — every commit to `main` triggers a fresh build and deploy automatically.

## Advantages and Disadvantages

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*xXFJYSMx4sHBp2I4)

Photo by Gabrielle Henderson on Unsplash

No tool is perfect. Here’s my honest take after using quarto for over a year:

### What Quarto does really well:

- Single installer, no Node.js or secondary toolchain required
- First-class `.ipynb` support — your notebooks work as-is without requiring any conversion to html or any other format
- `quarto publish gh-pages` is genuinely one of the easiest deployment methods compared to all similar tools
- Beautiful output out of the box with multiple built-in themes to play around with
- Outputs to HTML, PDF, Word, and ePub from the same source files and renders images and code beautifully as well
- Strong and active community with excellent official documentation

### Where it falls short:

- Notebooks are rendered with pre-computed outputs — readers can’t run the code live without a separate setup like Binder
- If your notebooks have errors or missing dependencies, the build will fail and you will need to try again, it doesn’t help much with debugging either
- Heavy notebooks with lots of large outputs (images, interactive plots) will slow down build times
- Quarto is primarily built around R and Python — Julia support exists but is less polished

## When should you use Quarto for a book?

Quarto is a great fit when:

- You already work in Jupyter notebooks and want to publish without changing your workflow
- You want a clean, professional output that’s shareable with non-technical stakeholders
- You’re building a course, a tutorial series, or a portfolio of analyses
- You need multiple export formats — the same source can become a website, a PDF handout, or a Word doc for a client

It’s probably overkill when you’re publishing a single notebook or a one-off analysis. In that case, `nbconvert` or a GitHub Gist is simpler. Quarto's value compounds when you have multiple chapters, multiple formats, and content you'll be updating over time.

## Wrapping Up

If you’ve followed along, you now have a Jupyter-notebook-powered book live on the internet with zero web development and one deployment command.

The full source for the example book in this article is available on [GitHub](https://github.com/prakharrathi25/wise-case-study). If you found this useful or hit any snags along the way, drop a comment below!