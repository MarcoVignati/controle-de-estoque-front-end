'use client'

import { Input ,Button } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';

export default function CadastrarFornecedor() {

  const [nomeFornecedor, setNomeFornecedor] = useState(String)
  const [enderecoFornecedor, setEnderecoFornecedor] = useState(String)
  const [telefoneFornecedor, setTelefoneFornecedor] = useState(String)
  const [emailFornecedor, setEmailFornecedor] = useState(String)

  const apiUrl = 'http://localhost:8080/api/produtos'

  const cadastrarFornecedor = async () => {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(
        {
          nome: nomeFornecedor,
          endereco: enderecoFornecedor,
          telefone: telefoneFornecedor,
          email: emailFornecedor
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok){
        setNomeFornecedor('')
        setEnderecoFornecedor('')
        setTelefoneFornecedor('')
        setEmailFornecedor('')
      }
    })
  }

  return (
    <form>
        <div className="flex items-center mb-2">
          <label htmlFor="nomeFornecedor" className="w-32">Nome</label>
          <Input
            id="nomeFornecedor"
            className="w-80"
            key="outside-left"
            type="text"
            value={nomeFornecedor}
            onChange={(e) => setNomeFornecedor(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-2">
          <label htmlFor="enderecoFornecedor" className="w-32">Endereço</label>
          <Input
            id="enderecoFornecedor"
            className="w-80"
            key="outside-left"
            type="text"
            value={enderecoFornecedor}
            onChange={(e) => setEnderecoFornecedor(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-2">
          <label htmlFor="telefoneFornecedor" className="w-32">Telefone</label>
          <Input
            id="telefoneFornecedor"
            className="w-28"
            key="outside-left"
            type="number"
            value={telefoneFornecedor}
            onChange={(e) => setTelefoneFornecedor(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="emailFornecedor" className="w-32">Email</label>
          <Input
            id="emailFornecedor"
            className="w-28"
            key="outside-left"
            type="email"
            value={emailFornecedor}
            onChange={(e) => setEmailFornecedor(e.target.value)}
          />
        </div>
        <div className="flex gap-2 ml-2">
          <Button color="primary" onClick={() => cadastrarFornecedor()}>
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