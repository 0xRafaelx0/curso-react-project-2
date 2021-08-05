import './styles.css'

export const TextInput = (props) => {
    const {searchValue, handleChange} = props;
    return (
        <input
        className="text-input"
        onChange={handleChange}
        value={searchValue}
        placeholder="Type your search"
        type="search" /> 
    )
}