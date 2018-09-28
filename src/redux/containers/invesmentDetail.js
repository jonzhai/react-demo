import {connect} from 'react-redux';
import InvesmentDetail from 'src/pages/invesmentDetail/invesmentDetail';
import * as actions from '../actions';

const mapStateToProps = state => {
    return {
        curCount: state.user.curCount
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: list => {
            dispatch(actions.login(list))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvesmentDetail)