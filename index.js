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

// SVG icon definitions
const icons = {
    heart: `<svg aria-label="Like" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
    </svg>`,
    
    heartFilled: `<svg aria-label="Unlike" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24">
        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.2 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
    </svg>`,
    
    comment: `<svg aria-label="Comment" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
        <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
    </svg>`,
    
    share: `<svg aria-label="Share Post" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
        <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="2" y2="10.083"></line>
        <polygon fill="none" points="11.698,20.334 22,2.001 2,9.218 9.218,10.083 11.698,20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
    </svg>`
};

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
                    <button class="action-icon like-btn ${postData.liked ? 'liked' : ''}" 
                            data-post-index="${index}">
                        ${postData.liked ? icons.heartFilled : icons.heart}
                    </button>
                    <button class="action-icon comment-btn">
                        ${icons.comment}
                    </button>
                    <button class="action-icon share-btn">
                        ${icons.share}
                    </button>
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
        likeButton.innerHTML = icons.heart;
    } else {
        post.likes += 1;
        post.liked = true;
        likeButton.classList.add('liked');
        likeButton.innerHTML = icons.heartFilled;
        
        // Add heart animation
        createHeartAnimation(likeButton);
    }
    
    // Update the likes display with animation
    likesElement.textContent = `${post.likes.toLocaleString()} likes`;
    likesElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
        likesElement.style.transform = 'scale(1)';
    }, 150);

    // Save the updated posts array to local storage
    savePostsToStorage();
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

// Loading state functions
function showLoadingSkeleton() {
    const postsContainer = document.getElementById('posts-container');
    const skeletonHTML = `
        <div class="skeleton-post">
            <div class="skeleton-header">
                <div class="skeleton skeleton-avatar"></div>
                <div class="skeleton-user-info">
                    <div class="skeleton skeleton-username"></div>
                    <div class="skeleton skeleton-location"></div>
                </div>
            </div>
            <div class="skeleton skeleton-image"></div>
            <div class="skeleton-actions">
                <div class="skeleton skeleton-action"></div>
                <div class="skeleton skeleton-action"></div>
                <div class="skeleton skeleton-action"></div>
            </div>
            <div class="skeleton skeleton-likes"></div>
            <div class="skeleton skeleton-caption"></div>
        </div>
    `.repeat(3); // Show 3 skeleton posts
    
    postsContainer.innerHTML = skeletonHTML;
}

function hideLoadingSkeleton() {
    // This will be replaced when renderPosts() is called
}

// Dark mode functionality
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
}

// Local storage functions
function savePostsToStorage() {
    localStorage.setItem('instagramPosts', JSON.stringify(posts));
}

function loadPostsFromStorage() {
    const savedPosts = localStorage.getItem('instagramPosts');
    if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        // Update the posts array with saved data
        parsedPosts.forEach((savedPost, index) => {
            if (posts[index]) {
                posts[index].likes = savedPost.likes;
                posts[index].liked = savedPost.liked;
            }
        });
    }
}

// Render posts when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initializeTheme();
    
    // Add theme toggle event listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Show loading skeleton
    showLoadingSkeleton();
    
    // Simulate loading delay (in real app, this would be API call)
    setTimeout(() => {
        loadPostsFromStorage();
        renderPosts();
    }, 800); // 800ms delay to show loading effect
});

