const notes = getSavedNotes();

const filters = {
    searchText: ""
}
//inital call
renderNotes(notes, filters);

document.getElementById("create-note").addEventListener("click", function (event) {
    notes.push({
        title: "",
        body: ""
    });
    saveNotes(notes);
    renderNotes(notes, filters);
})
//listens to changes in input field
document.querySelector("#search-text").addEventListener("input", function (event) {
    //console.log(event.target.value);
    filters.searchText = event.target.value;
    renderNotes(notes, filters);
});
document.querySelector("#filter-by").addEventListener("change", function (event) {

})