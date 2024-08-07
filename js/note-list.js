import Notes from "./notesData.js";
import "./note-item.js";

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.notes = Notes.getAll();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="notes__sidebar">
        <button class="notes__add">Add note</button>
        <div class="notes__list">
          ${this.notes
            .map(
              (note, index) =>
                `<note-item class="notes__list-item ${
                  index === 0 ? "notes__list-item--selected" : ""
                }" note-id="${note.id}" note-title="${note.title}" note-body="${
                  note.body
                }" note-created="${note.createdAt}"></note-item>`
            )
            .join("")}
        </div>
      </div>
    `;

    this.querySelectorAll("note-item").forEach((item) => {
      item.addEventListener("click", () => {
        this.querySelectorAll(".notes__list-item").forEach((el) => {
          el.classList.remove("notes__list-item--selected");
        });
        item.classList.add("notes__list-item--selected");

        const event = new CustomEvent("noteSelected", {
          detail: {
            title: item.getAttribute("note-title"),
            body: item.getAttribute("note-body"),
          },
        });
        this.dispatchEvent(event);
      });
    });

    this.querySelector(".notes__add").addEventListener("click", () => {
      alert("Functionality to add notes is not yet implemented");
    });
  }
}

customElements.define("note-list", NoteList);
