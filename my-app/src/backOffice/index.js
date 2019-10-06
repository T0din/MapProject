import React, { useState } from "react";
import { createComponent } from "react-fela";

const style1 = {
  backgroundImage:
    // "url(https://www.gamingbooks.co.uk/images/dtrpg/LIbrary-Sample.jpg)",
    "url(https://i.pinimg.com/originals/d6/96/31/d69631ee50b2e1e09296974556503763.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center"
};
const Square = createComponent(
  ({ red }) => ({
    border: red ? "2px solid red" : "1px solid black",
    minWidth: "13px",
    minHeight: "13px",
    opacity: 0.7,
    zIndex: 10
  }),
  "div",
  ["onClick", "data-index-X", "data-index-Y", "value"]
);

const Flex = createComponent(() => ({
  display: "flex",
  justifyContent: "center"
}));
const Padded = createComponent(() => ({
  padding: "20px"
}));

const Form = createComponent(
  () => ({
    backgroundColor: "lightGrey"
  }),
  "form"
);

const BackOffice = () => {
  const width = 35;
  const heigth = 44;
  const emptySquare = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    room: null,
    x: null,
    y: null
  };

  let array = [...Array(heigth)].map((lign, index1) =>
    [...Array(width)].map((e, index2) => {
      const square = { ...emptySquare };
      square.y = index2;
      square.x = index1;
      return square;
    })
  );
  const [openForm, setOpenForm] = useState(false);
  const [squareFocusX, setSquareFocusX] = useState(null);
  const [squareFocusY, setSquareFocusY] = useState(null);
  const [arrayState, setArrayState] = useState(array);

  const changeInfo = e => {
    const newArray = arrayState.map(arrayOfSameX => {
      arrayOfSameX.map(square =>
        Number(square.x) === Number(squareFocusX) &&
        Number(square.y) === Number(squareFocusY)
          ? (square[e.target.name] = Number(e.target.value))
          : square
      );
      return arrayOfSameX;
    });
    setArrayState(newArray);
  };
  console.log(arrayState);
  return (
    <>
      <Flex>
        <div style={style1}>
          {[...Array(heigth)].map((lign, index1) => (
            <Flex key={Math.random() + index1}>
              {[...Array(width)].map((square, index2) => (
                <>
                  <Square
                    data-index-X={index1}
                    data-index-Y={index2}
                    value={{ x: index1, y: index2 }}
                    key={Math.random() + index2}
                    onClick={e => {
                      setSquareFocusX(e.currentTarget.dataset.indexX);
                      setSquareFocusY(e.currentTarget.dataset.indexY);
                      setOpenForm(true);
                    }}
                    red={
                      Number(index1) === Number(squareFocusX) &&
                      Number(index2) === Number(squareFocusY)
                    }
                  />
                </>
              ))}
            </Flex>
          ))}
        </div>
      </Flex>

      {openForm && (
        <Padded>
          <Flex>
            <Form>
              <p>{`Square (x:${squareFocusX}, y:${squareFocusY})`}</p>
              <Flex>
                <Flex>
                  <div>Top</div>
                  <input
                    name="top"
                    style={{ width: "10px", height: "10px" }}
                    onChange={e => changeInfo(e)}
                    value={arrayState[squareFocusX][squareFocusY].top}
                  />
                </Flex>
                <Flex>
                  <div>Right</div>
                  <input
                    name="right"
                    style={{ width: "10px", height: "10px" }}
                    onChange={e => changeInfo(e)}
                    value={arrayState[squareFocusX][squareFocusY].right}
                  />
                </Flex>
                <Flex>
                  <div>Bottom</div>
                  <input
                    name="bottom"
                    style={{ width: "10px", height: "10px" }}
                    onChange={e => changeInfo(e)}
                    value={arrayState[squareFocusX][squareFocusY].bottom}
                  />
                </Flex>
                <Flex>
                  <div>Left</div>
                  <input
                    name="left"
                    style={{ width: "10px", height: "10px" }}
                    onChange={e => changeInfo(e)}
                    value={arrayState[squareFocusX][squareFocusY].left}
                  />
                </Flex>
              </Flex>
            </Form>
          </Flex>
        </Padded>
      )}
    </>
  );
};

export default BackOffice;
