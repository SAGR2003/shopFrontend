import React, {useEffect} from "react";
import styled from "styled-components";
import {putProductStock} from "../../requests/products/putProductStock";

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
    };

    useEffect(() => {
        if (stateModal) {
            setStock(""); // Reset the stock state when the modal is opened
        }
    }, [stateModal, setStock]);


    return (
        <>
            {stateModal && editingProduct && (
                <Overlay>
                    <ModalContainer>
                        <form onSubmit={handleUpdateStock}>
                            <div className='signup-container'>
                                <div className='left-container'>
                                    <div className='logo'>
                                        <h1>
                                            <a href="index.html"><img alt="logoPrendyD" src="images/InicioR.png"/></a>
                                        </h1>
                                    </div>
                                    <div className='puppy'>
                                        <img
                                            src='images/puppy2.png' alt='prendyPuppy'/>
                                    </div>
                                </div>
                                <div className='right-container'>
                                    <header>
                                        <h1>Agrega existencias de cada producto.</h1>
                                        <div className='set'>
                                            <div className='pets-name'>
                                                <label htmlFor='pets-name'>Código</label>
                                                <input type="number"
                                                       id="code"
                                                       name="code"
                                                       value={code}
                                                       disabled/>
                                            </div>

                                            <div className='pets-name'>
                                                <label htmlFor='pets-name'>Nombre</label>
                                                <input type="text"
                                                       id="name"
                                                       name="name"
                                                       value={name}
                                                       disabled/>
                                            </div>
                                        </div>
                                        <div className='set'>
                                            <div className='pets-name'>
                                                <div className='Arrow'>
                                                    <label htmlFor='pets-name'>Existencias</label>
                                                    <input placeholder="Existencias del producto"
                                                           type="number"
                                                           id="stock1"
                                                           name="stock" required={true} min="1" max="999999999" step="1"
                                                           value={stock}
                                                           onChange={(event) => setStock(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </header>
                                    <footer>
                                        <div className='set'>
                                            <CloseButton id='back' onClick={() => setStateModal(false)}>Volver</CloseButton>
                                            <button type="submit" id='next'>Guardar</button>
                                        </div>
                                    </footer>
                                </div>
                            </div>
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
  Left: 0;
  background: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  position: absolute;
  border-radius: 5px;
  z-index:999;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
;

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #1A5840;
  }
`;

const CloseButton = styled.button`
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
