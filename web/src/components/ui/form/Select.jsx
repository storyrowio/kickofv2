import PropTypes from "prop-types";
import {ArrowDown01Icon} from "hugeicons-react";

Select.propTypes = {
    label: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
    })).isRequired,
    onChange: PropTypes.func,
    value: PropTypes.any
};

export default function Select(props) {
    const {
        label,
        items,
        onChange,
        value
    } = props;

    const handleSelect = (value) => {
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }

        onChange(value);
    };

    return (
        <div>
            {label && (
                <span className="text-xs text-neutral-500">{label}</span>
            )}
            <div className="dropdown w-full">
                <div tabIndex={0} role="button" className="btn w-full flex justify-between bg-white border-neutral-300">
                    {items?.find(e => e.value === value)?.label || label || 'Select Option'}
                    <ArrowDown01Icon size={14} className="text-neutral-500"/>
                </div>
                <ul tabIndex={0} className="dropdown-content menu w-full bg-base-100 rounded-box z-1 p-2 shadow-sm">
                {items?.map((e, i) => (
                        <li key={i}>
                            <a
                                className={`${e.value === value ? 'text-primary-500' : 'text-neutral-600'}`}
                                onClick={() => handleSelect(e.value)}>{e.label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}