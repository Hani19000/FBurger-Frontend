import { ALL_CATEGORIES } from "../../constants/categories";

const FilterBar = ({ currentFilter, onFilterChange }) => (
    <div className="filter-bar">
        {ALL_CATEGORIES.map((category) => (
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