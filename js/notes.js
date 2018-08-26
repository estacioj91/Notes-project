//test notes
// const notes = [{
//         title: "my next trip",
//         body: "I would like to go to spain"
//     },
//     {
//         title: "Habbits to work on",
//         body: "Eat better"
//     },
//     {
//         title: "Office Modification",
//         body: "Get a new seat"
//     },
// ]
//filter string
let notes = [];

const filters = {
    searchText: ""
}
//Check for Local Data
const notesJSON = localStorage.getItem("notes");

if (notesJSON !== null) {
    notes - JSON.parse(notesJSON);
}


//renders notes initially with a default empty filter
//gets called later on in an event listener if input string 
//changes
const renderNotes = function (notes, filters) {
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    })
    document.querySelector("#notes").innerHTML = "";
    filteredNotes.forEach(function (note) {
        const noteElement = document.createElement('p');
        if (note.title.length > 0) {
            noteElement.textContent = note.title;
        } else {
            noteElement.textContent = "Unnamed note"
        }
        document.querySelector("#notes").appendChild(noteElement);
    })
}
//inital call
renderNotes(notes, filters);

document.getElementById("create-note").addEventListener("click", function (event) {
    notes.push({
        title: "",
        body: ""
    });
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes(notes, filters);
})
//listens to changes in input field
document.querySelector("#search-text").addEventListener("input", function (event) {
    console.log(event.target.value);
    filters.searchText = event.target.value;
    renderNotes(notes, filters);
});
document.querySelector("#filter-by").addEventListener("change", function (event) {

})

//localStorage.setItem("location","Philadelphia");
// console.log(localStorage.getItem("location"));
// localStorage.removeItem("location");
// localStorage.clear();

// const user = {
//     name: "andrew",
//     age: 27
// };
// const userJSON = JSON.stringify(user);
// console.log(userJSON);
// localStorage.setItem("user", userJSON);

// const userJSON = localStorage.getItem("user");
// const user = JSON.parse(userJSON);