// Cloudflare Worker to fetch and return raw notes
const repoOwner = "Hiplitehehe";
const repoName = "Notes";
const filePath = "j.json"; // Notes file

async function fetchNotes() {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
    
    // Replace this with your GitHub token for authentication
    const token = "your_github_token_here"; 

    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": `token ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch notes from GitHub");
        }

        const data = await response.json();
        const decodedContent = atob(data.content);  // Decode from Base64

        return new Response(decodedContent, {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Error fetching notes:", error);
        return new Response("Error fetching notes.", { status: 500 });
    }
}

addEventListener("fetch", event => {
    event.respondWith(fetchNotes());
});
