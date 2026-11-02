package org.librotech.repository;

import org.librotech.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepositry extends JpaRepository<Book, Long> {
    @EntityGraph(attributePaths = {"editorial"})
    Page<Book> findAll(Pageable pageable);

    @EntityGraph(attributePaths = {"editorial"})
    Page<Book> findByEditorialId(Long editorialId, Pageable pageable);


    @EntityGraph(attributePaths = {"editorial"})
    @Query("""                                                                                                                                                                                                      
            SELECT b FROM Book b
            WHERE (:search IS NULL OR :search = ''
                   OR LOWER(b.title) LIKE LOWER(CONCAT('%', CAST(:search AS String), '%'))
                   OR LOWER(b.author) LIKE LOWER(CONCAT('%', CAST(:search AS String), '%')))
              AND (:editorialId IS NULL OR b.editorial.id = :editorialId)
              AND (:genreId IS NULL OR EXISTS (
                   SELECT 1 FROM b.genres g WHERE g.id = :genreId
              ))
        """)
    Page<Book> findAllWithFilters(
            @Param("search") String search,
            @Param("genreId") Long genreId,
            @Param("editorialId") Long editorialId,
            Pageable pageable
    );
}
