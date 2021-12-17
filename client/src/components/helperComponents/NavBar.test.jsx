// Import setup from test-utils file
import { render, fireEvent, screen } from 'test-utils';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import NavBar from './NavBar.jsx';

// Good example of testing - https://www.samdawson.dev/article/react-context-testing
describe('<NavBar />', () => {
  beforeEach(() => {
    render(<NavBar />);
  });
  // This is a basic structure for the tests
  test('loads text QuizKnows', () => {
    // Arrange = render the starting component
    // render(<NavBar />);

    // Act = do something on that component (i.e. click on it)

    // Assert = tests you want to do here
    expect(screen.getByText('QuizKnows')).toBeInTheDocument();
  });

  test('loads text Home', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('loads text Quizzes', () => {
    expect(screen.getByText('Quizzes')).toBeInTheDocument();
  });

  test('loads text MyAcount', () => {
    expect(screen.getByText('My Account')).toBeInTheDocument();
  });

  test('loads text login', () => {
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  describe('Clicking Login changes pages', () => {
    beforeEach(async () => {
      userEvent.click(screen.getByText('Login'));
    });

    test('loads email', async () => {
      // the full text needs to be in the test not just partial
      const text = await screen.getByText('Email:');
      expect(text).toBeInTheDocument();
    });
  });
});
