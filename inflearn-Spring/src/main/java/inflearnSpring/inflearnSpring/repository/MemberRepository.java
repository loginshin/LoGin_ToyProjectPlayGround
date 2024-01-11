package inflearnSpring.inflearnSpring.repository;

import inflearnSpring.inflearnSpring.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    // 기능들을 적는다 하나씩 가져오는것 저장하는것 모두 가져오는것
    Member save(Member member);
    Optional<Member> findById(Long id);
    Optional<Member> findByName(String name);
    List<Member> findAll();

}
