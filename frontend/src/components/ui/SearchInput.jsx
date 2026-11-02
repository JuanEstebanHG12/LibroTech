import { Search } from "lucide-react";

function SearchInput({ value, onChange, placeholder }) {
    return (
        <div className="flex text-ink-muted border border-line rounded-md px-3 gap-2 h-[44px] items-center">
            <Search className="" />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="search-input placeholder:text-ink-soft"
            />
        </div>
    );
}

export default SearchInput;