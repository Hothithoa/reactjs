import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../app.css";
import Input from "../Components/Input";
import Text from "../Components/Text";
import { save } from "../features/cauhoi";

function App() {
  const [isShow, setIsShow] = useState(false);
  const list = useSelector((state) => state.cauhoi);
  const dispatch = useDispatch();
  const [listdapansai, setListdapansai] = useState([""]);
  const [checkRepair, setcheckRepair] = useState(false);
  const cauhoiRef = useRef();
  const dapandungRef = useRef();
  const editRef = useRef(null);
  const handleChangeTab = () => {
    setIsShow(!isShow);
    editRef.current = null;
  };
  const handleSave = () => {
    setIsShow(!isShow);
    let temp;
    if (checkRepair) {
      temp = [...list];
      temp.splice(editRef.current.index, 1, {
        id: editRef.current.id,
        cauHoi: cauhoiRef.current.value,
        cauDung: dapandungRef.current.value,
        cauSai: [...listdapansai],
      });
    } else {
      temp = [
        ...list,
        {
          id: Math.random(),
          cauHoi: cauhoiRef.current.value,
          cauDung: dapandungRef.current.value,
          cauSai: [...listdapansai],
        },
      ];
    }
    dispatch(save(temp));
    setListdapansai([""]);
    setcheckRepair(false);
  };
  const handleAdd = () => {
    setListdapansai([...listdapansai, ""]);
  };
  const handleChange = (index, value) => {
    const temp = [...listdapansai];
    temp.splice(index, 1, value);
    setListdapansai(temp);
  };
  const handleRepair = (index) => {
    setIsShow(!isShow);
    let { id, cauHoi, cauDung, cauSai } = list[index];
    editRef.current = {
      id,
      cauSai,
      cauHoi,
      cauDung,
      index,
    };
    setListdapansai(cauSai);
    setcheckRepair(true);
  };
  const handleDelete = (index) => {
    const temp = [...list];
    temp.splice(index, 1);
    dispatch(save(temp));
  };
  return (
    <div className="root-container">
      <div>
        <button className="btn" onClick={handleChangeTab}>
          {!isShow ? "Th??m c??u h???i" : "Quay l???i"}
        </button>
        {!isShow && (
          <Link to={"/kiemtra"} className="btn ml-1">
            Ki???m tra
          </Link>
        )}
      </div>
      <div className="wraper">
        {!isShow ? (
          <>
            {/* Ch??? ????? hi???n th??? */}
            <h3 className="title">Danh s??ch c??u h???i</h3>
            <div className="wrap">
              {list.map(({ id, cauHoi }, index) => (
                <Text
                  key={index}
                  onRepair={() => handleRepair(index)}
                  onDelete={() => {
                    handleDelete(index);
                  }}
                >
                  {index + 1 + ". " + cauHoi}
                </Text>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Ch?? ????? ch???nh s???a */}
            <div className="header">
              <Input
                placeHodler="C??u h???i"
                input={cauhoiRef}
                defaultValue={editRef.current?.cauHoi}
              />
              <button className="btn" onClick={handleAdd}>
                +
              </button>
            </div>

            <div className="wrap">
              <Input
                placeHodler="????p ??n ????ng"
                input={dapandungRef}
                defaultValue={editRef.current?.cauDung}
              />
              {listdapansai.map((item, index) => (
                <Input
                  key={index}
                  placeHodler="????p ??n sai"
                  value={item}
                  onChange={(value) => {
                    handleChange(index, value);
                  }}
                />
              ))}
            </div>

            <button className="btn full-width" onClick={handleSave}>
              L??u
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
