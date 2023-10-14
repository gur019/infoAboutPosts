import * as reactHooks from 'react-redux';

import AgGrid from "./AgGrid";
import { render, screen , act} from '@testing-library/react';

jest.mock('react-redux')
const mockedDispatch = jest.spyOn(reactHooks, 'useDispatch');

global.fetch = jest.fn(()=>{
    Promise.resolve({
        json: () =>
            Promise.resolve([
                { id: 1, title: 'Post 1', body: 'Body 1' },
                { id: 2, title: 'Post 2', body: 'Body 2' },
            ]),
    })
})


describe('AgGrid', () => {
    it('create ad grid emty', () => {

        mockedDispatch.mockResolvedValue(jest.fn())

        const components = render(<AgGrid />)

        expect(components).toMatchSnapshot();
    });

    it('should fetch', async () => {

        await act(async ()=> render(<AgGrid />))

        // expect(screen.getAllByText('Post 1')).toBeInTheDocument();

    });
})