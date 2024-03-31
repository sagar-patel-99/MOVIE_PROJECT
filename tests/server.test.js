const { fetchMovies, setupPaginationButtons } = require('../public/js/script');

describe('setupPaginationButtons function', () => {
    it('should add event listeners to pagination buttons', () => {
        const mockButtons = [
            { addEventListener: jest.fn() },
            { addEventListener: jest.fn() },
        ];
        document.querySelectorAll = jest.fn().mockReturnValue(mockButtons);

        setupPaginationButtons();

        mockButtons.forEach(button => {
            expect(button.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
        });
    });
});

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ searchResults: [], page: 1, totalPages: 1 }),
    })
);

global.console.error = jest.fn();

global.document.querySelector = jest.fn(() => ({
    dataset: { page: '1' },
    style: { display: 'none' },
}));

global.document.querySelectorAll = jest.fn(() => [
    { addEventListener: jest.fn(), dataset: { page: '1' } },
]);

describe('fetchMovies function', () => {
    it('should fetch movies and handle the response', async () => {
        await fetchMovies(1, 'action');
        expect(fetch).toHaveBeenCalledWith('/search?query=action&page=1');
    });
});