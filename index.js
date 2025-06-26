const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

// Function to create a post element
function createPost(postData, index) {
    return `
        <section class="post" data-post-index="${index}">
            <div class="post-header">
                <img class="profile-pic" src="${postData.avatar}" alt="Profile Picture">
                <div class="user-info">
                    <h1>${postData.name}</h1>
                    <p>${postData.location}</p>
                </div>
            </div>
            <img class="post-content" src="${postData.post}" alt="Post Image">
            <div class="post-footer">
                <div class="post-actions">
                    <img class="action-icon like-btn" src="images/icon-heart.png" alt="Like Icon" data-post-index="${index}">
                    <img class="action-icon" src="images/icon-comment.png" alt="Comment Icon">
                    <img class="action-icon" src="images/icon-dm.png" alt="Share Icon">
                </div>
                <div class="post-likes">
                    <p class="likes-count">${postData.likes} likes</p>
                </div>
                <div class="post-caption">
                    <p><strong>${postData.name}</strong> ${postData.comment}</p>
                </div>
                <div class="post-comments">
                </div>
            </div>
        </section>
    `;
}

// Function to render all posts
function renderPosts() {
    const postsContainer = document.getElementById('posts-container');
    const postsHTML = posts.map((post, index) => createPost(post, index)).join('');
    postsContainer.innerHTML = postsHTML;
    
    // Add event listeners for like buttons
    addLikeEventListeners();
}

// Function to handle like button clicks
function addLikeEventListeners() {
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postIndex = parseInt(this.getAttribute('data-post-index'));
            toggleLike(postIndex);
        });
    });
}

// Function to toggle like status
function toggleLike(postIndex) {
    // Increment likes
    posts[postIndex].likes += 1;
    
    // Update the likes display
    const postElement = document.querySelector(`[data-post-index="${postIndex}"]`);
    const likesElement = postElement.querySelector('.likes-count');
    likesElement.textContent = `${posts[postIndex].likes} likes`;
    
    // Add a small animation effect
    likesElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        likesElement.style.transform = 'scale(1)';
    }, 200);
}

// Render posts when the page loads
document.addEventListener('DOMContentLoaded', renderPosts);

