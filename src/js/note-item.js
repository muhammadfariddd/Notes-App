import { getAllNotes, addNote, deleteNote } from "./api.js";

class NoteItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="note-item-content">
        <div>
          <div class="notes__small-title">${this.getAttribute(
            "note-title"
          )}</div>
          <div class="notes__small-body">${this.getAttribute("note-body")}</div>
          <div class="notes__small-updated">${this.getAttribute(
            "note-created"
          )}</div>
        </div>
        <button class="delete-note">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    `;
    this.classList.add("notes__list-item");

    this.querySelector(".delete-note").addEventListener("click", async () => {
      const noteId = this.getAttribute("note-id");

      console.log(`Attempting to delete note with ID: ${noteId}`);

      try {
        await deleteNote(noteId);
        console.log(
          `Note deleted successfully on the server with ID: ${noteId}`
        );
        const event = new CustomEvent("noteDeleted", {
          detail: { id: noteId },
        });
        this.dispatchEvent(event);
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    });
  }
}

customElements.define("note-item", NoteItem);
