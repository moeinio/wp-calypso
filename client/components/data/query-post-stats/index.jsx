import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { requestPostStats } from 'calypso/state/stats/posts/actions';
import { isRequestingPostStats } from 'calypso/state/stats/posts/selectors';

class QueryPostStats extends Component {
	static defaultProps = {
		requestPostStats: () => {},
		heartbeat: 0,
	};

	static propTypes = {
		siteId: PropTypes.number,
		postId: PropTypes.number,
		fields: PropTypes.array,
		requestingPostStats: PropTypes.bool,
		requestPostStats: PropTypes.func,
		heartbeat: PropTypes.number,
	};

	UNSAFE_componentWillMount() {
		const { requestingPostStats, siteId, postId } = this.props;
		if ( ! requestingPostStats && siteId && typeof postId !== 'undefined' ) {
			this.requestPostStats( this.props );
		}
	}

	componentWillUnmount() {
		this.clearInterval();
	}

	UNSAFE_componentWillReceiveProps( nextProps ) {
		const { siteId, postId, fields, heartbeat } = this.props;
		if (
			! ( siteId && typeof postId !== 'undefined' ) ||
			( siteId === nextProps.siteId &&
				postId === nextProps.postId &&
				isEqual( fields, nextProps.fields ) &&
				heartbeat === nextProps.heartbeat )
		) {
			return;
		}

		this.requestPostStats( nextProps );
	}

	requestPostStats( props ) {
		const { siteId, postId, fields, heartbeat } = props;
		props.requestPostStats( siteId, postId, fields );
		this.clearInterval();
		if ( heartbeat ) {
			this.interval = setInterval( () => {
				props.requestPostStats( siteId, postId, fields );
			}, heartbeat );
		}
	}

	clearInterval() {
		if ( this.interval ) {
			clearInterval( this.interval );
		}
	}

	render() {
		return null;
	}
}

export default connect(
	( state, { siteId, postId, fields } ) => {
		return {
			requestingPostStats: isRequestingPostStats( state, siteId, postId, fields ),
		};
	},
	{ requestPostStats }
)( QueryPostStats );
