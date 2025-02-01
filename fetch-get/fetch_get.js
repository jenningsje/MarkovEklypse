function fetch_get() {
    const apiUrls = [
        'https://www.ncbi.nlm.nih.gov/pmc/utils/oa/oa.fcgi/ ',
        'http://export.arxiv.org/api/query?search_query=all:electron/',
        'https://api.biorxiv.org/',
        'https://inspirehep.net/api/literature/',
        'https://share.osf.io/api/v2/rawdata/',
        'https://api.codex.jaagrav.in/',
        'https://api.osf.io/v2/',
        'https://share.osf.io/api/v2/',
        'https://archive.org/metadata/',
        'https://www.enigma.com/v1/kyb/',
        'https://www.enigma.com/businesses/',
        'https://data.seattle.gov/resource/jguv-t9rb.json?/',
        'https://api.yelp.com/v3/businesses/search/',
        'https://api.openverse@wordpress.org/',
        'https://www.metabase.com/api/',
        'https://www.dictionaryapi.com/api/v3/',
        'https://api.mattermost.com/',
        'https://api.census.gov/data/',
        'https://www.usda.gov/sites/default/files/documents/code.json/',
        'https://code.mil/code.json/',
        'https://www.energy.gov/sites/default/files/2025-01/code-01-10-2025.json/',
        'https://www.hhs.gov/code.json/',
        'https://www.hud.gov/sites/documents/CODE_INVENTORY.JSON/',
        'https://www.dhs.gov/xlibrary/assets/digital-strategy/code.json/',
        'https://www.justice.gov/d9/code.json/',
        'https://www.dol.gov/code.json/',
        'https://www.state.gov/code.json/',
        'https://www.va.gov/code.json/',
        'https://raw.githubusercontent.com/USEPA/code-json-generator/output/code.json/',
        'https://nsf-gov-resources.nsf.gov/files/code.json/',
        'https://www.ssa.gov/code.json/',
        'https://www.fec.gov/code.json/',
        'https://api.fbi.gov/@wanted/',
        'https://api.fbi.gov/@artcrimes/',
        'https://api.data.gov/',
        'https://api.usaspending.gov/api/v2/agency/012/',
        'https://data.cms.gov/data-api/',
        'https://www.healthcare.gov/api/:content-type.json/',
        'https://api.adzuna.com/v1/api/',
        'https://api.upwork.com/',
        'https://www.reed.co.uk/developers/jobseeker/',
        'http://api.juju.com/jobs?/',
        'https://www.themuse.com/api/',
        'https://www.wolframalpha.com/api/',
        'https://huggingface.co/api/models/',
        'https://www.thenewsapi.com/api/',
        'https://www.uspto.gov/api/',
        'https://search.censys.io/',
        'https://developers.epo.org/api/',
        'https://api.haveibeenpwned.com/',
        'https://services.nvd.nist.gov/rest/json/',
        'https://developer.ebay.com/api/',
        'https://www.etsy.com/api/',
        'api.aletheiaapi.com/',
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=HDUSJ7UTNEYHSIGK/',
        'https://lookup.binlist.net/45717360/',
        'https://site.financialmodelingprep.com/api/',
        'https://api-v2.intrinio.com/',
        'data.sec.gov/api/xbrl/companyconcept/',
        'data.sec.gov/api/xbrl/companyfacts/',
        'data.sec.gov/api/xbrl/frames/',
        'https://world.openfoodfacts.org/data/',
        'https://api.ups.com/',
        'https://vpic.nhtsa.dot.gov/api/vehicles/',
        'https://www.hko.gov.hk/api/',
        'https://api.met.no/',
        'https://api.oceandrivers.com/static/resources.json/',
        'https://api.opensensemap.org'
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