import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbWGLobalProps {
  label: string;
  link: string;
  active?: boolean;
}

const BreadcrumbItemWGLobal = ({
  label,
  link,
  active,
}: BreadcrumbWGLobalProps) => {
  return (
    <>
      {link && (
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link
              href={link}
              className={cn("", active && "text-black font-semibold")}
            >
              {label}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </>
  );
};
export default BreadcrumbItemWGLobal;
