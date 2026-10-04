package org.librotech.Mapper;


import org.librotech.dto.RequestDTOs.GenreRequestDTO;
import org.librotech.dto.ResponseDTOs.BookResponseDTO;
import org.librotech.dto.ResponseDTOs.EditorialResponseDTO;
import org.librotech.dto.ResponseDTOs.GenreResponseDTO;
import org.librotech.dto.ResponseDTOs.UserDTO;
import org.librotech.model.Book;
import org.librotech.model.Editorial;
import org.librotech.model.Genre;
import org.librotech.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface Mappers {

    //User
    UserDTO toUserDTO(User user);
    User toUser(UserDTO userDTO);

    //Genre
    GenreResponseDTO toGenreResponseDTO(Genre genre);
    Genre toGenre(GenreRequestDTO genreRequestDTO);

    //Editorial
    EditorialResponseDTO toEditorialResponseDTO(Editorial editorial);
    Editorial toEditorial(EditorialResponseDTO editorialResponseDTO);

    //Book
    BookResponseDTO toBookResponseDTO(Book book);
    Book toBook(BookResponseDTO bookResponseDTO);

}
