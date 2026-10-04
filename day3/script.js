// Starting data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. Search notes by word, ignoring upper and lower case
function searchNotes(word) {
  const searchTerm = word.toLowerCase();

  return notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );
}

// Tests for searchNotes
console.log(searchNotes("javascript"));
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

console.log(searchNotes("pizza"));
// Expected: []

// 2. Find the note with the most characters
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }

  return longest;
}

// Tests for longestNote
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

const savedNotes = notes;
notes = [];
console.log(longestNote());
// Expected: null
notes = savedNotes;

// 3. Count notes by category
function countByCategory() {
  const counts = {};

  for (const note of notes) {
    if (!counts[note.category]) {
      counts[note.category] = 0;
    }

    counts[note.category]++;
  }

  return counts;
}

// Tests for countByCategory
console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

notes.push({
  id: 6,
  text: "Temporary work note",
  category: "work",
});

console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 2 }

notes.pop();

// 4. Create a summary sentence
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;

  const noteWord = total === 1 ? "note" : "notes";

  return `${total} ${noteWord}: ${counts.personal || 0} personal, ${
    counts.work || 0
  } work, ${counts.study || 0} study.`;
}

// Tests for getSummary
console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."

const originalNotes = notes;
notes = [notes[0]];
console.log(getSummary());
// Expected: "1 note: 1 personal, 0 work, 0 study."
notes = originalNotes;

// 5. Check whether a note is a duplicate
function isDuplicate(text) {
  const cleanedText = text.trim().toLowerCase();

  return notes.some(
    (note) => note.text.trim().toLowerCase() === cleanedText
  );
}

// Tests for isDuplicate
console.log(isDuplicate("  BUY MILK AND BREAD  "));
// Expected: true

console.log(isDuplicate("Learn JavaScript"));
// Expected: false

// 6. Add a new note
function addNote(text, category) {
  const cleanedText = text.trim();
  const validCategories = ["personal", "work", "study"];

  if (cleanedText.length === 0 || cleanedText.length > 200) {
    console.log("❌ Note rejected: text must be 1-200 characters.");
    return false;
  }

  if (isDuplicate(cleanedText)) {
    console.log("❌ Note rejected: duplicate note.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log("❌ Note rejected: invalid category.");
    return false;
  }

  const newNote = {
    id: Date.now(),
    text: cleanedText,
    category: category,
  };

  notes.push(newNote);

  console.log(`✅ Note added: "${newNote.text}"`);
  return true;
}

// Tests for addNote
console.log(addNote("Learn JavaScript functions", "study"));
// Expected: true

console.log(addNote("   ", "study"));
// Expected: false

console.log(addNote("Buy milk and bread", "personal"));
// Expected: false because it is a duplicate

console.log(addNote("New work task", "invalid"));
// Expected: false because the category is invalid