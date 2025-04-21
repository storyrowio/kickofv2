export default function IconButton(props) {
    const { children, className, onClick, ...rest } = props;

    return (
        <button
            className={`p-1.5 rounded-xl bg-white border border-neutral-300 cursor-pointer ${className}`}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    )
}