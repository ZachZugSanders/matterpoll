import ActionTypes from 'action_types';
import {pollMetadata} from 'reducers/poll_metadata';

const initialState = {
    poll_id1: {
        voted_answers: ['answer1'],
        user_id: 'user_id1',
        poll_id: 'poll_id1',
        can_manage_poll: false,
        setting_progress: false,
        setting_public_add_option: false,
    },
};
const additionalState = {
    voted_answers: [],
    user_id: 'user_id1',
    poll_id: 'poll_id2',
    can_manage_poll: true,
    setting_progress: false,
    setting_public_add_option: false,
};

describe('vote reducers', () => {
    test('no action', () => expect(pollMetadata(undefined, {})).toEqual({})); // eslint-disable-line no-undefined
    test('no action with initial state', () => {
        expect(
            pollMetadata(initialState, {}),
        ).toEqual(initialState);
    });
    test('action to add new poll', () => {
        expect(
            pollMetadata(
                initialState,
                {
                    type: ActionTypes.FETCH_POLL_METADATA,
                    data: {
                        voted_answers: [],
                        user_id: 'user_id1',
                        poll_id: 'poll_id2',
                        can_manage_poll: true,
                        setting_progress: false,
                        setting_public_add_option: false,
                    },
                },
            ),
        ).toEqual({
            ...initialState,
            poll_id2: additionalState,
        });
    });

    test('action to add new settings', () => {
        const expected = JSON.parse(JSON.stringify(initialState));
        expected.poll_id1.setting_progress = true;
        expected.poll_id1.setting_public_add_option = true;

        expect(
            pollMetadata(
                initialState,
                {
                    type: ActionTypes.FETCH_POLL_METADATA,
                    data: {
                        voted_answers: ['answer1'],
                        user_id: 'user_id1',
                        poll_id: 'poll_id1',
                        can_manage_poll: false,
                        setting_progress: true,
                        setting_public_add_option: true,
                    },
                },
            ),
        ).toEqual(expected);
    });
    test('action to add new answer', () => {
        const expected = JSON.parse(JSON.stringify(initialState));
        expected.poll_id1.voted_answers = ['answer1', 'answer2'];

        expect(
            pollMetadata(
                initialState,
                {
                    type: ActionTypes.FETCH_POLL_METADATA,
                    data: {
                        voted_answers: ['answer1', 'answer2'],
                        user_id: 'user_id1',
                        poll_id: 'poll_id1',
                        can_manage_poll: false,
                        setting_progress: false,
                        setting_public_add_option: false,
                    },
                },
            ),
        ).toEqual(expected);
    });
    test('action to update poll without empty poll_id', () => {
        expect(
            pollMetadata(
                initialState,
                {
                    type: ActionTypes.FETCH_POLL_METADATA,
                    data: {
                        voted_answers: ['answer1', 'answer2'],
                        user_id: 'user_id1',
                        poll_id: '',
                        can_manage_poll: false,
                        setting_progress: false,
                        setting_public_add_option: false,
                    },
                },
            ),
        ).toEqual(initialState);
    });
    test('action with undefined', () => {
        expect(
            pollMetadata(
                initialState,
                {
                    type: ActionTypes.FETCH_POLL_METADATA,
                    data: undefined, // eslint-disable-line no-undefined
                },
            ),
        ).toEqual(initialState);
    });
});
