import classNames from "classnames";
import {useState} from "react";
import {EyeIcon, ViewIcon, ViewOffIcon} from "hugeicons-react";

export default function Input(props) {
    const {
        icon,
        className,
        action,
        helperText,
        error,
        type,
        ...rest
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const inputClassName = classNames({
        // 'input w-full flex rounded-md border-neutral-200 focus:border-primary-400': true,
        'input w-full': true,
        [className]: true
    });

    const helperTextClassName = classNames({
        'text-xs': true,
        'text-error-500': error,
    });

    return (
        <div>
            <label className={inputClassName}>
                {icon}
                <input
                    className="flex-1"
                    type={type === 'password' ? showPassword ? 'text' : 'password' : type }
                    {...rest}/>
                {action}
                {type === 'password' && (
                    <button className="p-2" type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ?
                            <ViewIcon size={14} className="text-neutral-500"/> :
                            <ViewOffIcon size={14} className="text-neutral-500"/>}
                    </button>
                )}
            </label>
            {helperText && (
                <p className={helperTextClassName}>
                    {helperText}
                </p>
            )}
        </div>
    )
}
