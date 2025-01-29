async function fetchGet() {
    const apiUrls = [
        "https://www.ncbi.nlm.nih.gov/pmc/utils/oa/oa.fcgi", // medical papers
        "http://export.arxiv.org/api/query?search_query=all:electron", // physics papers
        "https://api.biorxiv.org",  // biology, biochemistry, medicine, biotech 
        "https://inspirehep.net/api/literature", // physics papers
        "https://share.osf.io/api/v2/rawdata/", // Repository and archive for study designs, research materials, data, manuscripts, etc
        "https://api.codex.jaagrav.in",  // software development
        "https://api.osf.io/v2/"
    ];

    const resultsContainer = document.getElementById("demo");
    resultsContainer.innerHTML = ""; // Clear previous results if any

    for (const url of apiUrls) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.text(); // Use `response.json()` for JSON APIs
                console.log(`Data fetched successfully from ${url}`);
                resultsContainer.innerHTML += `<p><strong>${url}</strong>:<br>${data}</p>`;
            } else {
                console.error(`Error fetching data from ${url}. Status: ${response.status}`);
                resultsContainer.innerHTML += `<p><strong>${url}</strong>: Error ${response.status}</p>`;
            }
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            resultsContainer.innerHTML += `<p><strong>${url}</strong>: Fetch error</p>`;
        }
    }
}