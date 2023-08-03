import { useParams } from "react-router-dom";
import boardlist from "../db/data.json";
import { useNavigate } from "react-router-dom";
import "./css/BoardView.css";

export default function BoardView() {
  const { num } = useParams();
  const board = boardlist.boardList.filter((id) => id.no === Number(num));
  const history = useNavigate();
  console.log(num);
  console.log(board.no);
  return (
    <>
      <h2 align="center">게시글 상세정보</h2>

      <div className="board">
        {board.map((con) => (
          <>
            <div className="board-row">
              <label>게시글 번호</label>
              <label>{con.no}</label>
            </div>
            <div className="board-row">
              <label>제목</label>
              <label>{con.title}</label>
            </div>
            <div className="board-row">
              <label>작성일</label>
              <label>{con.createDate}</label>
            </div>
            <div className="board-row">
              <label>조회수</label>
              <label>{con.readCount}</label>
            </div>
            <div className="board-row">
              <label>내용</label>
              <div>{con.content}</div>
            </div>
          </>
        ))}
        <br />
        <button className="board-view-button" onClick={() => history(-1)}>
          목록으로 돌아가기
        </button>
      </div>
    </>
  );
}
