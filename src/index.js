import {
    createNote,
} from "./notes"
import {
    setFilters,
    getFilters
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
// Default sorting was not working because filters what not defined/imported.
document.querySelector("#filter-by").addEventListener("change", (event) => {
    const filters = getFilters();
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