'use client'

import { Input ,Button } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';

export default function CadastrarProduto() {

  const [nomeProduto, setNomeProduto] = useState(String)
  const [descricaoProduto, setDescricaoProduto] = useState(String)
  const [precoProduto, setPrecoProduto] = useState(String)
  const [qntdProduto, setQntdProduto] = useState(String)

  const apiUrl = 'http://localhost:8080/api/produtos'

  const cadastrarProduto = async () => {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(
        {
          nome: nomeProduto,
          descricao: descricaoProduto,
          preco: precoProduto,
          quantidadeEstoque: qntdProduto
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <form>
        <div className="flex items-center mb-2">
          <label htmlFor="nomeProduto" className="w-32">Nome</label>
          <Input
            id="nomeProduto"
            className="w-80"
            key="outside-left"
            type="text"
            value={nomeProduto}
            onChange={(e) => setNomeProduto(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-2">
          <label htmlFor="descricaoProduto" className="w-32">Descrição</label>
          <Input
            id="descricaoProduto"
            className="w-80"
            key="outside-left"
            type="text"
            value={descricaoProduto}
            onChange={(e) => setDescricaoProduto(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-2">
          <label htmlFor="precoProduto" className="w-32">Preço</label>
          <Input
            id="precoProduto"
            className="w-28"
            key="outside-left"
            type="number"
            value={precoProduto}
            onChange={(e) => setPrecoProduto(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="qntdProduto" className="w-32">Qntd. estoque</label>
          <Input
            id="qntdProduto"
            className="w-28"
            key="outside-left"
            type="number"
            value={qntdProduto}
            onChange={(e) => setQntdProduto(e.target.value)}
          />
        </div>
        <div className="flex gap-2 ml-2">
          <Button color="primary" onClick={() => cadastrarProduto()}>
            Cadastrar
          </Button>
          <Link href={`/`}>
            <Button>
              Voltar
            </Button>
          </Link>
        </div>
      </form>
  )
}