let notes = [];
let editMode = false;

// Elements
const noteForm = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesList = document.getElementById("notesList");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const noteIdInput = document.getElementById("noteId");

// Submit Form
noteForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === "" || content === "") {
        message.textContent = "⚠️ Title and Content required";
        return;
    }

    if (editMode) {
        updateNote();
    } else {
        addNote(title, content);
    }
});

// Add Note
function addNote(title, content) {
    const note = {
        id: Date.now(),
        title,
        content
    };

    notes.push(note);
    renderNotes();
    clearForm();
    message.textContent = "✅ Note added";
}

// Render Notes
function renderNotes() {
    notesList.innerHTML = "";

    notes.forEach(note => {
        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="editNote(${note.id})">Edit</button>
            <button onclick="deleteNote(${note.id})">Delete</button>
        `;

        notesList.appendChild(div);
    });
}

// Edit Note
function editNote(id) {
    const note = notes.find(n => n.id === id);

    titleInput.value = note.title;
    contentInput.value = note.content;
    noteIdInput.value = note.id;

    editMode = true;
    submitBtn.textContent = "Update Note";
}

// Update Note
function updateNote() {
    const id = Number(noteIdInput.value);

    notes = notes.map(note =>
        note.id === id
            ? { ...note, title: titleInput.value, content: contentInput.value }
            : note
    );

    renderNotes();
    clearForm();
    message.textContent = "✏️ Note updated";
}

// Delete Note
function deleteNote(id) {
    if (!confirm("Are you sure you want to delete?")) return;

    notes = notes.filter(note => note.id !== id);
    renderNotes();
    message.textContent = "🗑️ Note deleted";
}

// Clear Form
function clearForm() {
    titleInput.value = "";
    contentInput.value = "";
    noteIdInput.value = "";
    editMode = false;
    submitBtn.textContent = "Add Note";
}

// Clear Button
clearBtn.addEventListener("click", clearForm);
