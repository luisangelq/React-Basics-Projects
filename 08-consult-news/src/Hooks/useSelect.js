import { useState } from "react"

const useSelect = (initialState, options) => {

    const [category, updateState] = useState(initialState);

    const SelectNews = () => (
        <select
            className="browser-default"
            value={category}
            onChange={e => updateState(e.target.value)}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    )

    return [category, SelectNews];
}

export default useSelect;