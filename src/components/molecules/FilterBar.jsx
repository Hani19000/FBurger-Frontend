const CATEGORIES = ['Tout', 'Burger', 'Poulets', 'Frites', 'Boissons'];

const FilterBar = ({ currentFilter, onFilterChange }) => (
    <div className="filter-bar">
        {CATEGORIES.map((category) => (
            <button
                key={category}
                className={currentFilter === category ? 'active' : ''}
                onClick={() => onFilterChange(category)}
            >
                {category}
            </button>
        ))}
    </div>
);

export default FilterBar;