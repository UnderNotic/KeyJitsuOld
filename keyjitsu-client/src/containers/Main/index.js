import React from "react";
import HelloWorld from "components/HelloWorld";
import { connect } from "react-redux";
import { toggle } from "./indexDuck";

export const App = ({ dispatch, isToggled }) => {
  return (
    <div>
      <button onClick={() => dispatch(toggle())} data-test="btn">
        ASd
      </button>
      {isToggled.toString()}
      <HelloWorld />
    </div>
  );
};

function mapStateToProps(state) {
  const { mainReducer } = state;
  const { isToggled } = mainReducer;
  return {
    isToggled
  };
}

export default connect(mapStateToProps)(App);
