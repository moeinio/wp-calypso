import { Button } from '@automattic/components';
import { localize } from 'i18n-calypso';
import { get } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Count from 'calypso/components/count';
import QuerySiteStats from 'calypso/components/data/query-site-stats';
import { getSiteSlug } from 'calypso/state/sites/selectors';
import { getSiteStatsNormalizedData } from 'calypso/state/stats/lists/selectors';
import { getSelectedSite } from 'calypso/state/ui/selectors';

class FollowersCount extends Component {
	render() {
		const { slug, followers, translate, siteId } = this.props;

		return (
			<div className="followers-count">
				{ siteId && <QuerySiteStats statType="stats" siteId={ siteId } /> }
				{ typeof followers === 'number' && (
					<Button
						borderless
						href={ '/people/followers/' + slug }
						title={ translate( 'Total of WordPress and Email Followers' ) }
					>
						{ translate( 'Followers' ) } <Count count={ followers } />
					</Button>
				) }
			</div>
		);
	}
}

export default connect( ( state ) => {
	const site = getSelectedSite( state );
	const siteId = get( site, 'ID' );
	const data = getSiteStatsNormalizedData( state, siteId, 'stats' );
	const siteFollowers = get( site, 'subscribers_count' );

	return {
		slug: getSiteSlug( state, siteId ),
		followers: get( data, 'followersBlog', siteFollowers ),
		siteId,
	};
} )( localize( FollowersCount ) );
