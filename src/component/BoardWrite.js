import "./css/BoardWrite.css";

export default function BoardWrite() {
  return (
    <>
      <h2 align="center">게시글 작성</h2>
      <div className="board">
        <div className="board-input-row">
          <label>제목</label>
          <input></input>
        </div>
        <div className="board-input-row">
          <label>내용</label>
          <textarea></textarea>
        </div>
        <button className="board-write-btn">등록</button>
      </div>
    </>
  );
}
