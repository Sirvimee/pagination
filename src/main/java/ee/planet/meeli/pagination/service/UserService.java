package ee.planet.meeli.pagination.service;

import ee.planet.meeli.pagination.data.User;
import org.springframework.data.domain.Page;

public interface UserService {
    Page<User> getUsers(String name, int page, int size);
}
