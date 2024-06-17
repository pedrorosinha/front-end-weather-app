import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ListarPagina from '../src/Componentes/ListarPagina';
import '@testing-library/jest-dom/extend-expect';

const mock = new MockAdapter(axios);

describe('Testes do componente ListarPagina', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('Deve renderizar o componente ListarPagina com dados', async () => {

    mock.onGet('http://localhost:8080/tempo/previsao/todas').reply(200, [
      {
        id: 1,
        data: '2024-06-17',
        cidade: 'Cidade Teste',
        temperaturaMinima: 20,
        temperaturaMaxima: 30,
        clima: 'Ensolarado',
        turno: 'MANHA',
        precipitacao: 0,
        umidade: 50,
        velocidadeVento: 10,
      },
    ]);

    render(
      <MemoryRouter>
        <ListarPagina />
      </MemoryRouter>
    );

    expect(screen.getByText('Lista de Dados Meteorológicos')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Cidade Teste')).toBeInTheDocument();
    });
  });

  it('Deve exibir modal de confirmação ao tentar excluir um registro', async () => {
    mock.onGet('http://localhost:8080/tempo/previsao/todas').reply(200, [
      {
        id: 1,
        data: '2024-06-17',
        cidade: 'Cidade Teste',
        temperaturaMinima: 20,
        temperaturaMaxima: 30,
        clima: 'Ensolarado',
        turno: 'MANHA',
        precipitacao: 0,
        umidade: 50,
        velocidadeVento: 10,
      },
    ]);

    render(
      <MemoryRouter>
        <ListarPagina />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Cidade Teste')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Excluir'));

    expect(screen.getByText('Você tem certeza que deseja excluir essa informação?')).toBeInTheDocument();
  });
});
