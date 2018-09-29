"use strict"
const getSavedNotes = () => {
    //Check for Local Data
    const notesJSON = localStorage.getItem("notes");
    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
        return [];
    }
}
//save notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
}
//note remove function
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
    }
}
//creates dom structure for a note
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
    noteElement.setAttribute("href", `./edit.html#${note.id}`);
    noteElement.classList.add("list-item");
    //status message
    status.textContent = generateLastEdited(note.updatedAt);
    status.classList.add("list-item__subtitle")
    noteElement.appendChild(status);

    return noteElement;
}
//sort function
const sortNotes = (notes, sortBy) => {
    if (sortBy === "byEdited") {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "byCreated") {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "alphabetical") {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        });
    }
}
//Render application notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    const notesElement = document.querySelector("#notes");
    notesElement.innerHTML = "";

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteElement = generateNoteDOM(note);
            notesElement.appendChild(noteElement);
        })
    } else {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("empty-message");
        emptyMessage.textContent = "No notes to show";
        noteElement.appendChild(emptyMessage);

    }
}
const generateLastEdited = (timeStamp) => {
    return `Last edited ${moment(timeStamp).fromNow()}`;
}