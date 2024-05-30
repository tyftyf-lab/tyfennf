// Index des pages avec leur contenu
var pages = [
    {
        title: "Chapitre 1",
        url: "page1.html",
        content: "Ceci est le contenu de la Page 1 sur les vecteurs..."
    },
    {
        title: "Chapitre 2",
        url: "page2.html",
        content: "Ceci est le contenu de la Page 2 sur les matrices..."
    },
    {
        title: "Chapitre 3",
        url: "page3.html",
        content: "Ceci est le contenu de la Page 3 sur les algorithmes..."
    }
];

// Fonction pour effectuer la recherche et classer les résultats
function search(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre de manière traditionnelle

    var query = document.getElementById('searchInput').value.toLowerCase();
    var results = [];

    // Parcourir les pages et calculer la pertinence
    for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        var content = page.content.toLowerCase();
        var title = page.title.toLowerCase();
        var relevance = 0;

        // Calculer la pertinence en fonction de la présence du terme de recherche dans le titre et le contenu
        if (title.indexOf(query) !== -1) {
            relevance += 10; // Poids plus élevé pour le titre
        }
        var matches = content.match(new RegExp(query, "g"));
        if (matches) {
            relevance += matches.length; // Ajouter le nombre d'occurrences dans le contenu
        }

        if (relevance > 0) {
            results.push({
                page: page,
                relevance: relevance
            });
        }
    }

    // Trier les résultats par pertinence décroissante
    results.sort(function(a, b) {
        return b.relevance - a.relevance;
    });

    // Afficher les résultats
    displayResults(results);
}

// Fonction pour afficher les résultats
function displayResults(results) {
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ""; // Vider les résultats précédents

    if (results.length > 0) {
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            var page = result.page;

            var resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = '<h3><a href="' + page.url + '">' + page.title + '</a></h3><p>' + page.content.substring(0, 100) + '...</p>';

            resultsContainer.appendChild(resultItem);
        }
    } else {
        resultsContainer.innerHTML = "<p>Aucun résultat trouvé pour la recherche.</p>";
    }
}

