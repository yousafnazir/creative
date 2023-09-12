// function rendercommentlist() {
//   let commentlistHTML = '';
//   for (let i = 0; i < commentlist.lenght ; i++) {
//     const commentObject = commentlist[i];
//     const {comment} = commentObject;
//     const html = `
//     <div>${comment}</div>
//     `;
//     commentlistHTML += html;
//   }
//   document.querySelector('.comment-list').innerHTML = commentlistHTML;
// }

// function addComment () {
//  const inputElement = document.querySelector('.add-comment');
//  const comment = inputElement.value; 
// }

// const savedData = JSON.parse(localStorage.getItem('postComments')) || { comments: [], timestamp: null };

// const postComments = savedData.comments || [];
// const timestamp = savedData.timestamp || null;


// renderComments();


// function getCurrentDateTime() {
//   const now = new Date();
//   const options = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//     hour12: true,
//   };
//   return now.toLocaleString(undefined, options);
// }


// function renderComments() {
//   let postCommentsHtml = '';

//   for (let i = 0; i < postComments.length; i++) {
//     const post = postComments[i];
//     const html = `
//     <div class="complete-comment">
//       <div>${post.comment}</div>
//       <div class="comments-info">
//         <div class="name-com">
//           <div class="SA">SA</div>
//           <div class="name-time">
//             <div class="commentor-name">Syed Abbas</div>
//             <div class="date-time">${post.timestamp}</div>
//           </div>
//         </div>
//         <div>
//           <button class="delete-comment-btn"
//             onclick="
//               const index = postComments.indexOf('${post.comment}');
//               postComments.splice(index, 1);
//               saveCommentsToLocalStorage();
//               renderComments();">
//             <i class="fa-solid fa-trash" style="color: #5c93ff;"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//     `;

//     postCommentsHtml += html;
//   }

//   document.querySelector('.posted-comments').innerHTML = postCommentsHtml;
//   const addCommentsMsg = document.querySelector('.add-comments');
//   addCommentsMsg.style.display = postComments.length === 0 ? 'block' : 'none';
// }


// function addComment() {
//   const inputComment = document.querySelector('.post-comment');
//   const comment = inputComment.value;

//   if (postComments.some((post) => post.comment === comment)) {
//     const duplicateMsg = document.querySelector('.duplicate-comment-msg');
//     duplicateMsg.style.display = 'block';
//     setTimeout(() => {
//       duplicateMsg.style.display = 'none';
//     }, 2000);
//   } else if (postComments.length >= 10) {
//     const limitMsg = document.querySelector('.comment-limit-msg');
//     limitMsg.style.display = 'block';
//     setTimeout(() => {
//       limitMsg.style.display = 'none';
//     }, 2000);
//   } else if (comment) {
//     const newComment = {
//       comment,
//       timestamp: getCurrentDateTime(),
//     };
//     postComments.push(newComment);
//     saveCommentsToLocalStorage();

//     inputComment.value = '';
//     renderComments();

//     const successMsg = document.querySelector('.comment-success-msg');
//     successMsg.style.display = 'block';
//     setTimeout(() => {
//       successMsg.style.display = 'none';
//     }, 2000);
//   }
// }
document.addEventListener
("DOMContentLoaded", function() {
const commentlist = document
.getElementById("commentlist");
const commentInput = document
.getElementById("commentinput");
const postButton = document
.getElementById("postbutton");

function addComment(text) {
  const li = document.createElement
  ("li");
  li.innerHTML = `
  <span>${text}</span>
  <button
  class="delete-button">Delete</button>
  `;
  commentlist.appendChild(li);

  saveCommentToLocalStorage(text);

  const deleteButton = li.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    commentlist.removeChild(li);
    removeCommentFromLocalStorage(text);
  });
}

function saveCommentToLocalStorage(text) {
  let comments = getCommentsFromLocalStorage();
  comments.push(text);
  localStorage.setItem("comments", JSON.stringify(comments));
}

// Function to remove a comment from local storage
function removeCommentFromLocalStorage(text) {
  let comments = getCommentsFromLocalStorage();
  comments = comments.filter(comment => comment !== text);
  localStorage.setItem("comments", JSON.stringify(comments));
}

// Function to retrieve comments from local storage
function getCommentsFromLocalStorage() {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  return comments;
}

// Load comments from local storage on page load
function loadCommentsFromLocalStorage() {
  const comments = getCommentsFromLocalStorage();
  comments.forEach(comment => {
    addComment(comment);
  });
}

postButton.addEventListener("click", () => {
  const text = commentInput.value.trim();
  if (text !== "") {
    addComment(text);
    commentInput.value = "";
  }
});
  commentInput.addEventListener("keydown", (event) => {
    if (event.key === " Enter") {
      event.preventDefault();
      postButton.click();
    }
  });
  loadCommentsFromLocalStorage();
});