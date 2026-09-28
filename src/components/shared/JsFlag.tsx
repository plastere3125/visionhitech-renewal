/** Adds the `js` class before paint so reveal animations never hide content for no-JS users. */
export function JsFlag() {
  return <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />;
}
