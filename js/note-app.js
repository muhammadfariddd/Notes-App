import "./note-list.js";
import "./note-preview.js";

class NoteApp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();

    const noteList = this.querySelector("note-list");
    const notePreview = this.querySelector("note-preview");

    noteList.addEventListener("noteSelected", (event) => {
      notePreview.setNoteTitle(event.detail.title);
      notePreview.setNoteBody(event.detail.body);
    });
  }

  render() {
    this.innerHTML = `
      <div class="notes">
        <note-list></note-list>
        <note-preview></note-preview>
      </div>
    `;
  }
}

customElements.define("note-app", NoteApp);
