document.addEventListener('DOMContentLoaded', () => {
    // --- Sorting Logic ---
    const container = document.getElementById('collections-container');
    const sortBtn = document.getElementById('sort-btn');
    const sortLabel = document.getElementById('sort-label');
    const sortIcon = document.getElementById('sort-icon');

    // Default state: Ascending (Small to Large)
    let isAscending = true;

    function updateSort() {
        if (!container) return;
        const cards = Array.from(container.querySelectorAll('.nft-card'));

        cards.sort((a, b) => {
            const idA = parseInt(a.dataset.id);
            const idB = parseInt(b.dataset.id);
            return isAscending ? (idA - idB) : (idB - idA);
        });

        const fragment = document.createDocumentFragment();
        cards.forEach(card => fragment.appendChild(card));
        container.appendChild(fragment);

        if (sortLabel && sortIcon) {
            if (isAscending) {
                sortLabel.textContent = "Sort: Ascending";
                sortIcon.textContent = "⬆";
            } else {
                sortLabel.textContent = "Sort: Descending";
                sortIcon.textContent = "⬇";
            }
        }
    }

    if (sortBtn) {
        sortBtn.addEventListener('click', () => {
            isAscending = !isAscending;
            updateSort();
        });
    }

    // --- Modal Logic ---
    const modal = document.getElementById("howto-modal");
    const btn = document.getElementById("howto-btn");
    const span = document.getElementsByClassName("close-modal")[0];

    if (btn && modal) {
        btn.onclick = function () {
            modal.style.display = "block";
        }
    }

    if (span && modal) {
        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    window.onclick = function (event) {
        if (modal && event.target == modal) {
            modal.style.display = "none";
        }
    }

    // --- Footer Action Logic ---

    // Toast Function
    function showToast() {
        const toast = document.getElementById("toast");
        toast.className = "show";
        setTimeout(function () {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    }

    // Bookmark
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', () => {
            showToast();
        });
    }

    // Share on X
    const shareXBtn = document.getElementById('share-x-btn');
    if (shareXBtn) {
        shareXBtn.addEventListener('click', () => {
            const text = encodeURIComponent("Check out this awesome NFT Sharing Ecosystem! 🚀 Discover unique collections and RWA rewards.");
            const url = encodeURIComponent(window.location.href);
            window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        });
    }

    // Copy Link
    const copyLinkBtn = document.getElementById('share-copy-btn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                const originalText = copyLinkBtn.innerHTML;
                copyLinkBtn.innerHTML = '<span class="icon">✓</span> Copied!';
                setTimeout(() => {
                    copyLinkBtn.innerHTML = originalText;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
                alert('Failed to copy link.');
            }
        });
    }
});
