export default function Label(props) {
    const { children } = props;

    return (
        <span className="text-xs text-neutral-500">{children}</span>
    )
}