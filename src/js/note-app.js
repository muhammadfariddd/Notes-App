import { getAllNotes, addNote, deleteNote } from "./api.js";
import "./note-list.js";
import "./note-preview.js";
import "./loading-indicator.js";

class NoteApp extends HTMLElement {
  constructor() {
    super();
    this.loadingIndicator = document.createElement("loading-indicator");
    document.body.appendChild(this.loadingIndicator);
  }

  async connectedCallback() {
    this.render();

    const noteList = this.querySelector("note-list");
    const notePreview = this.querySelector("note-preview");

    this.loadingIndicator.show();

    try {
      const notes = await getAllNotes();

      this.loadingIndicator.hide();

      noteList.notes = notes;
      noteList.render();

      if (notes.length > 0) {
        notePreview.setNoteTitle(notes[0].title);
        notePreview.setNoteBody(notes[0].body);
      }

      noteList.addEventListener("noteSelected", (event) => {
        notePreview.setNoteTitle(event.detail.title);
        notePreview.setNoteBody(event.detail.body);
      });

      document.addEventListener("noteAdded", async (event) => {
        this.loadingIndicator.show();
        await new Promise((resolve) => setTimeout(resolve, 500));

        await addNote({
          title: event.detail.title,
          body: event.detail.body,
        });
        const updatedNotes = await getAllNotes();

        // Hide loading indicator after adding note
        this.loadingIndicator.hide();

        noteList.notes = updatedNotes;
        noteList.render();

        notePreview.setNoteTitle(event.detail.title);
        notePreview.setNoteBody(event.detail.body);
      });
    } catch (error) {
      console.error("Failed to fetch or add notes:", error);
      this.loadingIndicator.hide();
    }
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
