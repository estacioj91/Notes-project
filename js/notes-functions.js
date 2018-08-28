const getSavedNotes = () => {
    //Check for Local Data
    const notesJSON = localStorage.getItem("notes");

    if (notesJSON !== null) {
        return JSON.parse(notesJSON);
    } else {
        return [];
    }

}
//save notes to localStorage
const saveNotes = (notes) =>{
    localStorage.setItem("notes", JSON.stringify(notes));
}
//note remove function
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    if(noteIndex > -1){
        notes.splice(noteIndex, 1);
    }
}
//creates dom structure for a note
const generateNoteDOM =  (note) => {
    const noteElement = document.createElement("div");
    const textElement = document.createElement('a');
    const button = document.createElement("button");

    button.addEventListener("click", (event) =>{
        removeNote(note.id);
        saveNotes(notes);
        renderNotes(notes,filters)
    })
    //creates button
    button.textContent = "x";
    noteElement.appendChild(button);
    //creates note title
    if (note.title.length > 0) {
        textElement.textContent = note.title;
    } else {
        textElement.textContent = "Unnamed note"
    }
    textElement.setAttribute("href", `/edit.html#${note.id}`);
    noteElement.appendChild(textElement);
    return noteElement;
}
//sort function
const sortNotes = (notes, sortBy) =>{
    if(sortBy ==="byEdited"){
        return notes.sort((a,b)=>{
            if(a.updatedAt> b.updatedAt){
                return -1;
            }
            else if( a.updatedAt< b.updatedAt){
                return 1;
            }
            else{
                return 0;
            }
        });
    }
    else if(sortBy ==="byCreated"){
        return notes.sort((a,b)=>{
            if(a.createdAt> b.createdAt){
                return -1;
            }
            else if( a.createdAt< b.createdAt){
                return 1;
            }
            else{
                return 0;
            }
        });
    }
    else if(sortBy ==="alphabetical"){
        return notes.sort((a,b) =>{
            if(a.title.toLowerCase()> b.title.toLowerCase()){
                return 1;
            }
            else if( a.title.toLowerCase()< b.title.toLowerCase()){
                return -1;
            }
            else{
                return 0;
            }
        });
    }
}
//Render application notes
const renderNotes =  (notes, filters) =>{
    notes = sortNotes(notes,filters.sortBy);
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase())
)
    document.querySelector("#notes").innerHTML = "";
    filteredNotes.forEach( (note) =>{
        const noteElement = generateNoteDOM(note);
        document.querySelector("#notes").appendChild(noteElement);
    })
}
const generateLastEdited = (timeStamp) =>{
    return `Last edited ${moment(note.updatedAt).fromNow()}`;
}