import "./css/Board.css";
import boardlist from "../db/data.json";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Paging from "./pagenation";


export default function Board() {
  var count =0;
  const [boardlist2, setboardlist] = useState([]);

  useEffect(() => {
    //axios사용해서 링크에서 얻어와
    axios.get(
      "http://192.168.2.72:8080/listGet"
    ).then(res=>{console.log(res);
    setboardlist(res.data);
    }
    );
    
  },[]);

  console.log(boardlist2);
  return (
    <>
      <table>
        <thead>
          <tr>
            {boardlist.boardType.map((type) => (
              <th>{type.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* list를 순차적으로 가지고와서 td 형태로 tr마다 나온다.
           */}
          {boardlist2.map((list) => {
            return (
              <tr>                
                <td>{list.index}</td>
                <td><Link to={`/content/${list.no}`}>{list.title} </Link></td>
              <td>{list.id}</td>
                <td>{list.createDate}</td>
                
              </tr>
            );
          })}
        </tbody>
        <Paging />
      </table>
      
    </>
  );
}
