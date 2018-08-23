//test notes
const notes = [
    {
        title: "my next trip",
        body: "I would like to go to spain"
    },
    {
        title: "Habbits to work on",
        body: "Eat better"
    },
    {
        title: "Office Modification",
        body: "Get a new seat"
    },
]
//filter string
const filters = {
    searchText: ""
}
//renders notes initially with a default empty filter
//gets called later on in an event listener if input string 
//changes
const renderNotes = function (notes, filters){
    const filteredNotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    })
    document.querySelector("#notes").innerHTML = "";
    filteredNotes.forEach(function(note){
        const noteElement = document.createElement('p');
        noteElement.textContent  = note.title;
        document.querySelector("#notes").appendChild(noteElement);
    })
}
//inital call
renderNotes(notes,filters);

document.getElementById("create-note").addEventListener("click", function (event) {
    console.log(event);
})
document.getElementById("remove-all").addEventListener("click", function (event) {
    document.querySelectorAll(".note").forEach(function(note){
        note.remove();
    });
})
//listens to changes in input field
document.querySelector("#search-text").addEventListener("input", function(event){
    console.log(event.target.value);
    filters.searchText = event.target.value;
    renderNotes(notes,filters);
});