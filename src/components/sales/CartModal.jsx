import React, {useState} from "react";
import styled from "styled-components";
import {postSale} from "../../requests/sales/postSale";

const CartModal = ({stateModal, setStateModal, cartItems, handleQuantityChange, handleRemoveItem}) => {
    const [document, setDocument] = useState("");

    const handleQuantityUpdate = (event, code) => {
        const quantity = parseInt(event.target.value);
        handleQuantityChange(code, quantity);
    };

    const handleRemoveButtonClick = (code) => {
        handleRemoveItem(code);
    };

    const makeSale = async (event) => {
        event.preventDefault();

        try {
            const responseData = await postSale(document, cartItems);
            console.log(responseData);
            setStateModal(false);
        } catch (error) {
            throw error;
        }
    }

    return (
        <>
            {stateModal && (
                <>
                    <Overlay>
                        <ModalContainer>
                            <form onSubmit={makeSale}>
                                <div className='signup-container'>
                                    <div className='left-container'>
                                        <div className='logo'>
                                            <h1>
                                                <a href="index.html"><img alt="logoPrendyD"
                                                                          src="images/InicioR.png"/></a>
                                            </h1>
                                        </div>
                                        <div className='puppy'>
                                            <img
                                                src='images/puppy2.png' alt='prendyPuppy'/>
                                        </div>
                                    </div>
                                    <div className='right-container'>
                                        <header>
                                            <h1>Carrito de Compras</h1>
                                            <div className='set'>
                                                <div className='pets-name'>
                                                    <div className='Arrow'>
                                                        <label htmlFor='pets-name'>Documento del cliente</label>
                                                        <input placeholder="123456789"
                                                               type="number"
                                                               id="document"
                                                               name="document" required={true} min="1" max={9999999999}
                                                               value={document}
                                                               onChange={(event) => setDocument(event.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <ul>
                                                {cartItems.map((item) => (
                                                    <li key={item.code}>
                                                        <div>
                                                            <span>Código: {item.code}</span>
                                                            <span>Nombre: {item.name}</span>
                                                            <span>Cantidad:</span>
                                                            <input
                                                                type="number"
                                                                value={item.quantity}
                                                                min="0"
                                                                max={item.stock}
                                                                onChange={(event) => handleQuantityUpdate(event, item.code)}
                                                            />
                                                            <button
                                                                onClick={() => handleRemoveButtonClick(item.code)}>Eliminar del carrito
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </header>
                                        <footer>
                                            <div className='set'>
                                                <CloseButton id='back'
                                                             onClick={() => setStateModal(false)}>Cancelar</CloseButton>
                                                <button type="submit" id='next'>Comprar</button>
                                            </div>
                                        </footer>
                                    </div>
                                </div>
                            </form>
                        </ModalContainer>
                    </Overlay>
                </>
            )}
        </>
    );
};


export default CartModal;

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
  z-index: 999;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;;

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

const SubmitButton = styled.button`
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