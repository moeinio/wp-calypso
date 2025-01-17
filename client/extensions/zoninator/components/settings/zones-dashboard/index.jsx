import { Button } from '@automattic/components';
import { localize } from 'i18n-calypso';
import { flowRight, times } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import HeaderCake from 'calypso/components/header-cake';
import SectionHeader from 'calypso/components/section-header';
import PageViewTracker from 'calypso/lib/analytics/page-view-tracker';
import { getSelectedSiteId, getSelectedSiteSlug } from 'calypso/state/ui/selectors';
import { settingsPath } from '../../../app/util';
import { getZones, isRequestingZones } from '../../../state/zones/selectors';
import ZoneItem from './zone-item';
import ZonePlaceholder from './zone-placeholder';

const placeholderCount = 5;

const ZonesDashboard = ( { isRequesting, siteSlug, translate, zones } ) => (
	<div>
		<PageViewTracker path="/extensions/zoninator/:site" title="WP Zone Manager" />

		<HeaderCake backHref={ `/plugins/zoninator/${ siteSlug }` }>Zoninator Settings</HeaderCake>

		<SectionHeader label={ translate( 'Zones' ) }>
			<Button compact href={ `${ settingsPath }/new/${ siteSlug }` }>
				{ translate( 'Add a zone' ) }
			</Button>
		</SectionHeader>
		{ isRequesting &&
			zones.length === 0 &&
			times( placeholderCount, ( i ) => <ZonePlaceholder key={ i } /> ) }
		{ zones.map( ( zone ) => (
			<ZoneItem key={ zone.slug } zone={ zone } />
		) ) }
	</div>
);

ZonesDashboard.propTypes = {
	siteSlug: PropTypes.string,
	zones: PropTypes.array,
};

const connectComponent = connect( ( state ) => {
	const siteId = getSelectedSiteId( state );

	return {
		zones: getZones( state, siteId ),
		isRequesting: isRequestingZones( state, siteId ),
		siteSlug: getSelectedSiteSlug( state ),
	};
} );

export default flowRight( connectComponent, localize )( ZonesDashboard );
