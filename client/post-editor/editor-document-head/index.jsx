import { localize } from 'i18n-calypso';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import DocumentHead from 'calypso/components/data/document-head';
import QueryPostTypes from 'calypso/components/data/query-post-types';
import { getEditorPostId, isEditorNewPost } from 'calypso/state/editor/selectors';
import { getPostType } from 'calypso/state/post-types/selectors';
import { getEditedPostValue } from 'calypso/state/posts/selectors';
import { getSelectedSiteId } from 'calypso/state/ui/selectors';

function EditorDocumentHead( { translate, siteId, type, typeObject, newPost } ) {
	let title;
	if ( 'post' === type ) {
		if ( newPost ) {
			title = translate( 'New Post', { textOnly: true } );
		} else {
			title = translate( 'Edit Post', { textOnly: true } );
		}
	} else if ( 'page' === type ) {
		if ( newPost ) {
			title = translate( 'New Page', { textOnly: true } );
		} else {
			title = translate( 'Edit Page', { textOnly: true } );
		}
	} else if ( newPost ) {
		if ( typeObject ) {
			title = typeObject.labels.new_item;
		} else {
			title = translate( 'New', { textOnly: true } );
		}
	} else if ( typeObject ) {
		title = typeObject.labels.edit_item;
	} else {
		title = translate( 'Edit', { context: 'verb', textOnly: true } );
	}

	return (
		<div>
			{ siteId && 'page' !== type && 'post' !== type && <QueryPostTypes siteId={ siteId } /> }
			<DocumentHead title={ title } />
		</div>
	);
}

EditorDocumentHead.propTypes = {
	translate: PropTypes.func,
	siteId: PropTypes.number,
	type: PropTypes.string,
	typeObject: PropTypes.object,
	newPost: PropTypes.bool,
};

export default connect( ( state ) => {
	const siteId = getSelectedSiteId( state );
	const postId = getEditorPostId( state );
	const type = getEditedPostValue( state, siteId, postId, 'type' );

	return {
		siteId,
		type,
		typeObject: getPostType( state, siteId, type ),
		newPost: isEditorNewPost( state ),
	};
} )( localize( EditorDocumentHead ) );
