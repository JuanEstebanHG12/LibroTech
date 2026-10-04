package org.librotech.Mapper;


import org.librotech.dto.ResponseDTOs.UserDTO;
import org.librotech.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface Mappers {

    UserDTO toUserDTO(User user);

    User toUser(UserDTO userDTO);

}
