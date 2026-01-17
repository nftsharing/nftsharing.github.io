document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('collections-container');
    const sortBtn = document.getElementById('sort-btn');
    const sortLabel = document.getElementById('sort-label');
    const sortIcon = document.getElementById('sort-icon');

    // Default state: Ascending (Small to Large) 
    // The HTML is rendered in Ascending order (1 to 10) by default.
    let isAscending = true;

    function updateSort() {
        // Get all cards
        const cards = Array.from(container.querySelectorAll('.nft-card'));

        // Sort based on data-id
        cards.sort((a, b) => {
            const idA = parseInt(a.dataset.id);
            const idB = parseInt(b.dataset.id);

            return isAscending ? (idA - idB) : (idB - idA);
        });

        // Detach and re-append in new order
        // Using DocumentFragment for performance
        const fragment = document.createDocumentFragment();
        cards.forEach(card => fragment.appendChild(card));
        container.appendChild(fragment);

        // Update Button UI
        if (isAscending) {
            sortLabel.textContent = "Sort: Ascending";
            sortIcon.textContent = "⬆"; // Arrow up implies 1 -> 10
        } else {
            sortLabel.textContent = "Sort: Descending";
            sortIcon.textContent = "⬇"; // Arrow down 10 -> 1
        }
    }

    sortBtn.addEventListener('click', () => {
        isAscending = !isAscending;
        updateSort();
    });
});
