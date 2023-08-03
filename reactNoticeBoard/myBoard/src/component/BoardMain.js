import Board from "./Board";
import { Link } from "react-router-dom";

export default function BoardMain() {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>게시판</h2>
      <Board />
      <Link to="/Write">
        <button className="board-write-btn" style={{marginLeft:"85%", marginTop:"5%",}}>글작성</button>
      </Link>
    </>
  );
}
