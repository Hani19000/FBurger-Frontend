const CATEGORIES = ['Tout', 'Burger', 'Poulets', 'Frites', 'Boissons'];

const FilterBar = ({ currentFilter, onFilterChange }) => (
    <div className="filter-bar">
        {CATEGORIES.map((category) => (
            <button
                key={category} // la catégorie est unique et stable
                className={currentFilter === category ? 'active' : ''}
                onClick={() => onFilterChange(category)}
            >
                {category}
            </button>
        ))}
    </div>
);

export default FilterBar;