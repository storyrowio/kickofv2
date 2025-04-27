import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.jsx";
import PropTypes from "prop-types";

PageTitle.propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        href: PropTypes.string
    }))
};

export default function PageTitle(props) {
    const { title, items } = props;

    return (
        <div className="mb-6 flex justify-between">
            <h4 className="font-medium">{title}</h4>
            <Breadcrumb>
                <BreadcrumbList>
                    {items.map((e, i) => (
                        <>
                            {e.href ? (
                                <BreadcrumbItem className="hidden md:block text-xs">
                                    <BreadcrumbLink href={e.href}>
                                        {e.title}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            ) : (
                                <BreadcrumbItem className="text-xs">
                                    <BreadcrumbPage>{title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            )}
                            {i < items.length - 1 && (
                                <BreadcrumbSeparator className="hidden md:block " />
                            )}
                        </>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
