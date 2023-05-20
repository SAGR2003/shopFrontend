import React from "react";
import styled from "styled-components";
import {postProduct} from "../requests/postProduct";

const CreateProductModal = ({stateModal, setStateModal, code, name, unitValue, stock, setCode, setName, setUnitValue, setStock}) => {
    const addProduct = (event) => {
        event.preventDefault();

        let product = {
            code: code,
            name: name,
            unitValue: unitValue,
            stock: stock,
        }
        postProduct(product);
        setStateModal(false);
    }

    return (
        <>
            {stateModal &&
                <Overlay>
                    <ModalContainer>
                        <ModalHeader>
                            <h3>Create Product</h3>
                        </ModalHeader>
                        <CloseButton onClick={() => setStateModal(false)}>X</CloseButton>
                        <form onSubmit={addProduct}>
                            <label htmlFor="code">Product Code:</label>
                            <input
                                type="text"
                                id="code"
                                name="code"
                                value={code}
                                onChange={(event) => setCode(event.target.value)}
                            />

                            <label htmlFor="name">Product Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />

                            <label htmlFor="unitValue">Unit Value:</label>
                            <input
                                type="text"
                                id="unitValue"
                                name="unitValue"
                                value={unitValue}
                                onChange={(event) => setUnitValue(event.target.value)}
                            />

                            <label htmlFor="stock">Stock:</label>
                            <input
                                type="text"
                                id="stock"
                                name="stock"
                                value={stock}
                                onChange={(event) => setStock(event.target.value)}
                            />
                            <SubmitButton type="submit">Create</SubmitButton>
                        </form>
                    </ModalContainer>
                </Overlay>
            }
        </>
    );
}

export default CreateProductModal;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  Left: 0;
  background: rgba(0, 0, 0, .5);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: 500px;
  min-height: 100px;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  padding: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #E8E8E8;

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #1A5840;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  transition: .3s ease all;
  border-radius: 5px;
  color: #1A5840;
  background: transparent;

  &:hover {
    background: #E8E8E8;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  top: 200px;
  right: 40px;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  transition: .3s ease all;
  color: #1A5840;
  background: transparent;
`;
