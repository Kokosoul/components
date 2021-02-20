import React, {  useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

/**
 * calculate current page based on current offset and limit
 */
function calcCurrentPage(limit, offset) {
  return offset / limit + 1;
}



const Paginator = ({ 
  limit = 10, 
  offset = 0, 
  total = 0, 
  groupLimit = 5, 
  onPage 
}) => {
  const parsedLimit = parseInt(limit, 10);
  const parsedOffset = parseInt(offset , 10);
  const parsedTotal = parseInt(total , 10);
  const parsedGroup = parseInt(groupLimit , 10);

  const [page, setPage] = useState(calcCurrentPage(parsedLimit, parsedOffset));
  const [group, setGroup] = useState(1);
  const totalPages = Math.ceil(parsedTotal / parsedLimit);
  const totalGroups = Math.ceil(totalPages / parsedGroup);
  const sliceStart = parsedGroup * (group - 1);
  const sliceEnd = sliceStart + parsedGroup;
  
  useEffect(() => {
    const parsedLimit = parseInt(limit , 10);
    const parsedOffset = parseInt(offset , 10);
    setPage(calcCurrentPage(parsedLimit, parsedOffset));
  }, [limit, offset]);
  
  function doSetPage(x) {
    setPage(x);
    onPage((x - 1) * limit, x); 
  }

  function handlePrev() {
    doSetPage(page - 1);
    const current = (group - 1) * parsedGroup;
    if (page - 1 <= current) {
      setGroup((group) => {
        return group - 1;
      });
    }
  }

  function handleNext() {
    doSetPage(page + 1);
    if (page >= group * parsedGroup) {
      setGroup((group) => {
        return group + 1;
      });
    }
  }

  const allPages = Array(totalPages)
    .fill(0)
    .map((_, i) => {
      const pageNum = i + 1;
      return (
        <Pagination.Item
          disabled={total <= limit}
          key={"page-" + pageNum}
          active={page === pageNum}
          onClick={() => {
            doSetPage(pageNum);
          }}
        >
          {pageNum}
        </Pagination.Item>
      );
    });

  return (
    <Pagination>
      {totalGroups > 1 && (
        <Pagination.First
          title={`Previous ${groupLimit} pages`}
          disabled={group === 1}
          onClick={() => {
            // jump back just one group
            setGroup(group - 1);
            /**
             * set page number to the last page within current group
             */
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            const prePageInGroup = (group - 1) * groupLimit;
            doSetPage(prePageInGroup);
          }}
        />
      )}

      {totalPages > 1 && (
        <Pagination.Prev
          title="Go back one page"
          disabled={page === 1}
          onClick={handlePrev}
        />
      )}

      {allPages.slice(sliceStart, sliceEnd)}

      {totalPages > 1 && (
        <Pagination.Next
          title="Go forward one page"
          disabled={page >= totalPages}
          onClick={handleNext}
        />
      )}

      {totalGroups > 1 && (
        <Pagination.Last
          title={`Next ${groupLimit} pages`}
          disabled={group === totalGroups}
          onClick={() => {
            setGroup(group + 1);

            const next = groupLimit * group + 1;
            doSetPage(next);
          }}
        />
      )}
    </Pagination>
  );
}


export default Paginator;
