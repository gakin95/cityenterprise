import {useState} from 'react';
const TagsInput = props => {
    const [tags, setTags] = useState(props.tags);
    const removeTags = indexToRemove => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = event => {
    if (event.target.value !== "") {
    setTags([...tags, event.target.value]);
    props.selectedTags([...tags, event.target.value]);
    event.target.value = "";
    }
    };
    return (
    <div  className="input-tag">
    <ul className="input-tag__tags">
        {tags.map((tag, index) => (
             <li key={tag}>
             {tag}
             <button type="button" onClick={() => removeTags(index)}>+</button>
           </li>
        ))}
    {/* {tags.map((tag, index) => (
    <li key={index}>
    <span className='tag-title'>{tag}</span>
    <span  className="input-tag__tags__input"
    onClick={() => removeTags(index)}
    >
    x
    </span>
    </li>
    ))} */}
    <li className="input-tag__tags__input">
    <input
    type="text"
    onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
    placeholder="Type your tags then press enter to add"
    />
    </li>
    </ul>
    </div>
    );
    };

    export default TagsInput