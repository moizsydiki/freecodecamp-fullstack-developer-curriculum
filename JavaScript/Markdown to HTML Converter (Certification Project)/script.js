const preview = document.getElementById("preview");
const htmlOutput = document.getElementById("html-output");
const markdownInput = document.getElementById("markdown-input");

function convertMarkdown() {
  let markdown = markdownInput.value;

  // Headings
  markdown = markdown.replace(/^\s*### (.+)$/gm, "<h3>$1</h3>");

  markdown = markdown.replace(/^\s*## (.+)$/gm, "<h2>$1</h2>");

  markdown = markdown.replace(/^\s*# (.+)$/gm, "<h1>$1</h1>");

  // Images
  markdown = markdown.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img alt="$1" src="$2">',
  );

  // Links
  markdown = markdown.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>',
  );

  // Bold
  markdown = markdown.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  markdown = markdown.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic
  markdown = markdown.replace(/\*(.+?)\*/g, "<em>$1</em>");

  markdown = markdown.replace(/_(.+?)_/g, "<em>$1</em>");

  // Blockquotes
  markdown = markdown.replace(/^\s*> (.+)$/gm, "<blockquote>$1</blockquote>");

  return markdown;
}

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();

  htmlOutput.textContent = html;
  preview.innerHTML = html;
});
