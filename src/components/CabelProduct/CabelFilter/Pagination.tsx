const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => {
  return (
      <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
              Назад
          </button>
          <span>Страница {currentPage} из {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
              Вперед
          </button>
      </div>
  );
};

export default Pagination;
