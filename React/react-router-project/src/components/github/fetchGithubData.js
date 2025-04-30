export async function fetchGithubData() {
    const response = await fetch(
        `https://api.github.com/users/kaustubh-tripathi-1`
    );

    if (!response.ok) {
        throw new Response("Not Found", { status: 404 });
    }

    return response.json();
}
