import React from "react";
import styled from "styled-components";
import {putProductStock} from "../requests/putProductStock";

const EditProductModal = ({
                              stateModal,
                              setStateModal,
                              editingProduct,
                              code,
                              name,
                              stock,
                              setStock,
                              loadProducts,
                          }) => {

    const handleUpdateStock = async (event) => {
        event.preventDefault();
        await putProductStock(editingProduct.code, stock);
        setStateModal(false);
        loadProducts();
    }


    return (
        <>
            {stateModal && editingProduct && (
                <Overlay>
                    <ModalContainer>
                        <header>
                            <h3>Add Stock</h3>
                        </header>
                        <CloseButton onClick={() => setStateModal(false)}>X</CloseButton>
                        <form onSubmit={handleUpdateStock}>
                            <label htmlFor="code">Product Code:</label>
                            <input type="text" id="code" name="code" value={code} disabled/>

                            <label htmlFor="name">Product Name:</label>
                            <input type="text" id="name" name="name" value={name} disabled/>

                            <label htmlFor="stock">New Stock:</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={stock}
                                onChange={(event) => setStock(event.target.value)}
                            />

                            <button type="submit">Save</button>
                        </form>
                    </ModalContainer>
                </Overlay>
            )}
        </>
    );
};

export default EditProductModal;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  position: absolute;
  border-radius: 5px;
  z-index: 999;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #1a5840;
  }
`;

const CloseButton = styled.button`
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #1a5840;
  background: transparent;

  &:hover {
    background: #e8e8e8;
  }
`;
