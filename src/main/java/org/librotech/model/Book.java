package org.librotech.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "books")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "author", nullable = false, length = 100)
    private String author;

    @Column(name = "isbn", nullable = false, length = 13)
    private String isbn;

    @ManyToMany(fetch = FetchType.LAZY)
            @JoinTable(name = "book_genre",
                    joinColumns = @JoinColumn(name = "book_id"),
                    inverseJoinColumns = @JoinColumn(name = "genre_id"))
    @BatchSize(size = 20)
    private Set<Genre> genres = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "editorial_id", nullable = false)
    private Editorial editorial;

    @Column(name = "year", nullable = false)
    private int year;

    @Column(name = "pages", nullable = false)
    private int pages;

    @Column(name = "summary", nullable = false, length = 1000)
    private String summary;
}
