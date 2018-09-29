import {
    createNote,
} from "./notes"
import {
    setFilters
} from "./filters"
import {
    renderNotes
} from "./views"


//inital call
renderNotes();
document.getElementById("create-note").addEventListener("click", (event) => {
    const id = createNote();
    location.assign(`./edit.html#${id}`);
})
//listens to changes in input field
document.querySelector("#search-text").addEventListener("input", (event) => {
    //console.log(event.target.value);
    setFilters({
        searchText: event.target.value
    });
    renderNotes();
});
document.querySelector("#filter-by").addEventListener("change", (event) => {
    setFilters({
        sortBy: event.target.value
    });
    renderNotes(notes, filters);
})
window.addEventListener("storage", function (event) {
    if (event.key === "notes") {
        renderNotes();
    }
})