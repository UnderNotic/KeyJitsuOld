import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { App } from "../index";
import AppRedux from "../index";
import { configure } from "enzyme";
import { shallow, render, mount } from "enzyme";
import reduxWrapper from "utils/reduxTestWrapper";

configure({ adapter: new Adapter() });

const props = {
  isToggled: ""
};
const wrapper = shallow(<App {...props} />);

describe("MyComponent", () => {
  it("renders without exploding", () => {
    expect(wrapper).toHaveLength(1);
  });
});

describe("MyComponent with REDUX", () => {
  it("init state is correct", () => {
    const [, store] = reduxWrapper(null);

    expect(store.getState().mainReducer.isToggled).toBe(false);
  });

  it("shows true on single click", () => {
    const [Comp] = reduxWrapper(AppRedux);
    const wrapperRedux = mount(Comp);

    expect(wrapperRedux).toHaveLength(1);
    expect(wrapperRedux.find("button")).toHaveLength(1);
    wrapperRedux.find({ "data-test": "btn" }).simulate("click");
    expect(wrapperRedux.find({ "data-test": "btn" })).toHaveLength(1);
    expect(wrapperRedux.containsAnyMatchingElements(["true"])).toBe(true);
  });

  it("shows false on double click", () => {
    const [Comp] = reduxWrapper(AppRedux);
    const wrapperRedux = mount(Comp);
    
    wrapperRedux.find({ "data-test": "btn" }).simulate("click");
    wrapperRedux.find({ "data-test": "btn" }).simulate("click");
    expect(wrapperRedux.containsAllMatchingElements(["false"])).toEqual(true);
  });
});
