const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');
const bookmarkForm = document.getElementById('bookmark-form')

let savedBookmarks = [];



// show Modal, Focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

function hideModal() {
    modal.classList.remove('show-modal');
}

// RegExp Url
function validate (e) {
let expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
let regex = new RegExp(expression);
if (!e.match(regex)) {
  alert("Please provide a valid website url");
  return false;
} 
return true;
}

// Delete Bookmarks
function deleteBookmark(url) {
bookmarks.forEach((bookmark, i) => {
  if (bookmark.url === url) {
   bookmarks.splice(i, 1);
  }});
  localStorage.setItem('Websites', JSON.stringify(bookmarks));
  fetchBookmarks();
};

// Build Bookmarks
function buildBookmarks() {
// Clear Bookmarks
bookmarksContainer.textContent='';
bookmarks.forEach((bookmark) => {
  const { url, name} = bookmark
  // Item
  const item = document.createElement('div');
  item.classList.add('item');
  // Close icon
  const closeIcon = document.createElement('i');
  closeIcon.classList.add('fas', 'fa-times');
  closeIcon.setAttribute('title', 'Delete Bookmark');
  closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
  // Favicon / Link Container
  const linkInfo = document.createElement('div');
  linkInfo.classList.add('name');
  // Favicon
  const favicon = document.createElement('img');
  favicon.setAttribute('src', `https://www.google.com/s2/u/0/favicons?domain=${url}`);
  favicon.setAttribute('alt', 'Favicon');
  // Link
  const link = document.createElement('a');
  link.setAttribute('href', `${url}`);
  link.setAttribute('target', '_blank');
  link.textContent = name;
  // Append to bookmarks container
  linkInfo.append(favicon, link);
  item.append(closeIcon, linkInfo);
  bookmarksContainer.appendChild(item);
});
}


// Fetch Bookmarks
function fetchBookmarks() {
  // Get Bookmarks if available
  if(localStorage.getItem('Websites')) {
    bookmarks = JSON.parse(localStorage.getItem('Websites'));
  }
  console.log(bookmarks);
  buildBookmarks();
}


// Handle Data from Form
function storeBookmark (e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
// Add protocol
if (!urlValue.includes("https://")) {urlValue=`https://${urlValue}`};
// validate url
if(!validate(urlValue)) {return false};
// Set bookmark to array
const savedBookmark = {
  url: urlValue,
name: nameValue
};
savedBookmarks.push(savedBookmark);
// Set to local storage

localStorage.setItem('Websites', JSON.stringify(savedBookmarks));
bookmarkForm.reset();
websiteNameEl.focus();
fetchBookmarks();
};

// Event Listeners
modalShow.addEventListener('click',showModal);
modalClose.addEventListener('click',hideModal);
window.addEventListener('click', (e) => (e.target === modal ? hideModal() : false));

bookmarkForm.addEventListener('submit', storeBookmark);

// On Launch
fetchBookmarks();