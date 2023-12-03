async function addPost() {
    const title = document.getElementById('title').value;
    const desc = document.getElementById('desc').value;
    const time = document.getElementById('time').value;
    const img = document.getElementById('img').value;

    const data = {
        title: title,
        desc: desc,
        time: time,
        img: img
    };

    try {
        const response = await fetch('/add_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        if (response.ok) {
            document.getElementById('addForm').reset();
            fetchBlogPosts();
        }
    } catch (error) {
        console.error('Error adding post:', error);
    }
}

async function fetchBlogPosts() {
    try {
        const response = await fetch('/');
        const data = await response.json();

        const postList = document.getElementById('postList');
        postList.innerHTML = '';

        data.forEach(post => {
            const listItem = document.createElement('li');
            listItem.textContent = `${post.title} - ${post.desc}`;
            postList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchBlogPosts();
});