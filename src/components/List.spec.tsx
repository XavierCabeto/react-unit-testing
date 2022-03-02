import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './List';

describe('List Component', () => {
  it('should render list items', async () => {
    const { getByText, queryByText, rerender, unmount } = render(<List initialItems={['Xavier', 'Arian', 'Marcio']} />);

    expect(getByText('Xavier')).toBeInTheDocument();
    expect(getByText('Arian')).toBeInTheDocument();
    expect(getByText('Marcio')).toBeInTheDocument();

    unmount()
    rerender(<List initialItems={['Julia']} />)

    expect(getByText('Joaquim')).toBeInTheDocument()
    expect(queryByText('Marcio')).not.toBeInTheDocument()

  });

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]} />);

    const inputElement = getByPlaceholderText('Novo item');
    const addButton = getByText('Adicionar');

    userEvent.type(inputElement, 'Novo');
    userEvent.click(addButton);

    expect(await findByText('Novo')).toBeInTheDocument();
  });

  it('should be able to remove item from the list', async () => {
    const { getAllByText, queryByText } = render(<List initialItems={['Xavier']} />);

    const removeButton = getAllByText('Remover');

    userEvent.click(removeButton[0]);

    await waitFor(() => {
      expect(queryByText('Xavier')).not.toBeInTheDocument();
    })
  });
});