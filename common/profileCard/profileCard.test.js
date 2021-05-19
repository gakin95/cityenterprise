import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'
import ProfileCard from './profileCard';
import { connect } from "react-redux";
import * as actions from "../../src/store/actions";
import Header from '../PrimaryAppBar';

configure({adapter: new Adapter()})

let user = {
        firstName:'gbenga',
        lastName:'akin',
        roleId:131
    }

describe('<ProfileCard />', () => {
    it('It should render one <ProfileCard /> If there is no user', () => {
        const wrapper = renderer.create(<ProfileCard user={user}/>).toJSON()
        //expect(wrapper.find(ProfileCard)).toHaveLength(1)
        expect(wrapper).toMatchSnapshot()

    });
});


const mapStateToProps = (state) => {
    return {
      loading: state.auth.loading,
      error: state.auth.error,
      currentUser: state.auth.userId ? state.auth.userId : [],
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onGetProfile: (token) => dispatch(actions.profile(token)),
      onLogout: () => dispatch(actions.logout()),
    };
  };

// import React from "react";
// import { render, cleanup } from "@testing-library/react";
// const { axe } = require("jest-axe");

// import Navigation from '../PrimaryAppBar';
// import ProfileCard from './profileCard';

// afterEach(cleanup);
// let user = {
//     firstName:'gbenga'
// }

// test("Navigation should render", () => {
//   const { getByText } = render(<ProfileCard user={user}/>);

//   expect(getByText("Tasky Task")).toBeInTheDocument();
// });

// test("navigation should not have any accessibility violations", async () => {
//   const { container } = render(<ProfileCard user={user}/>);

//   const results = await axe(container);
//   expect(results).toHaveNoViolations();
// });