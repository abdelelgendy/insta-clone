const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21,
        liked: false,
        timestamp: "2 hours ago"
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4,
        liked: false,
        timestamp: "5 hours ago"
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152,
        liked: false,
        timestamp: "1 day ago"
    }
]

// Function to create a post element
function createPost(postData, index) {
    return `
        <article class="post" data-post-index="${index}">
            <div class="post-header">
                <img class="profile-pic" src="${postData.avatar}" alt="Profile Picture">
                <div class="user-info">
                    <h1>${postData.name}</h1>
                    <p>${postData.location}</p>
                </div>
                <div class="more-options">⋯</div>
            </div>
            <img class="post-content" src="${postData.post}" alt="Post Image">
            <div class="post-footer">
                <div class="post-actions">
                    <img class="action-icon like-btn ${postData.liked ? 'liked' : ''}" 
                         src="images/icon-heart.png" 
                         alt="Like Icon" 
                         data-post-index="${index}">
                    <img class="action-icon comment-btn" 
                         src="images/icon-comment.png" 
                         alt="Comment Icon">
                    <img class="action-icon share-btn" 
                         src="images/icon-dm.png" 
                         alt="Share Icon">
                </div>
                <div class="post-likes">
                    <p class="likes-count">${postData.likes.toLocaleString()} likes</p>
                </div>
                <div class="post-caption">
                    <p><strong>${postData.name}</strong> ${postData.comment}</p>
                </div>
                <div class="post-timestamp">
                    <p>${postData.timestamp}</p>
                </div>
            </div>
        </article>
    `;
}

// Function to render all posts
function renderPosts() {
    const postsContainer = document.getElementById('posts-container');
    const postsHTML = posts.map((post, index) => createPost(post, index)).join('');
    postsContainer.innerHTML = postsHTML;
    
    // Add event listeners for like buttons
    addLikeEventListeners();
    addDoubleTapListeners();
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

// Add double-tap to like functionality
function addDoubleTapListeners() {
    const postImages = document.querySelectorAll('.post-content');
    postImages.forEach((image, index) => {
        let tapCount = 0;
        image.addEventListener('click', function() {
            tapCount++;
            if (tapCount === 1) {
                setTimeout(() => {
                    if (tapCount === 1) {
                        // Single tap - could add other functionality here
                    } else if (tapCount === 2) {
                        // Double tap - like the post
                        const postIndex = parseInt(this.closest('.post').getAttribute('data-post-index'));
                        if (!posts[postIndex].liked) {
                            toggleLike(postIndex);
                        }
                        createHeartAnimation(this);
                    }
                    tapCount = 0;
                }, 300);
            }
        });
    });
}

// Function to toggle like status
function toggleLike(postIndex) {
    const post = posts[postIndex];
    const postElement = document.querySelector(`[data-post-index="${postIndex}"]`);
    const likesElement = postElement.querySelector('.likes-count');
    const likeButton = postElement.querySelector('.like-btn');
    
    // Toggle like status
    if (post.liked) {
        post.likes -= 1;
        post.liked = false;
        likeButton.classList.remove('liked');
    } else {
        post.likes += 1;
        post.liked = true;
        likeButton.classList.add('liked');
        
        // Add heart animation
        createHeartAnimation(likeButton);
    }
    
    // Update the likes display with animation
    likesElement.textContent = `${post.likes.toLocaleString()} likes`;
    likesElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
        likesElement.style.transform = 'scale(1)';
    }, 150);
}

// Function to create heart animation
function createHeartAnimation(element) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.fontSize = '30px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'heartFloat 1s ease-out forwards';
    
    const rect = element.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 - 15 + 'px';
    heart.style.top = rect.top + rect.height / 2 - 15 + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 1000);
}

// Render posts when the page loads
document.addEventListener('DOMContentLoaded', renderPosts);

