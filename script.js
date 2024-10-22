// Note System By Charlie

var notes = [];

class Note {
    constructor(title, content, html) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.title = title;
        this.content = content;
        this.htmlContent = html;
        this.createdDate = new Date();
        this.lastEditDate = new Date();
    }

    toString() {
        return `${this.title} - ${this.content}`;
    }
}

// Basic note functions
function addNote(note) {
    notes.push(note);
}

function deleteNoteByIndex(i) {
    notes.forEach((n , index) => {
        if (n.id === i) {
            console.log("Deleted note: " + n);
            notes.splice(index, 1);
        }
    })
}

function deleteNote(note) {
    notes.splice(notes.indexOf(note), 1);
}

// Save and load notes by using localStorage
function saveNotes() {
    console.log("Saving notes...");
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
    }
}

// displayNotes function
function displayNotes(containerId, startIndex = 0, endIndex = notes.length, data = notes) {
    const container = document.getElementById(containerId);
    container.innerHTML = ``;
    data.slice(startIndex, endIndex).forEach(note => {
        container.innerHTML += `
        <div class="col-md-6">
        <div class="card" id="note-${note.id}">
            <div class="card-header">
                <h2>${note.title}</h2>
            </div>
            <div class="card-body">
                <p>${note.content}</p>
            </div>
            <div class="card-footer">
                <button class="btn btn-danger" onclick="deleteNoteWithDisplay(${note.id})">Delete</button>
            </div>
        </div>
        </div>
        `;
    });
    container.innerHTML += "";
}

// searchNotes function, using filter
function searchNotes(query) {
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()) || note.content.toLowerCase().includes(query.toLowerCase()));
    return filteredNotes;
}

function getUrlKey(name){
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

function showToast() {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())
}