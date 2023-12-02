import { marked } from "marked";

export function replaceAll(text: string, textForReplace: string, replacer: string): string {
  if(text.includes(textForReplace)) return replaceAll(text.replace(textForReplace, replacer), textForReplace, replacer);
  return text.replace(textForReplace, replacer);
}

export function markText(text: string): string {
  return replaceAll(marked.parse(replaceAll(text, "\\n", "\n")), "\n", "<br/>");
}
