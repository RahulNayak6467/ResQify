// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "../../ui/pagination";

// function PaginationStaff({ handlePage }: { handlePage: (id: number) => void }) {
//   return (
//     <Pagination>
//       <PaginationContent>
//         <PaginationItem>
//           <PaginationPrevious href="#" />
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationLink href="#" onClick={() => handlePage(0)}>
//             1
//           </PaginationLink>
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationLink href="#" onClick={() => handlePage(1)} isActive>
//             2
//           </PaginationLink>
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationLink
//             href="#"
//             onClick={() => {
//               handlePage(2);
//             }}
//           >
//             3
//           </PaginationLink>
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationEllipsis />
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationNext href="#" />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// }

// export default PaginationStaff;

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";

interface PaginationStaffProps {
  handlePage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

function PaginationStaff({
  handlePage,
  currentPage,
  totalPages,
}: PaginationStaffProps) {
  const getPageNumbers = () => {
    const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];

    if (totalPages <= 4) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
      return pages;
    }

    // Slide a 2-page inner window that follows currentPage,
    // clamped so it never overlaps first (0) or last (totalPages-1).
    const innerStart = Math.min(Math.max(1, currentPage), totalPages - 3);
    const innerEnd = innerStart + 1;

    pages.push(0);
    if (innerStart > 1) pages.push("ellipsis-start");
    for (let i = innerStart; i <= innerEnd; i++) pages.push(i);
    if (innerEnd < totalPages - 2) pages.push("ellipsis-end");
    pages.push(totalPages - 1);

    return pages;
  };

  const btnBase =
    "h-8 px-3 text-[11px] tracking-widest uppercase border rounded-lg transition-all duration-150";
  const btnActive =
    "border-border text-text-secondary hover:border-border-strong hover:text-text-primary hover:bg-surface-raised";
  const btnDisabled =
    "border-border text-text-faint cursor-not-allowed opacity-30 pointer-events-none";

  return (
    <Pagination className="font-mono">
      <PaginationContent className="gap-1">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => currentPage > 0 && handlePage(currentPage - 1)}
            className={`${btnBase} ${currentPage === 0 ? btnDisabled : btnActive}`}
          />
        </PaginationItem>

        {getPageNumbers().map((page) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis className="text-text-faint text-[11px] font-mono w-8 h-8" />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={() => handlePage(page)}
                isActive={currentPage === page}
                className={`h-8 w-8 text-[11px] font-semibold rounded-lg border transition-all duration-150 ${
                  currentPage === page
                    ? "border-accent bg-accent-muted text-accent shadow-[0_0_12px_rgba(74,158,255,0.15)]"
                    : "border-border text-text-secondary hover:border-border-strong hover:text-text-primary hover:bg-surface-raised"
                }`}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              currentPage < totalPages - 1 && handlePage(currentPage + 1)
            }
            className={`${btnBase} ${currentPage === totalPages - 1 ? btnDisabled : btnActive}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationStaff;
