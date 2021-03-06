import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react'; // eslint-disable-line
import '@testing-library/jest-dom/extend-expect'; // eslint-disable-line
import Pagination from './index';

describe('Pagination', () => {
  afterEach(cleanup);

  let handleShowPage;

  beforeEach(() => {
    handleShowPage = jest.fn();
  });

  test('calls the "showPage" prop on "prev page" click', () => {
    const wrapper = render(
      <Pagination currentPage={3} pageCount={6} showPage={handleShowPage} />
    );

    fireEvent.click(wrapper.getByTestId('goto-prev-page'));
    expect(handleShowPage).toHaveBeenCalledTimes(1);
    expect(handleShowPage).toHaveBeenCalledWith(2);
  });

  test('calls the "showPage" prop on "next page" click', () => {
    const wrapper = render(
      <Pagination currentPage={3} pageCount={6} showPage={handleShowPage} />
    );

    fireEvent.click(wrapper.getByTestId('goto-next-page'));
    expect(handleShowPage).toHaveBeenCalledTimes(1);
    expect(handleShowPage).toHaveBeenCalledWith(4);
  });
});
