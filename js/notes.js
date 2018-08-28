let notes = getSavedNotes();

const filters = {
    searchText: "",
    sortBy: "byEdited"
}
//inital call
renderNotes(notes, filters);
document.getElementById("create-note").addEventListener("click",  (event) => {
    const id = uuidv4();
    const timeStamp = moment().valueOf();
    notes.push({
        createdAt: timeStamp,
        updatedAt: timeStamp,
        id: id,
        title: "",
        body: ""
    });
    saveNotes(notes);
    location.assign(`/edit.html#${id}`);
})
//listens to changes in input field
document.querySelector("#search-text").addEventListener("input",  (event) => {
    //console.log(event.target.value);
    filters.searchText = event.target.value;
    renderNotes(notes, filters);
});
document.querySelector("#filter-by").addEventListener("change",  (event) => {
    filters.sortBy = event.target.value;
    renderNotes(notes,filters);
})
window.addEventListener("storage", function (event) {
    if (event.key === "notes") {
        notes = JSON.parse(event.newValue);
        renderNotes(notes, filters);
    }
})
const now = moment();
console.log(now.toString());