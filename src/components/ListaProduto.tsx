'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";
import Link from "next/link";

export default function ListaProduto() {

  const [listaProdutos, setListaProducts] = useState(Array);
  const [nomeProduto, setNomeProduto] = useState(String)
  const [descricaoProduto, setDescricaoProduto] = useState(String)
  const [precoProduto, setPrecoProduto] = useState(String)
  const [qntdProduto, setQntdProduto] = useState(String)
  const [produtoId, setProdutoId] = useState(String)

  const apiUrl = 'http://localhost:8080/api/produtos'

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpen = (id: any) => {
    onOpen();
    setProdutoId(id)
  }

  async function getListaProduto() {
    const response = await fetch(apiUrl)
    const responseData: any = await response.json()
    setListaProducts(responseData)
  }

  function deletarProduto(id: String) {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          getListaProduto()
        }
      }
      )
  }

  const atualizarProduto = async (id: String) => {
    console.log(id)
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
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
      .then(res => {
        if (res.ok) {
          getListaProduto()
          onClose()
        }
      }
      )
  }

  useEffect(() => {
    getListaProduto()
  }, [])

  return (
    <section className="relative">
      <Table className="w-4/6 h-fit m-auto">
        <TableHeader>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Descrição</TableColumn>
          <TableColumn>Preço</TableColumn>
          <TableColumn className="text-center">Quantidade em estoque</TableColumn>
          <TableColumn className="text-center">Ações</TableColumn>
        </TableHeader>
        <TableBody>
          {listaProdutos.map((produto: any, i) =>
            <TableRow key={i} className="">
              <TableCell>{produto.nome}</TableCell>
              <TableCell>{produto.descricao}</TableCell>
              <TableCell>R$ {produto.preco.toFixed(2)}</TableCell>
              <TableCell className="w-fit text-center">{produto.quantidadeEstoque}</TableCell>
              <TableCell>
                <div className="w-fit m-auto flex gap-2">
                  <button onClick={() => handleOpen(produto.id)}><EditIcon /></button>
                  <button onClick={() => deletarProduto(produto.id)}><DeleteIcon /></button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Link className="absolute top-0 ml-4" href={`/`}>
        <Button>Voltar</Button>
      </Link>
      <ModalAtualizar />
    </section>
  )

  function ModalAtualizar() {
    return (
      <Modal
        size="md"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
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
                </form>
              </ModalBody>
              <ModalFooter className="flex gap-2 ml-2">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={() => atualizarProduto(produtoId)}>
                  Cadastrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
  }
}