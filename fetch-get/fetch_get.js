function fetch_get() {
    const apiUrls = [
        "https://www.ncbi.nlm.nih.gov/pmc/utils/oa/oa.fcgi", // medical papers
        "http://export.arxiv.org/api/query?search_query=all:electron", // physics papers
        "https://api.biorxiv.org",  // biology, biochemistry, medicine, biotech 
        "https://inspirehep.net/api/literature", // physics papers
        "https://share.osf.io/api/v2/rawdata/", // Repository and archive for study designs, research materials, data, manuscripts, etc
        "https://api.codex.jaagrav.in",  // software development
        "https://api.osf.io/v2/"
    ];

    apiUrls.forEach(url => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    // Action to be performed when the document is ready
                    console.log(`Data fetched successfully from ${url}`);
                    // You can handle each API's response here as needed, for example:
                    document.getElementById("demo").innerHTML += xhttp.responseText + "<br><br>";
                } else {
                    // Trigger error if the request fails
                    console.error(`Error fetching data from ${url}. Status: ${this.status}`);
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    });
}