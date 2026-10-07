import assert from "node:assert/strict"
import { readFile, readdir, stat } from "node:fs/promises"
import path from "node:path"
import { fromHtml } from "hast-util-from-html"

const output = path.resolve("public-build")
const siteUrl = new URL("https://aefreedman.github.io/process/")

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((entry) => {
      const file = path.join(directory, entry.name)
      return entry.isDirectory() ? filesIn(file) : [file]
    }),
  )
  return nested.flat()
}

function elements(tree) {
  const result = []
  function visit(node) {
    if (node.type === "element") result.push(node)
    node.children?.forEach(visit)
  }
  visit(tree)
  return result
}

const htmlFiles = (await filesIn(output)).filter((file) => file.endsWith(".html"))
const pages = new Map()
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8")
  const nodes = elements(fromHtml(html))
  pages.set(file, {
    html,
    nodes,
    ids: new Set(nodes.map((node) => node.properties.id).filter(Boolean)),
  })
}

assert(pages.has(path.join(output, "index.html")), "Missing homepage")
const guideNotes = {
  principles: "Principles",
  "development-workflow": "Development Workflow",
  "tools-and-setup": "Tools and Setup",
  unity: "Unity",
}
for (const slug of Object.keys(guideNotes)) {
  assert(pages.has(path.join(output, `${slug}.html`)), `Missing guide note: ${slug}`)
}
const noteFiles = (await filesIn(path.resolve("content"))).filter((file) => file.endsWith(".md"))
for (const file of noteFiles) {
  assert(
    /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(path.basename(file)),
    `Invalid note filename: ${file}`,
  )
}
assert(pages.has(path.join(output, "404.html")), "Missing 404 page")

let checked = 0
for (const [file, page] of pages) {
  const relative = path.relative(output, file).split(path.sep).join("/")
  const pageUrl = new URL(relative, siteUrl)
  for (const node of page.nodes) {
    // Validate navigation, stylesheet, script, and image paths, including the Pages subpath.
    const reference = node.properties.href ?? node.properties.src
    if (typeof reference !== "string" || !reference) continue
    const url = new URL(reference, pageUrl)
    if (url.origin !== siteUrl.origin) continue
    const isSiteRoot = url.pathname === siteUrl.pathname.slice(0, -1)
    assert(
      isSiteRoot || url.pathname.startsWith(siteUrl.pathname),
      `${relative}: URL outside /process/: ${reference}`,
    )
    const local = isSiteRoot ? "" : decodeURIComponent(url.pathname.slice(siteUrl.pathname.length))
    const base = path.resolve(output, local || "index.html")
    const candidates = [base, `${base}.html`, path.join(base, "index.html")]
    let target
    for (const candidate of candidates) {
      if (
        await stat(candidate)
          .then((info) => info.isFile())
          .catch(() => false)
      ) {
        target = candidate
        break
      }
    }
    assert(target, `${relative}: missing target for ${reference}`)
    if (url.hash && pages.has(target)) {
      const id = decodeURIComponent(url.hash.slice(1))
      assert(pages.get(target).ids.has(id), `${relative}: missing heading ${reference}`)
    }
    checked++
  }
}

const index = JSON.parse(await readFile(path.join(output, "static/contentIndex.json"), "utf8"))
assert.equal(index.index.title, "Game Dev & Design", "Homepage frontmatter was not parsed")
for (const [slug, title] of Object.entries(guideNotes)) {
  assert.equal(index[slug]?.title, title, `Frontmatter was not parsed: ${slug}`)
  assert(index.index.links.includes(slug), `Homepage wikilink was not indexed: ${slug}`)
  assert(index[slug].content.length > 0, `Note missing from search: ${slug}`)
  assert(
    index[slug].links.some((link) => link in guideNotes),
    `Missing cross-links: ${slug}`,
  )
  const page = pages.get(path.join(output, `${slug}.html`))
  assert(
    page.nodes.some((node) => (node.properties.className ?? []).includes("toc")),
    `Missing generated table of contents: ${slug}`,
  )
  assert(
    !page.nodes.some((node) => (node.properties.className ?? []).includes("graph")),
    `Graph should be disabled: ${slug}`,
  )
}
assert(
  index["development-workflow"].content.includes("General Development Loop"),
  "Development loop missing from search",
)
assert(!index.overview, "Old overview is still indexed")
assert(
  !Object.values(index).some((page) => page.filePath === "README.md"),
  "Repository README was published",
)
assert(!index.index.content.includes("title:"), "Frontmatter leaked into page content")
const tools = pages.get(path.join(output, "tools-and-setup.html"))
assert(
  tools.nodes.some((node) => node.properties.dataCallout === "note"),
  "Obsidian callout was not rendered",
)

console.log(
  `Site checks passed: ${pages.size} HTML pages, ${checked} internal links/resources, search data, wikilinks, callouts, and page contents.`,
)
