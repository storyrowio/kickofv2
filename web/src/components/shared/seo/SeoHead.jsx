export default function SeoHead(props) {
    const { title, authorName, authorLink, keywords } = props;

    return (
        <>
            <title>{title}</title>
            <meta name="author" content={authorName}/>
            <link rel="author" href={authorLink}/>
            <meta name="keywords" content={keywords}/>
        </>
    )
}
