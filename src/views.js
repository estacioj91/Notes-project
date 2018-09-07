import moment from "moment"
import {
    getFilters
} from "./filters"
import {
    sortNotes,
    getNotes
} from "./notes"
const generateNoteDOM = (note) => {
    const noteElement = document.createElement("a");
    const textElement = document.createElement('p');
    const status = document.createElement("p");

    if (note.title.length > 0) {
        textElement.textContent = note.title;
    } else {
        textElement.textContent = "Unnamed note"
    }
    textElement.classList.add("list-item__title");
    // textElement.setAttribute("href", `/edit.html#${note.id}`);
    noteElement.appendChild(textElement);
    noteElement.setAttribute("href", `/edit.html#${note.id}`);
    noteElement.classList.add("list-item");
    //status message
    status.textContent = generateLastEdited(note.updatedAt);
    status.classList.add("list-item__subtitle")
    noteElement.appendChild(status);

    return noteElement;
}
const renderNotes = () => {
    const notesElement = document.querySelector("#notes");
    notesElement.innerHTML = "";
    const filters = getFilters();
    const notes = sortNotes(filters.sortBy);
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteElement = generateNoteDOM(note);
            notesElement.appendChild(noteElement);
        })
    } else {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("empty-message");
        emptyMessage.textContent = "No notes to show";
        notesElement.appendChild(emptyMessage);

    }
}
const generateLastEdited = (timeStamp) => {
    return `Last edited ${moment(timeStamp).fromNow()}`;
}
const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector("#note-title");
    const bodyElement = document.querySelector("#note-body");
    const dateElement = document.querySelector("#last-edited");

    const notes = getNotes();
    const note = notes.find((note) => note.id === noteId)
    if (!note) {
        location.assign("/index.html");
    }
    //set info on page load
    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
}
export {
    generateLastEdited,
    generateNoteDOM,
    renderNotes,
    initializeEditPage
}